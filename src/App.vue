<template>
  <div id="app">
    	<router-view></router-view>
  </div>
</template>
<script type="es6">
import Vue from 'vue';
import './utils/funs';
import {utils} from './utils/utils';

require('./assets/libs/fastclick').attach(document.body);

let urls={
	// openid:'my-info/openid',
    token:'token',
	wx_config:'my-info/wx-config',
	my_info:'my-info/detail',
	bank_card_list:'my-info/bank-card-list',
    is_new_user:'my-info/is-new-user',
    status_info: 'my-info/quota'
}
let token=null;
  export default {
    name: 'app',
    components: {},
    created(){
        let route=utils.getParamJson().route;
        route=route=='query'?'/status':'/upload';
        this.$router.replace(route||'/index');
    	// let wx_config;
    	let code=this.getAndSaveCode();
    	if(!code)return this.modal('请从指定入口进入页面！');
    	this.getToken(code,token=>{
            //如果是状态页，不需要
            if(this.$route.path==='/status')return;
    		this.getWxConfig();
            this.isNewUser(r=>{
                this.session('isNewUser',r);
                if(!r){
                    // this.getDetail();
                    // this.getBandCardList();
                }
            });
    	});
    },
    methods:{
    	//设置统一请求头
    	setHeaders(){
            let token=this.session('token');
            utils.cookie('token',token);
            // Vue.http.options.headers={token};
    		// Vue.http.options.headers={Cookie:'token='+token,powerBy:'lakala.com'};
    	},
    	getAndSaveCode(){
    		let code=utils.getParamJson().code;
    		if(!code){
    			this.modal('请从正确入口进入此页面！');
    			return false;
    		}
    		this.session('wx_code',code);
    		return code;
    	},
        isNewUser(fun){
            //TODO delete next line
            return fun(false);
            this.$http.get(urls.is_new_user).then(res=>{
                if(!res.data.success)return;
                fun && fun(res.data.isNewUser);
            });
        },
    	getToken(code,fun){
            let opt={params:utils.getParamJson()};
    		this.$http.get(urls.token,opt).then(res=>{
                if(!res.data.success)return;
    			token=res.data.data.token;
                this.session('token',token);
    			// this.session('token',token);
    			// this.session('params',{params:{token}});
    			//设置统一请求头
    			this.setHeaders();
    			fun && fun(token);
    		},res=>{
    			console.warn('token获取失败！');
    		});
    	},
        getStatus(){
          this.$http.get(urls.status_info).then(res=>{
            if(!res.data.success)return;
            // this.datas.statusInfo.loanstatus
          });
        },
    	getWxConfig(){
            let href=location.href.replace(location.hash,'');
            // href=encodeURIComponent(href);
            let opt={params:{url:href}};
    		this.$http.get(urls.wx_config,opt).then(res=>{
                if(!res.data.success)return;
    			let wx_config=res.data.data;
                // wx_config.debug=true;
                wx_config.jsApiList=["chooseImage","previewImage","uploadImage","hideMenuItems"];
    			wx.config(wx_config);
    		},res=>{
    			console.warn('微信参数获取失败！');
    		});
    	},
    	getDetail(){
    		this.$http.get(urls.my_info).then(res=>{
                if(!res.data.success)return;
                if(res.data && res.data.data)
    			this.session('my_info',res.data.data);
    		},res=>{
    			console.warn('获取个人信息错误');
    		});
    	},
    	getBandCardList(){
    		this.$http.get(urls.bank_card_list).then(res=>{
                if(!res.data.success)return;
                if(res.data.data && res.data.data.banks)
    			this.session('bank_card_list',res.data.data.banks);
    		},res=>{
    			console.warn('获取银行卡列表信息错误');
    		});
    	}
    },
    
  }
</script>
