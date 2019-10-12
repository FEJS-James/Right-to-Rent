//load style & jquery
import '@/style/sass/styles.sass';
var $ = require("jquery"); 

// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueProgress from 'vue-progress'
Vue.use(VueProgress)
Vue.use(VueRouter);

//import application files
import App from "@/vue/app";
import routes from './routes';
 
(function () { 
    $(window).on('load', function () {  });
    $(window).on('scroll', function () { });
    $(document).ready(function () {
        app_init.ready();
    });
    const app_init = {
        ready: function ready() {
            app.init();
        }
    };

    const app = { 
        init: function init() {
            this.vue_router.init();
            this.accomodation_component.init();
        },  
        vue_router: {
            app_router : null,
            init: function init(){ 
                this.app_router = new VueRouter({
                    routes, 
                    mode: 'history'
                });
            }   
        } ,
        accomodation_component: {
            init: function init() {   
                new Vue({
                    el: '#app',
                    render: h => h(App),
                    router:  app.vue_router.app_router
                });
            }
        }
    }
})();
