<template>
    <div  key="app_loader" id="app_loader" class="main-content centralise-content-box">

        <div class='title-content'>
            <div class='progress-bar-container'> 
                <div class='bg-circle tl'></div>
                <div class='bg-circle tr'></div>
                <div class='bg-circle bl'></div>
                <progress-bar type="circle" ref="circle" :options="options"></progress-bar>
            </div>
            <h1>Please, wait to proceed!</h1>
        </div>
    </div>
</template>

<script>


export default {
    name: 'app_loader',
    el: "#app_loader",
    mounted() {
        this.start_loader();
    },
    data() {
        return { 
            options: {
                color: '#EE5723',
                trailColor: '#f4f4f4',
                trailWidth: 6.5,
                strokeWidth: 6.5,
                duration: 3000,
                easing: 'easeOut',
                text: {
                    value: '0%',
                    className: 'progressbar__label',
                }
            } 
        } 
    }, 
    computed: { 
    },
    methods: {
        start_loader() { 
            let _this = this;
            setTimeout(function(){
                _this.$refs.circle.animate(1.0, _this.cb())  
            }, 500)
        },
        cb(){ 
            let _this = this;
            var myVar = setInterval(() => {
                _this.$refs.circle.setText(Number.parseFloat( (_this.$refs.circle.value() * 100)).toFixed(0) + '%')
            }, 10); 

            setTimeout(function(){
                clearInterval(myVar);
                setTimeout(function(){
                    _this.$router.push('/verification_success')

                }, 1500); 
            }, 3000); 
        }
    }
};
</script>
