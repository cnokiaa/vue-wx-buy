<template>
  <div class="container">
    <page-nav :step="3"></page-nav>
    <div class="list">
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">手机号：</div>
          </div>
          <div class="item-main">
            <tminput type="tel" id="userMobile" name="mobile" tm="tmTel" v-model="datas.mobile" class="user-tel" placeholder="请输入手机号" maxlength="11" />
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">验证码：</div>
          </div>
          <div class="item-main">
            <input id="verification" name="smscode" type="tel" placeholder="请输入短信验证码" autocomplete="off" maxlength="6" v-model="datas.smscode">
          </div>
          <div class="item-end">
            <a href="javascript:;" class="code-btn" @click="sendSMS" :class="{disabled:tick>0}">{{btn_sendsms_text}}</a>
          </div>
        </div>
      </div>
      <div class="list-header">
        <p>请确认您的申请信息</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">姓名：</div>
          </div>
          <div class="item-main">
            {{applicant | tmName}}
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">身份证号：</div>
          </div>
          <div class="item-main">
            {{certno|tmIdCard}}
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">卡号：</div>
          </div>
          <div class="item-main">
            {{creditcard|tmBankCard}}
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <div class="item-label">客户经理：</div>
          </div>
          <div class="item-main">
            {{userno}}
          </div>
        </div>
      </div>
    </div>
    <div class="agreement">
      <label><input type="checkbox" v-model="datas.agree" /> 同意<a href="javascript:;" @click="toggleIframe">《个人信用担保购机业务申请协议》</a></label>
    </div>
    <a href="javascript:" @click="submit" class="btn" >下一步</a>
    <transition name="fade">
      <page-iframe v-if="showIframe" :url="agreementUrl" :title="agreementTitle" @back="toggleIframe"></page-iframe>
    </transition>
  </div>
</template>
<script type="es6">
  import pageNav from '../components/nav.vue'  
  import iframe from '../components/iframe.vue'
  import tminput from '../components/tminput.vue'
  import {utils} from '../utils/utils'
  const urls={
    agreement:'/common/agreement-banli',
    sms:'my-info/sms', //&mobile=15013456026
    confirm:'my-info/confirm',
    submit:'loaner/submit'
  }
  export default {
    data(){
      return {
        showIframe: false,
        agreementTitle: '个人信用担保购机业务申请协议',
        agreementUrl: baseurl+urls.agreement,
        tick:-1,
        applicant:'',
        certnt:'',
        userno:'',
        certno:'',
        creditcard:'',
        datas:{
          mobile:'',
          agree:true,
          smscode:''
        },
        valids:{
          mobile:'tel',
          agree: {
            checked: true,
            msg: '请先阅读并同意相关协议'
          },
          smscode:{
            required:true,
            msg:'手机验证码不能为空！'
          }
        }
      }
    },
    components:{
      'page-nav':pageNav,
      'page-iframe':iframe,
      tminput
    },
    computed:{
      btn_sendsms_text(){
        return !~this.tick?'点击发送':!this.tick?'重新发送':`(${this.tick})重新发送`;
      }
    },
    mounted(){
      let detail=this.session('my_info')||{};
      this.detail=detail;
      this.datas.mobile=detail.mobile||'';
      this.applicant=detail.applicant||'';
      this.certno=detail.certno||'';
      this.creditcard=detail.debitcard||'';
      this.userno=detail.userno||'';
    },
    methods: {
      toggleIframe: function() {
        this.showIframe = !this.showIframe;
      },
      sendSMS(){
        // this.datas['mobile']='13423423423';
        let opt={params:this.datas};
        /*
         if(!this.validate({mobile:'tel'},this.datas,result=>{
            !result.pass && this.toast(result.msg);
         })))return false;
        */
        //遇到此类情况，以上才是推荐的验证方法，但以下更方便。
        if(!this.validate({mobile:'tel'},this.datas,this))return false;
        this.$http.get(urls.sms,opt).then(res=>{
          if(!res.data.success)return;
          utils.countdown('sms',120,rest=>{
            this.tick=rest;
          });
        });
      },
      submit(){
        let opt={params:this.datas};
        this.validate(this) &&
        this.$http.get(urls.submit,opt).then(res=>{
          if(!res.data.success)return;
          this.detail=this.assign(this.detail,this.datas);
          this.session('my_info',this.detail);
          this.$router.push('./done');
        });
      }
    },

  }
</script>

<style scoped>
  .container {
    padding: 1.5rem 0;
  }
  .code-btn {
    display: block;
    line-height: .75rem;
    font-size: .9em;
    text-align: center;
    background-color: #3db3f9;
    color: #fff;
    text-align: center;
    border-radius: 0.1rem;
    padding: 0 .3rem;
  }
  .list-item input {
    height: 1rem;
  }
  .disabled {
    background-color: #c4c4c4;
    pointer-events: none;
  }
  .btn {
    margin-top: 2rem;
  }
</style>

