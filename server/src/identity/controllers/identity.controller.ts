import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  IDENTITY_MUNICIPALITIES,
  IDENTITY_PROVINCES,
} from '../enums/dpa.enums';
import { IdentityService } from '../services/identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @Get(':id')
  async searchIdentity(
    @Param('id') id: string,
    @Query('foreign') foreign: boolean,
    @Query('photo') photo: boolean,
    @Query('query') query: object,
  ) {
    try {
      return await this.identityService.search(id, foreign, photo, query);
    } catch (error) {
      switch (error.code) {
        case 404:
          throw new NotFoundException();
          break;
        case 503:
        case 504:
          throw new ServiceUnavailableException();
          break;
        default:
          throw new InternalServerErrorException();
          break;
      }
    }
  }

  @Get('advanced/:foreign')
  @ApiQuery({
    name: 'firstName',
    required: false,
  })
  @ApiQuery({
    name: 'secondName',
    required: false,
  })
  @ApiQuery({
    name: 'lastName',
    required: false,
  })
  @ApiQuery({
    name: 'secondLastName',
    required: false,
  })
  @ApiQuery({
    name: 'province',
    required: false,
  })
  @ApiQuery({
    name: 'municipality',
    required: false,
  })
  @ApiParam({
    name: 'foreign',
    required: false,
  })
  @ApiQuery({
    name: 'photo',
    required: false,
  })
  async searchMatches(
    @Query('firstName') firstName: string,
    @Query('secondName') secondName: string,
    @Query('lastName') lastName: string,
    @Query('secondLastName') secondLastName: string,
    @Query('province') province: string,
    @Query('municipality') municipality: string,
    @Param('foreign') foreign,
    @Query('photo') photo,
  ) {
    return await this.identityService.advancedSearch(
      {
        firstName,
        secondName,
        lastName,
        secondLastName,
        province,
        municipality,
      },
      foreign ? foreign == 'true' : false,
      photo ? photo == 'true' : false,
    );
  }

  @Get('dpa/config')
  getDpaConfig() {
    const provinces = {};
    for (const code in IDENTITY_PROVINCES) {
      provinces[code] = {
        name: IDENTITY_PROVINCES[code],
        id: code,
        municipalities: [],
      };
    }
    for (const code in IDENTITY_MUNICIPALITIES) {
      const munc = IDENTITY_MUNICIPALITIES[code];
      if (!provinces[munc.prov]) continue;
      provinces[munc.prov].municipalities.push({
        id: code,
        name: munc.name,
      });
    }
    return provinces;
  }
}
