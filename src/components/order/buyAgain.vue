<template>
	<div class="body-container bg buyAgain">
		<div class="scrollContent">
			<div class="content">
				<div class="title">{{$t("message.ddxd")}}</div>
				<div class="contentBg">
					<p class="til">{{$t("message.orderDetail")}}</p>
					<!--选择数量-->
					<div class="tcNum">
						<ul v-if="numberList.length > 0">
							<li v-for="(i,idx) in numberList">
								<div class="top clearfix">
									<p class="name text-1">{{i.packageName}}</p>
									<!--<p class="detail">{{i.detail}}</p>-->
									<p class="price">{{$t('message.yuanFH')}}{{i.paymentAmount}}</p>
								</div>
								<div class="bottom">
									<p class="detail">
										{{$t("message.orderPeriod")}}:{{i.orderPeriod}} {{(i.packageType == '0' || i.packageType == '1')? $t("message.day") : (i.packageType == '5' ? $t("message.nian") : $t("message.yue") ) }}
									</p>
									<number-bar @currentNum="currentNumber(idx, arguments)" :currentNumber='i.currentNumber' :type="true"></number-bar>
								</div>
							</li>
						</ul>
					</div>
					<div class="lineB"></div>

					<!--匹配卡-->
					<div class="tcBox">
						<p class="til">{{$t("message.meatch")}}</p>
						<ul class="contentList" v-if="matchList.length > 0">
							<li v-for="(i,idx) in matchList">
								<div class="top flex">
									<p class="name text-2 flex-1">{{i.packageName}}</p>
									<!--<p class="detail">{{i.detail}}</p>-->
									<p class="price">{{$t('message.yuanFH')}}{{i.paymentAmount}}</p>
								</div>
								<div class="line"></div>
								<div class="bottom">
									<span class="card" v-if="i.deviceCode">{{i.deviceCode}}</span>
									<span class="noCard" v-else>{{$t("message.xzkp")}}</span>
								</div>
								<div class="chooseCard" @click="chooseCard(idx)">
									<img src="../../assets/image/xiala.png" />
								</div>
							</li>
						</ul>
						<p class="noPackages" v-else>{{$t("message.noData")}}</p>
					</div>
					<div class="lineB"></div>

					<div class="costBox">
						<p class="secondTil">{{$t("message.costDetail")}}</p>
						<ul class="contentList" v-if="costDetails">
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.tcCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}{{total}}
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!--支付按钮-->
		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.back')}}</cube-button>
			<cube-button class="color flex-1" @click="buyNext">
				<span>{{$t("message.yuanFH")}}{{total?total:0}}</span> {{$t("message.pay")}}
			</cube-button>
		</div>

		<!--支付方式弹窗-->
		<div class="masker" v-if="payShow" @click="hidePay()"></div>
		<div class="maskBox payBox" :class="{'show': payShow}">
			<p class="til">{{$t("message.payment")}}</p>
			<p class="priceActive">{{(payType == 3 ? ('$' + xdPriceUSD):('￥' + xdPriceCNY))}}</p>
			<ul class="pauType">
				<li :class="{'active': payType == 1}" @click="payTypeFunc(1)">
					<i class="wx"></i><span>{{$t("message.WxPay")}}</span>
				</li>
				<li :class="{'active': payType == 2}" @click="payTypeFunc(2)" v-if="!isWx">
					<i class="qh"></i><span>{{$t("message.QhPay")}}</span>
				</li>
				<li :class="{'active': payType == 3}" @click="payTypeFunc(3)" v-if="!isWx">
					<i class="py"></i><span>{{$t("message.PyPal")}}</span>
				</li>
			</ul>
			<div id="paypal" v-show="payType==3"></div>
			<cube-button v-show="payType!=3" class="color" @click="payFunc(payObj.payId)">{{$t("message.confirm")}}</cube-button>
		</div>

		<!--二维码弹窗-->
		<div class="masker" v-if="payCode" @click="payCode=false"></div>
		<div class="payCodeBox" :class="{'show': payCode}">
			<div id="qrcode"></div>
			<p class="tips">{{$t("message.codeTips")}}</p>
			<cube-button class="color" @click="codePayFunc()">{{$t("message.yzf")}}</cube-button>
		</div>

		<!--钱海表单-->
		<div class="oceanBox">
			<form action="https://secure.oceanpayment.com/gateway/service/test" method="post" id="oceanForm">
				<input type="hidden" name="account" id="account" value="" />
				<input type="hidden" name="backUrl" id="backUrl" value="" />
				<input type="hidden" name="billing_address" id="billing_address" value="" />
				<input type="hidden" name="billing_city" id="billing_city" value="" />
				<input type="hidden" name="billing_country" id="billing_country" value="" />
				<input type="hidden" name="billing_email" id="billing_email" value="" />
				<input type="hidden" name="billing_firstName" id="billing_firstName" value="" />
				<input type="hidden" name="billing_lastName" id="billing_lastName" value="" />
				<input type="hidden" name="billing_phone" id="billing_phone" value="" />
				<input type="hidden" name="billing_zip" id="billing_zip" value="" />
				<input type="hidden" name="methods" id="methods" value="" />
				<input type="hidden" name="noticeUrl" id="noticeUrl" value="" />
				<input type="hidden" name="order_amount" id="order_amount" value="" />
				<input type="hidden" name="order_currency" id="order_currency" value="" />
				<input type="hidden" name="order_number" id="order_number" value="" />
				<input type="hidden" name="signValue" id="signValue" value="" />
				<input type="hidden" name="terminal" id="terminal" value="" />
			</form>
		</div>
	</div>
</template>

<script>
	import NumberBar from '../model/number'
	export default {
		name: 'buyAgain',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				isWx: this.$store.getters.getOpenId ? true : false,
				currentObj: this.$store.getters.getCurrentPackage,
				tcList: [],
				numberList: [],
				matchList: [],
				costDetails: null,
				payDetails: null,
				packageUsingDetails: [],
				cardList: [],
				payType: 1, //1微信      2//钱海    3//paypal
				payShow: false,
				payCode: false,
				payObj: null,
				xdPriceCNY: '0',
				xdPriceUSD: '0',
				total: '0'
			}
		},
		components: {
			NumberBar
		},
		watch: {
			matchList(newVal) {
				var that = this
				this.$nextTick(function() {
					let totalCNY = 0
					let totalUSD = 0
					newVal.map(function(i) {
						totalCNY = totalCNY + Number(i.xdPriceCNY)
						totalUSD = totalUSD + Number(i.xdPriceUSD)
					})
					that.xdPriceCNY = totalCNY.toFixed(2)
					that.xdPriceUSD = totalUSD.toFixed(2)
					that.total = that.langType ? 　totalCNY.toFixed(2) : totalUSD.toFixed(2)
				})
			}
		},
		created() {
			var that = this
			that.$tools.loading(that)
			that.$post('/myOrderDetails ', {
				tradeType: 'myOrderDetails ',
				tradeData: {
					deviceCode: that.$store.getters.getDeviceCode,
					payId: that.currentObj.payId
				}
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					that.tcList = res.data.packageMatch
					that.costDetails = res.data.costDetails
					that.payDetails = res.data.payDetails
					that.packageUsingDetails = res.data.packageUsingDetails

					//所有卡列表cardList
					that.packageUsingDetails.map(function(item, idx) {
						if(JSON.stringify(that.cardList).indexOf(item.deviceCode) == -1) {
							that.cardList.push({
								value: item.deviceCode,
								text:  item.deviceCode
							})
						}
					})

					//数量栏数组
					that.tcList.map(function(i) {
						let flag = true
						let index = 0
						that.numberList.map(function(j, idx) {
							if(i.packageCode == j.packageCode && i.orderPeriod == j.orderPeriod) {
								flag = false
								index = idx
							}
						})
						if(flag) {
							let obj = JSON.parse(JSON.stringify(i))
							obj.currentNumber = 1
							that.numberList.push(obj)
						} else {
							that.numberList[index].currentNumber++
						}
					})
					//形成匹配数组
					that.makeMatchList()

					that.loading.hide()
				} else {
					that.$tools.alert(that, res.data.tradeRstMessage)
					that.loading.hide()
				}
			}).catch(err => {
				that.loading.hide()
			})
		},
		mounted() {

		},
		methods: {
			back() {
				history.go(-1)
			},
			makeMatchList() {
				var that = this
				let arr = []
				that.numberList.map(function(item) {
					for(let i = 0; i < item.currentNumber; i++) {
						let obj = JSON.parse(JSON.stringify(item))
						obj.currentNumber = 1
						obj.deviceCode = ''
						arr.push(obj)
					}
				})
				that.matchList = arr
			},
			changeMatchList(idx, type) {
				var that = this
				let obj = JSON.parse(JSON.stringify(that.numberList[idx]))
				obj.deviceCode = ''
				let flag = false
				
				if(that.matchList.length == 0) {
					that.matchList.push(obj)
					return
				}
				
				for(let i = 0; i < that.matchList.length; i++) {
					if(that.matchList[i].orderPeriod == obj.orderPeriod && that.matchList[i].packageCode == obj.packageCode) {
						flag = true
					}
					//减为0   则末尾添加
					if(!flag && i == that.matchList.length - 1) {
						that.matchList.push(obj)
						break
					}

					//有套餐
					if(flag) {
						if(i == that.matchList.length - 1) {
							if(that.matchList[i].orderPeriod == obj.orderPeriod && that.matchList[i].packageCode == obj.packageCode) {
								if(type) {
									that.matchList.push(obj)
									break
								} else {
									that.matchList.splice(i, 1)
									break
								}
							} else {
								if(type) {
									that.matchList.splice(i, 0, obj)
									break
								} else {
									that.matchList.splice(i - 1, 1)
									break
								}
							}
						} else {
							if(that.matchList[i].orderPeriod != obj.orderPeriod || that.matchList[i].packageCode != obj.packageCode) {
								if(type) {
									that.matchList.splice(i, 0, obj)
									break
								} else {
									that.matchList.splice(i - 1, 1)
									break
								}
							}
						}
					}
				}
			},
			chooseCard(idx) {
				var that = this
				this.picker = this.$createPicker({
					title: that.langType ? '选择卡片' : 'Choose card',
					data: [that.cardList],
					onSelect: (selectedVal, selectedIndex, selectedText) => {
						that.matchList[idx].deviceCode = selectedVal[0]
						that.$forceUpdate()
					},
					onCancel: () => {}
				})
				this.picker.show()
			},
			currentNumber() {
				const index = arguments[0]
				const tag = arguments[1][0]
				this.numberList[index].currentNumber = tag
				this.changeMatchList(index, arguments[1][1])
			},
			payTypeFunc(i) {
				this.payType = i
			},
			hidePay() {
				this.payType = 1
				this.payShow = false
			},
			buyNext() {
				var that = this
				if(that.matchList.length != 0 && that.xdPriceCNY && that.xdPriceUSD) {
					let flag = false
					that.matchList.map(function(item) {
						if(!item.deviceCode) {
							flag = true
						}
					})
					if(flag) {
						that.$tools.alert(that, that.langType ? '请给每个套餐匹配卡片' : 'Please assign the cards to the packages')
						return
					}
					that.sendOrder()
				} else {
					that.$tools.alert(that, that.langType ? '请选择套餐！' : 'Please choose the packages!')
				}
			},
			sendOrder() {
				var that = this
				that.$tools.loading(that)

				let orderList = []
				let cardNo = []
				let deviceListArr = []

				this.matchList.map(function(item) {
					if(item.deviceCode && cardNo.indexOf(item.deviceCode) == -1) {
						cardNo.push(item.deviceCode)
					}
				})

				cardNo.map(function(item) {
					deviceListArr.push({
						deviceCode: item,
						orderList: []
					})
				})

				deviceListArr.map(function(i) {
					that.matchList.map(function(j) {
						console.log(i.deviceCode == j.deviceCode)

						if(i.deviceCode == j.deviceCode) {
							for(let t = 0; t < Number(j.currentNumber); t++) {
								let fee = null
								//当前套餐，当前支付类型下价格
								if(that.payType == 3) {
									fee = j.xdPriceUSD
								} else {
									fee = j.xdPriceCNY
								}
								let orderNo = that.$tools.getNo() + that.$tools.generate(5)
								i.orderList.push({
									cardFee: '0',
									expressFee: '0',
									globalOrder: '0',
									orderNo: orderNo,
									orderPeriod: j.orderPeriod,
									packageCode: j.packageCode,
									packageFee: fee,
									packageName: j.packageName,
									packageType: j.packageType,
								})
							}
						}
					})
				})

				let data = {
					deviceList: deviceListArr,
					partnerScope: that.$store.getters.getLoginType,
					payAmount: (that.payType == 3) ? that.xdPriceUSD : that.xdPriceCNY,
					payCurrency: (that.payType == 3) ? 'USD' : 'CNY',
					payId: that.$store.getters.getPartnerCode + that.$tools.getNo() + that.$tools.generate(5),
					requestOrderId: that.$store.getters.getRequestOrderId
				}
				that.$post('/userCardOrder', {
					tradeType: 'userCardOrder',
					tradeData: data
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.loading.hide()
						//paypal加载
						that.paypalRender(data.payId, that.xdPriceUSD)
						//ocean加载
						that.oceanRender(data.payId, that.xdPriceCNY)

						//调起支付
						that.payShow = true
						that.payObj = {
							payId: data.payId
						}
					} else {
						that.loading.hide()
						that.$tools.alert(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					that.loading.hide()
				})
			},
			payFunc(pId) {
				var that = this
				if(that.payType == 1) {
					if(that.$store.getters.getOpenId) {
						//wx公众号支付
						let returnUrl = that.$tools.getUrl() + '/payResult'
						let data = {
							appid: '',
							body: '',
							key: '',
							mch_id: '',
							openId: that.$store.getters.getOpenId,
							payAmount: that.xdPriceCNY,
							payId: pId
						}
						that.$tools.wxPay(that, data, returnUrl)
					} else {
						that.payShow = false
						that.$createActionSheet({
							title: that.langType ? '选择支付方式' : 'The Way of Payment for Wechat',
							cancelTxt: that.$t("message.cancel"),
							data: [{
									content: that.langType ? '转入微信支付' : 'To Wechat Payment',
									align: 'center'
								},
								{
									content: that.langType ? '微信扫码支付' : 'Wechat Code Payment',
									align: 'center'
								}
							],
							onSelect: (item, index) => {
								console.log(index)
								if(index == 0) {
									//wxH5支付
									let returnUrl = that.$tools.getUrl() + '/payResult/2/' + pId + '/1/' + that.$store.getters.getDeviceCode
									let data = {
										appid: '',
										body: '',
										key: '',
										mch_id: '',
										payAmount: that.xdPriceCNY,
										payId: pId,
										scene_info: ''
									}
									that.$tools.wxPayH5(that, data, returnUrl)
								} else {
									//扫码支付
									let data = {
										appid: '',
										body: '',
										key: '',
										mch_id: '',
										payAmount: that.xdPriceCNY,
										payId: pId
									}
									that.$tools.wxPayCode(that, data)
								}
							}
						}).show()
					}
				} else if(that.payType == 2) {
					//钱海支付
					//提交form表单
					$("#oceanForm").submit()
				} else {
					//paypal支付
					//显示paypal按钮即可
				}
				this.payShow = false
			},
			paypalRender(pId, total) {
				var that = this
				$("#paypal").html('')
				let returnUrl = that.$tools.getUrl() + '/payResult/2/' + pId + '/2/' + that.$store.getters.getDeviceCode
				let data = {
					clientId: '',
					clientSecret: '',
					mode: 'production',
					payAmount: total,
					payId: pId
				}
				that.$tools.paypalPay(that, data, returnUrl)
			},
			oceanRender(pId, total) {
				var that = this
				let returnUrl = that.$tools.getUrl() + '/payResult/2/' + pId + '/3/' + that.$store.getters.getDeviceCode
				let data = {
					account: '',
					backUrl: returnUrl,
					payAmount: total,
					payCurrency: 'CNY',
					payId: pId,
					secureCode: '',
					terminal: ''
				}
				that.$tools.oceanPay(that, data)
			},
			codePayFunc() {
				var that = this
				that.$router.push('/payResult/2/' + that.payObj.payId + '/1/' + that.$store.getters.getDeviceCode)
			},
		}
	}
</script>

<style lang="less" scoped>
	.buyAgain {
		overflow: hidden;
		background: #fff!important;
		.lineB {
			background: #f5f5f5;
			height: 0.7rem;
			margin: 0 -0.7rem;
		}
		.content {
			position: relative;
			z-index: 9;
			.contentBg {
				border-radius: 0.3rem;
				margin-bottom: 2.4rem;
				background: #fff;
				.til {
					font-size: 0.7rem;
					line-height: 1rem;
					border-bottom: 2px dotted #ccc;
					padding: 0 0 0.2rem;
				}
				.secondTil {
					font-size: 0.7rem;
					line-height: 1.2rem;
					margin-top: 0.5rem;
				}
				.tcNum {
					margin-bottom: 0.5rem;
					ul {
						li {
							border-radius: 0.5rem;
							padding: 0.2rem 0.5rem;
							margin-top: 0.6rem;
							border: 1px solid #ccc;
							.top {
								p {
									font-size: 0.7rem;
									&.name {
										line-height: 1rem;
										padding: 0.15rem 0;
										width: 60%;
										float: left;
									}
									&.detail {
										width: 30%;
										text-align: center;
										color: #a0a0a0;
										font-size: 0.6rem;
									}
									&.price {
										text-align: right;
										color: #F65200;
										font-size: 1rem;
										line-height: 1.3rem;
										float: right;
									}
								}
							}
							.bottom {
								text-align: right;
								padding-top: 0.2rem;
								.detail {
									float: left;
									font-size: 0.7rem;
									color: #999;
									line-height: 1.4rem;
								}
							}
						}
					}
				}
				.tcBox {
					padding: 0 .7rem;
					background: #f5f5f5;
					margin: 0 -.7rem;
					.til {
						border-bottom: none;
						padding: 0;
					}
					ul {
						li {
							position: relative;
							background: #fff;
							border-radius: 0.5rem;
							padding: 0.4rem 0.5rem;
							margin-top: 0.2rem;
							.top {
								p {
									float: left;
									font-size: 0.7rem;
									line-height: 1rem;
									padding: 0.1rem 0;
									&.name {
										padding-bottom: 0.3rem;
									}
									&.detail {
										width: 30%;
										text-align: center;
										font-size: 0.6rem;
										color: #a0a0a0;
									}
									&.price {
										text-align: right;
										padding-right: 2%;
										color: #F65200;
										font-size: 1rem;
										span {
											color: #a0a0a0;
											font-size: 0.8rem;
											padding-left: 0.3rem;
										}
									}
								}
							}
							.bottom {
								padding: 0.3rem 0 0.1rem;
								span.card {
									background: #F65200;
									font-size: 0.7rem;
									color: #fff;
									line-height: 0.7rem;
									height: 1.4rem;
									border-radius: 0.7rem;
									padding: 0 0.5rem;
								}
								span.noCard {
									font-size: 0.7rem;
									color: #999;
								}
							}
							.chooseCard {
								position: absolute;
								right: 0rem;
								bottom: 0rem;
								padding: 0.3rem 0.7rem;
								img {
									width: 1rem;
								}
							}
						}
					}
				}
				.costBox {
					ul {
						li {
							font-size: 0.7rem;
							color: #a0a0a0;
							line-height: 1rem;
							padding: 0.4rem 0;
							border-bottom: 1px solid #eee;
							&:last-child {
								border-bottom: none;
							}
							.thirdTil {
								float: left;
							}
							.total {
								float: right;
								max-width: 60%;
								span {
									display: inline-block;
								}
								i {
									font-style: normal;
								}
							}
						}
					}
				}
			}
		}
		.fixedBtns {
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
	.noPackages{
		margin-top:0.4rem;
		font-size:0.6rem;
		color:#a0a0a0;
	}
</style>