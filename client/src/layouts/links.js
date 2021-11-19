export const links = [
    {
      to: '/',
      icon: 'mdi-home-variant-outline',
      text: 'Inicio',
    },
    {
      text: 'Administración',
      icon: 'mdi-account-circle',
      subLinks: [
        {
          identificador: 'admin.user',
          to: '/admin/users',
          text: 'Usuario',
        },
        {
          identificador: 'admin.rol',
          to: '/admin/rol',
          text: 'Rol',
        },
      ],
    },
    {
      text: 'Datos primarios',
      icon: 'mdi-alpha-d-box-outline',
      subLinks: [
        {
          identificador: 'nomenclador.entidad',
          to: '/entidad',
          text: 'Entidad',
        },
        {
          identificador: 'nomenclador.tipo_establecimiento',
          to: '/tipoEstablecimiento',
          text: 'Tipo de establecimiento',
        },
        {
          identificador: 'nomenclador.estado_equipamiento',
          to: '/estadoEquipamiento',
          text: 'Estado del equipamiento',
        },
        {
          identificador: 'nomenclador.estado_constructivo',
          to: '/estadoConstructivo',
          text: 'Estado constructivo',
        },
        {
          identificador: 'nomenclador.estado_moviliario',
          to: '/estadoMobiliario',
          text: 'Estado del mobiliario',
        },
        {
          identificador: 'nomenclador.categoria_alojamiento',
          to: '/categoriaAlojamiento',
          text: 'Categoría de alojamiento',
        },
        {
          identificador: 'nomenclador.categoria_gastronomia',
          to: '/categoriaGastronomia',
          text: 'Categoría de gastronomía',
        },
        {
          identificador: 'nomenclador.tipo_habitaciones',
          to: '/tipoHabitacion',
          text: 'Tipo de habitación',
        },
        {
          identificador: 'nomenclador.programa',
          to: '/programa',
          text: 'Programa',
        },
        {
          identificador: 'nomenclador.producto',
          to: '/producto',
          text: 'Producto',
        },
        {
          identificador: 'nomenclador.dieta',
          to: '/dieta',
          text: 'Dieta',
        },
        {
          identificador: 'nomenclador.rango_edad',
          to: '/rangoEdad',
          text: 'Rango de edad',
        },
      ],
    },
    {
      text: 'Establecimientos',
      icon: 'mdi-home-city-outline',
      subLinks: [
        {
          identificador: 'gestion.alojamiento',
          to: '/alojamiento',
          text: 'Red de alojamiento',
        },
        {
          to: '/red/alojamiento',
          text: 'Red de alojamiento',
          guest: true,
        },
        {
          identificador: 'gestion.gastronomia',
          to: '/gastronomia',
          text: 'Red de gastronomía',
        },
        {
          to: '/red/gastronomia',
          text: 'Red de gastronomía',
          guest: true,
        },
        {
          identificador: 'gestion.comercio_alimenticio',
          to: '/comercioAlimenticio',
          text: 'Red de comercio alimenticio',
        },
        {
          to: '/red/comercioAlimenticio',
          text: 'Red de comercio alimenticio',
          guest: true,
        },
        {
          identificador: 'gestion.comercio_no_alimenticio',
          to: '/comercioNoAlimenticio',
          text: 'Red de comercio no alimenticio',
        },
        {
          to: '/red/comercioNoAlimenticio',
          text: 'Red de comercio no alimenticio',
          guest: true,
        },
        {
          identificador: 'gestion.reporte',
          to: '/reportes',
          text: 'Listado de establecimientos',
        },
      ],
    },
    {
      text: 'Planes de venta',
      icon: 'mdi-currency-usd',
      subLinks: [
        {
          identificador: 'plan_ventas.alojamiento',
          to: '/planVentasAlojamiento',
          text: 'Red alojamiento',
        },
        {
          identificador: 'plan_ventas.gastronimia',
          to: '/planVentasGastronomia',
          text: 'Red gastronomía',
        },
        {
          identificador: 'plan_ventas.alimenticio',
          to: '/planVentasComercioAlimenticio',
          text: 'Red comercio alimenticio',
        },
        {
          identificador: 'plan_ventas.no_alimenticio',
          to: '/planVentasComercioNoAlimenticio',
          text: 'Red comercio no alimenticio',
        },
  
        {
          guest: true,
          to: '/planesVentas/alojamiento',
          text: 'Red alojamiento',
        },
        {
          guest: true,
          to: '/planesVentas/gastronomia',
          text: 'Red gastronomía',
        },
        {
          guest: true,
          to: '/planesVentas/alimenticio',
          text: 'Red comercio alimenticio',
        },
        {
          guest: true,
          to: '/planesVentas/noalimenticio',
          text: 'Red comercio no alimenticio',
        },
      ],
    },
    {
      text: 'Planes de abastecimiento',
      icon: 'mdi-ballot-outline',
      subLinks: [
        {
          identificador: 'plan_abastecimiento.alojamiento',
          to: '/planAbastecimientoAlojamiento',
          text: 'Red alojamiento',
        },
        {
          identificador: 'plan_abastecimiento.gastronomia',
          to: '/planAbastecimientoGastronomia',
          text: 'Red gastronomía',
        },
        {
          identificador: 'plan_abastecimiento.alimenticio',
          to: '/planAbastecimientoComercioAlimenticio',
          text: 'Red comercio alimenticio',
        },
        {
          identificador: 'plan_abastecimiento.no_alimenticio',
          to: '/planAbastecimientoComercioNoAlimenticio',
          text: 'Comercio no alimenticio',
        },
        {
          guest: true,
          to: '/planesAbastecimiento/alojamiento',
          text: 'Red alojamiento',
        },
        {
          guest: true,
          to: '/planesAbastecimiento/gastronomia',
          text: 'Red gastronomía',
        },
        {
          guest: true,
          to: '/planesAbastecimiento/alimenticio',
          text: 'Red comercio alimenticio',
        },
        {
          guest: true,
          to: '/planesAbastecimiento/noalimenticio',
          text: 'Comercio no alimenticio',
        },
      ],
    },
  ]
  