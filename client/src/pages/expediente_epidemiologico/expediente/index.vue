<template>
  <q-page class="q-pa-sm">
    <q-table
      class="q-pa-md"
      :data="rows"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      @request="getExpediente"
      no-data-label="No existen expedientes registrados"
      binary-state-sort
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <q-toolbar class="q-pb-md">
          <q-btn flat color="cyan-9" round dense icon="description" />
          <q-toolbar-title>Expediente epidemiológico</q-toolbar-title>
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
            @click="add"
          >
            <q-tooltip content-class="bg-primary"
              >Nuevo expediente</q-tooltip
            ></q-btn
          >
          <q-select
            class="q-pl-sm"
            v-model="visibleColumns"
            multiple
            outlined
            rounded
            dense
            options-dense
            :display-value="display"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 150px"
          />
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
          >
            <q-tooltip content-class="bg-primary"
              >Modificar expediente</q-tooltip
            ></q-btn
          >
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="timeline"
            @click="new_win_seguimiento(props.row)"
          >
            <q-tooltip content-class="bg-primary"
              >Seguimiento epidemiologicos</q-tooltip
            ></q-btn
          >
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="people_alt"
            @click="listContactos(props.row)"
          >
            <q-tooltip content-class="bg-primary"
              >Lista de contactos</q-tooltip
            ></q-btn
          >
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="delete"
            @click="deleteItem(props.row)"
          >
            <q-tooltip content-class="bg-primary"
              >Eliminar expediente</q-tooltip
            ></q-btn
          >
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
    <confirm ref="confirm" v-model="click_del"></confirm>
  </q-page>
</template>
<script>
import { date } from "quasar";
import confirm from "src/components/confirm/confirm.vue";
export default {
  components: { confirm },
  name: "ExpedienteIndex",
  data() {
    return {
      rows: [],
      original: [],
      confirmTitle: "",
      confirmText: "",
      valid: false,
      search: "",
      click_del: false,
      display: "Columnas",

      editedIndex: -1,
      idExp: -1,
      add_upd: false,

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
        contactos: "",
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
        contactos: "",
        antecedentes: "",
        sintomas: ""
      },

      visibleColumns: [
        "persona_nombre",
        "fecha_sintomas",
        "pais_procedencia",
        "action"
      ],
      columns: [
        {
          name: "persona_nombre",
          label: "Persona",
          align: "left",
          required: true,
          field: row => row.persona_nombre,
          sortable: true
        },
        {
          name: "fecha_sintomas",
          label: "Fecha sintomas",
          align: "left",
          field: row => date.formatDate(row.fecha_sintomas, "DD/MM/YYYY"),
          sortable: false
        },
        {
          name: "pais_procedencia",
          label: "Pais procedencia",
          align: "left",
          field: row => row.procedente,
          sortable: false
        },
        {
          name: "lugar_estancia",
          label: "Lugar estancia",
          align: "left",
          field: row => row.lugar_estancia,
          sortable: false
        },
        {
          name: "cmf",
          label: "CMF",
          align: "left",
          field: row => row.cmf,
          sortable: false
        },
        {
          name: "centro_remite",
          label: "Centro remite",
          align: "left",
          field: row => row.centro_remite,
          sortable: false
        },
        {
          name: "lugar_contacto",
          label: "Lugar contacto",
          align: "left",
          field: row => row.lugar_contacto,
          sortable: false
        },
        {
          name: "tipo_contacto",
          label: "Tipo contacto",
          align: "left",
          field: row => row.tipo_contacto,
          sortable: false
        },
        {
          name: "fecha_contacto",
          label: "Fecha contacto",
          align: "left",
          field: row => row.fecha_contacto,
          sortable: false
        },
        {
          name: "action",
          label: "Acciones",
          required: true,
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
    this.getExpediente({
      pagination: this.pagination
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo expediente epidemiologico"
        : "Modificar expediente epidemiologico";
    }
  },
  methods: {
    add() {
      this.editedIndex = -1;
      this.$router.push({name: "addupdExpediente" , params: { id: -1 }});
    },

    new_win_seguimiento(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.add_upd = true;
      this.$router.push(`/seguimiento/${item.id}`);
    },
    listContactos(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.add_upd = true;

      this.$router.push({
        name: "listContactos",
        params: {
          expediente_id: item.id
        }
      });
    },

    buscar() {
      this.pagination.filter = this.filter;
      this.getExpediente({
        pagination: this.pagination
      });
    },

    async getExpediente(props) {
      const { page, rowsPerPage, filter, descending } = props.pagination;
      const response = await this.$axios.get("expediente", {
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
      this.add_upd = true;
      this.$router.push({ name: "addupdExpediente", params: { id: item.id } });
    },

    async deleteItem(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.click_del = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el expediente?",
          { color: "red" }
        )
      ) {
        const result = await this.$axios.delete(
          `expediente/${this.editedItem.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Expediente eliminado satisfactorimente."
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
      this.getExpediente({
        pagination: this.pagination
      });
    },

    close() {
      this.add_upd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },

    validateAs(value) {
      this.name_expediente = value;
    },

    fireEvent() {
      if (this.$refs.form.validate()) {
        const obj = {
          policlinico_id: this.$refs.form.$refs.pol_sel.value.id,
          nombre: this.$refs.form.$refs.name_expediente.value
        };
        this.$axios
          .post("expediente", obj)
          .then(response => {
            this.getExpediente();
            this.close();
            add_upd = false;
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Sintoma adicionado satisfactorimente."
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
