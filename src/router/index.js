import Vue from 'vue';
import VueRouter from 'vue-router';
// import CallBack from '../views/callback';
// import Mgr from '../assets/js/SecurityService';
Vue.use(VueRouter);
// let mgr = new Mgr();
const routes = [
  {
    path: '/',
    redirect: 'login/loginHome'
  },
  {
    path: '/loading',
    name: 'loading',
    component: resolve => {
      require(['../views/login/loading'], resolve);
    }
  },
  {
    path: '/callback',
    name: 'callback',
    component: resolve => {
      require(['../views/callback'], resolve);
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/login',
    component: resolve => {
      require(['../views/dashboard'], resolve);
    },
    children: [
      {
        path: 'login',
        name: 'DashboardLogin',
        component: resolve => {
          require(['../views/dashboard/login.vue'], resolve);
        }
      },
      {
        path: 'register',
        name: 'DashboardRegister',
        component: resolve => {
          require(['../views/dashboard/register.vue'], resolve);
        }
      },
      {
        path: 'contactus',
        name: 'contactus',
        component: resolve => {
          require(['../views/dashboard/contactus.vue'], resolve);
        }
      },
      {
        name: 'rate',
        path: 'rate',
        component: resolve => {
          require(['../views/dashboard/rate.vue'], resolve);
        }
      },
      {
        path: 'tools',
        name: 'dashboardTools',
        component: resolve => {
          require(['../views/dashboard/tools'], resolve);
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    redirect: '/login/loginHome',
    component: resolve => {
      require(['../views/login/login'], resolve);
    },
    children: [
      {
        path: 'loginHome',
        name: 'loginHome',
        component: resolve => {
          require(['../views/login/loginHome'], resolve);
        }
      },
      {
        path: 'logincontact',
        name: 'logincontact',
        component: resolve => {
          require(['../views/login/contact'], resolve);
        }
      },
      {
        path: 'loginregister',
        name: 'loginregister',
        component: resolve => {
          require(['../views/login/registered'], resolve);
        }
      },
      {
        path: 'loginRecharge',
        name: 'loginRecharge',
        component: resolve => {
          require(['../views/login/recharges'], resolve);
        }
      },
      {
        path: 'unloading',
        name: 'unloading',
        component: resolve => {
          require(['../views/login/unloading'], resolve);
        }
      },
      {
        path: 'iplimited',
        name: 'iplimited',
        component: resolve => {
          require(['../views/login/iplimited'], resolve);
        }
      },
      {
        path: 'deleted',
        name: 'deleted',
        component: resolve => {
          require(['../views/login/deleted'], resolve);
        }
      },
      {
        path: 'ipsecurity',
        name: 'ipsecurity',
        component: resolve => {
          require(['../views/login/ipsecurity'], resolve);
        }
      },
      {
        path: 'disabled',
        name: 'disabled',
        component: resolve => {
          require(['../views/login/disabled'], resolve);
        }
      },
      {
        path: 'loginTool',
        name: 'loginTool',
        component: resolve => {
          require(['../views/login/tool'], resolve);
        }
      },
      {
        path: 'brows',
        name: 'brows',
        component: resolve => {
          require(['../views/login/brows'], resolve);
        }
      }
    ]
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/home',
    component: resolve => {
      require(['../views/main'], resolve);
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/home'], resolve);
        }
      },
      {
        path: 'partmodules',
        name: 'partmodules',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partmodule'], resolve);
        }
      },
      {
        path: 'transfer',
        name: 'transfer',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/transfer'], resolve);
        }
      },
      {
        path: 'ranchResults',
        name: 'ranchResults',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/RanchResults'], resolve);
        }
      },
      {
        path: 'partinstalls',
        name: 'partinstalls',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partinstall'], resolve);
        }
      },
      {
        path: 'partmoduleEdit',
        name: 'partmoduleEdit',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partmoduleEdit'], resolve);
        }
      },
      {
        path: 'Replacementofrecords',
        name: 'Replacementofrecords',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Replacementofrecords'], resolve);
        }
      },
      {
        path: 'Groupmanagement',
        name: 'Groupmanagement',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Groupmanagement'], resolve);
        }
      },
      {
        path: 'MobileGameDown',
        name: 'MobileGameDown',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/mobileGameDown'], resolve);
        }
      },
      {
        path: 'fenyong',
        name: 'fenyong',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/fenyong'], resolve);
        }
      },
      {
        path: 'Zoningmanagement',
        name: 'Zoningmanagement',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Zoningmanagement'], resolve);
        }
      },
      {
        path: 'Withdrawalrecords',
        name: 'Withdrawalrecords',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawalrecords'], resolve);
        }
      },
      {
        path: 'Orderreissue',
        name: 'Orderreissue',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Orderreissue'], resolve);
        }
      },
      {
        path: 'BetchOrderreissue',
        name: 'BetchOrderreissue',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/BetchOrderreissue'], resolve);
        }
      },
      {
        path: 'handOrder',
        name: 'handOrder',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/handOrder'], resolve);
        }
      },
      {
        path: 'Ordermanagement',
        name: 'Ordermanagement',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Ordermanagement'], resolve);
        }
      },
      {
        path: 'partinstallmod',
        name: 'partinstallmod',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partinstallmod'], resolve);
        }
      },
      {
        path: 'gaincode',
        name: 'gaincode',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/gaincode'], resolve);
        }
      },
      {
        path: 'DA',
        name: 'DA',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/DA'], resolve);
        }
      },
      {
        path: 'partinstallEdit',
        name: 'partinstallEdit',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partinstallEdit'], resolve);
        }
      },
      {
        path: 'partinstallClone',
        name: 'partinstallClone',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partinstallClone'], resolve);
        }
      },
      {
        path: 'rateList',
        name: 'rateList',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/rateList'], resolve);
        }
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/mailMessage'], resolve);
        }
      },
      {
        path: 'withdrawapply',
        name: 'withdrawapply',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawapply'], resolve);
        }
      },
      {
        path: 'agentSys',
        name: 'agentSys',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys'], resolve);
        }
      },
      {
        path: 'partmoduleClone',
        name: 'partmoduleClone',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/partmoduleClone'], resolve);
        }
      },
      {
        path: 'orderInterval',
        name: 'orderInterval',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/OrderInterval'], resolve);
        }
      },
      {
        path: 'employee',
        name: 'employee',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employee'], resolve);
        }
      },
      {
        path: 'conectKey',
        name: 'conectKey',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/conectKey'], resolve);
        }
      },
      {
        path: 'Userlogs',
        name: 'Userlogs',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/Userlogs'], resolve);
        }
      },
      {
        path: 'wechat',
        name: 'wechat',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/wechat'], resolve);
        }
      }
    ]
  },
  {
    path: '/employee',
    name: 'employee',
    redirect: '/employee/setting',
    component: resolve => {
      require(['../views/employee/main'], resolve);
    },
    children: [
      {
        path: 'setting',
        name: 'employeeSetting',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employee'], resolve);
        }
      },
      {
        path: 'roles',
        name: 'employeeRoles',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employee/roles'], resolve);
        }
      },
      {
        path: 'permissions',
        name: 'employeePermissions',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employee/permissions'], resolve);
        }
      }
    ]
  },
  {
    path: '/employeemain',
    name: 'employeemain',
    redirect: '/employeemain/employeehome',
    component: resolve => {
      require(['../views/employeemain'], resolve);
    },
    children: [
      {
        path: 'employeehome',
        name: 'employeehome',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employeehome'], resolve);
        }
      },
      {
        path: 'employeeOrdermanagement',
        name: 'employeeOrdermanagement',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employeeOrdermanagement'], resolve);
        }
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    redirect: '/personal/baseInfo',
    component: resolve => {
      require(['../views/individual/main'], resolve);
    },
    children: [
      {
        path: 'baseInfo',
        name: 'baseInfo',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/baseInfo'], resolve);
        }
      },
      {
        path: 'withdrawapply',
        name: 'withdrawapply',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawapply'], resolve);
        }
      },
      {
        path: 'withdrawapply1',
        name: 'withdrawapply1',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawapply1'], resolve);
        }
      },
      {
        path: 'password',
        name: 'password',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/password'], resolve);
        }
      },
      {
        path: 'weixin',
        name: 'weixin',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/weixin'], resolve);
        }
      },
      {
        path: 'wechat',
        name: 'wechat',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/wechat'], resolve);
        }
      },
      {
        path: 'recoder',
        name: 'recoder',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/recoder'], resolve);
        }
      },
      {
        path: 'Userlogs',
        name: 'Userlogs',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/Userlogs'], resolve);
        }
      },
      {
        path: 'Gift',
        name: 'Gift',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/Gift'], resolve);
        }
      },
      {
        path: 'conectKey',
        name: 'conectKey',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/conectKey'], resolve);
        }
      },
      {
        path: 'acountsafe',
        name: 'acountsafe',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/acountsafe'], resolve);
        }
      },
      {
        path: 'finishInfo',
        name: 'finishInfo',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/finishInfo'], resolve);
        }
      },
      {
        path: 'elecsign',
        name: 'elecsign',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/elecSign'], resolve);
        }
      },
      {
        path: 'Withdrawal',
        name: 'Withdrawal',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawalrecords1'], resolve);
        }
      },
      {
        path: 'Withdrawalrecords',
        name: 'Withdrawalrecords',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/Withdrawalrecords'], resolve);
        }
      },
      {
        path: 'orderInterval',
        name: 'orderInterval',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/OrderInterval'], resolve);
        }
      },
      {
        path: 'fenyong',
        name: 'fenyong',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/fenyong'], resolve);
        }
      },
      {
        path: 'rateList',
        name: 'rateList',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/rateList'], resolve);
        }
      },
      {
        path: 'sharedetails',
        name: 'sharedetails',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/individual/sharedetails'], resolve);
        }
      },
      {
        path: 'employee',
        name: 'employee',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/employee/employee'], resolve);
        }
      }
    ]
  },
  {
    path: '/agentsystem',
    name: 'agentsystem',
    redirect: '/agentsystem/setting',
    component: resolve => {
      require(['../views/agentSys/main'], resolve);
    },
    children: [
      {
        path: 'merchant',
        name: 'merchant',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/merchant'], resolve);
        }
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/merchant'], resolve);
        }
      },
      {
        path: 'deductedlog',
        name: 'deductedlog',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/deductedlog'], resolve);
        }
      },
      {
        path: 'agentOrder',
        name: 'agentOrder',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/agentOrder1'], resolve);
        }
      },
      {
        path: 'userGroup',
        name: 'userGroup',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/userGroup'], resolve);
        }
      },
      {
        path: 'Statistics',
        name: 'Statistics',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/Statistics'], resolve);
        }
      },
      {
        path: 'agentManagement',
        name: 'agentManagement',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/agentSys/agentManagement'], resolve);
        }
      }
    ]
  },
  {
    path: '/accessdenied',
    name: 'accessdenied',
    meta: {
      requiresAuth: false,
      role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
    },
    component: resolve => {
      require(['../views/login/accessdenied'], resolve);
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    meta: {
      requiresAuth: false,
      role: ['Tenant', 'Agent']
    },
    component: resolve => {
      require(['../views/login/forbidden'], resolve);
    }
  },
  {
    path: '/agentLogin',
    name: 'agentLogin',
    meta: {
      requiresAuth: false,
      role: ['Tenant', 'Agent', 'Admin']
    },
    component: resolve => {
      require(['../views/agentLogin'], resolve);
    }
  },
  {
    path: '/behalf',
    name: 'behalf',
    redirect: '/behalf/baseInfo',
    component: resolve => {
      require(['../views/behalf/main'], resolve);
    },
    children: [
      {
        path: 'baseInfo',
        name: 'baseInfo',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/baseInfo'], resolve);
        }
      },
      {
        path: 'version',
        name: 'version',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/version'], resolve);
        }
      },
      {
        path: 'detail',
        name: 'detail',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/detail'], resolve);
        }
      },
      {
        path: 'editVersion',
        name: 'editVersion',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/editVersion'], resolve);
        }
      }
    ]
  },
  {
    path: '/audit',
    name: 'audit',
    redirect: '/audit/audit',
    component: resolve => {
      require(['../views/behalf/main_audit'], resolve);
    },
    children: [
      {
        path: 'audit',
        name: 'audit',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/audit'], resolve);
        }
      },
      {
        path: 'success',
        name: 'success',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/success'], resolve);
        }
      },
      {
        path: 'task',
        name: 'task',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/task'], resolve);
        }
      },
      {
        path: 'error',
        name: 'error',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/error'], resolve);
        }
      },
      {
        path: 'blacklist',
        name: 'blacklist',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/blacklist'], resolve);
        }
      }
    ]
  },
  {
    path: '/rollout',
    name: 'rollout',
    redirect: '/rollout/everyday',
    component: resolve => {
      require(['../views/behalf/main_out'], resolve);
    },
    children: [
      {
        path: 'everyday',
        name: 'everyday',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/everyday'], resolve);
        }
      },
      {
        path: 'partition',
        name: 'partition',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/partition'], resolve);
        }
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/role'], resolve);
        }
      },
      {
        path: 'alipay',
        name: 'alipay',
        meta: {
          requiresAuth: true,
          role: ['SuperAdmin', 'Admin', 'Tenant', 'Agent', 'Employee']
        },
        component: resolve => {
          require(['../views/behalf/alipay'], resolve);
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth) {
//     mgr.getRole().then(
//       success => {
//         if (success === 'SuperAdmin' || success === 'Admin') {
//           mgr.isAuthToMeatch().then(res => {
//             if (res) {
//               next();
//             } else {
//               next('/accessdenied');
//             }
//           });
//         } else {
//           next();
//           // if (success === 'Tenant' || success === 'Agent') {
//           //   mgr.getUser().then(u => {
//           //   // console.log('u.profile.IsAuth', u.profile.IsAuth);
//           //     if (u.profile.UserState === 'Enabled') {
//           //       next();
//           //     } else if (u.profile.UserState === 'InAuth') {
//           //       next('/forbidden');
//           //     } else {
//           //       next('/forbidden');
//           //     }
//           //   }).catch(e => {
//           //     next('/forbidden');
//           //   });
//           // }
//         }
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   } else {
//     next();
//   }
// });
export default router;
