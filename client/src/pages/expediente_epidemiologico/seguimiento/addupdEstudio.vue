<template>
  <q-form ref="form" lazy-validation>
    <div class="row">
      <q-input
        ref="tipo_prueba"
        label="Tipo de Prueba"
        v-model="$props.editedItem.tipo_prueba"
        clearable
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
      </q-input>
      <q-input
        ref="tipo_muestra"
        label="Tipo de Muestra"
        v-model="$props.editedItem.tipo_muestra"
        clearable
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
      </q-input>
      <q-input
        ref="tecnico"
        label="Tecnico"
        v-model="$props.editedItem.tecnico"
        clearable
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
      </q-input>
      <q-input
        ref="fecha"
        v-model="$props.editedItem.fecha"
        mask="date"
        label="Fecha"
        class="col-6 q-pa-sm"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="$props.editedItem.fecha">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Cerrar" color="cyan-9" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        ref="placa_base"
        label="Placa base solida"
        v-model="$props.editedItem.placa_base"
        clearable
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
      </q-input>
      <q-input
        ref="orden"
        label="Orden"
        v-model="$props.editedItem.orden"
        clearable
        class="col-6 q-pa-sm"
        :rules="[val => (val && val.length > 0) || 'Campo Obligatorio']"
      >
      </q-input>
    </div>
    <div class="q-px-sm">
      <strong> Resultado:</strong>
    </div>
    <q-radio
      class="col-6 q-pa-sm"
      v-model="$props.editedItem.resultado"
      val="pol"
      label="Positivo"
    />
    <q-radio
      class="col-6 q-pa-sm"
      v-model="$props.editedItem.resultado"
      val="cm"
      label="Negativo"
    />
    <div>
      <div class="q-pa-xs">
        Observaciones:
      </div>
      <q-input
        ref="otros"
        v-model="$props.editedItem.observaciones"
        outlined
        autogrow
      />
    </div>
  </q-form>
</template>
<script>
import mixinField from "src/components/inputs/_mixin/mixinField";
export default {
  components: {},
  name: "addupd-resultados",
  mixins: [mixinField],
  props: {
    editedItem: {
      type: Object,
      default: new Object()
    },
    rules: {
      type: Object,
      default: new Object()
    }
  },
  data() {
    return {
      rows: [],
      win_add: false,
      provincias: [],
      municipios: [],
      policlinicos: [],
      loading: false
    };
  }
};
</script>
