import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/component/task',
    title: 'Today',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/addTask',
    title: 'addTask',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/buttons',
    title: 'Week',
    icon: 'bi bi-hdd-stack',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/task:id',
    title: 'Done',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/dropdown',
    title: 'Deleted',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/pagination',
    title: 'Group',
    icon: 'bi bi-dice-1',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/nav',
    title: 'Nav',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/table',
    title: 'Table',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
