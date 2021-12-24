import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'home',
        title    : 'Inicio',
        type     : 'item',
        icon     : 'home',
        url      : '/home',
    },
    {
        id      : 'dashboard',
        title   : 'Dashboard',
        type    : 'collapsable',
        icon    : 'dashboard',
        children: [
            {
                id      : 'socios',
                title   : 'Socios',
                type    : 'item',
                icon    : 'people',
                url      : '/socios',
            },
            {
                id   : 'creditos-prestamos',
                title: 'Creditos/Prestamos',
                type : 'item',
                icon : 'card_membership',
                url  : '/socios-prestamos'
            },
            {
                id   : 'pagos',
                title: 'Pagos',
                type : 'item',
                icon : 'payment',
                url  : '/pagos'
            },
            {
                id   : 'cobros',
                title: 'Cobros',
                type : 'item',
                icon : 'receipt',
                url  : '/cobros'
            },
            {
                id   : 'procesos-legales',
                title: 'Procesos Legales',
                type : 'item',
                icon : 'layers',
                url  : '/procesos-legales'
            }
        ]
    },
    {
        id      : 'socios',
        title   : 'Socios',
        type    : 'collapsable',
        icon    : 'group_work',
        children: [
            {
                id      : 'search-list',
                title   : 'Listado de Socios',
                type    : 'item',
                icon    : 'search',
                url      : 'associate/search-list',
            },
            {
                id   : 'pre-register',
                title: 'Nueva Inscripción',
                type : 'item',
                icon : 'assignment',
                url  : 'associate/pre-register'
            },
            {
                id   : 'calculate',
                title: 'Calculadora de Crédito',
                type : 'item',
                icon : 'stacked_bar_chart',
                url  : 'operations/credit-calculator'
            },
        ]
    },
    {
        id      : 'creditos',
        title   : 'Créditos',
        type    : 'collapsable',
        icon    : 'chrome_reader_mode',
        children: [
            {
                id      : 'listado',
                title   : 'Listado de créditos',
                type    : 'item',
                icon    : 'view_list',
                url      : '/credit/list',
            },
            {
                id   : 'nuevo-expediente',
                title: 'Nuevo Expediente',
                type : 'item',
                icon : 'playlist_add',
                url  : '/nuevo-expediente'
            },
            {
                id   : 'group-credits',
                title: 'Grupos de credito',
                type : 'item',
                icon : 'groups',
                url  : '/credit/group-credit'
            },
        ]
    },
    {
        id      : 'cobros',
        title   : 'Cobros',
        type    : 'collapsable',
        icon    : 'account_balance_wallet',
        children: [
            {
                id      : 'buzon-de-cobros',
                title   : 'Buzon de cobros',
                type    : 'item',
                icon    : 'shopping_bag',
                url      : '/buzon-cobros',
            },
            {
                id   : 'seguimientos',
                title: 'Seguimientos',
                type : 'item',
                icon : 'subject',
                url  : '/seguimientos'
            },
        ]
    },
    {
        id      : 'gestionar',
        title   : 'Gestionar',
        type    : 'collapsable',
        icon    : 'thumb_up    ',
        children: [
            {
                id   : 'calculate',
                title: 'Calculadora de Crédito',
                type : 'item',
                icon : 'stacked_bar_chart',
                url  : 'operations/credit-cotizador'
            },
            {
                id      : 'aportes',
                title   : 'Aportes',
                type    : 'item',
                icon    : 'add_task',
                url      : '/aportes',
            },
            {
                id   : 'abonos',
                title: 'Abonos',
                type : 'item',
                icon : 'add_task',
                url  : '/abonos'
            },
            {
                id   : 'impresiones',
                title: 'Impresiones',
                type : 'item',
                icon : 'print',
                url  : '/impresiones'
            },
        ]
    },  
    {
        id      : 'reportes',
        title   : 'Reportes',
        type    : 'collapsable',
        icon    : 'assessment',
        children: [
            {
                id      : 'pagos',
                title   : 'Pagos',
                type    : 'item',
                icon    : 'payments',
                url      : '/pagos',
            },
            {
                id   : 'inscripciones',
                title: 'Inscripciones',
                type : 'item',
                icon : 'receipt',
                url  : '/inscripciones'
            },
            {
                id   : 'cierres',
                title: 'Cierres',
                type : 'item',
                icon : 'subtitles_off',
                url  : '/cierres'
            },
            {
                id   : 'cuentas-por-cobrar',
                title: 'Cuentas por Cobrar',
                type : 'item',
                icon : 'account_balance',
                url  : '/productos'
            },
            {
                id   : 'seguimientos',
                title: 'Seguimientos',
                type : 'item',
                icon : 'subject',
                url  : '/seguimientos'
            },
            {
                id   : 'bitacoras',
                title: 'Bitacoras',
                type : 'item',
                icon : 'assignment',
                url  : '/bitacoras'
            },
        ]
    },      
    {
        id      : 'administrar',
        title   : 'Administrar',
        type    : 'collapsable',
        icon    : 'settings_applications',
        children: [
            {
                id      : 'agencias',
                title   : 'Agencias',
                type    : 'item',
                icon    : 'store',
                url      : 'management/agencias',
            },
            {
                id   : 'usuarios',
                title: 'Usuarios',
                type : 'item',
                icon : 'people',
                url  : 'management/users'
            },
            {
                id   : 'tipologias',
                title: 'Catalogos',
                type : 'item',
                icon : 'category',
                url  : '/management/typologies'
            },
            {
                id   : 'cuentas',
                title: 'Cuentas',
                type : 'item',
                icon : 'account_balance_wallet',
                url  : '/management/bank-accounts'
            },
            {
                id   : 'credit-lines',
                title: 'Destinos de Crédito',
                type : 'item',
                icon : 'fact_check',
                url  : 'management/credit-lines'
            },
            {
                id   : 'asociaciones',
                title: 'Asociaciones',
                type : 'item',
                icon : 'domain',
                url  : '/management/asociaciones'
            },
        ]
    },
    {
        id       : 'logout',
        title    : 'Salir del Sistema',
        type     : 'item',
        icon     : 'exit_to_app',
        url      : '/pages/auth/login',
        function : ( () => sessionStorage.clear())
    },    
];


