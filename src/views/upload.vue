<template>
  <div class="container">
    <page-nav :step="1"></page-nav>
    <div class="list">
      <div class="list-header">
        <p>填写您的真实身份信息</p>
      </div>
      <div class="list-body">
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">真实姓名</label>
          </div>
          <div class="item-main">
            <tminput id="relname" tm="tmName" type="text" placeholder="请输入你的真实姓名"  v-model="datas.relname">
          </div>
        </div>
        <div class="list-item">
          <div class="item-front">
            <label class="item-label">身份证号</label>
          </div>
          <div class="item-main">
            <tminput id="idcard" tm="tmIdCard" type="text" placeholder="请输入身份证号" maxlength="18" v-model="datas.idcard" >
          </div>
        </div>
      </div>
    </div>
    <div class="upload">
      <div class="upload-hd">
        <div class="upload-hd-text">请按图示要求上传您的身份证照片</div>
        <a class="upload-hd-btn" href="javascript:;" @click="toggleWrong"><i></i>错误示例</a>
      </div>
      <div class="upload-con">
        <div class="upload-row">
          <div class="col" @click="openImg(0)">
            <img  src="../assets/images/facecard.jpg" alt="反面照" />
          </div>
          <div class="col idcard-back-bg" @click="chooseimgs(0)" data-index="0">
            <img v-if="datas.photos[0]" :src="datas.photos[0]" alt="" />
          </div>
        </div>
        <div class="upload-row">
          <div class="col" @click="openImg(1)">
            <img src="../assets/images/backcard.jpg" alt="正面国徽面照" />
          </div>
          <div class="col idcard-bg" @click="chooseimgs(1)" data-index="1">
            <img v-if="datas.photos[1]" :src="datas.photos[1]" alt="" />
          </div>
        </div>
        <div class="upload-row">
          <div class="col" @click="openImg(2)">
            <img src="../assets/images/catchcard.jpg" alt="手持身份证照" />
          </div>
          <div class="col idcard-now" @click="chooseimgs(2)" data-index="2" id="photo">
            <img v-if="datas.photos[2]" :src="datas.photos[2]" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="agreement">
      <label><input type="checkbox" v-model="datas.agree" />同意<a href="javascript:;" @click="toggleIframe">《个人征信查询及报送授权声明》</a></label>
    </div>
    <a @click="submitHandle" class="btn">立即申请</a>
    <transition name="fade">
      <div class="wrong" v-if="showWrong">
        <div class="wrong-bar">
          <div class="btn-back" @click="toggleWrong">
            <a href="javascript:;"><i class="icon-back"></i></a>
            <span>错误示例</span>
          </div>
        </div>
        <div class="wrong-con">
          <img src="../assets/images/ex_wrong1.jpg" alt="">
        </div>
      </div>
    </transition>
    <transition name="fade">
      <page-iframe v-if="showIframe" :url="agreementUrl" :title="agreementTitle" @back="toggleIframe"></page-iframe>
    </transition>
    <transition name="fade">
      <show-img v-if="showImg" :index="imgIndex" @close="hideImg"></show-img>
    </transition>
  </div>
  
</template>
<script type="es6">
  import pageNav from '../components/nav.vue'
  import iframe from '../components/iframe.vue'
  import popImg from '../components/popImg.vue'
  import tminput from '../components/tminput.vue'
  import {filters,utils} from '../utils/utils'
  const urls={
    my_info:'my-info/detail',
    agreement:'/common/agreement-zhengxin',
    submit:'loaner/add-base-info',
  }
  const paramsMap=(data)=>{
    return{params:{
      applicant:data.relname,
      certno:data.idcard,
      firstId:data.f_pics[0],
      secondId:data.f_pics[1],
      nowId:data.f_pics[2]
    }}
  };
  export default {
    components:{
      'page-nav':pageNav,
      'page-iframe': iframe,
      'show-img': popImg,
      tminput
    },
    data(){
      return {
        modifying:{
          relname:true,
          idcard:true,
        },
        showImg: false,
        showWrong: false,
        showIframe: false,
        imgIndex: 0,        
        agreementTitle: '个人征信查询及报送授权声明',
        agreementUrl: baseurl+urls.agreement,
        
        datas:{
          agree: true,
          relname: '',
          idcard:'',
          // photos:['1','2','3'],
          // f_pics:[1,2,3],
          photos:['','',''],
          f_pics:[],
        },
        valids:{
          relname:'realname',
          idcard:'idcard',
          photos:[{
            msg:'请上传您的身份证正面照片',
            fun:function(photos){
              return !!photos[0];
            }
          },{
            msg:'请上传您的身份证背面照片',
            fun:function(photos){
              return !!photos[1];
            }
          },{
            msg:'请上传您的手持身份证照片',
            fun:function(photos){
              return !!photos[2];
            }
          }],
          agree:{
            checked:true,
            msg:'请先阅读并同意相关协议'
          }
        }
      }
    },
    mounted: function() {
      let detail=this.detail=this.session('my_info')||{};
      if(!Object.keys(detail).length){
        this.getToken(()=>{
          this.getDetail(detail=>{
            this.initData(detail);
          });
        });
      }else{
        this.initData(detail);
      }
    },
    computed:{
      c_relname:{
        get(){
          return this.modifying.relname?this.datas.relname:filters.tmName(this.datas.relname);
        },
        set(v){
          this.datas.relname=v;
        }
      },
      c_idcard:{
        get(){
          return this.modifying.idcard?this.datas.idcard:filters.tmIdCard(this.datas.idcard);
        },
        set(v){
          this.datas.idcard=v;
        }
      }
    },
    // beforeRouteEnter(to,from,next){
    //   let n=0;
    //   let getToken=(fun)=>{
    //     console.log('getToken-times:',n++);
    //     let token=utils.cookie('token');
    //     if(token){
    //       return fun();
    //     }else{
    //       return setTimeout(()=>{
    //         getToken(fun);
    //       }, 100);
    //     }
    //   }
    //   getToken(next);
    // },
    methods: {
      modify(key,value=true){
        this.modifying[key]=value;
      },
      getToken(fun){
        let token=utils.cookie('token');
        if(token){
          return fun();
        }else{
          return setTimeout(()=>{
            this.getToken(fun);
          }, 100);
        }
      },
      initData(detail){
        this.modify('relname',false);
        this.modify('idcard',false);
        this.datas.relname=detail.applicant||'';
        this.datas.idcard=detail.certno||'';
      },
      openImg(index) {
        this.imgIndex = index;
        this.showImg = true;
      },
      hideImg() {
        this.showImg = false;
      },
      toggleWrong() {
        this.showWrong = !this.showWrong;
      },
      toggleIframe() {
        this.showIframe = !this.showIframe;
      },
      submitHandle() {
        this.validate(this) &&    
        this.uploadPhotos(uploaded=>{
          if(!uploaded){
            this.modal('上传图片失败,请重试！');
          }else{
            let opt=paramsMap(this.$data.datas);
            this.$http.get(urls.submit,opt).then(res=>{
              if(!res.data.success)return;
              this.detail=this.assign(this.detail,paramsMap(this.datas).params);
              this.session('my_info',this.detail);
              this.$router.push('/info');
            });
          }
        });
      },
      getDetail(fun){
        this.$http.get(urls.my_info).then(res=>{
          if(!res.data.success)return;
          if(res.data && res.data.data){
            this.session('my_info',res.data.data);
            this.detail=res.data.data;
          }
          fun & fun(res.data.data);
        },res=>{
          console.warn('获取个人信息错误');
        });
      },
      uploadPhotos(fun){
        console.log('into uploadPhotos');
        let photos=[].concat(this.datas.photos);
        let me=this;
        function upload(){
          console.log('开始上传图片！');
          wx.uploadImage({
            // localId: _this.images.localId[i],
            localId: photos.shift(),
            success:res=>{
              me.datas.f_pics.push(res.serverId);
              console.log('photos length:',photos.length);
              if(photos.length){
                upload();
              }else{
                fun && fun(true);
              }
            },
            fail:res=>{
              fun && fun(false);
              me.modal(res);
            }
          });
        }
        upload();
      },
      chooseimgs(idx){
        wx.chooseImage({
          count: 1,
          sourceType: ['camera'],
          success:res=>{
            let photos=[].concat(this.datas.photos);
            photos[idx]=res.localIds[0];
            this.datas.photos=photos;
          }
        });
      },
    },
    
  }
</script>
<style scoped>
  .container {
    padding-top: 1.3rem;
  }
  .upload {
    margin-top: .3rem;
    padding: .2rem 0 .2rem .3rem;
    padding-bottom: .1rem;
    background-color: #fff;
  }
  .upload-hd {
    padding: 0 .3rem .2rem 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .upload-hd-text {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .upload-hd-btn {
    display: block;
    padding: 0 .2rem;
    line-height: 1.6em;
    color: #fff;
    text-align: center;
    background: #3db3f9;
    border-radius: 4px;
    vertical-align: middle;
  }
  .upload-hd-btn i {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: .1rem;
    background: url(../assets/images/gantanhao.png) 0 0 no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    vertical-align: middle;
  }
  .upload-row {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: .3rem;
  }
  .upload-row .col {
    line-height: normal;
    flex: 1;
    width:0;
    margin-right: .3rem;
    height: 2.85rem;
    overflow: hidden;
  }
  .idcard-back-bg {
    background: #3db3f9 url(../assets/images/idcard_back_bg.jpg) 0 0 no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .idcard-bg {
    background: #3db3f9 url(../assets/images/idcard_bg.jpg) 0 0 no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .idcard-now {
    background: #3db3f9 url(../assets/images/idcard_now.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  
  .wrong {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;

  }
  .wrong-bar {
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
  }
  .wrong-bar i {
    margin-right: .6rem;
  }
  .wrong-con {
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    padding-top: 1.2rem;
    background-color: #fff;
  }
  .btn-back{
    width:3rem;
  }
  
</style>