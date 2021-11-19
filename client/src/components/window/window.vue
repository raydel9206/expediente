<template>
  <q-dialog
    ref="window"
    showDialog
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card :style="getStyle">
      <q-card-section v-if="title" class="text-white bg-cyan-9">
        <!--<q-avatar icon="info" color="" text-color="white" />-->
        <div class="q-ml-sm text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section
        v-if="bodyWindow"
        class="full-width q-pa-none scroll"
        style="max-height: 70vh"
      >
        <slot name="bodyWindow"></slot>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-grey-2 text-teal">
        <slot name="btnWindow"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "window",
  props: {
    title: {
      type: String,
      default: null
    },
    showWindow: {
      type: Boolean,
      default: false
    },
    bodyWindow: {
      type: Boolean,
      default: false
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
  },
  updated() {
    this.showDialog();
  },
  computed: {
    getStyle() {
      return this.autoWidth
        ? "width: 900px; max-width: 90vw"
        : "width: 600px; max-width: 90vw;";
    }
  },
  methods: {
    showDialog() {
      return this.showWindow
        ? this.$refs.window.show()
        : this.$refs.window.hide();
    }
  }
};
</script>
