<template>
  <div class="q-pa-sm">
    <q-card>
      <div class="q-pa-md">
        <q-toolbar class="q-pa-sm ">
          <q-btn flat color="cyan-9" round dense icon="description" />
          <q-toolbar-title>Evento</q-toolbar-title>
          <q-space />
          <q-btn
            text-color="black"
            round
            dense
            icon="save"
            color="gray"
            class="mb-2"
            @click="fireEvent"
          >
            <q-tooltip content-class="bg-primary">Guardar evento</q-tooltip>
          </q-btn>
          <div class="q-pl-sm"></div>
          <q-btn
            class="mb-2"
            text-color="black"
            round
            dense
            icon="restore"
            color="gray"
          >
            <q-tooltip content-class="bg-primary">Limpiar formulario</q-tooltip>
          </q-btn>
          <div class="q-pl-sm"></div>
          <q-btn
            class="mb-2"
            text-color="black"
            round
            dense
            icon="close"
            color="gray"
          >
            <q-tooltip content-class="bg-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-form m class="q-pa-md" ref="form" lazy-validation>
          <div class="row">
            <div class="col">
              <q-input
                ref="denominacion"
                label="Denominación"
                v-model="$props.editedItem.denominacion"
                clearable
                class="col-6 q-pa-sm"
                :rules="$props.rules.required"
              >
              </q-input>
              <q-input
                ref="modalidad"
                label="Modalidad"
                v-model="$props.editedItem.modalidad"
                clearable
                class="col-6 q-pa-sm"
                :rules="$props.rules.required"
              >
              </q-input>
              <q-checkbox
                class="col-6 q-pa-sm"
                v-model="cerrado"
                val="teal"
                label="Evento cerrado"
                color="cyan-9"
              />
            </div>
            <div class="col q-pb-md">
              <div>
                <q-input
                  class="col-6 q-pa-sm"
                  ref="fecha_activacion"
                  v-model="$props.editedItem.fecha_activacion"
                  mask="date"
                  label="Fecha de activación"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="$props.editedItem.fecha_activacion">
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
                  class="col-6 q-pa-sm"
                  ref="fecha_estimada_cierre"
                  v-model="$props.editedItem.fecha_estimada_cierre"
                  mask="date"
                  label="Fecha estimada de cierre"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="$props.editedItem.fecha_estimada_cierre"
                        >
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
              <div>
                <q-input
                  class="col-6 q-pa-sm"
                  ref="fecha_ultimo"
                  v-model="$props.editedItem.fecha_ultimo"
                  mask="date"
                  label="Fecha último caso"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="$props.editedItem.fecha_ultimo">
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
                  class="col-6 q-pa-sm"
                  ref="fecha_cierre"
                  v-model="$props.editedItem.fecha_cierre"
                  mask="date"
                  label="Fecha de cierre"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="$props.editedItem.fecha_cierre">
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
          <q-separator />
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="localizacion" label="Localización" />
            <q-tab name="datos" label="Datos epidemiológicos" />
            <q-tab name="medidas" label="Medidas de enfrentamiento" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="localizacion" class="q-pa-sm">
              <div class="row">
                <div class="col">
                  <q-select
                    ref="provincia"
                    label="Provincia"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.provincia_id"
                    :options="this.provincias"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :clearable="true"
                    @input="loadMunicipio(true)"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col">
                  <q-select
                    ref="municipio"
                    label="Municipio"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.municipio_id"
                    :options="this.municipios"
                    option-label="nombre"
                    option-value="id"
                    @input="loadConsejos(true), loadPoliclinico(true)"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :clearable="true"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row q-pb-md">
                <div class="col-4">
                  <q-select
                    ref="consejo"
                    label="Consejo popular"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.consejo_id"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :options="this.consejos"
                    :clearable="true"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-4">
                  <q-select
                    ref="policlinico"
                    label="Policlínico"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.policlinico_id"
                    :options="policlinicos"
                    @input="loadAreaSalud(true)"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    use-input
                    :clearable="true"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-4">
                  <q-select
                    ref="area_salud"
                    label="Area de salud"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.area_salud_id"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :clearable="true"
                    :options="this.areas_salud"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="row full-width">
                  <q-input
                    readonly
                    ref="ubicacion"
                    label="Ubicación"
                    v-model="$props.editedItem.ubicacion"
                    clearable
                    class="col-11 q-pa-sm"
                    :rules="$props.rules.required"
                  >
                  </q-input>
                  <q-btn
                    @click="openDialog"
                    icon="travel_explore"
                    class="col-1 q-pa-sm"
                    dense
                    flat
                  ></q-btn>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="datos" class="q-pa-sm">
              <div class="row">
                <div class="col">
                  <q-select
                    ref="tipo_brote"
                    label="Tipo de brote"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.tipo_brote"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :clearable="true"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col">
                  <q-select
                    ref="tipo_transmision"
                    label="Tipo de transmisión"
                    class="col-6 q-pa-sm"
                    v-model="$props.editedItem.tipo_transmision"
                    option-label="nombre"
                    option-value="id"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    :clearable="true"
                    :clear-value="''"
                    :rules="$props.rules.required"
                    map-options
                    ><template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No hay elementos
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
              <q-input
                ref="relacionado_con"
                label="Relacionado con"
                v-model="$props.editedItem.relacionado_con"
                clearable
                class="col-6 q-pa-sm"
                :rules="$props.rules.required"
              >
              </q-input>
              <div class="row">
                <div class="col">
                  <q-input
                    ref="caso_indica"
                    label="Caso índice"
                    v-model="$props.editedItem.caso_indica"
                    clearable
                    class="col-6 q-pa-sm"
                    :rules="$props.rules.required"
                  >
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    ref="caso_primario"
                    label="Caso primario"
                    v-model="$props.editedItem.caso_primario"
                    clearable
                    class="col-6 q-pa-sm"
                    :rules="$props.rules.required"
                  >
                  </q-input>
                </div>
              </div>
              <q-input
                ref="observaciones"
                label="Observaciones"
                class="col-6 q-pt-md"
                clearable
                v-model="$props.editedItem.observaciones"
                outlined
                autogrow
              ></q-input>
            </q-tab-panel>

            <q-tab-panel name="medidas">
              <q-table
                class="q-pa-sm"
                :data="rowsMedidas"
                :columns="columnsMedidas"
                row-key="id"
                no-data-label="No existen medidas de enfrentamiento registradas"
                binary-state-sort
              >
                <template v-slot:top>
                  <q-toolbar flat>
                    <q-input
                      dense
                      borderless
                      debounce="300"
                      v-model="filterMedidas"
                      color="cyan-9"
                      placeholder="Buscar"
                    >
                      <template v-slot:append>
                        <q-btn flat dense icon="search" name="keyword" />
                        <q-icon
                          v-if="filterMedidas !== ''"
                          name="close"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                    <q-space />
                    <q-btn
                      color="white"
                      text-color="black"
                      round
                      dense
                      icon="add"
                      @click="
                        win_add_upd = true;
                        editedIndex = -1;
                      "
                    >
                      <q-tooltip content-class="bg-primary"
                        >Nuevo pais</q-tooltip
                      ></q-btn
                    >
                  </q-toolbar>
                </template>
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn dense round flat color="grey" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" icon="delete"></q-btn>
                  </q-td>
                </template>
                <template v-slot:no-data="{ icon, message }">
                  <div
                    class="full-width row flex-center text-cyan-14 q-gutter-sm"
                  >
                    <q-icon size="2em" :name="icon" />
                    <span v-if="filterMedidas == ''">{{ message }} </span>
                    <span v-else
                      >{{ "La búsqueda no arrojó ningun resultado" }}
                    </span>
                  </div>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-form>
      </div>
    </q-card>

    <q-dialog
      v-model="popup.dialog"
      persistent
      :maximized="popup.maximizedToggle"
    >
      <q-card class="text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-1" style="height: calc(100vh - 2rem);">
          <mapa
            style="cursor: pointer"
            @mapPointerClicked="pointSelected"
            :markerLatLng="popup.latLng"
          ></mapa>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Mapa from "src/components/map/Mapa.vue";
export default {
  components: { Mapa },
  name: "addupdExpediente",
  props: {
    editedItem: {
      type: Object,
      default: new Object()
    },
    defaultItem: {
      type: Object,
      default: new Object()
    },
    rules: {
      type: Object,
      default: new Object()
    }
  },
  data() {
    return {
      cerrado: false,
      tab: "localizacion",
      filterMedidas: "",
      editedIndex: -1,
      rowsMedidas: [],
      provincias: [],
      municipios: [],
      consejos: [],
      policlinicos: [],
      areas_salud: [],
      columnsMedidas: [
        {
          label: "Número",
          align: "left",
          required: true,
          field: row => row.numero,
          sortable: true
        },
        {
          label: "Medida-Acción",
          align: "left",
          required: true,
          field: row => row.medida_accion,
          sortable: false
        },
        {
          label: "Fecha de inicio",
          align: "left",
          required: true,
          field: row => row.fecha_inicio,
          sortable: false
        },
        {
          label: "Fecha de fin",
          align: "left",
          required: true,
          field: row => row.fecha_fin,
          sortable: false
        },
        {
          label: "Responsable",
          align: "left",
          required: true,
          field: row => row.responsable,
          sortable: false
        },
        {
          label: "Tipo de Acción",
          align: "left",
          required: true,
          field: row => row.tipo_accion,
          sortable: false
        },
        {
          name: "action",
          label: "Acciones",
          field: "action"
        }
      ],
      popup: {
        dialog: false,
        maximizedToggle: true,
        latLng: null
      }
    };
  },
  mounted() {
    this.loadProvincia();
  },
  methods: {
    async loadProvincia() {
      const response = await this.$axios.get("provincia");
      if (response.status === 200) {
        this.provincias = response.data.rows;
      }
    },
    async loadConsejos(combo) {
      if (combo) {
        this.$props.editedItem.consejo_id = "";
      }

      let url = "";
      let params = {};

      combo ? (url = "consejo/byMunicipio") : (url = "consejo");
      combo
        ? (params = { municipio_id: this.editedItem.municipio_id.id })
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
        this.$props.editedItem.policlinico_id = "";
      }

      console.log(this.editedItem.municipio_id);
      let url = "";
      let params = {};

      combo && this.editedItem.municipio_id !== null
        ? (url = "policlinico/byMunicipio")
        : (url = "policlinico");
      combo && this.editedItem.municipio_id !== null
        ? (params = { municipio_id: this.editedItem.municipio_id.id })
        : (params = {});
      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.policlinicos = response.data.rows;
        this.allOptionsPol = response.data.rows;
      }
    },

    async loadAreaSalud(combo) {
      if (combo) {
        this.$props.editedItem.cmf_id = "";
      }
      let url = "";
      let params = {};

      combo ? (url = "areaSalud/byPoliclinico") : (url = "areaSalud");
      combo
        ? (params = { policlinico_id: this.editedItem.policlinico_id.id })
        : (params = {});
      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.areas_salud = response.data.rows;
      }
    },

    async loadMunicipio(combo) {
      if (combo) {
        this.$props.editedItem.municipio_id = "";
        this.$props.editedItem.policlinico_id = "";
      }

      let url = "";
      let params = {};

      combo ? (url = "municipio/byProvincia") : (url = "municipio");

      combo
        ? (params = { provincia_id: this.editedItem.provincia_id.id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.municipios = response.data.rows;
      }
    },

    pointSelected(e) {
      this.popup.latLng = e;
      const geoLoc = e.lat + "," + e.lng;
      this.$props.editedItem.ubicacion = geoLoc;
      this.popup.dialog = false;
    },
    openDialog() {
      this.popup.dialog = true;
    },

    fireEvent() {
      if (this.editedIndex === -1) {
        this.$axios
          .post("evento", this.$props.editedItem)
          .then(response => {
            this.getEvento({
              pagination: this.pagination
            });
            this.close();
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Evento adicionado satisfactorimente."
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
          .patch(`evento/${this.$props.editedItem.id}`, this.$props.editedItem)
          .then(response => {
            this.getEvento({
              pagination: this.pagination
            });
            this.close();
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Evento modificado satisfactorimente."
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
};
</script>
