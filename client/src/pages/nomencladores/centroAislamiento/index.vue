<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div>
          <q-toolbar class="q-pb-md">
            <q-btn flat color="cyan-9" round dense icon="local_pharmacy" />
            <q-toolbar-title>Centro de aislamiento</q-toolbar-title>
            <q-btn
              flat
              round
              dense
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
                <q-btn
                  flat
                  dense
                  icon="search"
                  name="keyword"
                  @click="buscar"
                />
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
                >Nuevo centro de aislamiento</q-tooltip
              ></q-btn
            >
          </q-toolbar>
        </div>
      </q-card-section>
      <q-tree
        :nodes="props"
        default-expand-all
        :selected.sync="selected"
        node-key="label"
        class="q-pa-md"
      >
        <template v-slot:no-data="{ icon, message }">
          <div class="full-width row flex-center text-cyan-14 q-gutter-sm">
            <q-icon size="2em" :name="icon" />
            <span v-if="filter == ''">{{ message }} </span>
            <span v-else>{{ "La búsqueda no arrojó ningun resultado" }} </span>
          </div>
        </template>
      </q-tree>
    </q-card>
  </q-page>
</template>
<script>
export default {
  name: "CentroAislamiento",
  data() {
    return {
      selected: null,
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
          label: "Nombre",
          align: "left",
          required: true,
          field: row => row.nombre,
          sortable: true
        }
      ],
      props: [
        {
          label: "Satisfied customers",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [
            {
              label: "Good food",
              icon: "restaurant_menu",
              children: [
                { label: "Quality ingredients" },
                { label: "Good recipe" }
              ]
            },
            {
              label: "Good service",
              icon: "room_service",
              children: [
                { label: "Prompt attention" },
                { label: "Professional waiter" }
              ]
            },
            {
              label: "Pleasant surroundings",
              icon: "photo",
              children: [
                {
                  label: "Happy atmosphere"
                },
                {
                  label: "Good table presentation"
                },
                {
                  label: "Pleasing decor"
                }
              ]
            }
          ]
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
  methods: {
    buscar() {
      this.pagination.filter = this.filter;
      this.getCentroAislamiento({
        pagination: this.pagination
      });
    },
    async getCentroAislamiento(props) {
      const { page, rowsPerPage, filter, descending } = props.pagination;
      const response = await this.$axios.get("centroAislamiento", {
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
      this.getCentroAislamiento({
        pagination: this.pagination
      });
    }
  }
};
</script>
