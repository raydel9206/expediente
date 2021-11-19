const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "pais",
        component: () => import("pages/nomencladores/pais/index.vue")
      },
      {
        path: "areasalud",
        component: () => import("pages/nomencladores/areaSalud/index.vue")
      },
      {
        path: "consejo",
        component: () => import("pages/nomencladores/consejoPopular/index.vue")
      },
      {
        path: "hospital",
        component: () => import("pages/nomencladores/hospital/index.vue")
      },
      {
        path: "centroAislamiento",
        component: () =>
          import("pages/nomencladores/centroAislamiento/index.vue")
      },
      {
        path: "policlinico",
        component: () => import("pages/nomencladores/policlinico/index.vue")
      },
      {
        path: "antecedentes",
        component: () => import("pages/nomencladores/antecedentes/index.vue")
      },
      {
        path: "sintomas",
        component: () => import("pages/nomencladores/sintomas/index.vue")
      },
      {
        path: "expediente",
        component: () => import("pages/expediente_epidemiologico/expediente/index.vue")
      },
      {
        path: "addupdExpediente/:id",
        name: "addupdExpediente",
        component: () =>
          import("pages/expediente_epidemiologico/expediente/addupdExpediente.vue")
      },
      {
        path: "seguimiento",
        component: () => import("pages/expediente_epidemiologico/seguimiento/index.vue")
      },
      {
        path: "evolucion",
        component: () => import("pages/expediente_epidemiologico/evolucion/index.vue")
      },
      {
        path: "evento",
        component: () => import("src/pages/evento/index.vue")
      },
      {
        path: "addupdEvento",
        component: () => import("src/pages/evento/addupdEvento.vue")
      },
      {
        path: "listContactos",
        component: () => import("pages/expediente_epidemiologico/contactos/listContactos.vue")
      }
    ]
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
