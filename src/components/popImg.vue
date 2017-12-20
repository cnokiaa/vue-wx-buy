<template>
  <div class="show-pic">
    <div class="show-pic-con">
      <a href="javascript:;" @click="close" class="close-btn"><i class="icon-close"></i></a>
      <h3>{{titles[index]}}</h3>
      <div class="big-img">
        <img src="../assets/images/bigcard_1.jpg" v-show="index == 0" alt="放大图" />
        <img src="../assets/images/bigcard_2.jpg" v-show="index == 1" alt="放大图" />
        <img src="../assets/images/bigcard_3.jpg" v-show="index == 2" alt="放大图" />
      </div>
      <div class="tips">
        <p>温馨提示：</p>
        <div v-html="tips[index]"></div>
      </div>
    </div>
  </div> 
</template>

<script type="es6">
  var headers = ['身份证头像照拍摄示例图','身份证国徽照拍摄示例图','申请人手持身份证合影拍摄示例图'];
  var tips = [
    '<p>1.拍摄时将身份证正面置于拍摄界面正中。</p><p>2.必须为本人身份证照片，真实有效，且内容清晰可辨。</p>',
    '<p>1.拍摄时将身份证正面置于拍摄界面正中。</p><p>2.必须为本人身份证照片，真实有效，且内容清晰可辨。</p>',
    '<p>1.拍摄时保证环境光线充足，背景为纯色。</p><p>2.被拍摄者五官清晰，无遮拦。</p><p>3.身份证资料清晰可辨。</p>'
  ]
  export default {
    data(){
      return {
        titles: headers,
        tips: tips
      }
    },
    props: ['index'],
    methods: {
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>
<style scoped>  
  .show-pic {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 10;
  }
  .show-pic-con {
    position: absolute;
    left: 0;
    right: 0;
    top: 11.81%;
    width: 84.38%;
    margin: 0 auto;
    padding: .5rem 0 0;
    background-color: #fff;
  }
  .show-pic h3 {
    font-weight: normal;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .show-pic .icon-close {
    position: absolute;
    left: .2rem;
    top: .2rem;
  }
  .big-img {
    height: 6.2rem;
    overflow: hidden;
  }
  .show-pic .tips {
    padding: .4rem;
    color: #3c3c3c;
    line-height: 1.4;
  }
  .close-btn {
    position: absolute;
    width: 2.5rem;
    height: 1.5rem;
    top: 0;
    left: 0;
  }
</style>