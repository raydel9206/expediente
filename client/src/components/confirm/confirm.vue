<template>
  <q-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <q-card>
      <q-toolbar dark :color="options.color" dense flat>
        <q-toolbar-title class="white--text">{{ title }}</q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row items-center">
        <q-avatar icon="quiz" color= "cyan-9" text-color="white" />
        <span class="q-ml-sm" q-show="!!message">{{ message }}</span>
      </q-card-section>
      <q-card-actions class="pt-0">
        <q-space></q-space>
        <q-btn flat color= "cyan-9" text @click.native="agree">Si</q-btn>
        <q-btn flat color="grey" text @click.native="cancel">No</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: "primary",
      width: 290,
      zIndex: 200
    }
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>
