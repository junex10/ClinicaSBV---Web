import { HttpHeaders } from '@angular/common/http';
import { local, prod } from 'src/environments';
import Constants from './constants.common';

export const ENVIRONMENT = !local.production ? local : prod;

export const HTTP_OPTIONS = new HttpHeaders({
  'Accept': 'application/json'
});

export const MENU = [
  {
    LEVEL: Constants.LEVELS.ADMIN,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/profile'
          }
        ],
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  },
  {
    LEVEL: Constants.LEVELS.PATIENT,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/profile'
          }
        ],
      },
      {
        name: 'Citas',
        icon: "fa-solid fa-files",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Solicitud de Citas',
            icon: 'fa-solid fa-files',
            route: '/patient/appointments'
          },
          {
            name: 'Ver listado de Citas',
            icon: 'fa-solid fa-files',
            route: '/patient/appointments-list'
          }
        ]
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  },
  {
    LEVEL: Constants.LEVELS.BOSS,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/profile'
          }
        ],
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  },
  {
    LEVEL: Constants.LEVELS.SECRETARY,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/profile'
          }
        ],
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  },
  {
    LEVEL: Constants.LEVELS.DOCTOR,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/profile'
          }
        ],
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  }
];