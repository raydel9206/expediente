<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-cyan-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="notes"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Expediente
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above content-class="bg-grey-1">
      <q-img
        class="absolute-top"
        src="~assets/img/material.png"
        style="height: 130px"
      >
        <div class="absolute-bottom bg-transparent">
          <div class="row justify-center my-div">
            <q-avatar size="56px" class="text-center">
              <img src="~assets/img/user.png" />
            </q-avatar>
          </div>

          <div class="text-weight-bold text-center q-pt-sm">
            Nombre completo del usurio
          </div>
          <div class="text-center">@alias</div>
        </div>
      </q-img>

      <q-list
        style="height: calc(100% - 130px); margin-top: 130px; border-right: 1px solid #ddd"
        bordered
      >
        <q-expansion-item
          expand-separator
          icon="unarchive"
          header-class="text-cyan-10"
          label="Nomencladores"
        >
          <q-list>
            <q-item
              dense
              clickable
              v-ripple
              to="hospital"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="local_hospital" />
              </q-item-section>
              <q-item-section class="rounded-borders">Hospital</q-item-section>
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="centroAislamiento"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="local_hospital" />
              </q-item-section>
              <q-item-section class="rounded-borders">Centro de aislamiento</q-item-section>
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="policlinico"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="health_and_safety" />
              </q-item-section>
              <q-item-section class="rounded-borders"
                >Policlínico</q-item-section
              >
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="areasalud"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="local_pharmacy" />
              </q-item-section>
              <q-item-section class="rounded-borders"
                >Área de salud</q-item-section
              >
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="pais"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="travel_explore" />
              </q-item-section>
              <q-item-section class="rounded-borders">Pais</q-item-section>
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="consejo"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="domain" />
              </q-item-section>
              <q-item-section class="rounded-borders"
                >Consejo Popular</q-item-section
              >
            </q-item>

            <q-item
              dense
              clickable
              v-ripple
              to="sintomas"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="pending_actions" />
              </q-item-section>
              <q-item-section class="rounded-borders">Síntoma</q-item-section>
            </q-item>
            <q-item
              dense
              clickable
              v-ripple
              to="antecedentes"
              active-class="text-cyan-9"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon name="format_list_numbered" />
              </q-item-section>
              <q-item-section class="rounded-borders"
                >Antecedente patológico</q-item-section
              >
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-list>
          <q-item
            dense
            clickable
            v-ripple
            to="expediente"
            active-class="text-cyan-9"
          >
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section class="rounded-borders">Expediente</q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item
            dense
            clickable
            v-ripple
            to="evento"
            active-class="text-cyan-9"
          >
            <q-item-section avatar>
              <q-icon name="local_activity" />
            </q-item-section>
            <q-item-section class="rounded-borders">Evento</q-item-section>
          </q-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container style="height: calc(100% - 125px)">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-cyan-9">
      <q-toolbar>
        <q-toolbar-title dense>@2021</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
