/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Form = Form;
window.swal = swal;
window.Fire = new Vue();

import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';
import VueProgressBar from 'vue-progressbar';
import VueRouter from 'vue-router';
import swal from 'sweetalert2';
import Gate from './Gate';

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.prototype.$gate = new Gate(window.user);

Vue.component(
  'Not-Found',
  require('./components/404Page.vue').default
);

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.use(VueRouter);
Vue.use(VueProgressBar, progressbaropt);


let routes = [
  { path: '/', component: require('./components/ExampleComponent.vue').default },
  { path: '/monitoring', component: require('./components/Monitoring.vue').default },
  { path: '/user', component: require('./components/Users.vue').default },
  { path: '/developer', component: require('./components/Developer.vue').default },
  { path: '/profile', component: require('./components/Profile.vue').default },
  { path: '*', component: require('./components/404Page.vue').default },
]

Vue.filter('upText', function(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(date){
  return moment(date).format('MMMM Do YYYY');
});

const progressbaropt = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
      search: "",
    },
    methods:{
      searchit: _.debounce(() => {
        Fire.$emit('searching');
      },1000),
      printme() {
        window.print();
      }
    },
});
