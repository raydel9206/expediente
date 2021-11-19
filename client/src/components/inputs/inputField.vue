<template>
  <q-input
    :ref="nameRef"
    :name="name"
    :type="type"
    :label="label"
    color="ai-primary-dark"
    :suffix="suffix"
    v-model="value"
    :value="originalValue"
    :mask="mask"
    :disable="disable"
    :required="required"
    :rules="rules"
    dense
    :min="min"
    :max="max"
    :maxValues="max"
    :filled="filled"
    :hint="hint"
    :placeholder="placeholder"
    :counter="counter"
    :maxlength="maxlength"
    :readonly="readonly"
    bg-color="white"
    @click="fireEventClick"
    @input="fireEventInput"
    @keyup.enter="keyPressEnter"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
export default {
  name: "inputField",
  mixins: [mixinField],
  props: {
    type: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String,
      default: ""
    },
    suffix: {
      type: String
    },
    rules: {
      type: Array,
      default: () => []
    },
    mask: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Boolean,
      default: false
    },
    freezer: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number]
    },
    max: {
      type: [String, Number]
    },
    maxlength: {
      type: [String, Number]
    }
  }
};
</script>
