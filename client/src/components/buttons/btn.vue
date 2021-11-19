<template>
  <q-btn
    :outline="outline"
    :round="round"
    :label="label"
    :size="size"
    :color="color"
    :disable="disable"
    :icon="icon"
    @click="fireEvent('click')"
  >
    <tooltip :tooltip="tooltip"></tooltip>
  </q-btn>
</template>

<script>
import mixinBtn from './mixin/mixinBtn'
import tooltip from "components/tooltip/tooltip";

export default {
  name: 'Btn',
  mixins: [mixinBtn],
  components: {
    tooltip
  }
}
</script>
