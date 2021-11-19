<template>
  <q-form ref="form" lazy-validation>
    <div class="row">
      <q-input v-model="$props.editedItem.id" type="hidden" />
      <q-select
        ref="provincia"
        label="Provincia"
        class="col-6 q-pa-sm"
        v-model="$props.editedItem.provincia_id"
        :options="provincias"
        option-label="nombre"
        option-value="id"
        transition-show="jump-up"
        transition-hide="jump-up"
        @input="loadMunicipio(true)"
        :clearable="true"
        @filter="(val, update, abort) => filter(val, update, abort, 'prov')"
        :clear-value="''"
        use-input
        emit-value
        :rules="$props.rules.required"
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
        ref="municipio"
        label="Municipio"
        class="col-6 q-pa-sm"
        v-model="$props.editedItem.municipio_id"
        :options="municipios"
        option-label="nombre"
        option-value="id"
        transition-show="jump-up"
        transition-hide="jump-up"
        :clearable="true"
        use-input
        @filter="(val, update, abort) => filter(val, update, abort, 'mun')"
        :clear-value="''"
        @input="loadPoliclinico(true)"
        :rules="$props.rules.required"
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
    <div class="row">
      <q-select
        ref="policlinico"
        label="Policlínico"
        class="col-6 q-pa-sm"
        v-model="$props.editedItem.policlinico_id"
        :options="policlinicos"
        option-label="nombre"
        option-value="id"
        transition-show="jump-up"
        transition-hide="jump-up"
        use-input
        :clearable="true"
        @filter="(val, update, abort) => filter(val, update, abort, 'pol')"
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
      <q-input
        ref="nombre"
        label="Nombre"
        v-model="$props.editedItem.nombre"
        clearable
        class="col-6 q-pa-sm"
        :rules="$props.rules.required"
      >
      </q-input>
    </div>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";

export default {
  components: {},
  name: "addupd-area-salud",
  mixins: [mixinField],
  data() {
    return {
      provincias: [],
      allOptionsProv: [],
      municipios: [],
      allOptionsMun: [],
      policlinicos: [],
      allOptionsPol: []
    };
  },
  props: {
    rules: {
      type: Object,
      default: new Object()
    },
    editedItem: {
      type: Object,
      default: new Object()
    }
  },
  mounted() {
    this.loadProvincia();
    this.loadMunicipio(false);
    this.loadPoliclinico(false);
  },
  methods: {
    filter(val, updateProv, abort, params) {
      updateProv(() => {
        if (val === "") {
          if (params === "prov") this.provincias = this.allOptionsProv;
          if (params === "mun") this.municipios = this.allOptionsMun;
          if (params === "pol") this.policlinicos = this.allOptionsPol;
        } else {
          const needle = val.toLowerCase();
          if (params === "prov") this.provincias = this.allOptionsProv;
          this.provincias = this.provincias.filter(
            v => v.nombre.toLowerCase().indexOf(needle) > -1
          );

          if (params === "mun") this.municipios = this.allOptionsMun;
          this.municipios = this.municipios.filter(
            v => v.nombre.toLowerCase().indexOf(needle) > -1
          );

          if (params === "pol") this.policlinicos = this.allOptionsPol;
          this.policlinicos = this.policlinicos.filter(
            v => v.nombre.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },

    async loadProvincia() {
      const response = await this.$axios.get("provincia");
      if (response.status === 200) {
        this.provincias = response.data.rows;
        this.allOptionsProv = response.data.rows;
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
        ? (params = { provincia_id: this.editedItem.provincia_id })
        : (params = {});

      const response = await this.$axios.get(url, {
        params: params
      });
      if (response.status === 200) {
        this.municipios = response.data.rows;
        this.allOptionsMun = response.data.rows;
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
    }
  }
};
</script>
