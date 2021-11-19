<template>
  <q-form ref="form" lazy-validation>
    <input v-model="$props.editedItem.id" type="hidden" />
    <q-input
      ref="descripcion"
      v-model="$props.editedItem.descripcion"
      clearable
      class="col-6 q-pa-sm"
      type="textarea"
      label="Descripcion"
      :rules="$props.rules.required"
    />
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";

export default {
  components: {},
  name: "addupdSintomas",
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
