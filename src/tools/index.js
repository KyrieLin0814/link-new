import Vue from 'vue'
const tools = {
	//确认提示框
	alert(v, txt, func, til) {
		v.$createDialog({
			type: 'alert',
			title: til ? til : v.$t('message.ts'),
			content: txt,
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
	//计算总价格
	totalFunc(arr, kd, kf) {
		var t = 0;
		arr.map(function(item) {
			t = t + Number(item.price)
		})
		if(kd) {
			t = t + Number(kd)
		}
		if(kf) {
			t = t + Number(kf)
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
	}

};

export default tools;