<template>
  <btn
    :label="label"
    class="q-ma-xm"
    :icon="icon"
    :color="color"
    :disable="disable"
    :tooltip="tooltip"
    @click="fireEvent('click')"
  />
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnAplicar',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: 'Aplicar'
    },
    color: {
      type: String,
      default: 'ai-primary'
    },
    icon: {
      type: String,
      default: 'keyboard_tab'
    },
    tooltip: {
      type: String,
      default: 'Aplicar'
    }
  }
}
</script>
