<template>
  <body id="app">
    <RightToRentHeader />
    <main>  
      <button @click="close_component()" :class="display_close" class='circle-btn right-floating-btn'>
        <img src='/assets/img/close.svg' />
      </button>    
 
      <transition name="fade"  mode="out-in">
        <router-view>
          <app_start />
        </router-view>
      </transition>
    </main>
   </body>
</template>

<script>
import RightToRentHeader  from "@/vue/components/app_header";
import app_start  from "@/vue/components/app_start";
import app_loader  from "@/vue/components/app_loader";
import app_uploader  from "@/vue/components/app_uploader";
import app_success  from "@/vue/components/app_success";
 
export default {
  name: "App",
  el: "#app",
  components: {
    RightToRentHeader, 
    app_start,
    app_uploader,
    app_loader,
    app_success,
  },
  data() {
    return { 
      route_home: true
    }
  },
  computed: { 
    display_close: function () {
      return {
        display_close: this.route_home
      }   
    }
  },
  watch: {
    $route: function() {
       this.route_home =  (this.$route.path !== "/")  
    }
  },
  methods: {
    close_component(){
        this.$router.push('/')
    }
  }
};
</script>
