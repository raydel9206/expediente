<template>
  <btn
    :label="label"
    :icon="icon"
    :color="color"
    class="q-ma-xm"
    :tooltip="tooltip"
    @click="fireEvent('click')"
  />
</template>

<script>
import btn from "./btn";
import mixinBtn from "./mixin/mixinBtn";

export default {
  name: "BtnCancel",
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: "Cancelar"
    },
    color: {
      type: String,
      default: "secondary"
    },
    icon: {
      type: String,
      default: "close"
    },
    tooltip: {
      type: String,
      default: "Cancelar"
    }
  }
};
</script>
