<template>
  <q-form ref="form" lazy-validation>
    <div class="row">
      <q-select
        label="Provincia"
        class="col-6 q-pa-sm"
        v-model="editedItem.provincia"
        :options="provincias"
        option-label="nombre"
        transition-show="jump-up"
        transition-hide="jump-up"
        @input="loadMunicipio"
        :rules="[val => val !== '' || 'Campo Obligatorio']"
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
        label="Municipio"
        class="col-6 q-pa-sm"
        v-model="editedItem.municipio"
        :options="municipios"
        option-label="nombre"
        transition-show="jump-up"
        transition-hide="jump-up"
        @input="loadPoliclinico"
        :rules="[val => val !== '' || 'Campo Obligatorio']"
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
    <div class="row">
      <q-select
        label="Policlínico"
        class="col-6 q-pa-sm"
        v-model="editedItem.policlinico"
        :options="policlinicos"
        option-label="nombre"
        transition-show="jump-up"
        transition-hide="jump-up"
        :rules="[val => val !== '' || 'Campo Obligatorio']"
        ><template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              No hay elementos
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        label="Nombre"
        v-model="editedItem.nombre"
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
        <template v-slot:append>
          <q-icon name="close" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";

export default {
  components: {},
  name: "addupd-epidemia",
  mixins: [mixinField],
  data() {
    return {
      rows: [],
      win_add: false,
      provincias: [],
      municipios: [],
      policlinicos: [],
      models: {
        provincia: "",
        municipio: "",
        policlinico: "",
        nombre: ""
      },
      editedItem: {
        id: "",
        nombre: ""
      },
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          align: "left"
        }
      ],
      filter: "",
      loading: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      }
    };
  },

  created() {
    this.loadProvincia();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.win_add_upd = true;
    },
    async loadProvincia() {
      const response = await this.$axios.get("provincia");
      if (response.status === 200) {
        this.provincias = response.data;
      }
    },
    async loadMunicipio() {
      const response = await this.$axios.get("municipio/byProvincia", {
        params: { provincia_id: this.models.provincia.id }
      });
      if (response.status === 200) {
        this.municipios = response.data;
      }
    },
    async loadPoliclinico() {
      const response = await this.$axios.get("policlinico/byMunicipio", {
        params: { municipio_id: this.models.municipio.id }
      });
      if (response.status === 200) {
        this.policlinicos = response.data;
      }
    }
  }
};
</script>
