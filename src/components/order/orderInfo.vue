<template>
	<div class="body-container bg orderInfo">
		<div class="scrollContent">
			<div class="head">
				<img src="../../assets/image/orderBg.png">
				<div class="title">{{$t("message.myOrder")}}</div>
			</div>

			<div class="content">

				<div class="okBox">
					<p class="wc">{{$t("message.orderSuccess")}}</p>
					<p class="code">
						<span>{{$t("message.order")}}:{{currentObj.orderId}}</span>
						<span class="date">{{$tools.timeShow(currentObj.orderTime,1)}}</span>
					</p>
				</div>

				<div class="contentBg">
					<p class="til">{{$t("message.orderDetail")}}</p>
					<div class="tcBox">
						<p class="secondTil">{{$t("message.meatch")}}</p>
						<ul class="contentList" v-if="tcList.length > 0">
							<li v-for="i in tcList">
								<div class="top flex">
									<p class="name flex-1 text-2">{{i.packageName}}</p>
									<!--<p class="detail">{{i.detail}}</p>-->
									<p class="price">{{$t('message.yuanFH')}}{{i.paymentAmount}}</p>
								</div>
								<div class="bottom">
									<span class="card">{{$t("message.card")}}{{i.cardNum}}</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="costBox">
						<p class="secondTil">{{$t("message.costDetail")}}</p>
						<ul class="contentList" v-if="costDetails">
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.tcCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}{{costDetails.packageFee}}
									</span>
								</div>
							</li>
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.kdCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}<span>{{costDetails.expressFee}}</span>
								</div>
							</li>
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.kpCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}<span>{{costDetails.cardFee}}</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="payBox" v-if="payDetails">
						<p class="secondTil">{{$t("message.payDetail")}}</p>
						<ul class="contentList">
							<li>{{$t("message.jyfs")}}：{{$t("message.payArr")[payDetails.paymentType]}}</li>
							<li>{{$t("message.jyhm")}}：{{payDetails.transactionId}}</li>
							<li>{{$t("message.jyls")}}：{{payDetails.orderId}}</li>
						</ul>
					</div>

					<div class="tcBox">
						<p class="secondTil">{{$t("message.tcDetail")}}</p>
						<div class="cards clearfix">
							<span class="cardItem" v-for="(i,idx) in packageUsingDetails" :class="{'active': i.deviceCode == activeCard}" @click="alertFunc(i)">{{$t("message.card")}}{{idx+1}}</span>
						</div>
					</div>

				</div>

			</div>
		</div>

		<div class="masker" v-if="payShow" @click="payShow = !payShow"></div>
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
			<cube-button v-show="payType!=3" class="color" @click="payFunc(payObj.payId, payObj.payAmount)">{{$t("message.confirm")}}</cube-button>
		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.back')}}</cube-button>
			<cube-button class="color flex-1" @click="buyNext()">
				<!--<span>{{$t("message.yuanFH")}}{{total?total:0}}</span>-->
				{{$t("message.nextBuy")}}
			</cube-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderInfo',
		data() {
			return {
				langType: this.$lang == 'cn',
				isWx: this.$store.getters.getOpenId ? true : false,
				currentObj: this.$store.getters.getCurrentPackage,
				total: 0,
				tcList: [],
				costDetails: null,
				payDetails: null,
				packageUsingDetails: [],
				activeCard: null,
				payType: 1, //1微信      2//钱海    3//paypal
				payShow: false,
				payObj: null,
				xdPriceCNY: null,
				xdPriceUSD: null,
			}
		},
		created() {
			var that = this
			that.$tools.loading(that)
			that.$post('/myOrderDetails ', {
				tradeType: 'myOrderDetails ',
				tradeData: {
					deviceCode: that.$store.getters.getDeviceCode,
					orderId: that.currentObj.orderId
				}
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					that.tcList = res.data.packageMatch
					that.costDetails = res.data.costDetails[0]
					that.payDetails = res.data.payDetails[0]
					that.total = Number(that.costDetails.cardFee) + Number(that.costDetails.expressFee) + Number(that.costDetails.packageFee)
					that.packageUsingDetails = res.data.packageUsingDetails
					that.activeCard = that.packageUsingDetails[0].deviceCode
					that.xdPriceCNY = res.data.xdPriceCNY
					that.xdPriceUSD = res.data.xdPriceUSD

					for(let i = 0; i < that.packageUsingDetails.length; i++) {
						for(let j = 0; j < that.tcList.length; j++) {
							if(that.packageUsingDetails[i].deviceCode == that.tcList[j].deviceCode) {
								that.tcList[j].cardNum = i + 1
							}
						}
					}

					that.loading.hide()
					that.payResultFunc()
				} else {
					that.$tools.alert(that, res.data.tradeRstMessage)
					that.loading.hide()
					that.payResultFunc()
				}
			}).catch(err => {
				that.loading.hide()
				that.payResultFunc()
			})
		},
		mounted() {

		},
		methods: {
			back() {
				history.go(-1)
			},
			payResultFunc() {
				//wxH5 支付结果
				let type = this.$route.query.type
				let pId = this.$route.query.payId
				if(type == 'payResult') {
					var that = this
					that.$tools.alert(that, that.langType ? '查看支付结果' : 'View payment results', function() {
						that.$tools.loading(that)
						that.$post('https://wx.linksfield.net/payment/weixinQuery', {
							tradeType: 'weixinQuery',
							tradeData: {
								appid: '',
								key: '',
								mch_id: '',
								payId: pId
							}
						}).then((res) => {
							that.loading.hide()
							that.$tools.alert(that, res.data.tradeRstMessage, function() {
								that.$router.push('/index')
							})
						}).catch(err => {
							that.loading.hide()
						})
					})
				}
			},
			alertFunc(i) {
				var that = this
				that.$tools.loading(that)
				that.activeCard = i.deviceCode
				that.$post('/usedPackageDetails  ', {
					tradeType: 'usedPackageDetails  ',
					tradeData: {
						deviceCode: i.deviceCode,
						orderId: that.currentObj.orderId
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						var cardObj = res.data.tradeData
						that.$createDialog({
							type: 'alert',
							title: that.$t("message.tcDetail"),
							confirmBtn: {
								text: that.$t("message.confirm"),
								active: true
							}
						}, (createElement) => {
							return [
								createElement('div', {
									'class': {
										'tcContent': true
									},
									slot: 'content'
								}, [
									createElement('p', that.$t('message.cardId') + '：' + (cardObj.deviceCode ? cardObj.deviceCode : '——')),
									createElement('p', that.$t('message.totalLL') + '：' + (cardObj.totalFlow ? (cardObj.totalFlow + 'MB') : '——')),
									createElement('p', that.$t('message.usedLL') + '：' + (cardObj.usedFlow ? (cardObj.usedFlow + 'MB') : '——')),
									createElement('p', that.$t('message.startTime') + '：' + (cardObj.activeTime ? that.$tools.timeShow(cardObj.activeTime) : '——')),
									createElement('p', that.$t('message.endTime') + '：' + (cardObj.deadlineTime ? that.$tools.timeShow(cardObj.deadlineTime) : '——')),
									createElement('p', that.$t('message.cTime') + '：' + (cardObj.actualEndTime ? that.$tools.timeShow(cardObj.actualEndTime) : '——')),
								])
							]
						}).show()
						that.loading.hide()
					} else {
						that.$tools.alert(that, res.data.tradeRstMessage)
						that.loading.hide()
					}
				}).catch(err => {
					that.loading.hide()
				})
			},
			payTypeFunc(i) {
				this.payType = i
				console.log(i)
			},
			buyNext() {
				var that = this
				if(that.tcList.length != 0 && that.xdPriceCNY && that.xdPriceUSD) {
					that.sendOrder()
				} else {
					that.$tools.alert(that, that.langType ? '订单异常！' : 'Order exception！', that.$tools.toIndex)
				}
			},
			sendOrder() {
				var that = this
				that.$tools.loading(that)
				let orderNo = that.$tools.getNo() + that.$tools.generate(5)
				let deviceListArr = [{
					deviceCode: that.costDetails.deviceCode,
					orderList: [{
						cardFee: that.costDetails.cardFee,
						expressFee: that.costDetails.expressFee,
						globalOrder: '0',
						orderNo: orderNo,
						orderPeriod: '1',
						packageCode: that.tcList[0].packageCode,
						packageFee: (that.payType == 3) ? that.xdPriceUSD : that.xdPriceCNY,
						packageName: that.tcList[0].packageName,
						packageType: that.tcList[0].packageType,
					}]
				}]

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
						that.paypalRender(data.payId, data.payAmount)

						//调起支付
						that.payShow = !that.payShow
						that.payObj = {
							payId: data.payId,
							payAmount: data.payAmount
						}
					} else {
						that.$tools.alert(that, res.data.tradeRstMessage, that.$tools.toIndex)
					}
				}).catch(err => {
					that.loading.hide()
				})
			},
			payFunc(pId, total) {
				var that = this
				if(that.payType == 1) {
					if(that.$store.getters.getOpenId) {
						//wx公众号支付
						let data = {
							appid: '',
							body: '',
							key: '',
							mch_id: '',
							openId: that.$store.getters.getOpenId,
							payAmount: total,
							payId: pId
						}
						that.$tools.wxPay(that, data)
					} else {
						let url = window.location.href + '?type=payResult&payId=' + pId
						//wxH5支付
						let data = {
							appid: '',
							body: '',
							key: '',
							mch_id: '',
							payAmount: total,
							payId: pId,
							scene_info: ''
						}
						that.$tools.wxPayH5(that, data, url)
					}
				} else if(that.payType == 2) {
					//钱海支付
					that.$tools.oceanPay(that, data)
				} else {
					//paypal支付
					//显示paypal按钮
				}
			},
			paypalRender(pId, total) {
				$("#paypal").html('')
				var that = this
				let data = {
					clientId: '',
					clientSecret: '',
					mode: 'production',
					payAmount: total,
					payId: pId
				}
				that.$tools.paypalPay(that, data)
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderInfo {
		overflow: hidden;
		.head {
			position: relative;
			margin: 0 -0.7rem;
			img {
				display: block;
				width: 100%;
			}
			.title {
				position: absolute;
				left: 0.8rem;
				top: 0;
				color: #fff;
			}
		}
		.content {
			margin-top: -9rem;
			position: relative;
			z-index: 9;
			.okBox {
				color: #FFF;
				padding-bottom: 1rem;
				.wc {
					font-size: 1.2rem;
					line-height: 1.4rem;
					font-weight: bold;
				}
				.code {
					margin-top: 0.5rem;
					span {
						display: block;
						font-size: 0.7rem;
						&.date {
							font-size: 0.6rem;
							padding-top: 0.5rem;
						}
					}
				}
			}
			.contentBg {
				padding: 1rem 0.7rem;
				border-radius: 0.3rem;
				margin-bottom: 3.6rem;
				box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.1);
				background: #fff;
				.til {
					font-size: 0.8rem;
					line-height: 1rem;
					border-bottom: 2px dotted #ccc;
					padding: 0 0.7rem 0.5rem;
					margin: 0 -0.7rem;
				}
				.secondTil {
					font-size: 0.7rem;
					line-height: 1.2rem;
					margin-top: 0.5rem;
				}
				.contentList {
					border-bottom: 2px dotted #ccc;
					padding: 0 0.7rem 0.7rem;
					margin: 0 -0.7rem;
				}
				.tcBox {
					ul {
						li {
							background: #f5f5f5;
							border-radius: 0.5rem;
							padding: 0.4rem 0.5rem;
							margin-bottom: 0.5rem;
							.top {
								p {
									font-size: 0.7rem;
									&.name {
										line-height: 1rem;
										padding: 0.15rem 0;
										margin-right: 1rem;
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
									}
								}
							}
							.bottom {
								span {
									background: #F65200;
									font-size: 0.7rem;
									color: #fff;
									line-height: 1.4rem;
									height: 1.4rem;
									border-radius: 0.7rem;
									padding: 0 0.5rem;
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
				.payBox {
					ul {
						li {
							font-size: 0.6rem;
							color: #a0a0a0;
							line-height: 0.6rem;
							padding: 0.3rem 0;
						}
					}
				}
				.cards {
					padding: 0.4rem 0;
					.cardItem {
						border: 1px solid #a0a0a0;
						color: #a0a0a0;
						font-size: 0.7rem;
						line-height: 1.3rem;
						height: 1.4rem;
						border-radius: 0.7rem;
						padding: 0 0.6rem;
						margin: 0 0.5rem 0.5rem 0;
						&.active {
							border: 1px solid #F65200;
							background: #F65200;
							color: #fff;
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
</style>