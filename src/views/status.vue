<template>
  <div class="container">
    <div class="cover">
      <img src="../assets/images/cover.jpg" alt="">
    </div>
    <p class="tips" v-if="datas.statusInfo.loanstatus==-1">暂无申请记录</p>
    <p class="tips" v-if="datas.statusInfo.loanstatus==2">尊敬的客户，您的申请正在审核中，请稍后。</p>
    <p class="tips" v-if="datas.statusInfo.loanstatus==0">尊敬的客户，您的申请已审核通过，可选择最高套额度为{{datas.statusInfo.loanamt}}元。</p>
    <p class="tips" v-if="datas.statusInfo.loanstatus==1">尊敬的客户，根据您的综合评分情况，本次申请未能审核通过，感谢您的支持。</p>
  </div>
</template>

<script type="es6">
import {utils} from '../utils/utils';
import Vue from 'vue'
  const urls = {
    status_info: 'my-info/quota'
  }
  export default {
    data(){
      return {
        datas:{
          statusInfo: {
            loanstatus:-1
          },
          limit:''
        }
      }
    },
    mounted(){
      this.getToken(()=>{
        this.getStatus();  
      });
    },
    methods:{
      getToken(fun){
        let token=utils.cookie('token');
        // token=(Vue.http.options.headers && Vue.http.options.headers.Cookie);
        if(token){
          return fun();
        }else{
          return setTimeout(()=>{
            this.getToken(fun)
          }, 100);
        }
      },
      getStatus(){
        this.$http.get(urls.status_info).then(res=>{
          if(!res.data.success)return;
          this.datas.statusInfo = res.data.data||{};
          this.datas.statusInfo.loanstatus=this.datas.statusInfo.loanstatus!==undefined?this.datas.statusInfo.loanstatus:-1;
        });
      }
    }
    
  }
</script>
<style scoped>
  .container {
    background-color: #fff;
    padding-bottom: 7.3rem;
  }
  .note {
    position: absolute;
    right: .4rem;
    top: .4rem;
    text-align: center;
  }
  .note span {
    display: block;
  }
  .tips {
    font-size: 1.2em;
    line-height: 1.4;
    padding: .5rem;
    text-align: center;
  }
</style>
