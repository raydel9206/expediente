<template>
  <q-form showForm ref="form">
    <q-input
      ref="nombre"
      label="Nombre"
      v-model="$props.editedItem.nombre"
      class="col-6 q-pa-sm"
      clearable
      :rules="$props.rules.required"
    >
    </q-input>
    <q-input
      ref="nacionalidad"
      label="Gentilicio"
      v-model="$props.editedItem.nacionalidad"
      class="col-6 q-pa-sm"
      clearable
      :rules="$props.rules.required"
    >
    </q-input>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
export default {
  components: {},
  name: "addupdPais",
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
