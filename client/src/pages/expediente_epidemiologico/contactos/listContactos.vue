<template>
  <q-form ref="form" lazy-validation class="q-pa-sm">
    <q-table
      class="q-pa-md"
      :data="rowsContactos"
      :columns="columnsContactos"
      :pagination.sync="pagination"
      row-key="nombre"
      :rows-per-page-options="[]"
      no-data-label="No existen expedientes registrados"
    >
      <template v-slot:top="props">
        <q-toolbar class="q-pb-md">
          <q-btn flat color="cyan-9" round dense icon="description" />
          <q-toolbar-title>Listado de contactos</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
          <q-btn flat round dense icon="close" to="/" />
        </q-toolbar>
        <q-toolbar flat class=" shadow-2 rounded-borders">
          <q-input
            dense
            borderless
            debounce="300"
            v-model="filter"
            color="cyan-9"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-btn flat dense icon="search" name="keyword" />
              <q-icon
                v-if="filter !== ''"
                name="close"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-space />
          <q-btn
            color="white"
            text-color="black"
            round
            icon="add"
            @click="
              add_upd_contacto = true;
              editedIndex = -1;
            "
          >
            <q-tooltip content-class="bg-primary"
              >Nuevo contacto</q-tooltip
            ></q-btn
          >
        </q-toolbar>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="edit"
            @click="editCont(props.row)"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="delete"
            @click="deleteItem(props.row)"
          ></q-btn>
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message }">
        <div class="full-width row flex-center text-cyan-14 q-gutter-sm">
          <q-icon size="2em" :name="icon" />
          <span v-if="filter == ''">{{ message }} </span>
          <span v-else>{{ "La búsqueda no arrojó ningun resultado" }} </span>
        </div>
      </template>
    </q-table>
    <q-dialog v-model="add_upd_contacto" persistent>
      <q-card style="width: 550px; max-width: 80vw">
        <q-card-section class="text-white bg-cyan-9">
          <div class="q-ml-sm text-h6">{{ formTitle }}</div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <q-input
              class="col-11"
              ref="cont_ci"
              v-model="contactos.ci"
              label="Nro. identidad"
              lazy-rules
              :rules="identityRules"
            >
            </q-input>
            <template>
              <q-btn
                class="col-1"
                flat
                dense
                icon="search"
                name="keyword"
                color="gray"
                @click="findIndentityCont"
              />
            </template>
          </div>
          <q-input
            ref="cont_nombre"
            v-model="contactos.nombre"
            label="Nombre"
            lazy-rules
            :rules="requiredRules"
          ></q-input>
          <q-input
            ref="cont_apellidos"
            v-model="contactos.apellidos"
            label="Apellidos"
            lazy-rules
            :rules="requiredRules"
          ></q-input>
          <q-input
            ref="cont_edad"
            v-model="contactos.edad"
            label="Edad"
            lazy-rules
            :rules="requiredRules"
          ></q-input>
          <q-input
            ref="cont_direccion"
            v-model="contactos.direccion"
            lazy-rules
            autogrow
            label="Direccion del domicilio"
            :rules="requiredRules"
          ></q-input>
          <q-input
            ref="cont_centro"
            v-model="contactos.centro"
            lazy-rules
            label="Centro de trabajo o estudios"
            :rules="requiredRules"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right" class="bg-grey-2 text-teal">
          <q-btn label="Aceptar" color="cyan-9" @click="addContacto"></q-btn>
          <q-btn
            label="Cancelar"
            color="brown-5"
            v-close-popup
            @click="close"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <confirm ref="confirm" v-model="click_del"></confirm>
  </q-form>
</template>
<script>
import confirm from "src/components/confirm/confirm.vue";
export default {
  components: { confirm },
  name: "listContactos",
  props: {
    expediente_id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      filter: "",
      formTitle: "Nuevo contacto",
      add_upd_contacto: false,
      editedIndex: -1,
      rowsContactos: [],
      click_del: false,
      pagination: {
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      contactos: {
        ci: "",
        nombre: "",
        edad: "",
        centro: "",
        direccion: ""
      },

      defaultContactos: {
        ci: "",
        nombre: "",
        edad: "",
        centro: "",
        direccion: ""
      },
      identityRules: [
        val => (val !== null && val !== "") || "Por favor rellene este campo",
        val => val.length === 11 || "Por favor revise, deben ser 11 caracteres"
      ],
      requiredRules: [val => val !== "" || "Campo Obligatorio"],
      columnsContactos: [
        {
          label: "No.Identidad",
          field: row => row.ci,
          align: "left"
        },
        {
          label: "Nombre",
          field: row => row.nombre,
          align: "left"
        },
        {
          label: "Apellidos",
          field: row => row.apellidos,
          align: "left"
        },
        {
          label: "Edad",
          field: row => row.edad,
          align: "left"
        },
        {
          label: "Centro de trabajo o estudios",
          field: row => row.centro,
          align: "left"
        },
        {
          label: "Dirección del domicilio",
          field: row => row.direccion,
          align: "left"
        },
        {
          name: "action",
          label: "Acciones",
          field: "action"
        }
      ]
    };
  },
  mounted() {
    this.getContactos({
      pagination: this.pagination
    });
  },
  methods: {
    async getContactos() {
      const response = await this.$axios.get("expediente/contactos", {
        params: {
          expediente_id: this.$props.expediente_id
        }
      });
      if (response.status === 200) {
        this.rowsContactos = response.data.rows;
      }
    },

    addContacto() {
      const formHasError =
        !this.$refs.cont_ci.validate() ||
        !this.$refs.cont_nombre.validate() ||
        !this.$refs.cont_apellidos.validate() ||
        !this.$refs.cont_edad.validate() ||
        !this.$refs.cont_centro.validate() ||
        !this.$refs.cont_direccion.validate()
          ? true
          : false;

      let obj = this.contactos;
      obj.expediente_id = this.$props.expediente_id;
      console.log(this.editedIndex);
      if (!formHasError) {
        if (this.editedIndex === -1) {
          this.$axios
            .post("expediente/contactos", obj)
            .then(response => {
              this.getContactos({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Contacto adicionado satisfactorimente."
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Error insertando los datos"
              });
            });
        } else {
          console.log("asdasd");
          this.$axios
            .patch("expediente/contactos", obj)
            .then(response => {
              this.getContactos({
                pagination: this.pagination
              });
              this.close();
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Contacto modificado satisfactorimente."
              });
            })
            .catch(error => {
              this.$q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: "Error insertando los datos"
              });
            });
        }
      } else {
        this.$q.notify({
          icon: "warning",
          color: "amber-14",
          message: "Por favor, revise los datos del formulario"
        });
      }
    },

    close() {
      this.add_upd_contacto = false;
      this.formTitle = "Nuevo contacto";
      setTimeout(() => {
        this.contactos = Object.assign({}, this.defaultContactos);
        this.editedIndex = -1;
      }, 300);

      this.$refs.cont_nombre.resetValidation();
      this.$refs.cont_edad.resetValidation();
      this.$refs.cont_centro.resetValidation();
      this.$refs.cont_direccion.resetValidation();
    },

    editCont(item) {
      this.formTitle = "Modificar contacto";
      this.editedIndex = this.rowsContactos.indexOf(item);
      this.contactos = Object.assign({}, item);
      this.add_upd_contacto = true;
    },

    async findIndentityCont() {
      if (this.contactos.ci) {
        try {
          const response = await this.$axios.get(
            `identity/${this.contactos.ci}`,
            this.contactos
          );
          if (response.status === 200) {
            this.contactos.nombre = response.data.firstName;
            this.contactos.apellidos = response.data.lastName;
            this.contactos.edad = response.data.age;
            this.contactos.direccion = response.data.address;
            this.contactos.sexo =
              response.data.sex === "female" ? "femenino" : "masculino";
          } else {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message:
                "No se encontraron resultados para el número de identidad insertado"
            });
          }
        } catch (error) {
          this.$q.notify({
            icon: "warning",
            color: "amber-14",
            message: "Verifique el número de identidad insertado"
          });
        }
      }
    },

    async deleteItem(item) {
      this.editedIndex = this.rowsContactos.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.click_del = true;

      if (
        await this.$refs.confirm.open(
          "Eliminar",
          "Usted está seguro que desea eliminar el contacto?",
          { color: "red" }
        )
      ) {
        const result = this.$axios.delete(
          `expediente/${this.$props.expediente_id}/contactos/${this.editedItem.id}`
        );
        if (result.status === 200) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Contacto eliminado satisfactorimente."
          });
          this.rowsContactos.splice(this.editedIndex, 1);
          this.editedIndex = -1;
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:
              "Se produjo un error eliminando los datos; si el error persiste contacte al administrador."
          });
        }
      }
    }
  }
};
</script>
