import Vue from 'vue'
const tools = {
	//确认提示框
	alert(v, txt, func, til) {
		v.$createDialog({
			type: 'alert',
			title: til ? til : v.$t('message.ts'),
			content: txt,
			maskClosable: true,
			confirmBtn: v.$t('message.confirm'),
			onConfirm: function() {
				if(typeof(func) == 'function') {
					func()
				}
			}
		}).show()
	},
	//自动消失提示框
	toast(v, text, t, m) {
		v.toast = v.$createToast({
			txt: text,
			type: 'txt',
			mask: m ? m : false,
			time: t ? t : 1000
		})
		v.toast.show()
	},
	//loading
	loading(v, t) {
		v.loading = v.$createToast({
			time: t ? t : 0,
			txt: 'Loading...'
		})
		v.loading.show()
	},
	//基础价格显示方法
	priceShow(obj, type) {
		var lang = localStorage.getItem("lang") == 'en' ? false : true
		if(type == 'tj') { //特价
			return lang ? obj.specialPriceCNY : obj.specialPriceUSD
		}
		if(type == 'yj') { //原价
			return lang ? obj.originalPriceCNY : obj.originalPriceUSD
		}
		//模糊显示
		if(obj.specialPriceCNY || obj.specialPriceUSD) {
			return lang ? obj.specialPriceCNY : obj.specialPriceUSD
		} else {
			return lang ? obj.originalPriceCNY : obj.originalPriceUSD
		}
	},
	//详情、购物车，整理套餐最终价格
	priceFinal(obj, time, type) {
		var lang = localStorage.getItem("lang") == 'en' ? false : true
		//特价字段
		var spCn = 'spCNY_' + time
		var spEn = 'spUSD_' + time
		//原价字段
		var orCn = 'orCNY_' + time
		var orEn = 'orUSD_' + time

		if(type == 'tj') { //特价
			return lang ? obj[spCn] : obj[spEn]
		}
		if(type == 'yj') { //原价
			return lang ? obj[orCn] : obj[orEn]
		}

		//模糊显示
		if(obj.specialPriceCNY || obj.specialPriceUSD) {
			return lang ? obj[spCn] : obj[spEn]
		} else {
			return lang ? obj[orCn] : obj[orEn]
		}
	},
	//微信价格  RMB
	priceWx(obj, time, type) {
		//无周期选项
		if(type) {
			//模糊显示
			if(obj.specialPriceCNY) {
				return obj.specialPriceCNY
			} else {
				return obj.originalPriceCNY
			}
		} else {
			//存在周期选项
			var spCn = 'spCNY_' + time
			var orCn = 'orCNY_' + time
			//返回微信RMB价格
			if(obj.specialPriceCNY || obj.specialPriceUSD) {
				return obj[spCn]
			} else {
				return obj[orCn]
			}
		}
	},
	//paypal价格  USD
	pricePp(obj, time, type) {
		//无周期选项
		if(type) {
			//模糊显示
			if(obj.specialPriceUSD) {
				return obj.specialPriceUSD
			} else {
				return obj.originalPriceUSD
			}
		} else {
			//存在周期选项
			var spEn = 'spUSD_' + time
			var orEn = 'orUSD_' + time
			//返回PAYPAL USD价格
			if(obj.specialPriceCNY || obj.specialPriceUSD) {
				return obj[spEn]
			} else {
				return obj[orEn]
			}
		}

	},
	//购物  计算总价格
	totalFunc(arr, kd, kf, kpNum, type) {
		var t = 0;
		var lang = localStorage.getItem("lang") == 'en' ? false : true
		var key = 'currentPrice'
		if(type == 'cny') {
			key = 'currentPriceWx'
		}
		if(type == 'usd') {
			key = 'currentPricePp'
		}
		arr.map(function(item) {
			t = t + Number(item[key]) * item.currentNumber
		})

		if(kd) {
			t = t + Number(kd)
		}
		if(kf) {
			t = t + Number(kf) * kpNum
		}
		return t
	},
	//时间格式
	getNowFormatDate(str) {
		var date = new Date();

		var month = date.getMonth() + 1;
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		var strDate = date.getDate();
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var hour = date.getHours();
		if(hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		var minute = date.getMinutes();
		if(minute >= 0 && minute <= 9) {
			minute = "0" + minute;
		}
		var sec = date.getSeconds();
		if(sec >= 0 && sec <= 9) {
			sec = "0" + sec;
		}

		let seperator1;
		let seperator2;
		var currentdate;
		if(str) {
			seperator1 = str;
			seperator2 = ":";
			currentdate = date.getFullYear() + seperator1 + month + seperator1 +
				strDate + " " + hour + seperator2 + minute +
				seperator2 + sec;
		} else {
			currentdate = date.getFullYear() + month + strDate
		}

		return currentdate;
	},
	//生成payId
	getNo() {
		var date = new Date();

		var month = date.getMonth() + 1;
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		var strDate = date.getDate();
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var hour = date.getHours();
		if(hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		var minute = date.getMinutes();
		if(minute >= 0 && minute <= 9) {
			minute = "0" + minute;
		}
		var sec = date.getSeconds();
		if(sec >= 0 && sec <= 9) {
			sec = "0" + sec;
		}
		let No = date.getFullYear() + month + strDate + hour + minute + sec
		return No
	},
	//生成P位随机数
	generate(p) {
		var randStr = "";
		for(var i = 0; i < p; i++) {
			var randItem = Math.floor(Math.random() * 10);
			randStr += randItem;
		}
		return randStr;
	},
	//排序字段
	objKeySort(obj) {
		var newkey = Object.keys(obj).sort();
		var newObj = {};
		for(var i = 0; i < newkey.length; i++) {
			newObj[newkey[i]] = obj[newkey[i]];
		}
		return newObj;
	},
	//时间显示格式
	timeShow(t, type) {
		let year = t.substring(0, 4)
		let month = t.substring(4, 6)
		let day = t.substring(6, 8)
		let hour = t.substring(8, 10)
		let min = t.substring(10, 12)
		let sec = t.substring(12, 14)
		if(type) {
			return year + '-' + month + '-' + day + " "+ hour + ':' + min + ':' + sec 
		} else {
			return year + '-' + month + '-' + day
		}
	},
	//回到首页
	toIndex() {
		window.location.href = '/#/'
	}

};

export default tools;