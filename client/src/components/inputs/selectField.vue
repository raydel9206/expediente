<template>
  <q-select
    :ref="nameRef"
    :label="label"
    :name="name"
    :option-value="optionValue"
    :options="options"
    :required="required"
    :use-input="useInput"
    :hide-selected="hideSelected"
    :input-debounce="inputDebounce"
    :option-label="optionLabel"
    v-model="value"
    dense
    color="ai-primary-dark"
    :rules="rules"
    bg-color="white" 
    @input="fireEventInput"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
  </q-select>
</template>

<script>
import mixinField from 'src/components/inputs/_mixin/mixinField'
  export default {
    name: "selectField",
    mixins: [mixinField],
    props: {
      options: {
        type: Array,
        default: () => []
      },
      rules: {
      type: Array,
      default: () => []
    },
      useInput: {
        type: Boolean
      },
      hideSelected: {
        type: Boolean
      },
      inputDebounce: {
        type: String
      },
      optionValue: {
        type: String
      },
      optionLabel: {
        type: String
      }
    },
    methods: {
      validate(){
        return this.required ? (this.value && this.value !== '') : true
      },
      fireEventFilter(val, update){
        this.$emit('filter', { value: val, update: update })
      }
    }
  }
</script>
