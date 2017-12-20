import Vue from 'vue'
import VueResource from 'vue-resource'
import funs from './funs'

Vue.use(VueResource);
// Vue.http.options.root='http://192.168.19.140:8080';
// Vue.http.options.root='http://b.lakala.com/cl_wx/credit-loan-wx-telecom';
Vue.http.options.root=baseurl||'http://b.lakala.com/cl_wx/credit-loan-wx-telecom';
//TODO  to test
Vue.http.interceptors.push((req, next) => {
	// req.method="post";
	let loading={hide:new Function};
	let tid=setTimeout(()=>{
		loading=req.params.selfloading?loading:funs.loading();
	},200);
	console.log('------------------------------------------');
	console.log('正在请求'+Vue.http.options.root+'/'+req.url);
	console.log(req.params);
	next(res => {
		tid && clearTimeout(tid);
		loading.hide();
		console.log('请求完成');
		console.log(`--[${req.url}]--`,res.data);
		if(res.data && res.data.success){
			return res
		}else{
			funs.modal(res.data?(res.data.errText||'网络错误，请稍候重试！'):'网络错误，请稍候重试！');
			return res;
		}
	});
});