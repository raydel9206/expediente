<template>
  <q-page class="q-pa-sm">
    <q-table
      class="q-pa-md"
      :data="rows"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      @request="getEvento"
      no-data-label="No existen eventos registrados"
      binary-state-sort
    >
      <template v-slot:top="props">
        <q-toolbar class="q-pb-md">
          <q-btn flat color="cyan-9" round dense icon="local_pharmacy" />
          <q-toolbar-title>Eventos</q-toolbar-title>
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
            @click="to_add_upd()"
          >
            <q-tooltip content-class="bg-primary"
              >Nuevo evento activo</q-tooltip
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
        <div class="full-width row flex-center text-cyan-14 q-gutter-sm">
          <q-icon size="2em" :name="icon" />
          <span v-if="filter == ''">{{ message }} </span>
          <span v-else>{{ "La búsqueda no arrojó ningun resultado" }} </span>
        </div>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  name: "EventoIndex",
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
      columns: [
        {
          label: "Denominación",
          align: "left",
          required: true,
          field: row => row.denominacion,
          sortable: true
        },
        {
          label: "Modalidad",
          align: "left",
          required: true,
          field: row => row.modalidad,
          sortable: false
        },
        {
          label: "Fecha de activación ",
          align: "left",
          required: true,
          field: row => row.fecha_activacion,
          sortable: false
        },
        {
          label: "Fecha estimada de cierre",
          align: "left",
          required: true,
          field: row => row.fecha_cierre,
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
      },
      editedItem: {
        denominacion: "",
        modalidad: "",
        evento_cerrado: "",
        fecha_activacion: "",
        fecha_estimada_cierre: "",
        fecha_cierre: "",
        fecha_ultimo: "",
        tipo_brote: "",
        tipo_transmision: "",
        caso_indica: "",
        caso_primario: "",
        relacionado_con: "",
        observaciones: "",
        provincia_id: "",
        municipio_id: "",
        consejo_id: "",
        policlinico_id: "",
        area_salud_id: "",
        ubicacion: ""
      },
      defaultItem: {
        denominacion: "",
        modalidad: "",
        evento_cerrado: "",
        fecha_activacion: "",
        fecha_estimada_cierre: "",
        fecha_cierre: "",
        fecha_ultimo: "",
        tipo_brote: "",
        tipo_transmision: "",
        caso_indica: "",
        caso_primario: "",
        relacionado_con: "",
        observaciones: "",
        provincia_id: "",
        municipio_id: "",
        consejo_id: "",
        policlinico_id: "",
        area_salud_id: "",
        ubicacion: ""
      }
    };
  },
  mounted() {
    this.getEvento({
      pagination: this.pagination
    });
  },
  methods: {
    to_add_upd() {
      this.$router.push({
        name: "addupdEvento",
        params: {
          editedItem: this.editedItem,
          defaultItem: this.defaultItem,
          rules: this.rules
        }
      });
    },

    buscar() {
      this.pagination.filter = this.filter;
      this.getEvento({
        pagination: this.pagination
      });
    },

    async getEvento(props) {
      const { page, rowsPerPage, filter, descending } = props.pagination;
      const response = await this.$axios.get("evento", {
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

    cleanSearch() {
      const nullFilter = (this.filter = "");
      this.pagination.filter = nullFilter;
      this.getEvento({
        pagination: this.pagination
      });
    }
  }
};
</script>
