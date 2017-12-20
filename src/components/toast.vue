<template>
  <div class="toast" v-show="visible">
		<div class="toast-con">
			<i class="toast-icon" v-if="icon"></i>
			<p class="toast-text">{{message}}</p>
		</div>
  </div>
</template>
<script type="es6">
let tid=null;
  export default {
    data(){
      return {
        visible:true,
        isFade: false
      }
    },
    props: {
      message:{default:''},
      icon:{default:false},
      timeout:{default:1800}
    },
    watch:{
      visible(val){
        if(val){
          tid && clearTimeout(tid);
          tid=setTimeout(this.remove,this.timeout);
        }
      }
    },
    mounted(){
      // this.show();
      tid && clearTimeout(tid);
      tid=setTimeout(this.remove,this.timeout);
    },
    methods: {
      fade(){
        this.isFade = true
      },
      show(){
        this.visible=true;
      },
      remove(){
        this.visible=false;
      }
    }
  }
</script>
<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  min-width: 2.2rem;
  max-width: 8rem;
  border-radius: .1rem;
  color: #fff;
  background-color: rgba(0,0,0,.8);
  font-size: 1.2em;
  line-height: 1.18;
  padding: .3rem .4rem;
  word-wrap: break-word;
  z-index: 20;
}
.toast-icon {
	display: inline-block;
  width: 3.6em;
  height: 3.6em;
  margin: .2rem;
  background: url(../assets/images/done.png) 0 0 /cover no-repeat;
}
.fade {
	opacity: 0;
}
</style>