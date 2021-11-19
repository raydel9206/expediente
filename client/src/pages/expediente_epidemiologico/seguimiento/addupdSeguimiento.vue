<template>
  <q-form ref="form" lazy-validation>
    <q-select
      ref="hospital"
      label="Hospital"
      v-model="$props.editedItem.hospital"
      :options="hospitales"
      option-label="nombre"
      option-value="id"
      transition-show="jump-up"
      transition-hide="jump-up"
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
    <q-input
      ref="fecha_ingreso"
      v-model="$props.editedItem.fecha_ingreso"
      mask="date"
      label="Fecha de Ingreso"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="$props.editedItem.fecha_ingreso">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="cyan-9" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      ref="fecha_alta"
      v-model="$props.editedItem.fecha_alta"
      mask="date"
      label="Fecha de Alta"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="$props.editedItem.fecha_alta">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="cyan-9" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
export default {
  components: {},
  name: "addupd-seguimiento",
  mixins: [mixinField],
  data() {
    return {
      hospitales: []
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
    this.getHospital();
  },

  methods: {
    async getHospital(props) {
      const response = await this.$axios.get("hospital");
      if (response.status === 200) {
        this.hospitales = response.data.rows;
      }
    }
  }
};
</script>
