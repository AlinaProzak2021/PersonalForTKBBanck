import Vue from 'vue';
import Router from 'vue-router';
import signIn from './auth/sign_IN.vue';
import signUp from './auth/sign_UP.vue';
import userProfile from './user/userProfile.vue'
import links from './user/links.vue'
 

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      name: 'home',
      component: signIn
    }, 
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: userProfile
    }, 
    {
      path: '/links',
      name: 'links',
      component: links
    }

  ]

});
 