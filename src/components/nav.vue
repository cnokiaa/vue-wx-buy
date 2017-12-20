<template>
  <div class="nav">
    <ul>
      <li :class="{'active':(step >= 1)}">申请人照片</li>
      <li :class="{'active':(step >= 2)}">个人资料</li>
      <li :class="{'active':(step >= 3)}">银行卡信息</li>
      <li :class="{'active':(step == 4)}">提交申请</li>
    </ul>
  </div>
</template>

<script type="es6">
  export default {
    props: ['step']
  }
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: .3rem .2rem;
  color: #3db3f9;
  background-color: #fff;
  z-index: 9;
}
.nav ul {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.nav li {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 0.6rem;
  font-size: 0.32rem;
  line-height: 0.6rem;
  text-align: center;
  border: 1px solid #3db3f9;
  border-radius: 0.45rem;
  margin-right: .5rem;
}
.nav li:after {
  position: absolute;
  right: -0.45rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: '';
  display: block;
  width: 0.36rem;
  height: 0.22rem;
  background: url(../assets/images/nav_arrow.png) no-repeat 0 0;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.nav li:last-child {
  margin-right: 0;
}
.nav li:last-child:after {
  display: none;
}
.nav li.active {
  background-color: #3db3f9;
  color: #fff;
}
.nav li.active:after {
  background: url(../assets/images/nav_arrow_fill.png) no-repeat 0 0;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
</style>
