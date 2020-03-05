import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'init',
      component: () => import('../view/InputPort')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../view/Editor')
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.state.listDir.length === 0 && to.name !== 'init'
    ? router.push({ name: 'init' })
    : next();
});

export default router;
