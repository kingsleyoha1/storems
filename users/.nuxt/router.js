import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _db5fb5d4 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _2ceca193 = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _001b3d06 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _ffc7389c = () => interopDefault(import('..\\pages\\order-history.vue' /* webpackChunkName: "pages/order-history" */))
const _4fa650cb = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _615c65f1 = () => interopDefault(import('..\\pages\\admin\\account.vue' /* webpackChunkName: "pages/admin/account" */))
const _8825245e = () => interopDefault(import('..\\pages\\admin\\orders.vue' /* webpackChunkName: "pages/admin/orders" */))
const _367399ef = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _db5fb5d4,
    name: "admin"
  }, {
    path: "/cart",
    component: _2ceca193,
    name: "cart"
  }, {
    path: "/login",
    component: _001b3d06,
    name: "login"
  }, {
    path: "/order-history",
    component: _ffc7389c,
    name: "order-history"
  }, {
    path: "/signup",
    component: _4fa650cb,
    name: "signup"
  }, {
    path: "/admin/account",
    component: _615c65f1,
    name: "admin-account"
  }, {
    path: "/admin/orders",
    component: _8825245e,
    name: "admin-orders"
  }, {
    path: "/",
    component: _367399ef,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
