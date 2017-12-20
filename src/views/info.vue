<template>
  <div class="container">
    <page-nav :step="2"></page-nav>
    <div class="list">
      <div class="list-header">
        <p>填写您的其他信息</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">电子邮箱</label>
          </div>
          <div class="item-main">
            <tminput tm="tmEmail" v-model="datas.email" type="text" placeholder="填写电子邮件" maxlength="64">
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">居住城市</label>            
          </div>
          <div class="item-main" @click="pickLiveCity">
            <span>{{datas.apcrnames || '选择您居住城市'}}</span>
          </div>
          <div class="item-end">
            <i class="icon-arrow"></i>
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">详细地址</label>
          </div>
          <div class="item-main">
            <input v-model="datas.address" type="text" placeholder="填写格式如XX街道xx号xx楼xx室" maxlength="64">
          </div>
        </div>
      </div>
      <div class="list-header">
        <p>请填写您的工作单位信息</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">单位全称</label>
          </div>
          <div class="item-main">
            <input v-model="datas.companyname" type="text" placeholder="填写就职公司在工商执照上的全称" maxlength="64" />
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">单位城市</label>            
          </div>
          <div class="item-main" @click="pickWorkCity">
            <span>{{datas.cpcrnames || '选择您就职单位所在的城市' }}</span>
          </div>
          <div class="item-end">
            <i class="icon-arrow"></i>
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">单位详址</label>
          </div>
          <div class="item-main">
            <input v-model="datas.companyaddress" type="text" placeholder="填写格式如XX街道xx号xx楼xx室" maxlength="64" />
          </div>
        </div>
        <div class="list-item tel-input">
          <div class="item-front">
            <label class="item-label">单位电话</label>
          </div>
          <div class="item-main flex-wrap">
            <input v-model="companytel1" class="flex-item" type="tel" placeholder="区号" maxlength="4" />
            <tminput tm="tmTel" v-model="companytel2" class="flex-item" type="tel" placeholder="固定电话" maxlength="8" />
            <input v-model="companytel3" class="flex-item" type="tel" placeholder="分机号" maxlength="6" />
            <div class="tips">
              <img src="../assets/images/tel_tip.png">
            </div>
          </div>
        </div>
      </div>
      <div class="list-header">
        <p>请填写您的联系人信息</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">亲属关系</label>
          </div>
          <div class="item-main" @click="pickKinship1">
            <span>{{datas.contactrelation||'选择联系人关系'}}</span>
          </div>
          <div class="item-end">
            <i class="icon-arrow"></i>
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">姓名</label>            
          </div>
          <div class="item-main">
            <tminput tm="tmName" v-model="datas.contactname" type="text" placeholder="填写联系人姓名" maxlength="32">
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">手机号码</label>
          </div>
          <div class="item-main">
            <tminput tm="tmTel" v-model="datas.contactmobile" type="tel" placeholder="填写联系人的手机号码" maxlength="11">
          </div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">紧急联系</label>
          </div>
          <div class="item-main" @click="pickKinship2">
            <span>{{datas.emergencyrelation||'选择联系人关系'}}</span>
          </div>
          <div class="item-end">
            <i class="icon-arrow"></i>
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">姓名</label>            
          </div>
          <div class="item-main">
            <tminput tm="tmName" v-model="datas.emergencyname" type="text" placeholder="填写联系人姓名" maxlength="16">
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">手机号码</label>
          </div>
          <div class="item-main">
            <tminput tm="tmTel" v-model="datas.emergencymobile" type="tel" placeholder="填写联系人的手机号码" maxlength="11">
          </div>
        </div>
      </div>
      <div class="list-header">
        <p>客户经理工号</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-main">
            <input v-model="datas.userno" type="tel" placeholder="客户经理工号">
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:;" @click="submitHandle" class="btn">下一步</a>
    <addr-picker v-if="showCityPicker" @select="addrSelect" @cancel="addrCancel"/>
    <picker v-if="showPicker" :data-items="relationList" @change="selectData" @cancel="cancelPicker" :s="picker_status" :k="keyid" :v="value"/>
  </div>

</template>

<script type="es6">
  import pageNav from '../components/nav.vue'
  import picker from '../components/picker.vue'
  import addrPicker from '../components/addr-picker.vue'  
  import tminput from '../components/tminput.vue'
  const urls={
    bank_card_list:'my-info/bank-card-list',
    add_detail_info:'loaner/add-detail-info',
    relation:'common/relation'
  }
  const paramsMap=(data)=>{
    return{params:{
    }}
  };
  export default{
    data(){
      return {
        currAddr:'',
        currRel:'',
        showPicker: false,
        showCityPicker: false,
        liveCity:'',
        workCity:'',
        picker_status:1,
        relationList:[],
        companytel1: '',
        companytel2: '',
        companytel3: '',
        datas: {
          email: '',
          apcrnames: '',
          apcrcodes: '',
          address: '',
          companyname: '',
          cpcrnames: '',
          cpcrcodes: '',
          companyaddress: '',
          companytel: '',
          contactrelation: '',
          contactname: '',
          contactmobile: '',
          emergencyrelation: '',
          emergencyname: '',
          emergencymobile: '',
          userno: ''
        },
        valids:{
          email: 'email',
          apcrnames: {
            required: true,
            msg: '请选择居住城市'
          },
          address: {
            required: true,
            msg: '请填写居住城市详细地址'
          },
          companyname: {
            required: true,
            msg: '请填写单位全称'
          },
          companytel:[{
            msg:'请填写正确的区号',
            fun:function(companytel){
              let x=companytel.split('|');
              return !!x[0];
            }
          },{
            msg:'请填写正确的固定电话',
            fun:function(companytel){
              let x=companytel.split('|');
              return !!x[1];
            }
          }],
          cpcrnames: {
            required: true,
            msg: '请选择单位城市'
          },
          companyaddress: {
            required: true,
            msg: '请填写单位城市详细地址'
          },
          contactrelation: {
            required: true,
            msg: '请选择亲属关系'
          },
          contactname: {
            required: true,
            msg: '请填写亲属联系人姓名'
          },
          contactmobile: {
            required: true,
            msg: '请填写正确的亲属联系人电话'
          },
          emergencyrelation: {
            required: true,
            msg: '请选择紧急联系人'
          },
          emergencyname: {
            required: true,
            msg: '请填写紧急联系人姓名'
          },
          emergencymobile: {
            required: true,
            msg: '请填写正确的紧急联系人电话'
          },
          userno: {
            required: true,
            msg: '请填写客户经理工号'
          }
        }
      }
    },
    watch:{
      companytel1:'update_companytel',
      companytel2:'update_companytel',
      companytel3:'update_companytel',
      'datas.companytel':'update_companytel0',
    },
    filters:{
      phone:function(value,n){return value.split('|')[n];}
    },
    created() {
      // 获取城市数据
      // 获取亲属关系
    },
    mounted(){
      this.detail=this.session('my_info')||{};
      this.datas=this.assign(this.datas,this.detail);
      this.$http.get(urls.relation).then(res=>{
        if(!res.data.success)return;
        this.relationList=res.data.data.contactrelations;
        this.keyid='contactrelationid';
        this.value="contactrelationcn";
        this.picker_status=0;
      },res=>{
        this.picker_status=2; 
      });
      this.getBandCardList();
    },
    methods:{
      update_companytel(){
        this.datas.companytel=this.companytel1+'|'+this.companytel2+'|'+this.companytel3;
        console.log(this.datas.companytel);
      },
      update_companytel0(){
        let s=~this.datas.companytel.indexOf('-')?'-':'|';
        let com=this.datas.companytel.split(s);
        this.companytel1=com[0]||'';
        this.companytel2=com[1]||'';
        this.companytel3=com[2]||'';
      },
      getBandCardList(){
        this.$http.get(urls.bank_card_list).then(res=>{
                if(!res.data.success)return;
                if(res.data.data && res.data.data.banks)
          this.session('bank_card_list',res.data.data.banks);
        },res=>{
          console.warn('获取银行卡列表信息错误');
        });
      },
      addrSelect(addr){
        this.addrCancel();
        let addrStr=addr.province.provincecn+'|'+addr.city.citycn+'|'+addr.area.areacn;
        this.datas[this.currAddr]=addrStr;
        if(this.currAddr=='cpcrnames'){
          this.datas.apcrcodes=addr.province.provinceid+'|'+addr.city.cityid+'|'+addr.area.areaid;
        }else{
          this.datas.cpcrcodes=addr.province.provinceid+'|'+addr.city.cityid+'|'+addr.area.areaid;
        }
      },
      selectData(item) {
        this.cancelPicker();
        this.datas[this.currRel]=item[this.value];
      },
      cancelPicker() {
        this.showPicker=false;
      },
      pickLiveCity: function() {
        this.currAddr='apcrnames';
        this.showCityPicker = true;
      },
      pickWorkCity: function() {
        this.currAddr='cpcrnames';
        this.showCityPicker = true;
      },
      pickKinship1: function() {
        this.currRel='contactrelation';
        this.showPicker=true;
      },
      pickKinship2: function() {
        this.currRel='emergencyrelation';
        this.showPicker=true;
      },
      addrCancel(){
        this.showCityPicker=false;
      },
      submitHandle: function() {
        // openid='oup7Et3FPcOZ9579xyqlM0G2ThIY';
        let opt={params:this.$data.datas};
        this.validate(this) && 
        this.$http.get(urls.add_detail_info,opt).then(res=>{
          if(!res.data.success)return;
          this.detail=this.assign(this.detail,this.datas);
          this.session('my_info',this.detail);
          this.$router.push('/cards');
        });
      }
    },
    components:{
      'page-nav':pageNav,
      addrPicker,
      picker,
      tminput
    }
    
  }
</script>

<style scoped>

  .container {
    padding-top: 1.3rem;
  }
  .tel-input {
    position: relative;
    padding: 0 .3rem .5rem;
  }
  .tel-input input {
    display: block;
  }
  .tel-input .tips {
    position: absolute;
    bottom: .2rem;
    left: 2.5rem;
    width: 6rem;
  }
</style>
