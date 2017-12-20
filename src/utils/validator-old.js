import Vue from 'vue';
// import VueValidator from 'vue-validator'
const Validator=require('vue-validator');
//用法参见 http://www.cnblogs.com/jyichen/p/5660886.html

const validators={
	tel(val){
		return /^1([38]\d|4[567]|5(?!4)\d|7[01678])\d{8}$/.test(val);
	},
	idcard(val){
		return /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/.test(val);
	},
}

Vue.use(Validator)

for(let val in validators){
	Vue.validator(val,validators[val]);
}
