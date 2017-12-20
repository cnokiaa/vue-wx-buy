const filters = {
	'': val => val,
	/**姓名脱敏**/
	tmName: name => name.replace(/.(?!$)/g, '*'),
	/**邮箱脱敏**/
	tmEmail: mail => {
		//固定显示三个*号长度
		return mail.replace(/(.{3}).*(@.*)/g, '$1***$2');
		let prefix = mail.substr(0, 3),
			suffix = mail.split(/@/)[1];
		hideLen = mail.length - suffix.length - 3;
		//非固定长度
		return prefix + new Array(hideLen + 1).join('*') + '@' + suffix;
	},
	/**银行卡脱敏**/
	tmBankCard: str => str ? (str.substr(0, 6) + '******' + str.substr(-4, 4)) : '',
	tmIdCard: str => str ? (str.substr(0, 8) + '*******' + str.substr(-3, 3)) : '',
	/**电话或银行卡脱敏
	 ***规则为隐藏银行卡号或手机号的倒数第二个四位数
	 **/
	tmTel: tel => tel.replace(/\d{4}(?=\d{4}$)/, '****'),
	tmCall: tel => tel.replace(/\d{4}/, '****'),
	/*格式化*/
	//格式化时间
	formatTime: (date = new Date(), long = true) => {
		const formatNumber = n => (n = n.toString()) && n[1] ? n : '0' + n;
		const d = new Date(date);
		if (!(d instanceof Date)) {
			throw Error('参数错误!');
			return date;
		}
		const year = d.getFullYear();
		const month = d.getMonth() + 1;
		const day = d.getDate();
		const hour = d.getHours();
		const minute = d.getMinutes();
		const second = d.getSeconds();
		return [year, month, day].map(formatNumber).join('-') + long ? (' ' + [hour, minute, second].map(formatNumber).join(':')) : '';
	},
	//格式化如下格式的时间201601080952134
	formatTime2: (v, long = true) => {
		v = v + '';
		if (isNaN(v)) return v;
		return long ? v.slice(0, 12).replace(/(?!^)(?!\d{10}$)(?=(\d{2})+$)/g, '-').replace(/-(?=.{5}$)/, ' ').replace(/-(?=\d\d$)/, ':') : v.slice(0, 8).replace(/(?!^)(?!\d{6}$)(?=(\d{2})+$)/g, '-');
	},
	//格式化金额值，带逗号
	formatMoney: (v, l = 2) => isNaN(v) ? v : (v - 0).toFixed(l).replace(l ? /(?!^)(?=(\d{3})+\.\d*)/g : /(?!^)(?=(\d{3})+$)/g, ','),
	//格式化卡号，四位一空格
	formatCard: cardNo => cardNo.replace(/\d{4}/g, '$& '),

}

const utils = {
	timers: {},
	getParamJson: function(search) {
		//可接受两个参数
		//无参数时默认返回window.location.search 转换成JSON后的对象
		//1个参数时把此参数当成search看待
		//对多个同名的key不能用.
		var obj = {};
		search = search || window.location.search;
		var arr = search.replace(/^\?/g, '').replace(/\#/g, '').split('&');
		for (var i = 0; i < arr.length; i++) {
			var tmp = arr[i].split('=');
			obj[tmp[0]] = obj[tmp[0]] ? (obj[tmp[0]] instanceof Array) ? obj[tmp[0]].concat(tmp[1]) : [obj[tmp[0]], tmp[1]] : tmp[1];
			obj[tmp[0]] = decodeURIComponent(obj[tmp[0]]);
		}
		return obj;
	},
	//简单倒计时
	countdown: function(name, timeout, ticker) {
		// var timeout=$('[data-countdown]').attr('data-countdown');

		var timer;
		if (utils.timers[name]) {
			timer = utils.timers[name];
		} else {
			function Timer(name, timeout) {
				this.tid = null;
				this.name = name;
				this.timeout = this._timeout = timeout;
			}
			Timer.prototype = {
				reset: function() {
					this.timeout = this._timeout;
				},
				tick: function(fun) {
					var me = this;
					var tick = function() {
						me.timeout -= 1;
						fun && fun(me.timeout);
						if (me.timeout <= 0) {
							me.clearInterval();
							me.reset();
						}
					}
					this.tid && clearInterval(this.tid);
					this.tid = setInterval(tick, 1000);
					tick();
				},
				clearInterval: function() {
					clearInterval(this.tid);
				}
			}
			timer = new Timer(name, timeout);
			utils.timers[name] = timer;
		}
		timer.tick(function(rest) {
			ticker && ticker(rest);
		});
	},
	cookie(name, value, hours, path, domain, secure) {
		if(!value){
			var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/");
			return reg.test(document.cookie) ? RegExp.$1 : "";
		}
		var cdata = name + "=" + value;
		if (hours) {
			var d = new Date();
			d.setHours(d.getHours() + hours);
			cdata += "; expires=" + d.toGMTString();
		}
		cdata += path ? ("; path=" + path) : "";
		cdata += domain ? ("; domain=" + domain) : "";
		cdata += secure ? ("; secure=" + secure) : "";
		document.cookie = cdata;
	},
	removeCookie(name, path, domain) {
		utils.setCookie(name, "", -1, path, domain);
	}
}

export {
	filters,
	utils
}