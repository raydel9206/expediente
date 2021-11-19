<template>
  <div class="q-pa-sm">
    <q-card>
      <div class="q-pa-md">
        <q-toolbar class="q-pa-sm">
          <q-btn flat color="cyan-9" round dense icon="description" />
          <q-toolbar-title>{{title}}</q-toolbar-title>
          <q-space />
          <div class="q-pl-sm"></div>
          <q-btn
            class="mb-2"
            text-color="black"
            round
            dense
            icon="close"
            color="gray"
            @click="goBack"
          >
            <q-tooltip content-class="bg-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-toolbar>
      </div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="cyan-9"
        indicator-color="cyan-9"
        align="justify"
        narrow-indicator
      >
        <q-tab name="datos_primarios" label="Datos PRIMARIOS" />
        <q-tab name="datos" label="Datos del paciente" />
      </q-tabs>
      <q-separator />
      <q-form class="q-pa-md" ref="form" @submit="fireEvent">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="datos_primarios">
            <div class="row">
              <div class="col-6 q-pa-md">
                <div class="row">
                  <div class="col-11">
                    <q-input
                      ref="persona_ci"
                      type="number"
                      v-model="this.editedItem.persona_ci"
                      label="Carnet de identidad"
                      :rules="AllRules.identityRules"
                    />
                  </div>
                  <div class="col-1 q-pt-lg q-pl-md">
                    <template>
                      <q-btn
                        flat
                        dense
                        icon="search"
                        name="keyword"
                        color="gray"
                        @click="findIndentity"
                      />
                    </template>
                  </div>
                </div>
                <q-input
                  ref="persona_nombre"
                  v-model="this.editedItem.persona_nombre"
                  label="Nombre"
                  :rules="AllRules.requiredRules"
                />
                <q-input
                  ref="persona_direccion"
                  v-model="this.editedItem.persona_direccion"
                  outlined
                  label="Dirección"
                  autogrow
                />
                <q-input
                  ref="persona_sexo"
                  class="q-pt-md"
                  v-model="this.editedItem.persona_sexo"
                  label="Sexo"
                  :rules="AllRules.requiredRules"
                />
                <q-input
                  ref="persona_ocupacion"
                  v-model="this.editedItem.persona_ocupacion"
                  label="Ocupación"
                  :rules="AllRules.requiredRules"
                />
                <q-input
                  ref="persona_centro"
                  v-model="this.editedItem.persona_centro"
                  label="Centro de trabajo o estudios"
                  :rules="AllRules.requiredRules"
                />
              </div>
              <div class="col-6 q-pa-md">
                <q-input
                  ref="persona_edad"
                  type="number"
                  v-model="this.editedItem.persona_edad"
                  label="Edad"
                  :rules="AllRules.edadRules"
                />
                <q-input
                  ref="persona_apellidos"
                  v-model="this.editedItem.persona_apellidos"
                  label="Apellidos"
                  :rules="AllRules.requiredRules"
                />
                <q-select
                  ref="pais_id"
                  label="Nacionalidad"
                  v-model="this.editedItem.pais_id"
                  :options="this.nacionalidades"
                  map-options
                  option-label="nacionalidad"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  :rules="AllRules.requiredRules"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-select
                  ref="provincia_id"
                  label="Provincia"
                  v-model="this.editedItem.provincia_id"
                  :options="this.provincias"
                  option-label="nombre"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @input="loadMunicipio(true)"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select
                  ref="municipio_id"
                  label="Municipio"
                  v-model="this.editedItem.municipio_id"
                  :options="this.municipios"
                  option-label="nombre"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @input="
                    loadPoliclinico(true);
                    loadConsejos(true);
                  "
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select
                  ref="consejo_id"
                  label="Consejo popular"
                  v-model="this.editedItem.consejo_id"
                  :options="this.consejos"
                  option-label="nombre"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select
                  ref="policlinico_id"
                  label="Policlinico"
                  v-model="this.editedItem.policlinico_id"
                  :options="this.policlinicos"
                  option-label="nombre"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  @input="loadAreaSalud(true)"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select
                  ref="cmf_id"
                  label="Area de salud"
                  v-model="this.editedItem.cmf_id"
                  :options="this.areasSalud"
                  option-label="nombre"
                  option-value="id"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="datos">
            <div class="row">
              <div class="col-6 q-pa-md">
                <div class="q-pt-sm">
                  <strong>DATOS CLINICOS Y DE LABORATORIO</strong>
                </div>
                <q-select
                  ref="antecedentes"
                  label="Antecedentes Patológicos"
                  v-model="multipleAnt"
                  :options="this.antecedentes"
                  option-label="descripcion"
                  option-value="id"
                  multiple
                  use-chips
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-input
                  ref="fecha_sintomas"
                  v-model="this.editedItem.fecha_sintomas"
                  mask="date"
                  label="Fecha de los 1ros síntomas"
                  :first-day-of-week="1"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="this.editedItem.fecha_sintomas">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Cerrar"
                              color="cyan-9"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-select
                  ref="sintomas_signos"
                  label="Síntomas y signos"
                  v-model="multipleSig"
                  :options="this.sintomas"
                  option-label="descripcion"
                  option-value="id"
                  multiple
                  use-chips
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  :rules="AllRules.requiredRules"
                  :clearable="true"
                  :clear-value="''"
                  use-input
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No hay elementos
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <div>
                  <q-input
                    ref="otros_sintomas"
                    v-model="this.editedItem.otros_sintomas"
                    label="Otros sintomas"
                    outlined
                    autogrow
                  />
                  <div class="q-pa-md">
                    <strong> Centro que remite el caso:</strong>
                  </div>
                  <q-radio
                    v-model="this.editedItem.tipo_centro_remite"
                    val="pol"
                    label="Policlinico"
                    @input="disabledItems"
                  />
                  <q-radio
                    v-model="this.editedItem.tipo_centro_remite"
                    val="cm"
                    label="CM"
                    @input="disabledItems"
                  />
                  <q-radio
                    v-model="this.editedItem.tipo_centro_remite"
                    val="hosp"
                    label="Hospital"
                    @input="disabledItems"
                  />
                  <q-radio
                    v-model="this.editedItem.tipo_centro_remite"
                    val="otro"
                    label="Otro"
                    @input="disabledItems"
                  />
                  <q-input
                    ref="remite_caso"
                    v-model="this.editedItem.centro_remite"
                    label="Especifique en caso de otro"
                    :disable="disableRemiteOtro"
                  />
                </div>
              </div>

              <div class="col-6 q-pa-md">
                <!-- <q-separator color="brown-5" inset /> -->
                <div class="col-6 q-pa-xs">
                  <strong>DATOS EPIDEMIOLOGICOS</strong>
                </div>
                <div class="col-6 q-pa-xs">
                  <div class="q-gutter-sm">
                    <div>
                      <strong>
                        ¿Ha arribado al país procedente del extranjero en los 15
                        días anteriores a la aparición de la enfermedad?</strong
                      >
                    </div>
                    <q-radio
                      v-model="this.editedItem.arribado"
                      :val="true"
                      label="Si"
                      @input="disabledItems"
                    />
                    <q-radio
                      v-model="this.editedItem.arribado"
                      :val="false"
                      label="No"
                      @input="disabledItems"
                    />
                  </div>

                  <q-select
                    ref="procedente_id"
                    label="Pais de procedencia"
                    class="col-6 q-pa-xs"
                    :disable="disableProcedencia"
                    v-model="this.editedItem.procedente_id"
                    :options="this.paises"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :rules="AllRules.requiredRules"
                    :clearable="true"
                    :clear-value="''"
                    use-input
                    emit-value
                    map-options
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-input
                    ref="fecha_arribado"
                    v-model="this.editedItem.fecha_arribado"
                    mask="date"
                    class="col-6 q-pa-xs"
                    label="Fecha de arribo"
                    :rules="['date']"
                    :disable="disablefechaArribo"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="this.editedItem.fecha_arribado">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="cyan-9"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    ref="lugar_estancia"
                    class="col-6 q-pa-xs"
                    v-model="this.editedItem.lugar_estancia"
                    :disable="disableProcedencia"
                    label="Especifique el lugar de estancia"
                    :rules="AllRules.requiredRules"
                  />
                  <div class="col-6 q-pa-xs">
                    <div class="q-gutter-sm">
                      <div class="q-px-sm">
                        <strong>
                          ¿Ha estado en contacto con alguna persona a la que se
                          le halla diagnosticado COVID-19?:</strong
                        >
                      </div>
                      <q-radio
                        v-model="this.editedItem.iscontacto"
                        :val="true"
                        label="Si"
                        @input="disabledItems"
                      />
                      <q-radio
                        v-model="this.editedItem.iscontacto"
                        :val="false"
                        label="No"
                        @input="disabledItems"
                      />
                      <q-input
                        class="col-6 q-pa-xs"
                        v-model="this.editedItem.lugar_contacto"
                        label="Especifique el lugar del contacto"
                        :rules="AllRules.requiredRules"
                        :disable="disableLugarContacto"
                      />
                      <q-input
                        ref="fecha_contacto"
                        v-model="this.editedItem.fecha_contacto"
                        mask="date"
                        class="col-6 q-pa-xs"
                        label="Fecha de contacto"
                        :rules="['date']"
                        :disable="disableFechaContacto"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="this.editedItem.fecha_contacto">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="cyan-9"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <div class="row">
          <q-space />
          <btn-cancel
            class="q-mr-sm"
            v-close-popup
            color="brown-5"
            @click="goBack"
          ></btn-cancel>
          <btn-aceptar type="submit" color="cyan-9"></btn-aceptar>
        </div>
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn fab icon="keyboard_arrow_up" style="backgroundColor:#0089aa" />
        </q-page-scroller>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
import { date } from "quasar";
import btnCancel from "src/components/buttons/btnCancel.vue";
import BtnAceptar from "src/components/buttons/btnAceptar.vue";

const today = new Date();
const { startOfDate, addToDate, subtractFromDate } = date;

export default {
  components: { btnCancel, BtnAceptar },
  name: "addupdExpediente",
  mixins: [mixinField],
  props: {
    title: {
      type: String,
      default: ""
    },
    idExp: {
      type: Number,
      default: -1
    },
    editedIndex: {
      type: Number,
      default: -1
    }
  },

  data() {
    return {
      editedItem: {
        id: "",
        pais_id: "",
        arribado: false,
        fecha_arribado: "",
        tipo_centro_remite: "pol",
        centro_remite: "",
        fecha_sintomas: "",
        fecha_contacto: "",
        lugar_contacto: "",
        lugar_estancia: "",
        otros_sintomas: "",
        nacionalidad: "",
        iscontacto: true,
        cmf_id: "",

        persona_ci: "",
        persona_apellidos: "",
        persona_direccion: "",
        persona_ocupacion: "",
        persona_nombre: "",
        persona_edad: "",
        persona_sexo: "",

        provincia_id: "",
        consejo_id: "",
        municipio_id: "",
        policlinico_id: "",
        antecedentes: "",
        sintomas: ""
      },
      defaultItem: {
        id: "",
        pais_id: "",
        arribado: false,
        fecha_arribado: "",
        tipo_centro_remite: "pol",
        centro_remite: "",
        fecha_sintomas: "",
        fecha_contacto: "",
        lugar_contacto: "",
        lugar_estancia: "",
        otros_sintomas: "",
        nacionalidad: "",
        iscontacto: true,
        cmf_id: "",

        persona_ci: "",
        persona_apellidos: "",
        persona_direccion: "",
        persona_ocupacion: "",
        persona_nombre: "",
        persona_edad: "",
        persona_sexo: "",

        provincia_id: "",
        consejo_id: "",
        municipio_id: "",
        policlinico_id: "",
        antecedentes: "",
        sintomas: ""
      },

      today,
      click_del_cont: false,
      disableEstancia: false,
      disableProcedencia: false,
      disablefechaArribo: false,
      disableLugarContacto: false,
      disableFechaContacto: false,
      disableRemiteOtro: true,
      wind_add: true,
      editedContIndex: -1,
      tab: "datos_primarios",
      personas: [],
      antecedentes: [],
      paises: [],
      nacionalidades: [],
      provincias: [],
      consejos: [],
      municipios: [],
      policlinicos: [],
      areasSalud: [],
      sintomas: [],
      loadAntByExp: false,
      loadSintSigByExp: false,
      multipleAnt: null,
      multipleSig: null,

      //Rules definitions
      AllRules: {
        identityRules: [
          val => (val !== null && val !== "") || "Por favor rellene este campo",
          val =>
            val.length === 11 || "Por favor revise, deben ser 11 caracteres"
        ],
        requiredRules: [val => val !== "" || "Campo Obligatorio"],
        edadRules: [
          val => (val !== null && val !== "") || "Campo Obligatorio",
          val => (val > 0 && val < 150) || "Please type a real age"
        ]
      }
    };
  },

  mounted() {
    //Load Stores
    this.loadPais();
    this.loadProvincia();
    this.loadMunicipio(false);
    this.loadConsejos(false);
    this.loadPoliclinico(false);
    this.loadAreaSalud(false);
    this.getSintomas();
    this.getAntecedentes();
    this.disabledItems();

    if (this.$props.editedIndex !== -1) {
      this.getAntPersona();
      this.getSintSigExp();
    }

  
      this.asyncData();
    

    this.editedItem.id !== ""
      ? (this.loadAntByExp = true)
      : (this.loadAntByExp = false);
    this.editedItem.id !== ""
      ? (this.loadSintSigByExp = true)
      : (this.loadSintSigByExp = false);
  },

  methods: {
    //Load form data from selected expediente
    async asyncData(context) {
      console.log(context);
      try {
       const result = await context.app.$axios.get('/addupdExpediente', {
        params: {
          id: context.params.itemId,
        },
      })
        return { editedItem: { ...result.data.rows } };
      } catch (error) {
        context.error();
      }
    },

    //function goBack
    goBack() {
      this.$router.push("/expediente");
    },

    async getAntecedentes() {
      let url = "";
      let params = {};

      this.loadAntByExp
        ? (url = "expediente/getAntecedentes")
        : (url = "antecedente");

      this.loadAntByExp
        ? (params = { expediente_id: this.editedItem.id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.antecedentes = response.data.rows;
      }
    },

    async getSintomas() {
      let url = "";
      let params = {};

      this.loadSintSigByExp
        ? (url = "expediente/getSintomasSignos")
        : (url = "sintoma");

      this.loadSintSigByExp
        ? (params = { expediente_id: this.editedItem.id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });

      if (response.status === 200) {
        this.sintomas = response.data.rows;
      }
    },

    async getAntPersona() {
      const response = await this.$axios.get("persona/antecedentes", {
        params: {
          persona_id: this.editedItem.persona_id
        }
      });
      if (response.status === 200) {
        this.multipleAnt = response.data.rows.map(item => item.id);
      }
    },

    async getSintSigExp() {
      const response = await this.$axios.get("expediente/sintomas", {
        params: {
          expediente_id: this.editedItem.id
        }
      });
      if (response.status === 200) {
        this.multipleSig = response.data.rows.map(item => item.id);
      }
    },

    disabledItems() {
      if (this.editedItem.arribado === false) {
        this.disableEstancia = true;
        this.disableProcedencia = true;
        this.disablefechaArribo = true;
      } else {
        this.disableEstancia = false;
        this.disableProcedencia = false;
        this.disablefechaArribo = false;
      }

      if (this.editedItem.iscontacto === false) {
        this.disableLugarContacto = true;
        this.disableFechaContacto = true;
      } else {
        this.disableLugarContacto = false;
        this.disableFechaContacto = false;
      }
      this.editedItem.centro_remite === "otro"
        ? (this.disableRemiteOtro = false)
        : (this.disableRemiteOtro = true);
    },

    async findIndentity() {
      if (this.editedItem.persona_ci) {
        try {
          const response = await this.$axios.get(
            `identity/${this.editedItem.persona_ci}`,
            this.editedItem
          );
          if (response.status === 200) {
            this.editedItem.persona_nombre = response.data.firstName;
            this.editedItem.persona_apellidos = response.data.lastName;
            this.editedItem.persona_edad = response.data.age;
            this.editedItem.persona_direccion = response.data.address;
            this.editedItem.persona_sexo =
              response.data.sex === "female" ? "femenino" : "masculino";
          } else {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message:
                "No se encontraron resultados para el número de identidad insertado"
            });
          }
        } catch (error) {
          this.$q.notify({
            icon: "warning",
            color: "amber-14",
            message: "Verifique el número de identidad insertado"
          });
        }
      }
    },

    close() {
      this.$router.push("/expediente");
      this.editedItem = this.defaultItem;
    },

    async loadPais() {
      const response = await this.$axios.get("pais", {
        params: {
          combo: true
        }
      });
      if (response.status === 200) {
        this.paises = response.data.rows;
        this.nacionalidades = response.data.rows;
      }
    },

    async loadProvincia() {
      const response = await this.$axios.get("provincia");
      if (response.status === 200) {
        this.provincias = response.data.rows;
      }
    },

    async loadMunicipio(combo) {
      if (combo) {
        this.editedItem.municipio_id = "";
        this.editedItem.policlinico_id = "";
        this.editedItem.cmf_id = "";
      }

      let url = "";
      let params = {};

      combo ? (url = "municipio/byProvincia") : (url = "municipio");
      combo
        ? (params = { provincia_id: this.editedItem.provincia_id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.municipios = response.data.rows;
      }
    },

    async loadConsejos(combo) {
      if (combo) {
        this.editedItem.consejo_id = "";
      }

      let url = "";
      let params = {};

      combo ? (url = "consejo/byMunicipio") : (url = "consejo");
      combo
        ? (params = { municipio_id: this.editedItem.municipio_id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.consejos = response.data.rows;
      }
    },

    async loadPoliclinico(combo) {
      if (combo) {
        this.editedItem.policlinico_id = "";
      }

      let url = "";
      let params = {};

      combo ? (url = "policlinico/byMunicipio") : (url = "policlinico");
      combo
        ? (params = { municipio_id: this.editedItem.municipio_id })
        : (params = {});
      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.policlinicos = response.data.rows;
      }
    },

    async loadAreaSalud(combo) {
      if (combo) {
        this.editedItem.cmf_id = "";
      }
      let url = "";
      let params = {};

      combo ? (url = "areaSalud/byPoliclinico") : (url = "areaSalud");
      combo
        ? (params = { policlinico_id: this.editedItem.policlinico_id })
        : (params = {});
      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.areasSalud = response.data.rows;
      }
    },

    fireEvent() {
      if (this.$refs.form.validate()) {
        this.editedItem.antecedentes = this.multipleAnt;
        this.editedItem.sintomas = this.multipleSig;
        if (this.$props.editedIndex === -1) {
          this.$axios
            .post("expediente", this.editedItem)
            .then(response => {
              this.getExpediente({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Expediente adicionado satisfactorimente."
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Error insertando los datos"
              });
            });
        } else {
          this.$axios
            .patch(`expediente/${this.editedItem.id}`, this.editedItem)
            .then(response => {
              this.getExpediente({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Expediente modificado satisfactorimente."
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Error insertando los datos"
              });
            });
        }
      }
    }
  }
};
</script>
