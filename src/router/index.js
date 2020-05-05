import Vue from 'vue'
import VueRouter from 'vue-router'

const entry = () => import('../views/entry.vue')
const login = () => import('../views/login/login.vue')
const emailLogin = () => import('../views/login/email_login.vue')
const emailRegister = () => import('../views/login/email_register.vue')
const registered = () => import('../views/login/registered.vue')

const home = () => import('../views/home/home.vue')
const chat = () => import('../views/chat/chat.vue')
const mydialog = () => import('../views/mydialog/mydialog.vue')


const contact = () => import('../views/contact/contact.vue')
const discover = () => import('../views/discover/discover.vue')
const profile = () => import('../views/profile/profile.vue')



// import chat from '../views/chat/chat.vue'
// import mydialog from '../views/mydialog/mydialog.vue'
// import session from '../views/chat/session.vue'

// import contact from '../views/contact/contact.vue'
// import discover from '../views/discover/discover.vue'
// import profile from '../views/profile/profile.vue'

// import home from '../views/home/home.vue'
// import login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: entry
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/email-login',
    component: emailLogin
  },
  {
    path: '/email-register',
    component: emailRegister
  },
  {
    path: '/register-succeed',
    component: registered
  },
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '',
        redirect: 'chat',
      },
      {
        path: 'chat',
        component: chat,
      },
      {
        path: 'contact',
        component: contact
      },
      {
        path: 'discover',
        component: discover
      },
      {
        path: 'profile',
        component: profile
      },
    ]
  },

  {
    path: '/mydialog/:target',
    component: mydialog
  },



]







const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
