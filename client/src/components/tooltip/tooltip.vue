<template>
  <q-tooltip v-if="tooltip" :content-class="contentClass" :content-style="contentStyle" :offset="offset">{{ tooltip }}</q-tooltip>
</template>

<script>
import mixinTooltip from './mixin/mixinTooltip'

export default {
  name: "tooltip",
  mixins: [mixinTooltip],
  props: {
    contentClass: {
      type: String,
      default: 'bg-primary'
    },
    contentStyle: {
      type: String,
      default: 'font-size: 12px'
    },
    offset: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [10,10]
    },

  }
}
</script>

<style scoped>

</style>
