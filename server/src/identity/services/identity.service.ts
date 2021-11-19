import {
  BadRequestException,
  GatewayTimeoutException,
  HttpService,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { IdentityOptions } from '../identity.module';
import {
  IDENTITY_MUNICIPALITIES,
  IDENTITY_PROVINCES,
} from '../enums/dpa.enums';
import * as moment from 'moment';

export interface IdentitySearchOptions {}

export class IdentityError extends Error {
  constructor(message: string, public code: number = 500) {
    super(message);
  }
}

export enum IDENTITY_SEX {
  MALE = 'male',
  FEMALE = 'female',
}
export class IdentityResponse {
  readonly _id_: string;
  readonly id: string;
  readonly firstName: string;
  readonly secondName?: string;
  readonly lastName: string;
  readonly secondLastName?: string;
  readonly skin?: string;
  readonly address?: string;
  readonly birth?: Date;
  readonly sex?: IDENTITY_SEX;
  readonly death?: boolean;
  readonly foreign: boolean;
  readonly province?: string;
  readonly municipality?: string;
  readonly name: string;
  readonly age?: number;
  readonly photo?: string;
  readonly tomo?: string;
  readonly folio?: string;

  constructor({
    _id: _id_,
    id,
    photo,
    firstName,
    secondName,
    lastName,
    secondLastName,
    address,
    sex,
    birthDate,
    death,
    municipalityId,
    provinceId,
    tomo,
    folio,
    ...identityData
  }: any) {
    this._id_ = _id_;
    this.id = id;
    this.firstName = firstName;
    this.secondName = secondName;
    this.lastName = lastName;
    this.secondLastName = secondLastName;
    this.address = address;
    this.birth = birthDate ? new Date(birthDate) : null;
    this.death = death == 'true';
    this.tomo = tomo;
    this.folio = folio;
    this.sex = sex == 'M' ? IDENTITY_SEX.MALE : IDENTITY_SEX.FEMALE;
    this.name = `${this.firstName}${
      this.secondName ? ' ' + this.secondName : ''
    } ${this.lastName}${this.secondLastName ? ' ' + this.secondLastName : ''}`;

    if (birthDate) this.age = moment().diff(moment(birthDate), 'years');

    if (provinceId && provinceId in IDENTITY_PROVINCES)
      this.province = IDENTITY_PROVINCES[provinceId];
    if (municipalityId && municipalityId in IDENTITY_MUNICIPALITIES)
      this.municipality = IDENTITY_MUNICIPALITIES[municipalityId].name;

    this.photo = photo;
  }
}
@Injectable()
export class IdentityService {
  constructor(
    @Inject('IdentityOptions') private options: IdentityOptions,
    private axios: HttpService,
  ) {}

  async search(
    id: string,
    foreign: boolean = false,
    photo: boolean = true,
    query?: IdentitySearchOptions,
  ): Promise<IdentityResponse> {
    try {
      const url = `${this.options.api}/search/${
        foreign ? 'passport' : 'carnet'
      }/${id}?photo=${photo ? 'true' : 'false'}`;
      const { data } = await this.axios.get(url).toPromise();
      if (data.id == null)
        throw new IdentityError(`Identidad ${id} no encontrada`, 404);

      return new IdentityResponse(data);
    } catch (error) {
      if (error instanceof IdentityError) throw error;
      else {
        throw new IdentityError(
          error.response
            ? error.response.status == 404
              ? `Identidad ${id} no encontrada`
              : `Hay un problema con el servicio de identidad`
            : 'Error interno',
          error.response ? error.response.status : 500,
        );
      }
    }
  }

  async advancedSearch(
    {
      firstName,
      lastName,
      municipality,
      province,
      secondLastName,
      secondName,
    }: {
      firstName?: string;
      secondName?: string;
      lastName?: string;
      secondLastName?: string;
      province?: string;
      municipality?: string;
    },
    foreign: boolean = false,
    photo: boolean = false,
  ): Promise<IdentityResponse[]> {
    try {
      let url = `${this.options.api}/search/phonetics/${foreign}?photo=${photo}`;
      if (typeof firstName != 'undefined') url += `&firstName=${firstName}`;
      if (typeof secondName != 'undefined') url += `&secondName=${secondName}`;
      if (typeof lastName != 'undefined') url += `&lastName=${lastName}`;
      if (typeof secondLastName != 'undefined')
        url += `&secondLastName=${secondLastName}`;
      if (typeof province != 'undefined') {
        if (!(province in IDENTITY_PROVINCES))
          throw new BadRequestException(`Provincia ${province} no permitida`);
        url += `&idProvince=${province}`;
      }
      if (typeof municipality != 'undefined') {
        if (!(municipality in IDENTITY_MUNICIPALITIES))
          throw new BadRequestException(
            `Municipio ${municipality} no permitida`,
          );
        url += `&idMunicipality=${municipality}`;
      }

      const { data } = await this.axios
        .get(url, {
          timeout: 60000,
        })
        .toPromise();

      if (data == '') return [];
      if (data.length > 0 && !data[0]?.id) return [];

      return (data as any[]).map((d) => new IdentityResponse(d));
    } catch (error) {
      switch (error?.response?.status) {
        case 504:
          throw new GatewayTimeoutException(
            `La consulta ha exedido el tiempo maximo de respuesta de 1 minuto, por favor intente acotar mejor la busqueda`,
          );
          break;
        case 503:
          throw new ServiceUnavailableException(
            `El servicio de identidad presenta problemas en estos momentos`,
          );
          break;
      }
      return [];
    }
  }
}
