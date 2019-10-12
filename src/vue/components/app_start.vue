<template>
  <div  key="app_start" id="app_start" class="main-content centralise-content-box">
    <div class='title-content'>
      <h1>Right to Rent Check </h1>
      <p>What documents do we accept? To make this process smooth make sure you have these documents to hand, with these it won't take any longer than 30 seconds </p>
    </div>
    <div class='right-to-rent-options'>
      <div id='document-selector'>
        <form id='disable-form'>
          <p>Select 2 documents from the list:</p>
          <div class='option-group'>
            <input  id='driving-license' value="driving-license" name='docSelect' v-model="checkedOption"  type='checkbox'/> 
            <div  :class="dl_classObject" class='option-circle'></div>
            <label  :class="dl_classObject" for='driving-license'>Driving license </label>
          </div> 
          <div class='option-group'>
            <input id='national-id' value="national-id" name='docSelect'  v-model="checkedOption" type='checkbox'/>
            <div :class="ni_classObject"  class='option-circle'></div>
            <label :class="ni_classObject"  for='national-id'>National ID  </label>
          </div>
          <div class='option-group'>
            <input id='brp' value='brp' name='docSelect'  v-model="checkedOption"  type='checkbox'/>
            <div :class="brp_classObject"  class='option-circle'></div>
            <label :class="brp_classObject"  for='brp'>Biometric residence permit</label>
          </div> 
          <button class='btn btn-orange'>Proceed with selected docs</button> 
        </form>
      </div>

      <div id='passport-selector'> 
        <p>Your Passport</p>
        <p>You only need to upload one page with the photo from your passport. Additionally, we will ask for visa for non-european passports.</p>
        <router-link to="/uploader">
          <button class='btn btn-teal'>Proceed with passport</button>
        </router-link>  
      </div>
    </div> 
    <div class='privacy-link'>
      <img src='/assets/img/lock.png'/>
      <p> 
        <a href='/'>Why do we need the above information</a>
      </p>
    </div> 
  </div>
</template>

<script>

export default {
    name: 'app_start',
    el: "#app_start",
    mounted() {},
    data() {
      return { 
         checkedOption: []
      }
    },
    watch: {
        validate_boxes: function(val){
          if(val){
            this.checkedOption.pop();
            alert('Please only select 2 options.');  
          }
        }
      
    },
    computed: {
      validate_boxes: function(){
        return this.checkedOption.length > 2  
      },
      dl_classObject: function () {
        return {
          active: this.checkedOption.includes('driving-license')  
        }   
      },
      ni_classObject: function () {
        return {
          active: this.checkedOption.includes('national-id')
        }
      },
      brp_classObject: function () {
        return {
          active: this.checkedOption.includes('brp')
        }
      }
    },
    methods: {
      init: function(){ }
    }
};
</script>
