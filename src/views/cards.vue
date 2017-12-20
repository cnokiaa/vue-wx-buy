<template>
  <div class="container">
    <page-nav :step="3"></page-nav>
    <div class="list">
      <div class="list-header flex-wrap">
        <p class="flex-item">请填写您的储蓄卡信息</p>
        <a href="javascript:;" @click="chooseCard">+选择银行卡</a>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">姓名：</label>
          </div>
          <div class="item-main">
            {{applicant | tmName}}
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">银行：</label>
          </div>
          <div class="item-main" @click="chooseBank">
            <span>{{debitbankname||"请选择支持的开户行"}}</span>
          </div>
          <div class="item-end">
            <i class="icon-arrow"></i>
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">卡号：</label>
          </div>
          <div class="item-main">
            <!-- <input id="bankcardnum" type="tel" placeholder="请输入储蓄卡卡号" maxlength="20" v-model="c_debitcard" @keyup="modify('debitcard')" />  -->
            <tminput type="tel" placeholder="请输入储蓄卡卡号" maxlength="20" tm="tmBankCard"  v-model="datas.debitcard"  />
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="btn" @click="submitHandle">下一步</a>
    <div class="cardList" v-show="showCardsPicker" @click="cancelCardsPicker">
      <div class="cardList-content">
        <div class="cardList-header">
          银行卡列表
        </div>
        <div class="cardList-body">
          <div class="cardList-list">
            <ul>
              <li v-for="item in cardList" @click.self="selectCard(item)">{{item.bankname}} {{item.bankcard | tmBankCard}}</li>
              <li v-if="!cardList.length">[您尚未添加银行卡]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <picker v-if="showBankPicker" :data-items="bankList" @change="selectBank" @cancel="cancelBankPicker" :s="bank_status" k="bankCode" v="bankName" />
  </div>
</template>
<script type="es6">
  import pageNav from '../components/nav.vue'
  import picker from '../components/picker.vue'
  import tminput from '../components/tminput.vue'
  import {filters} from '../utils/utils'
  const urls={
    add_bank_info:'loaner/add-bank-info',
    bank_list:'common/bank-list',
    bank_card_list:'my-info/bank-card-list',
  }
  export default {
    data(){
      return {
        modifying:{
          debitcard:true
        },
        value: 1,
        bank_status:0,
        detail:{},
        showBankPicker:false,
        showCardsPicker:false,
        bankList:[],
        cardList:[],
        applicant:'', 
        debitbankname:'',
        datas:{
          debitbank:'',
          debitcard:'',
        },
        valids:{
          debitbank:{
            required: true,
            msg: '请选择支持的开户行'
          },
          debitcard:{
            required: true,
            msg: '请填写您的储蓄卡信息'
          },
        }
      }
    },
    components:{
      pageNav,
      picker,
      tminput
    },
    mounted(){
      this.detail=this.session('my_info')||{};
      this.applicant=this.session('realname')||this.detail.applicant||'';
      this.getBankCardList();
      this.getBankList();
    },
    computed:{
      c_debitcard:{
        get: function () {
          return this.modifying.debitcard?this.datas.debitcard:filters.tmBankCard(this.datas.debitcard);
        },
        set:function(v){
          this.datas.debitcard=v;
        }
      },
    },
    methods:{
      modify(key,value=true){
        this.modifying[key]=value;
      },
      getBankList(){
        this.$http.get(urls.bank_list).then(res=>{
          this.bankList=res.data.data.retData||[];
        });
      },
      getBankCardList(){
        let isNewUser=this.session('isNewUser');
        this.cardList=this.session('bank_card_list')||[];
        if(!isNewUser && !this.cardList){
          this.$http.get(urls.bank_card_list).then(res=>{
            if(!res.data.success)return;
            if(res.data.data && res.data.data.banks)
            this.cardList=this.session('bank_card_list',res.data.data.banks);
          });
        }
      },
      chooseCard(){
        this.showCardsPicker=true;
      },
      chooseBank(){
        if(!this.bankList.length){
          this.getBankList();
        }
        this.showBankPicker=true;
      },
      cancelBankPicker(){
        this.showBankPicker=false;
      },
      cancelCardsPicker(){
        this.showCardsPicker=false;
      },
      selectBank(item) {
        this.debitbankname=item.bankName;
        this.datas.debitbank=item.bankCode;
        this.cancelBankPicker();
      },
      selectCard(item){
        this.modify('debitcard',false);
        this.debitbankname=item.bankname;
        this.datas.debitbank=item.bankcode;
        this.datas.debitcard=item.bankcard;
        this.detail=Object.keys(this.detail).length?this.detail:(this.session('my_info')||{});
        this.applicant=this.applicant||this.detail.applicant||'';
        this.cancelCardsPicker();
      },
      submitHandle: function() {
        let opt={params:this.datas};
        if(!this.validate(this))return;
        this.$http.get(urls.add_bank_info,opt).then(res=>{
          if(!res.data.success)return;
          this.detail=this.assign(this.detail,this.datas);
          this.session('my_info',this.detail);
          this.$router.push('/apply');
        });
      },
    },
  }
</script>
</script>
<style scoped>
  .container {
    padding: 2rem 0;
  }
  .list {
    margin: .3rem .5rem;
    padding-bottom: .3rem;
    background-color: #fff;
    border-top: .15rem solid #007aff;
    border-radius: .2rem;
    overflow: hidden;
  }
  .list-header {
    margin: .2rem .4rem;
    border-bottom: 1px dashed #007aff;
  }
  .list-body {
    padding-right: .4rem;
  }
  .list-header a {
    color: #3db3f9;
  }
  .list-item {
    height: 1.2rem;
  }
  .btn {
    margin: 2rem .4rem 0;
  }
  .cardList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*display: none;*/
  height: 100%;
  background-color: rgba(0,0,0,0.65);
  z-index: 1000;
  overflow: auto;
  -webkit-overflow-scrolling: touch;  
}
.cardList-content {
  position: absolute;
  top: 28.5%;
  left: 50%;
  width: 8rem;
  margin-left: -4rem;
  border-radius: .14rem;
  height: auto;
  background-color: #fff;
  border-radius: 0.3rem;
  overflow: hidden;
  padding-bottom: .5rem;
}
.cardList-header {
  line-height: 1rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.cardList-body {
  max-height: 5rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.cardList-list li {
  border-bottom: 1px solid #ddd;
  padding: .3rem;
  text-align: center;
}

</style>
