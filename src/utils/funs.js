import Vue from 'vue';
import Loading from '../components/loading.vue';
import Modal from '../components/modal.vue';
import Toast from '../components/toast.vue';

import {validate,addValids} from './valids';

const vms = {
    get(obj) {
        let name = Object.keys(obj)[0];
        let comp = obj[name];
        if (this[name]) return this[name];
        let vm = new comp().$mount();
        document.body.appendChild(vm.$el);
        return vms[name] = vm;
    }
}

const MyLoading = Vue.extend(Loading);
const MyModal = Vue.extend(Modal);
const MyToast = Vue.extend(Toast);
const noop=()=>{};

let loading_tid=null;
const funs= {
	assign(...arg){
		arg=arg.filter(item=>item);
		if(!arg.length)arg=[{}];
		return Object.assign(...arg);
	},
    validate(context,con='datas',fun){
        let data=typeof con==='object'?con:context.$data[con];
        let valids=context.valids||context;
        let toast=typeof fun ==='object' && fun.toast?fun.toast:context.toast;
        let result={pass:true,msg:'所有字段通过验证！'};
        fun= typeof fun==='function'?fun:noop;
        for(let valid in valids){
            result=validate(data[valid],valids[valid]);
            if(!result.pass){
                (typeof toast=='function') && toast(result.msg);
                fun(result);
                return false;
            }
        }
        fun(result);
        return true;
    },
    store(k, v) {
        if (!v) {
            let tmp = localStorage.getItem(k);
            return JSON.parse(tmp);
        } else {
            localStorage.setItem(k, JSON.stringify(v));
        }
    },
    session(k, v) {
        if (!v) {
            let tmp = sessionStorage.getItem(k);
            return JSON.parse(tmp);
        } else {
            sessionStorage.setItem(k, JSON.stringify(v));
        }
    },
    loading(obj = { msg: '', timeout: 10000 }) {
        obj = typeof obj === 'string' ? { msg: obj, timeout: 10000 } : obj;
        const vm = vms.get({ MyLoading });
        vm.message = obj.msg;
        vm.show();
        // loading_tid && clearTimeout(loading_tid);
        // if(obj.timeout)
        // loading_tid=setTimeout(()=>{
        //     vm.hide();
        //     // funs.modal('请求超时！');
        // }, obj.timeout);
        return vm;
    },
    modal(msg, onOK) {
        const vm = vms.get({ MyModal });
        vm.visible = true;
        vm.message = msg
        vm.$on('close', () => {
            // vm.close();
            onOK && onOK(vm);
            return;
        });
        return vm;
    },
    toast(msg, icon, timeout=3000) {
        const vm = vms.get({ MyToast });
        vm.visible=true;
        vm.message = msg;
        vm.icon=icon;
        vm.timeout=timeout;
        return vm;
    }
}
//es6
Object.assign(Vue.prototype,{
	assign:funs.assign,
    session:funs.session,
    store:funs.store,
    modal:funs.modal,
    toast:funs.toast,
    validate:funs.validate
});

Vue.prototype.funs = funs;

export default funs;

// Vue.prototype.session = Vue.prototype.funs.session;
// Vue.prototype.store = Vue.prototype.funs.store;
// Vue.prototype.modal = Vue.prototype.funs.modal;
// Vue.prototype.toast = Vue.prototype.funs.toast;
