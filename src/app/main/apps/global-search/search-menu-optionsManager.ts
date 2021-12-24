import {SearchMenuOptions} from './AdmModelSearch';
import { environment as env } from 'environments/environment';

export const MenuPersonOptions: SearchMenuOptions[] = [
    {title: 'Solicitud de Crédito', basePath: '#'},
    {title: 'Apertura de cuenta de Ahorro', basePath: '#'},
    {title: 'Apertura de cuenta de Corriente', basePath: '#'},
    {title: 'Ver Detalle de Cuentas', basePath: '/accounts/profile'},
    {title: 'Calculadora de Crédito', basePath: '/operations/credit-calculator/associate', singlePath: true},
    
];


export const MenuAccountOptions: SearchMenuOptions[] = [
    {title: 'Ver Detalle / Movimientos de cuenta', basePath: '/accounts/profile'},
    {title: 'Solicitud de Libreta', basePath: '#'},
    {title: 'Impresion de Libreta', basePath: '#'},
    {title: 'Dépositos', basePath: '/accounts/profile', extraPath: `/operations/${env.DEFAULT_OPERATIONS_TYPOLOGY_HABER}`},
    {title: 'Retiros', basePath: '/accounts/profile', extraPath: `/operations/${env.DEFAULT_OPERATIONS_TYPOLOGY_DEBE}`},
]
