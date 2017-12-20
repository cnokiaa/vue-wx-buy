<template>
  <div class="container">
    <div class="success">
      <ul>
        <li><i class="icon-done"></i>提交成功！申请已受理</li>
        <li><i class="icon-done"></i>预计5分钟内完成审核</li>
      </ul>
      <p class="tips">申请结果可在申请记录中查询，或等候短信通知。</p>
    </div>
    <a href="javascript:;" class="link">
      <img src="../assets/images/lkl_app.jpg" alt="" />
    </a>
    <a href="javascript:;" class="btn" @click="closeApp">完成</a>
  </div>
</template>

<script type="es6">
  export default {
    methods: {
      closeApp: function() {
        wx.closeWindow();
      }
    }
  }
</script>
<style scoped>
  .success {
    padding: .55rem 1rem .5rem 1.4rem;
    background-color: #fff;
  }
  .success ul {
    padding-left: .8rem;
    border-left: 2px dashed #007aff;
  }
  .success li {
    position: relative;
    font-size: 1.2em;
  }
  .success li:first-child {
    padding-bottom: 1.8rem;
  }
  .success i {
    position: absolute;
    left: -1.2rem;
    top: -0.15rem;
  }
  .tips {
    font-size: .9em;
    color: #828282;
    margin: .2rem 0 0 2.2em;
    line-height: 1.4;
  }
  .link {
    display: block;
    margin-top: .4rem;
  }
  .btn {
    margin-top: 2rem;
    background-color: #fe7011;
  }
  .btn:active {
    background-color: #ed5f00;
  }
</style>
