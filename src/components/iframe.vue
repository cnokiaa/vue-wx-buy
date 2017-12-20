<template>
  <div class="iframe">
    <div class="iframe-bar">
      <a href="javascript:;" class="back-btn" @click="back"><i class="icon-back"></i></a>
      <h3>{{title}}</h3>
    </div>
    <div class="iframe-con">
      <iframe :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    props: ['title', 'url'],
    methods: {
      back: function() {
        this.$emit('back');
      }
    }
  }
</script>
<style scoped>  
.iframe {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding-bottom: .3rem;
  z-index: 10;
}
.iframe-bar {
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  z-index: 1;
  color: #fff;
  line-height: 1.2rem;
  background-color: #03a7e4;
  font-weight: bold;
  padding-left: .4rem;
  text-align: center;
}
.iframe-bar .back-btn {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  padding: 0 1.5rem 0 .5rem;
}
.iframe-con {
  position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
}
.iframe iframe {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: .3rem;
  background-color: #fff;
}
</style>

