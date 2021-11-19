<template>
  <q-form>
    <div class="row" ref="form">
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
        @filter="(val, update, abort) => filter(val, update, abort, 'prov')"
        lazy-rules
        :clearable="true"
        :clear-value="''"
        use-input
        emit-value
        map-options
        :rules="$props.rules.required"
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
        ref="municipio"
        class="col-6 q-pa-sm"
        v-model="$props.editedItem.municipio_id"
        :options="municipios"
        option-label="nombre"
        option-value="id"
        transition-show="jump-up"
        transition-hide="jump-up"
        lazy-rules
        :clearable="true"
        :clear-value="''"
        @filter="(val, update, abort) => filter(val, update, abort, 'mun')"
        use-input
        emit-value
        map-options
        :rules="$props.rules.required"
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
      <q-input
        label="Nombre"
        ref="nombre"
        v-model="$props.editedItem.nombre"
        clearable
        class="col-6 q-pa-sm"
        lazy-rules
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
  name: "addupdPoliclinico",
  mixins: [mixinField],
  data() {
    return {
      provincias: [],
      allOptionsProv: [],
      municipios: [],
      allOptionsMun: []
    };
  },
  props: {
    editedItem: {
      type: Object,
      default: new Object()
    },
    rules: {
      type: Object,
      default: new Object()
    }
  },
  mounted() {
    this.loadProvincia();
    this.loadMunicipio(false);
  },
  methods: {
    filter(val, updateProv, abort, params) {
      updateProv(() => {
        if (val === "") {
          if (params === "prov") this.provincias = this.allOptionsProv;
          if (params === "mun") this.municipios = this.allOptionsMun;
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
    }
  }
};
</script>
