<template>
  <div  key="app_uploader" id="app_uploader" class="main-content centralise-content-box">
 
    <button @click="close_uploader()" class='circle-btn left-floating-btn'>
        <img src='/assets/img/back.svg' />
    </button>  

    <div class='title-content'>
      <h1>Upload your Passport</h1>
      <p>To complete a passport check we need the page with photo and MRZ</p>
    </div>
 
    <div class='passport-upload-container'> 
        <form  enctype="multipart/form-data" novalidate  > 
            
            <div id='upload-input-container'> 
                <div class='upload-box-content'>
                    <p class='img-requirements'>Min 2000px, Max 10MB</p>
                    <p  v-if="isInitial" class='uploader-instructions'>Drag a photo here or browse</p>
                    <p  v-if="isSaving" class='uploader-instructions'>Checking picture, please wait...</p>
                    <p  v-if="isFailed" class='uploader-instructions'>Try again,<br />Drag a photo here or browse</p>
                    <p  v-if="isSuccess" class='uploader-instructions'>Success, picture accepted!</p>
                    <div class='upload-errors'>
                        <ul>
                            <li v-for="(fileError, index) in fileErrors"  :key="`fileError-${index}`"><img src='/assets/img/x.svg'/> {{ fileError }} </li>
                        </ul>
                    </div>
                </div>
                <input  type="file"   
                        :name="uploadFieldName" 
                        :disabled="isSaving" 
                        @change="filesChange($event.target.name, $event.target.files);"
                        accept="image/*" 
                        class="input-file" />  
            </div> 
            <div id='uploaded-description'>
                <div class='uploaded-img-container'>
                    <img :class='imgFound' :src='imgSrc'  @load="onLoad"/>
                </div>
                <ul>
                    <li>Hold your document steady so the info is clearly visible</li>
                    <li>Take a well lit picture without glare obstructing the picture</li>
                    <li>Make sure all edges are completely in the frame</li>
                </ul>
            </div>  
        </form> 
        <button @click="verify_picture()" class='btn btn-orange'>Confirm the document</button> 
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
import { verify } from 'crypto';

const   STATUS_INITIAL = 0, 
        STATUS_SAVING = 1, 
        STATUS_SUCCESS = 2, 
        STATUS_FAILED = 3;


export default {
    name: 'app_uploader',
    el: "#app_uploader",
    mounted() {
      this.reset();
    },
    data() {
      return {  
        fileToUpload: null,
        fileErrors: [],
        currentStatus: null,
        imgSrc: "",
        uploadFieldName: 'Passport photo'
      }
    }, 
    beforeDestroy(){
        this.reset()
    }, 
    computed: { 
        imgFound: function () {
            return {
                imgSelected: this.imgSrc.length 
            }   
        },
        isInitial() {
            return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED;
        }
    },
    methods: {
       reset() {
            this.currentStatus = STATUS_INITIAL;
            this.fileErrors = [];
            this.fileToUpload = null;
            this.imgSrc = "";
        },
        async filesChange(fieldName, fileList) {
            this.reset()
            if (!fileList.length) return; 
            this.currentStatus = STATUS_SAVING; 
            Array.from(Array(fileList.length).keys()).map(x => {
                if(this.fileToUpload != fileList[x]){
                    this.fileToUpload = fileList[x]
                } 
            });
            this.imgSrc  = window.URL.createObjectURL(this.fileToUpload)
        }, 
        validate_img(img){ 
            if(img.naturalWidth < 2000 ) {
                this.fileErrors.push('File you tried to upload is too small, please try again')
            } 
            if (this.fileToUpload.size > 10000000 ){
                this.fileErrors.push('File you tried to upload is larger than 10MB, please try again')
            }
            this.currentStatus = (this.fileErrors.length) ? STATUS_FAILED : STATUS_SUCCESS
        },
        onLoad(evt) { 
            this.validate_img(evt.target) 
            window.URL.revokeObjectURL(this.imgSrc)
        },
        verify_picture(){
            if(this.isSuccess){
                const formData = new FormData();
                formData.append(this.uploadFieldName, this.fileToUpload, this.fileToUpload.name);
                this.$router.push({
                    name: 'loader', 
                    params: { passport_form: { "formData": formData  } } 
                });
            }else{
                alert('Please add a picture that matching the desired requirements.');
            } 
        },
        close_uploader(){
            this.$router.push('/')
        }
    }
};
</script>
