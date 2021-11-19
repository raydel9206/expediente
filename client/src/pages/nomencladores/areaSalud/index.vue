<template>
  <q-page class="q-pa-sm">
    <q-table
      class="q-pa-md"
      :data="rows"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      @request="getAreaSalud"
      no-data-label="No existen áreas de salud registradas"
      binary-state-sort
    >
      <template v-slot:top="props">
        <q-toolbar class="q-pb-md">
          <q-btn flat color="cyan-9" round dense icon="local_pharmacy" />
          <q-toolbar-title>Área de Salud</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
          <q-btn flat round dense icon="close" to="/" />
        </q-toolbar>
        <q-toolbar flat class=" shadow-2 rounded-borders">
          <q-input
            dense
            borderless
            debounce="300"
            v-model="filter"
            color="cyan-9"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-btn flat dense icon="search" name="keyword" @click="buscar" />
              <q-icon
                v-if="filter !== ''"
                name="close"
                @click="cleanSearch()"
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
              >Nueva área de salud</q-tooltip
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
            @click="editItem(props.row)"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="delete"
            @click="deleteItem(props.row)"
          ></q-btn>
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message }">
        <div class="full-width row flex-center text-cyan-14 q-gutter-sm">
          <q-icon size="2em" :name="icon" />
          <span v-if="filter == ''">{{ message }} </span>
          <span v-else>{{ "La búsqueda no arrojó ningun resultado" }} </span>
        </div>
      </template>
    </q-table>
    <window
      ref="win"
      class="q-pa-md"
      :title="formTitle"
      showDialog
      bodyWindow
      :show-window="win_add_upd"
    >
      <div slot="bodyWindow">
        <addupd-area-salud
          ref="form"
          class="q-pa-md"
          :editedItem="this.editedItem"
          :rules="this.rules"
        ></addupd-area-salud>
      </div>
      <div slot="btnWindow">
        <btn-cancel
          class="q-mr-sm"
          v-close-popup
          color="brown-5"
          @click="close"
        ></btn-cancel>
        <btn-aceptar @click="fireEvent" color="cyan-9"></btn-aceptar>
      </div>
    </window>
    <confirm ref="confirm" v-model="click_del"></confirm>
  </q-page>
</template>
<script>
import window from "src/components/window/window.vue";
import confirm from "src/components/confirm/confirm.vue";
import BtnCancel from "src/components/buttons/btnCancel.vue";
import BtnAceptar from "src/components/buttons/btnAceptar.vue";
import AddupdAreaSalud from 'src/forms/areaSalud/addupdAreaSalud.vue';

export default {
  components: { window, confirm, BtnCancel, BtnAceptar, AddupdAreaSalud},
  name: "AreaSaludIndex",
  data() {
    return {
      rows: [],
      confirmTitle: "",
      confirmText: "",
      search: "",
      click_del: false,
      editedIndex: -1,
      win_add_upd: false,
      rules: {
        required: [value => !!value || "El campo es oblilgatorio."]
      },
      editedItem: {
        id: "",
        nombre: "",
        provincia_id: "",
        policlinico_id: "",
        municipio_id: ""
      },
      defaultItem: {
        id: "",
        nombre: "",
        provincia_id: "",
        policlinico_id: "",
        municipio_id: ""
      },
      columns: [
        {
          label: "Nombre",
          align: "left",
          required: true,
          field: row => row.nombre,
          sortable: true
        },
        {
          label: "Policlínico",
          align: "left",
          required: true,
          field: row => row.policlinico,
          sortable: false
        },
        {
          label: "Municipio",
          align: "left",
          required: true,
          field: row => row.municipio,
          sortable: false
        },
        {
          label: "Provincia",
          align: "left",
          required: true,
          field: row => row.provincia,
          sortable: false
        },
        {
          name: "action",
          label: "Acciones",
          field: "action"
        }
      ],
      filter: "",
      pagination: {
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    };
  },
  mounted() {
    this.getAreaSalud({
      pagination: this.pagination
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nueva área de salud"
        : "Modificar área de salud";
    }
  },
  methods: {
    buscar() {
      this.pagination.filter = this.filter;
      this.getAreaSalud({
        pagination: this.pagination
      });
    },

    async getAreaSalud(props) {
      const { page, rowsPerPage, filter, descending } = props.pagination;
      const response = await this.$axios.get("areaSalud", {
        params: {
          skip: (props.pagination.page - 1) * props.pagination.rowsPerPage,
          take: props.pagination.rowsPerPage,
          keyword: props.pagination.filter
        }
      });
      if (response.status === 200) {
        this.rows = response.data.rows;
        this.pagination.rowsNumber = response.data.count;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.filter = filter;
      }
    },

    editItem(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.win_add_upd = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.click_del = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el área de salud?",
          { color: "red" }
        )
      ) {
        const result = await this.$axios.delete(
          `areaSalud/${this.editedItem.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Área de salud eliminada satisfactorimente."
          });
          this.rows.splice(this.editedIndex, 1);
          this.editedIndex = -1;
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

    cleanSearch() {
      const nullFilter = (this.filter = "");
      this.pagination.filter = nullFilter;
      this.getAreaSalud({
        pagination: this.pagination
      });
    },

    close() {
      this.win_add_upd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.$refs.provincia.resetValidation();
      this.$refs.form.$refs.municipio.resetValidation();
      this.$refs.form.$refs.policlinico.resetValidation();
      this.$refs.form.$refs.nombre.resetValidation();
    },

    fireEvent() {
      const formHasError =
        !this.$refs.form.$refs.provincia.validate() ||
        !this.$refs.form.$refs.municipio.validate() ||
        !this.$refs.form.$refs.policlinico.validate() ||
        !this.$refs.form.$refs.nombre.validate()
          ? true
          : false;

      if (!formHasError) {
        if (this.editedIndex === -1) {
          this.$axios
            .post("areaSalud", this.editedItem)
            .then(response => {
              this.getAreaSalud({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Área de salud adicionada satisfactorimente."
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
            .patch(`areaSalud/${this.editedItem.id}`, this.editedItem)
            .then(response => {
              this.getAreaSalud({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Área de salud modificada satisfactorimente."
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
    }
  }
};
</script>
