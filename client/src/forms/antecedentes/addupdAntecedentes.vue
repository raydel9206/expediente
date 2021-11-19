<template>
  <q-form ref="form" lazy-validation>
    <q-input
      ref="nombre"
      label="Nombre"
      v-model="$props.editedItem.nombre"
      clearable
      class="col-6 q-pa-sm"
      lazy-rules
      :rules="$props.rules.required"
    >
    </q-input>
    <q-input
      ref="descripcion"
      v-model="$props.editedItem.descripcion"
      clearable
      class="col-6 q-pa-sm"
      type="textarea"
      label="Descripcion"
      lazy-rules
      :rules="$props.rules.required"
    />
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";

export default {
  components: {},
  name: "addupdAntecedentes",
  mixins: [mixinField],
  props: {
    rules: {
      type: Object,
      default: new Object()
    },
    editedItem: {
      type: Object,
      default: new Object()
    }
  }
};
</script>
