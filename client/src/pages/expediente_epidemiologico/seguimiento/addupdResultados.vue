<template>
  <q-form ref="form" lazy-validation>
    <q-input
      class="col-6 q-pa-sm"
      ref="fecha"
      v-model="$props.editedItem.fecha"
      mask="date"
      label="Fecha"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="$props.editedItem.fecha">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="cyan-9" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      ref="hemograma"
      label="Hemograma"
      v-model="$props.editedItem.hemograma"
      clearable
      class="col-6 q-pa-sm"
      :rules="$props.rules.required"
    >
    </q-input>
    <q-input
      ref="gasometria"
      label="Gasometria"
      v-model="$props.editedItem.gasometria"
      clearable
      class="col-6 q-pa-sm"
      :rules="$props.rules.required"
    >
    </q-input>
    <q-input
      ref="ionograma"
      label="Ionograma"
      v-model="$props.editedItem.ionograma"
      clearable
      class="col-6 q-pa-sm"
      :rules="$props.rules.required"
    >
    </q-input>
    <q-input
      ref="otros"
      label="Otros"
      v-model="$props.editedItem.otros"
      clearable
      autogrow
      outlined
      class="col-6 q-pa-sm"
      :rules="$props.rules.required"
    >
    </q-input>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
export default {
  components: {},
  name: "addupd-estudio",
  mixins: [mixinField],
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
  data() {
    return {
      rows: [],
      win_add: false,
      provincias: [],
      municipios: [],
      policlinicos: [],
      loading: false
    };
  }
};
</script>
