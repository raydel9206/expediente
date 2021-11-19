<template>
  <q-page class="q-pa-md">
    <q-table
      class="q-pa-md"
      :data="rows"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      @request="getEpidemia"
      selection="single"
      :selected.sync="selected"
      no-data-label="No existen epidemias registradas"
      @selection="onSelection"
      binary-state-sort
    >
      <template v-slot:top>
        <q-toolbar flat color="white">
          <q-toolbar-title>Epidemia</q-toolbar-title>
          <q-separator dark vertical inset />
          <q-input
            borderless
            debounce="300"
            v-model="filter"
            color="primary"
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
            icon="add"
            @click="
              win_add_upd = true;
              editedIndex = false;
            "
          >
            <q-tooltip content-class="bg-primary"
              >Nueva epidemia</q-tooltip
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
        <addupd-epidemia
          ref="form"
          class="q-pa-md"
          @validateAs="validateAs"
        ></addupd-epidemia>
      </div>
      <div slot="btnWindow">
        <btn-cancel
          class="q-mr-sm"
          v-close-popup
          color="brown-5"
          @click="win_add_upd = false"
        ></btn-cancel>
        <btn-aceptar
          :disabled="!valid"
          @click="fireEvent"
          color="primary"
        ></btn-aceptar>
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
import AddupdEpidemia from './addupdEpidemia.vue';
export default {
  components: { window, confirm, BtnCancel, BtnAceptar, AddupdEpidemia },
  name: "EpidemiaIndex",
  data() {
    return {
      rows: [],
      original: [],
      confirmTitle: "",
      confirmText: "",
      valid: false,
      search: "",
      click_del: false,
      selected: [],
      editedIndex: false,
      win_add_upd: false,
      item: {
        provincia: "",
        municipio: "",
        policlinico: "",
        nombre: ""
      },
      editedItem: {
        id: "",
        nombre: "",
        provincia: "",
        policlinico: "",
        municipio: ""
      },
      defaultItem: {
        id: "",
        nombre: ""
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
          field: row => row.policlinico.nombre,
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
        rowsPerPage: 5,
        rowsNumber: 10
      }
    };
  },
  mounted() {
    this.getEpidemia({
      pagination: this.pagination
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === false
        ? "Nueva epidemia"
        : "Modificar epidemia";
    }
  },
  methods: {
    buscar() {
      this.pagination.filter = this.filter;
      this.getEpidemia({
        pagination: this.pagination
      });
    },
    async getEpidemia(props) {
      const { page, rowsPerPage, filter, descending } = props.pagination;
      const response = await this.$axios.get("epidemia", {
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
      this.click_del = true;
      const index = this.rows.indexOf(item);
      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar la epidemia?",
          { color: "red" }
        )
      ) {
        const deleteItem = Object.assign({}, item);
        try {
          const result = await this.$axios.delete("/epidemia/delete", {
            data: { id: deleteItem.id }
          });
          if (result.status === 200) {
            this.$notifier.showMessage({
              content: result.data.message,
              color: "success"
            });
            this.rows.splice(index, 1);
          } else {
            this.$notifier.showMessage({
              content:
                "Se produjo un error eliminando los datos; si el error persiste contacte al administrador.",
              color: "error"
            });
          }
        } catch (error) {
          this.$notifier.showMessage({
            content:
              "Se produjo un error eliminando los datos; si el error persiste contacte al administrador.",
            color: "error"
          });
        }
      }
    },
    cleanSearch() {
      const nullFilter = (this.filter = "");
      this.pagination.filter = nullFilter;
      this.getEpidemia({
        pagination: this.pagination
      });
    },
    close() {
      this.win_add_upd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },
    validateAs(value) {
      this.name_epidemia = value;
    },
    onSelection() {
      this.selected.length
        ? (this.editedIndex = false)
        : (this.editedIndex = true);
    },
    fireEvent() {
      if (this.$refs.form.validate()) {
        const obj = {
          policlinico_id: this.$refs.form.$refs.pol_sel.value.id,
          nombre: this.$refs.form.$refs.name_epidemia.value
        };
        this.$axios
          .post("epidemia", obj)
          .then(response => {
            this.getEpidemia();
            this.close();
            win_add_upd = false;
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Epidemia adicionada satisfactorimente."
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
  },
};
</script>
