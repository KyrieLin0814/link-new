import Vue from 'vue'
const tools = {
	//url参数
	getUrlKey() {
		let href = window.location.href,
			paramObj = {};
		if(href.match(/\?/)) {
			let paramStr = href.split('?')[1],
				unitArr = decodeURIComponent(paramStr).split('&');
			unitArr.forEach((item) => {
				paramObj[this.trim(item.split('=')[0])] = this.trim(item.split('=')[1]).replace(/#\/(\w+)?/, '');
			});
		}
		return paramObj;
	},
	//去掉空格
	trim(str) {
		return str.replace(/^\s*|\s*$/g, '');
	},
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
			mask: true,
			maskClosable: false,
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
			return year + '-' + month + '-' + day + " " + hour + ':' + min + ':' + sec
		} else {
			return year + '-' + month + '-' + day
		}
	},
	//回到首页
	toIndex() {
		window.location.href = '/#/index'
	},
	//回到登录
	toLogin() {
		window.location.href = '/#/'
	},
	//获取url基础路径
	getUrl(){
		let url = window.location.href.split('#')[0] + '#'
		return url
	},
	//支付完成重置购物车
	renderCart(v) {
		let cartList = JSON.parse(JSON.stringify(v.$store.getters.getCartList))
		let checkList = JSON.parse(JSON.stringify(v.$store.getters.getCheckList))
		cartList.map(function(i, idx) {
			checkList.map(function(j) {
				if(j == i.checkId) {
					delete cartList[idx]
				}
			})
		})
		for(var i = 0; i < cartList.length; i++) {
			if(cartList[i] == "" || typeof(cartList[i]) == "undefined") {
				cartList.splice(i, 1);
				i = i - 1;
			}
		}
		v.$store.commit('setCartList', cartList)
		v.$store.commit('setCartSelect', [])
		v.$store.commit('setCartSelect2', [])
		v.$store.commit('setCheckList', [])
	},
	//微信扫一扫
	wxSaoConfig(v) {
		var params = encodeURI(encodeURI(document.location.href))
		v.$get("https://wx.linksfield.net/payment/weixinsao?reqUrl=" + params).then((res) => {
			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
				appId: res.appId, // 必填，公众号的唯一标识  
				timestamp: res.timestamp, // 必填，生成签名的时间戳  
				nonceStr: res.nonceStr, // 必填，生成签名的随机串  
				signature: res.signature, // 必填，签名，见附录1  
				jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2  
			})
		})
	},
	//公众号支付
	wxPay(v, obj, url) {
		let lang = localStorage.getItem("lang") == 'en' ? false : true
		v.$post('https://wx.linksfield.net/payment/weixinPublic', {
			tradeType: 'weixinPublic',
			tradeData: obj
		}).then((res) => {
			if(res.data.tradeRstCode == '0000') {
				v.loading.hide()
				let appIdVal = res.data.tradeData.appId;
				let timeStampVal = res.data.tradeData.timeStamp;
				let nonceStrVal = res.data.tradeData.nonceStr;
				let packageVal = res.data.tradeData.packageStr;
				let signTypeVal = res.data.tradeData.signType;
				let paySignVal = res.data.tradeData.paySign;

				function onBridgeReady() {
					v.payShow = false
					WeixinJSBridge.invoke('getBrandWCPayRequest', {　　　　　　　　　　
						appId: appIdVal,
						timeStamp: timeStampVal,
						nonceStr: nonceStrVal,
						package: packageVal,
						signType: signTypeVal,
						paySign: paySignVal
					}, function(res) {
						if(res.err_msg === 'get_brand_wcpay_request:ok') {
							window.location.href = url + '/1/' + obj.pId + '/1/' + v.$store.getters.getDeviceCode
						} else if(res.err_msg === 'get_brand_wcpay_request:cancel') {
							v.$tools.toast(v, lang ? '支付已取消' : 'Payment has been cancelled', 1500)
						} else if(res.err_msg === 'get_brand_wcpay_request:fail') {
							window.location.href = url + '/0/' + obj.pId + '/1/' + v.$store.getters.getDeviceCode
						}
					})
				}
				if(typeof WeixinJSBridge == "undefined") {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					}
				} else {
					onBridgeReady();
				}
			} else {
				v.loading.hide()
				v.$tools.alert(v, res.data.tradeRstMessage, v.$tools.toIndex)
			}
		}).catch(err => {
			v.loading.hide()
		})
	},
	//H5支付
	wxPayH5(v, obj, url) {
		v.$post('https://wx.linksfield.net/payment/weixinWeb', {
			tradeType: 'weixinWeb',
			tradeData: obj
		}).then((res) => {
			if(res.data.tradeRstCode == '0000') {
				v.loading.hide()
				v.payShow = false
				let wxPayUrl = res.data.tradeData.mweb_url + '&redirect_url=' + encodeURIComponent(url)
				window.location.href = wxPayUrl
			} else {
				v.loading.hide()
				v.$tools.alert(v, res.data.tradeRstMessage, v.$tools.toIndex)
			}
		}).catch(err => {
			v.loading.hide()
		})
	},
	//wx二维码支付
	wxPayCode(v, obj) {
		v.$post('https://wx.linksfield.net/payment/weixinScan', {
			tradeType: 'weixinScan',
			tradeData: obj
		}).then((res) => {
			//支付code_url转二维码
			$("#qrcode").html('');
			let qrcode = new QRCode(document.getElementById("qrcode"), {
				width: 200,
				height: 200
			});
			qrcode.makeCode(res.data.tradeData.code_url)
			v.payCode = true
		}).catch(err => {
			v.loading.hide()
		})
	},
	//钱海支付
	oceanPay(v, obj) {
		v.$post('https://wx.linksfield.net/payment/oceanPay', {
			tradeType: 'oceanPay',
			tradeData: obj
		}).then((res) => {
			if(res.data.tradeRstCode == '0000') {
				v.loading.hide()
				let result = res.data.tradeData
				$("#account").val(result.account)
				$("#backUrl").val(result.backUrl)
				$("#billing_address").val(result.billing_address)
				$("#billing_city").val(result.billing_city)
				$("#billing_country").val(result.billing_country)
				$("#billing_email").val(result.billing_email)
				$("#billing_firstName").val(result.billing_firstName)
				$("#billing_lastName").val(result.billing_lastName)
				$("#billing_zip").val(result.billing_zip)
				$("#methods").val(result.methods)
				$("#noticeUrl").val(result.noticeUrl)
				$("#order_amount").val(result.order_amount)
				$("#order_currency").val(result.order_currency)
				$("#order_number").val(result.order_number)
				$("#signValue").val(result.signValue)
				$("#terminal").val(result.terminal)
			} else {
				v.loading.hide()
				v.$tools.alert(v, res.data.tradeRstMessage, v.$tools.toIndex)
			}
		}).catch(err => {
			v.loading.hide()
		})
	},
	//paypal支付
	paypalPay(v, obj, url) {
		v.$post('https://wx.linksfield.net/payment/paypal', {
			tradeType: 'paypal',
			tradeData: obj
		}).then((res) => {
			if(res.data.tradeRstCode == '0000') {
				v.loading.hide()
				paypal.Button.render({
					env: 'production',
					client: {
						production: res.data.tradeData.clientId
					},
					commit: true,
					style: {
						label: 'paypal',
						tagline: 'true',
						size: 'responsive', // small | medium | large | responsive
						shape: 'pill', // pill | rect
						color: 'blue', // gold | blue | silver | black
					},
					payment: function(data, actions) {
						return actions.payment.create({
							payment: {
								transactions: [{
									amount: {
										total: obj.payAmount,
										currency: 'USD'
									},
									"description": "订单",
									"invoice_number": obj.payId
								}]
							}
						});
					},
					onAuthorize: function(data, actions) {
						return actions.payment.execute().then(function() {
							window.location.href = url
						});
					}
				}, '#paypal');

			} else {
				v.loading.hide()
				v.$tools.alert(v, res.data.tradeRstMessage, v.$tools.toIndex)
			}
		}).catch(err => {
			v.loading.hide()
		})
	}

};

export default tools;