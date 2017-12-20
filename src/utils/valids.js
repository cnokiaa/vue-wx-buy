const vfuns={
	regBirth : function(str, option) {console.log("comeing on");
		str = str.toString();
		var result = {};
		if(str.length != 8) {
			result.pass = false;
			result.msg = '生日格式不正确';
			return 	result;
		}
		var maxAge,minAge,date = new Date(),nowYear = date.getFullYear(),nowMoth = date.getMonth() + 1,today = date.getDate();
		var birthYear = Number(str.substring(0,4)),birthMonth = Number(str.substring(4,6)),birthday = Number(str.substring(6,8));
		// 年不能小于1800年，生日月份不在1-12区间的,日小于1,生日不能超过生日那个月的最大天数
		var maxDay = new Date(birthYear, birthMonth, 0).getDate();
		if((birthYear <= 1800) || (birthMonth > 12 || birthMonth < 1 || birthday < 1) || (birthday > maxDay)) {
			result.pass = false;
			result.msg = '生日格式不正确';
			return result;
		}
		// 增加年龄限制和未来时判断
		if(option && typeof option.maxAge != 'undefined') {
			maxAge = Number(option.maxAge);
		}
		if(option && typeof option.minAge != 'undefined') {
			minAge = Number(option.minAge);
		}
		if(maxAge || minAge) {
			// 出生年份属于未来时
			if((birthYear > nowYear) || (birthYear == nowYear && birthMonth > nowMoth) || (birthYear == nowYear && birthMonth == nowMoth && birthday > today)) {
				result.pass = false;
				result.msg = '生日不能为未来时间';
				return result;
			};
			// 计算年龄
			var age = nowYear - birthYear;
			birthMonth > nowMoth ? age-- : (birthMonth == nowMoth ? (birthday > today ? age-- : "") : "");
			result.age = age;
			// 年龄限制
			if(maxAge) {
				if(age > maxAge) {
					result.pass = false;
					result.msg = '超过最大年龄限制';
					return result;
				}
			}
			if(minAge) {
				if(age < minAge) {
					result.pass = false;
					result.msg = '超过最小年龄限制';
					return result;
				}
			}
		}
		result.pass = true;
		return result;
	},
	regIdCard:function(str, option) {
		str = str.toString();
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/;
		// 用于存储结果
		var result = {pass:true};
		if (reg.test(str)) {
			var sum = 0,arrID = str.split(""),arrWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],arrY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
			for (var i = 0; i < arrWi.length; i++) {
				sum += arrID[i] * arrWi[i];
			};
			sum %= 11;
			var lastID = arrID[arrID.length - 1];
			if (lastID == "X" || lastID == "x") {
				lastID = 10;
			};
			if (arrY[sum] == lastID) {
				result.birthday = str.substr(6, 8);
				var birthdayResult = vfuns.regBirth(result.birthday, option);
				if(birthdayResult.errorType == 'age') {
					result.cityCode = str.substr(0, 6);
					result.gender = (str.substr(14, 3) % 2 == 0) ? "女" : "男";
					result.age = birthdayResult.age;
				}
				if(birthdayResult.pass) {
					result.pass = true;
				} else {
					result.pass = false;
					result.msg = birthdayResult.msg;
				}
			} else {
				result.pass = false;
				result.msg = "身份证号码输入错误";
			}
		} else {
			result.pass = false;
			result.msg = "身份证号码格式有误";
		}
		return result;
	}
}
//TODO  2.多值对比 3.fun可传入参数
const validators = {
	normal: {
		required: function(val='') {
			if(typeof val!='string'){
				return true;
			}
			return !!val.trim();
		},
		length: function(val='', l) {
			return val.length === l
		},
		minLength: function(val='', l) {
			return val.length >= l
		},
		maxLength: function(val='', l) {
			return val.length <= l
		},
		isNumeric: function(val='') {
			return !isNaN(val)
		},
		checked: function(val='') {
			return !!val;
		},
		min:function(val='',l){
			return val>l;
		},
		max:function(val='',l){
			return val<l;
		},
		eq:function(val='',l){
			return val===l;
		}
	},
	email: [{
		required: true,
		msg: '请填写电子邮箱'
	}, {
		rule: /^\w+(\.\w+)*@\w+((\.\w+)+)$/,
		msg: '电子邮箱格式不正确！'
	}],
	tel: [{
		required: true,
		msg: '手机号不能为空！'
	}, {
		rule: /^1([38]\d|4[567]|5(?!4)\d|7[01678])\d{8}$/,
		msg: '请输入正确的手机号！'
	}],
	captcha: [{
		required: true,
		msg: '请输入验证码！'
	}, {
		length: 4,
		msg: '请输入四位验证码！'
	}],
	agree: [{
		checked: true,
		msg: '请同意相关协议'
	}],
	realname: [{
		required: true,
		msg: '请填写真实姓名！'
	}, {
		minLength: 2,
		msg: '请填写您的真实姓名！'
	}, {
		maxLength: 6,
		msg: '请填写您的真实姓名！'
	}],
	idcard: [{
		required: true,
		msg: '请填写身份证号码！'
	}, {
		rule: /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/,
		msg: '身份证号码有误！'
	},{
		fun:vfuns.regIdCard,
		// msg:'身份证号码校验错误！'
	}]
}

const validate= function(value,rule) {
	let result = {
		pass: true,
		msg: ''
	};
	let validator=typeof rule ==='object'?rule:validators[rule];
	if (!validator) {
		throw Error(`[${rule}] 验证未实现！`);
	}
	if(!(validator instanceof Array))validator=[validator];
	for (let i = 0; i < validator.length; i++) {
		let item = validator[i];
		result.msg = item.msg;
		let fun = null;
		for (let o in item) {
			if (o === 'msg') continue;
			fun = o;
		}
		switch (fun) {
			case 'rule':
				result.pass = item.rule.test(value);
				break;
			case 'fun':
				let r=item.fun(value);
				if(typeof r==='object'){
					if(result.msg){
						result.pass=r.pass;
					}else{
						result=r;
					}
				}else{
					result.pass = r;
				}
				break;
			default:
				result.pass = validators.normal[fun](value, item[fun]);
		}
		if (!result.pass) {
			return result;
		}
	}
	return result;
}

export {validators,validate};