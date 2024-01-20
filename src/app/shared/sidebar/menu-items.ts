import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/component/task',
    title: 'Today',
    icon: 'bi bi-calendar-event',
    class: '',
    extralink: false,
    filter: "today",
    submenu: []
  },
  {
    path: '/component/addTask',
    title: 'addTask',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    filter: "",
    submenu: []
  },
  {
    path: '/component/task',
    title: 'Week',
    icon: 'bi bi-calendar-check',
    class: '',
    extralink: false,
    filter: "Week",
    submenu: []
  },
  {
    path: '/component/task',
    title: 'All',
    icon: 'bi bi-list-task',
    class: '',
    extralink: false,
    filter: "all",
    submenu: []
  },
  {
    path: '/component/task',
    title: 'Done',
    icon: 'bi bi-check2-circle',
    class: '',
    extralink: false,
    filter: "done",
    submenu: []
  },
  {
    path: '/component/task',
    title: 'Groups',
    icon: 'bi bi-folder2',
    class: '',
    filter: "",
    extralink: false,
    submenu: [{
      path: '/component/task',
      title: 'Groups 1',
      icon: 'bi bi-trash',
      class: 'submenu',
      filter: "group1",
      extralink: false,
      submenu: []
    }
    ]
  }
];
