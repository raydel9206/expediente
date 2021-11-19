<template>
  <q-page class="q-pa-md">
    <q-card style="height: 91vh">
      <div>
        <q-splitter v-model="splitterModel" style="height: 91vh">
          <template v-slot:before>
            <div class="q-pa-md">
              <q-toolbar flat color="white">
                <q-toolbar-title>Seguimiento</q-toolbar-title>
              </q-toolbar>
              <q-toolbar flat color="white" class="q-pr-sm">
                <q-space />
                <div class="row q-pa-sm">
                  <q-btn
                    class="q-mr-sm"
                    color="white"
                    icon="add"
                    dense
                    text-color="black"
                    @click="
                      win_add_upd = true;
                      editedSegIndex = -1;
                    "
                  >
                    <q-tooltip content-class="bg-primary"
                      >Nuevo seguimiento</q-tooltip
                    ></q-btn
                  >
                </div>
              </q-toolbar>
              <q-tree
                :nodes="simple"
                node-key="id"
                selected-color="cyan-9"
                :selected.sync="selected"
                default-expand-all
                @update:selected="selectNode"
              >
                <template v-slot:default-header="prop">
                  <div class="row items-center">
                    <q-icon
                      :name="prop.node.icon"
                      color="cyan-9"
                      size="20px"
                      class="q-mr-sm"
                    />
                    <div class="text-weight-bold">{{ prop.node.label }}</div>
                  </div>
                </template>
              </q-tree>
            </div>
          </template>
          <template v-slot:after>
            <q-splitter
              v-model="splitterModel1"
              horizontal
              style="height: 91vh"
            >
              <template v-slot:before>
                <div class="q-pa-md">
                  <q-table
                    style="height: 42vh"
                    row-key="id"
                    :data="resultados"
                    :columns="resultado"
                    no-data-label="No hay resultados para mostrar"
                    binary-state-sort
                    hide-pagination
                  >
                    <template v-slot:top>
                      <q-toolbar flat color="white">
                        <q-toolbar-title
                          >Resultados del laboratorio clinico</q-toolbar-title
                        >
                        <q-separator dark vertical inset />
                        <q-space />
                        <q-btn
                          color="white"
                          text-color="black"
                          round
                          icon="add"
                          :disable="selected === ''"
                          @click="
                            win_add_upd_res = true;
                            editedResIndex = -1;
                          "
                        >
                          <q-tooltip content-class="bg-primary"
                            >Nuevo resultados de laboratorio</q-tooltip
                          ></q-btn
                        >
                      </q-toolbar>
                    </template>
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-btn
                          dense
                          round
                          flat
                          color="grey"
                          icon="edit"
                          @click="editRes(props.row)"
                        >
                          <q-tooltip content-class="bg-primary"
                            >Modificar resultados de laboratorio</q-tooltip
                          ></q-btn
                        >
                        <q-btn
                          dense
                          round
                          flat
                          color="grey"
                          icon="delete"
                          @click="delRes(props.row)"
                        >
                          <q-tooltip content-class="bg-primary"
                            >Eliminar resultados de laboratorio</q-tooltip
                          ></q-btn
                        >
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </template>
              <template v-slot:after>
                <div class="q-pa-md">
                  <q-table
                    style="height: 42vh"
                    row-key="id"
                    :data="estudios"
                    :columns="estudio"
                    no-data-label="No hay estudios para mostrar"
                    binary-state-sort
                    hide-pagination
                  >
                    <template v-slot:top>
                      <q-toolbar flat color="white">
                        <q-toolbar-title
                          >Estudios respiratorios</q-toolbar-title
                        >
                        <q-separator dark vertical inset />
                        <q-space />
                        <q-btn
                          color="white"
                          text-color="black"
                          round
                          icon="add"
                          :disable="selected === ''"
                          @click="
                            win_add_upd_est = true;
                            editedEstIndex = -1;
                          "
                        >
                          <q-tooltip content-class="bg-primary"
                            >Nuevo estudio epidemiologico</q-tooltip
                          ></q-btn
                        >
                      </q-toolbar>
                    </template>
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-btn
                          dense
                          round
                          flat
                          color="grey"
                          icon="edit"
                          @click="editEst(props.row)"
                        >
                          <q-tooltip content-class="bg-primary"
                            >Modificar estudio epidemiologico</q-tooltip
                          ></q-btn
                        >
                        <q-btn
                          dense
                          round
                          flat
                          color="grey"
                          icon="delete"
                          @click="delEst(props.row)"
                        >
                          <q-tooltip content-class="bg-primary"
                            >Eliminar estudio epidemiologico</q-tooltip
                          ></q-btn
                        >
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </template>
            </q-splitter>
          </template>
        </q-splitter>
      </div>
    </q-card>
    <window
      ref="win"
      class="q-pa-md"
      :title="formTitle"
      showDialog
      bodyWindow
      :show-window="win_add_upd"
    >
      <div slot="bodyWindow">
        <addupd-seguimiento
          ref="form"
          class="q-pa-md"
          :editedItem="this.editedSeguimiento"
          :rules="this.rulesSeg"
        ></addupd-seguimiento>
      </div>
      <div slot="btnWindow">
        <btn-cancel
          class="q-mr-sm"
          v-close-popup
          color="brown-5"
          @click="closeSeg"
        ></btn-cancel>
        <btn-aceptar color="cyan-9" @click="newSeg"></btn-aceptar>
      </div>
    </window>
    <window
      ref="winEst"
      class="q-pa-md"
      :title="formTitleEst"
      showDialog
      bodyWindow
      :show-window="win_add_upd_est"
    >
      <div slot="bodyWindow">
        <addupd-estudio
          ref="formEst"
          class="q-pa-md"
          :editedItem="this.editedEstudio"
          :rules="this.rulesEst"
        ></addupd-estudio>
      </div>
      <div slot="btnWindow">
        <btn-cancel
          class="q-mr-sm"
          v-close-popup
          color="brown-5"
          @click="closeEst"
        ></btn-cancel>
        <btn-aceptar color="cyan-9" @click="newEst"></btn-aceptar>
      </div>
    </window>
    <window
      ref="winRes"
      class="q-pa-md"
      :title="formTitleRes"
      showDialog
      bodyWindow
      :show-window="win_add_upd_res"
    >
      <div slot="bodyWindow">
        <addupd-resultados
          ref="formRes"
          class="q-pa-md"
          :editedItem="editedResultados"
          :rules="this.rulesRes"
        ></addupd-resultados>
      </div>
      <div slot="btnWindow">
        <btn-cancel
          class="q-mr-sm"
          v-close-popup
          color="brown-5"
          @click="closeRes"
        ></btn-cancel>
        <btn-aceptar color="cyan-9" @click="newRes"></btn-aceptar>
      </div>
    </window>
    <confirm ref="confirm" v-model="click_del_res"></confirm>
    <confirm ref="confirm" v-model="click_del_est"></confirm>
  </q-page>
</template>

<script>
import { date } from "quasar";
import mixinField from "src/components/inputs/_mixin/mixinField";
import window from "src/components/window/window.vue";
import BtnCancel from "src/components/buttons/btnCancel.vue";
import BtnAceptar from "src/components/buttons/btnAceptar.vue";
import AddupdResultados from "./addupdResultados.vue";
import AddupdEstudio from "./addupdEstudio.vue";
import AddupdSeguimiento from "./addupdSeguimiento.vue";
import Confirm from "src/components/confirm/confirm.vue";

export default {
  name: "seguimiento",
  mixins: [mixinField],
  components: {
    window,
    BtnCancel,
    BtnAceptar,
    AddupdResultados,
    AddupdEstudio,
    AddupdSeguimiento,
    Confirm
  },
  data() {
    return {
      estudios: [],
      resultados: [],
      hospital: [],

      splitterModel: 28,
      splitterModel1: 50,
      selected: "",
      isDisablebtn: false,

      editedSegIndex: -1,
      editedResIndex: -1,
      editedEstIndex: -1,

      editedSeguimiento: {
        id: "",
        hospital: "",
        fecha_ingreso: "",
        fecha_alta: ""
      },

      defaultSeguimiento: {
        id: "",
        hospital: "",
        fecha_ingreso: "",
        fecha_alta: ""
      },

      editedEstudio: {
        id: "",
        fecha: "",
        tecnico: "",
        resultado: "",
        placa_base: "",
        orden: "",
        observaciones: "",
        tipo_prueba: "",
        tipo_muestra: ""
      },

      defaultEstudio: {
        id: "",
        fecha: "",
        tecnico: "",
        resultado: "",
        placa_base: "",
        orden: "",
        observaciones: "",
        tipo_prueba: "",
        tipo_muestra: ""
      },

      editedResultados: {
        id: "",
        fecha: "",
        hemograma: "",
        gasometria: "",
        ionograma: "",
        otros: ""
      },

      defaultResultados: {
        id: "",
        fecha: "",
        hemograma: "",
        gasometria: "",
        ionograma: "",
        otros: ""
      },

      rulesSeg: {
        required: [value => !!value || "El campo es oblilgatorio."]
      },

      rulesRes: {
        required: [value => !!value || "El campo es oblilgatorio."]
      },

      rulesEst: {
        required: [value => !!value || "El campo es oblilgatorio."]
      },

      win_add_upd: false,
      win_add_upd_est: false,
      win_add_upd_res: false,

      click_del_est: false,
      click_del_res: false,

      estudio: [
        {
          label: "Tipo de prueba",
          align: "left",
          required: true,
          field: row => row.tipo_prueba,
          sortable: true
        },
        {
          label: "Tipo de muestra",
          align: "left",
          required: true,
          field: row => row.tipo_muestra,
          sortable: false
        },
        {
          name: "action",
          label: "Acciones",
          field: "action"
        }
      ],

      resultado: [
        {
          label: "Hemograma",
          align: "left",
          required: true,
          field: row => row.hemograma,
          sortable: true
        },
        {
          label: "Gasometria",
          align: "left",
          required: true,
          field: row => row.gasometria,
          sortable: false
        },
        {
          label: "Ionograma",
          align: "left",
          required: true,
          field: row => row.gasometria,
          sortable: false
        },
        {
          name: "action",
          label: "Acciones",
          field: "action"
        }
      ],

      simple: [
        {
          label: "Expediente",
          hospital: "",
          fecha_ingreso: "",
          fecha_alta: "",
          id: "-1",
          icon: "notes",
          children: []
        }
      ]
    };
  },
  props: {
    expediente_id: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.getSeguimiento();
    this.disableBtn();
  },

  computed: {
    formTitle() {
      return this.editedSegIndex === -1
        ? "Nuevo seguimiento epidemiologico"
        : "Modificar seguimiento epidemiologico";
    },

    formTitleEst() {
      return this.editedEstIndex === -1
        ? "Nuevo estudio respiratorio"
        : "Modificar estudio respiratorio";
    },

    formTitleRes() {
      return this.editedResIndex === -1
        ? "Nuevo resultado del laboratorio"
        : "Modificar resultado del laboratorio";
    }
  },

  methods: {
    editSegItem(item) {
      this.editedSegIndex = item;
      this.editedSeguimiento = Object.assign({}, item);
      this.win_add_upd = true;
    },
    async deleteSegItem(item) {
      this.editedSegIndex = this.rows.indexOf(item);
      this.editedSeguimiento = Object.assign({}, item);

      this.click_del = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el seguimiento?",
          { color: "red" }
        )
      ) {
        const result = await this.$axios.delete(
          `seguimiento/${this.editedSeguimiento.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Seguimiento eliminado satisfactorimente."
          });
          this.rows.splice(this.editedSegIndex, 1);
          this.editedSegIndex = -1;
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:
              "Se produjo un error eliminando los datos; si el error persiste contacte al administrador."
          });
        }
      }
    },

    disableBtn() {
      if (this.selected === "") {
        this.isDisablebtn = true;
      } else {
        this.isDisablebtn = false;
      }
    },
    selectNode() {
      this.loadEstudios();
      this.loadResultados();
      if (
        this.selected === "" ||
        this.selected === null ||
        this.selected === "-1"
      ) {
        this.isDisablebtn = true;
      } else {
        this.isDisablebtn = false;
      }
    },

    editRes(item) {
      this.editedResIndex = this.resultados.indexOf(item);
      this.editedResultados = Object.assign({}, item);
      this.win_add_upd_res = true;
    },

    editEst(item) {
      this.editedEstIndex = this.estudios.indexOf(item);
      this.editedEstudio = Object.assign({}, item);
      this.win_add_upd_est = true;
    },

    async loadEstudios() {
      const response = await this.$axios.get("estudio", {
        params: {
          seguimiento_id: this.selected
        }
      });
      if (response.status === 200) {
        this.estudios = response.data.rows;
      }
    },

    async loadResultados() {
      const response = await this.$axios.get("resultadolab", {
        params: {
          seguimiento_id: this.selected
        }
      });
      if (response.status === 200) {
        this.resultados = response.data.rows;
      }
    },

    async getSeguimiento(props) {
      const response = await this.$axios.get("seguimiento", {
        params: {
          expediente_id: this.$props.expediente_id
        }
      });

      if (response.status === 200) {
        const segs = response.data.rows.map(r => ({
          ...r,
          label:
            date.formatDate(r.fecha_ingreso, "DD-MM-YY") + " / " + r.hospital,
          hospital: date.hospital,
          fecha_ingreso: date.formatDate(r.fecha_ingreso, "DD-MM-YY"),
          fecha_alta: date.formatDate(r.fecha_alta, "DD-MM-YY"),
          icon: "timeline"
        }));

        this.simple[0].children = segs;
      }
    },

    closeSeg() {
      this.win_add_upd = false;
      this.$nextTick(() => {
        this.editedSeguimiento = Object.assign({}, this.defaltSeguimiento);
        this.editedSegIndex = -1;
      });

      this.$refs.form.$refs.hospital.validate();
      this.$refs.form.$refs.fecha_ingreso.validate();
      this.$refs.form.$refs.fecha_alta.validate();
    },

    closeEst() {
      this.win_add_upd_est = false;
      this.$nextTick(() => {
        this.editedEstudio = Object.assign({}, this.defaultEstudio);
        this.editedEstIndex = -1;
      });

      this.$refs.formEst.$refs.tipo_prueba.validate();
      this.$refs.formEst.$refs.tipo_muestra.validate();
      this.$refs.formEst.$refs.orden.validate();
      this.$refs.formEst.$refs.placa_base.validate();
      this.$refs.formEst.$refs.tecnico.validate();
      this.$refs.formEst.$refs.fecha.validate();
    },

    closeRes() {
      this.win_add_upd_res = false;
      this.$nextTick(() => {
        this.editedResultados = Object.assign({}, this.defaultResultados);
        this.editedResIndex = -1;
      });

      this.$refs.formRes.$refs.fecha.validate();
      this.$refs.formRes.$refs.hemograma.validate();
      this.$refs.formRes.$refs.gasometria.validate();
      this.$refs.formRes.$refs.ionograma.validate();
      this.$refs.formRes.$refs.otros.validate();
    },

    newSeg() {
      this.editedSeguimiento.expediente_id = this.$props.expediente_id;
      const formHasError =
        !this.$refs.form.$refs.hospital.validate() ||
        !this.$refs.form.$refs.fecha_ingreso.validate() ||
        !this.$refs.form.$refs.fecha_alta.validate()
          ? true
          : false;

      if (!formHasError) {
        if (this.editedSegIndex === -1) {
          this.$axios
            .post("seguimiento", this.editedSeguimiento)
            .then(response => {
              this.getSeguimiento();
              this.closeSeg();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Seguimiento adicionado satisfactorimente."
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
            .patch(
              `seguimiento/${this.editedSeguimiento.id}`,
              this.editedSeguimiento
            )
            .then(response => {
              this.getSeguimiento();
              this.closeSeg();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Seguimiento modificado satisfactorimente."
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
      } else {
        this.$q.notify({
          icon: "warning",
          color: "amber-14",
          message: "Por favor rellene los campos obligatorios"
        });
      }
    },

    newEst() {
      this.editedEstudio.seguimiento_id = this.selected;

      const formHasError =
        !this.$refs.formEst.$refs.tipo_prueba.validate() ||
        !this.$refs.formEst.$refs.tipo_muestra.validate() ||
        !this.$refs.formEst.$refs.orden.validate() ||
        !this.$refs.formEst.$refs.placa_base.validate() ||
        !this.$refs.formEst.$refs.tecnico.validate() ||
        !this.$refs.formEst.$refs.fecha.validate()
          ? true
          : false;

      if (!formHasError) {
        if (this.editedEstIndex === -1) {
          this.$axios
            .post("estudio", this.editedEstudio)
            .then(response => {
              this.loadEstudios();
              this.closeEst();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Estudio adicionado satisfactorimente."
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
            .patch(`estudio/${this.editedEstudio.id}`, this.editedEstudio)
            .then(response => {
              this.loadEstudios();
              this.closeEst();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Estudio modificado satisfactorimente."
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
      } else {
        this.$q.notify({
          icon: "warning",
          color: "amber-14",
          message: "Por favor rellene los campos obligatorios"
        });
      }
    },

    newRes() {
      this.editedResultados.seguimiento_id = this.selected;
      const formHasError =
        !this.$refs.formRes.$refs.fecha.validate() ||
        !this.$refs.formRes.$refs.hemograma.validate() ||
        !this.$refs.formRes.$refs.gasometria.validate() ||
        !this.$refs.formRes.$refs.ionograma.validate() ||
        !this.$refs.formRes.$refs.otros.validate()
          ? true
          : false;

      if (!formHasError) {
        if (this.editedResIndex === -1) {
          this.$axios
            .post("resultadolab", this.editedResultados)
            .then(response => {
              this.loadResultados();
              this.closeRes();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Resultado adicionado satisfactorimente."
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
            .patch(
              `resultadolab/${this.editedResultados.id}`,
              this.editedResultados
            )
            .then(response => {
              this.loadResultados();
              this.closeRes();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Resultado modificado satisfactorimente."
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
      } else {
        this.$q.notify({
          icon: "warning",
          color: "amber-14",
          message: "Por favor rellene los campos obligatorios"
        });
      }
    },

    async delRes(item) {
      this.editedResIndex = this.resultados.indexOf(item);
      this.editedResultados = Object.assign({}, item);

      this.click_del_res = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el resultado del laboratorio?",
          { color: "red" }
        )
      ) {
        const result = await this.$axios.delete(
          `resultadolab/${this.editedResultados.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Resultado del laboratorio eliminado satisfactorimente."
          });
          this.resultados.splice(this.editedResIndex, 1);
          this.editedResIndex = -1;
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:
              "Se produjo un error eliminando los datos; si el error persiste contacte al administrador."
          });
        }
      }
    },

    async delEst(item) {
      this.editedEstIndex = this.estudios.indexOf(item);
      this.editedEstudio = Object.assign({}, item);

      this.click_del_est = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el estudio epidemiologico?",
          { color: "red" }
        )
      ) {
        const result = await this.$axios.delete(
          `estudio/${this.editedEstudio.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Estudio epidemiologico eliminado satisfactorimente."
          });
          this.estudios.splice(this.editedEstIndex, 1);
          this.editedEstIndex = -1;
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:
              "Se produjo un error eliminando los datos; si el error persiste contacte al administrador."
          });
        }
      }
    }
  }
};
</script>
