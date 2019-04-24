<template>
	<div class="body-container bg confirmOrder">
		<div class="scrollContent">
			<div class="topCcontent">
				<div class="title">{{$t("message.qrdd")}}</div>
				<div class="topBox flex">
					<div class="kp">
						<p class="til">{{$t("message.kpxx")}}</p>
					</div>
					<div class="kpContent flex-1 radioBox">
						<cube-radio-group v-model="kpValue" :options="kpList" :horizontal="true" :hollowStyle="true" />
					</div>
					<p class="editCard" @click="editCard">{{$t("message.editCard")}}</p>
				</div>

				<div class="topBox flex" v-if="kpValue=='0'">
					<div class="kd">
						<p class="til">{{$t("message.kdxx")}}</p>
					</div>
					<div class="kdContent flex-1">
						<p class="text-1" :class="{'txt': address }" @click="addressFunc">{{address ? address : (langType ? '编辑' :'Edit')}}</p>
					</div>
				</div>

				<div class="topBox flex" v-if="kpValue=='0'">
					<div class="kp">
						<p class="til">{{$t("message.kdlx")}}</p>
					</div>
					<div class="kpContent flex-1 radioBox">
						<cube-radio-group v-model="kdValue" :options="kdList" :horizontal="true" :hollowStyle="true" />
					</div>
				</div>
			</div>

			<p class="secondTtil">{{$t("message.meatch")}}</p>

			<div class="meatchBox">
				<div class="tcBox">
					<ul class="contentList">
						<li v-for="(i,idx) in tcList">
							<div class="top flex">
								<p class="name text-2 flex-1">{{i.packageName}}</p>
								<!--<p class="detail">{{i.detail}}</p>-->
								<p class="price">{{$t('message.yuanFH')}}{{i.currentPrice}}<span></span></p>
							</div>
							<div class="line"></div>
							<div class="bottom">
								<span class="card" v-if="i.card">{{i.cardText.split("：")[0]}}</span>
								<span class="noCard" v-else>{{$t("message.xzkp")}}</span>
							</div>
							<div class="chooseCard" @click="chooseCard(idx)">
								<img src="../../assets/image/xiala.png" />
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="costBox">
				<p class="secondTtil">{{$t("message.costDetail")}}</p>
				<ul class="contentList">
					<li class="clearfix">
						<p class="thirdTil">{{$t("message.tcCost")}}</p>
						<div class="total">
							{{$t("message.yuanFH")}}{{tcTotal}}</span>
						</div>
					</li>
					<li class="clearfix" v-show="kpValue == '0'">
						<p class="thirdTil">{{$t("message.kdCost")}}</p>
						<div class="total">
							{{$t("message.yuanFH")}}<span>{{kd}}</span>
						</div>
					</li>
					<li class="clearfix" v-show="kpValue == '0'">
						<p class="thirdTil">{{$t("message.kpCost")}}</p>
						<div class="total">
							{{$t("message.yuanFH")}}<span>{{kf}} &times; {{Number(kpNum)}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!--支付按钮-->
		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
			<cube-button class="color flex-1" @click="payShowFunc">
				<span>{{$t("message.yuanFH")}}{{total}}</span> {{$t("message.pay")}}
			</cube-button>
		</div>

		<!--支付方式弹窗-->
		<div class="masker" v-if="payShow" @click="hidePay()"></div>
		<div class="maskBox payBox" :class="{'show': payShow}">
			<p class="til">{{$t("message.payment")}}</p>
			<p class="priceActive">{{(payType == 3 ? ('$' + totalUSD):('￥' + totalCNY))}}</p>
			<ul class="pauType">
				<li :class="{'active': payType == 1}" @click="payTypeFunc(1)">
					<i class="wx"></i><span>{{$t("message.WxPay")}}</span>
				</li>
				<li :class="{'active': payType == 2}" @click="payTypeFunc(2)" v-if="!openId">
					<i class="qh"></i><span>{{$t("message.QhPay")}}</span>
				</li>
				<li :class="{'active': payType == 3}" @click="payTypeFunc(3)" v-if="!openId">
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
	export default {
		name: 'confirmOrder',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				payShow: false,
				openId: this.$store.getters.getOpenId,
				kpList: this.$store.getters.getOptionKpList,
				kdList: [{
					label: this.$t("message.ptkd") + this.$t("message.yuanFH") + this.$store.getters.getKDPrice,
					value: '1'
				}, {
					label: this.$t("message.sf") + this.$t("message.yuanFH") + this.$store.getters.getSFPrice,
					value: '2'
				}],
				cardList: [],
				cardListHave: this.$store.getters.getCardListHave,
				cardListNo: this.$store.getters.getCardListNo,
				tcList: this.$store.getters.getCartSelect2,
				addressObj: this.$store.getters.getAddressObj,
				kpValue: this.$store.getters.getKP,
				kdValue: this.$store.getters.getKD,
				kd: '0',
				kf: this.$store.getters.getKPPrice,
				kpNum: this.$store.getters.getKPNum,
				kpSelect: this.$store.getters.getKPSelect,
				address: '',
				payType: 1, //1微信      2//钱海    3//paypal
				payCode: false,
				payObj: null,
			}
		},
		watch: {
			kpValue(newVal, oldVal) {
				this.$store.commit("setKP", newVal)
				this.deleteCardBind()
				this.haveOrNo(newVal)
				this.kfFunc(0)
			},
			kdValue(newVal, oldVal) {
				var sf = this.$store.getters.getSFPrice;
				var kd = this.$store.getters.getKDPrice;
				if(newVal == '2') {
					this.kd = sf
				}
				if(newVal == '1') {
					this.kd = kd
				}
				this.$store.commit("setKD", newVal)
			},
		},
		computed: {
			//用来显示 跟随当前语言
			//总价
			total: function() {
				if(this.kpValue == '0') {
					return this.$tools.totalFunc(this.tcList, this.kd, this.kf, this.kpNum).toFixed(2)
				} else {
					return this.$tools.totalFunc(this.tcList).toFixed(2)
				}
			},
			//套餐价
			tcTotal: function() {
				return this.$tools.totalFunc(this.tcList).toFixed(2)
			},
			//用来支付   
			//根据支付方式,需要支付的最终中英文价格
			totalUSD: function() {
				var kfEn = this.$store.state.kpPriceEn
				var kdEn = (this.kdValue == '1') ? this.$store.state.kdPriceEn : this.$store.state.sfPriceEn

				if(this.kpValue == '0') {
					return this.$tools.totalFunc(this.tcList, kdEn, kfEn, this.kpNum, 'usd').toFixed(2)
				} else {
					return this.$tools.totalFunc(this.tcList, 0, 0, 0, 'usd').toFixed(2)
				}
			},
			totalCNY: function() {
				var kfCn = this.$store.state.kpPriceCn
				var kdCn = (this.kdValue == '1') ? this.$store.state.kdPriceCn : this.$store.state.sfPriceCn
				if(this.kpValue == '0') {
					return this.$tools.totalFunc(this.tcList, kdCn, kfCn, this.kpNum, 'cny').toFixed(2)
				} else {
					return this.$tools.totalFunc(this.tcList, 0, 0, 0, 'cny').toFixed(2)
				}
			}
		},
		created() {

		},
		mounted() {
			this.address = this.addressObj.areaTxt + this.addressObj.addressTxt
			this.kd = (this.kdValue == '1') ? this.$store.getters.getKDPrice : this.$store.getters.getSFPrice

			var that = this
			//微信 && 获取卡片信息
			if(this.openId && this.$store.getters.getCardListHave.length == 0) {
				this.getCard()
				this.cardListNo = [{
					text: (that.langType ? '卡' : 'Card') + '1',
					value: (that.langType ? '卡' : 'Card') + '1'
				}]
				this.$store.commit('setCardListNo', this.cardListNo)
			} else if(this.$store.getters.getCardListHave.length == 0 && this.$store.getters.getCardListNo.length == 0) {
				if(this.$store.getters.getYouke == '0') {
					this.cardListHave = [{
						value: that.$store.getters.getDeviceCode,
						text: (that.langType ? '卡' : 'Card') + '1' + "：" + that.$store.getters.getDeviceCode,
					}]
					this.$store.commit('setCardListHave', this.cardListHave)
				}
				this.cardListNo = [{
					text: (that.langType ? '卡' : 'Card') + '1',
					value: (that.langType ? '卡' : 'Card') + '1'
				}]
				this.$store.commit('setCardListNo', this.cardListNo)
			} else {
				this.cardListHave = this.$store.getters.getCardListHave
				this.cardListNo = this.$store.getters.getCardListNo
			}

			this.haveOrNo(this.kpValue)
		},
		methods: {
			back() {
				history.go(-1)
			},
			deleteCardBind() {
				this.tcList.map(function(item) {
					delete item.card
				})
				this.$store.commit('setCartSelect2', this.tcList)
			},
			kfFunc(type) {
				var num = 0;
				var cardNo = []
				if(type) {
					this.tcList.map(function(item) {
						if(item.card && cardNo.indexOf(item.card) == -1) {
							cardNo.push(item.card)
						}
					})
					num = cardNo.length
				}
				this.kpNum = num
				this.kpSelect = cardNo
				this.$store.commit("setKPNum", num)
				this.$store.commit("setKPSelect", cardNo)
			},
			haveOrNo(type) {
				if(type == '0') {
					this.cardList = this.cardListNo
				}
				if(type == '1') {
					this.cardList = this.cardListHave
				}
				this.$forceUpdate()
			},
			getCard() {
				var that = this
				//卡片列表
				this.$tools.loading(that)
				that.$post('/queryDeviceCode', {
					tradeType: 'queryDeviceCode',
					openId: that.openId
				}).then((res) => {
					var cardArr = []
					res.data.tradeData.map(function(item, idx) {
						cardArr.push({
							text: (that.langType ? '卡' : 'Card') + (idx + 1) + '：' + item.deviceCode,
							value: item.deviceCode
						})
					})
					that.cardListHave = cardArr
					that.$store.commit('setCardListHave', cardArr)
					that.haveOrNo(that.kpValue)
					that.loading.hide()
				}).catch(function() {
					that.loading.hide()
				})
			},
			addressFunc() {
				this.$router.push("/addressEdit")
			},
			payTypeFunc(i) {
				this.payType = i
			},
			hidePay() {
				this.payType = 1
				this.payShow = false
			},
			chooseCard(idx) {
				var that = this
				if(this.cardList.length == 0) {
					this.$tools.alert(that, that.langType ? '请根据有无卡片情况，编辑卡片信息' : 'Please edit the card information according to whether there are cards or not')
					return
				}
				this.picker = this.$createPicker({
					title: that.langType ? '选择卡片' : 'Choose card',
					data: [that.cardList],
					onSelect: (selectedVal, selectedIndex, selectedText) => {
						that.tcList[idx].card = selectedVal[0]
						that.tcList[idx].cardText = selectedText[0]
						that.$store.commit('setCartSelect2', that.tcList)
						//无卡情况，计算卡片数量
						that.kfFunc(1)
						that.$forceUpdate()
					},
					onCancel: () => {}
				})
				this.picker.show()
			},
			editCard() {
				if(this.kpValue == '0') {
					this.$router.push('/noCard')
				}
				if(this.kpValue == '1') {
					this.$router.push('/myCard')
				}
			},
			payShowFunc() {
				var that = this
				//检查卡片是否绑定
				var cardFlag = false
				that.tcList.map(function(item) {
					if(!item.card) {
						cardFlag = true
					}
				})
				if(cardFlag) {
					that.$tools.alert(that, this.langType ? '请给每个套餐匹配卡片' : 'Please assign the cards to the packages')
					return
				}
				//检查个人信息
				if(!that.addressObj.name && that.kpValue == '0') {
					that.$tools.alert(that, this.langType ? '快递信息不完整' : 'Incomplete Express information')
					return
				}

				//用户绑定接口
				this.$tools.loading(that)
				var deviceCodeArr = []
				this.cardList.map(function(item) {
					deviceCodeArr.push({
						deviceCode: item.value + ""
					})
				})
				that.$post('/userInfoReport ', {
					tradeType: 'userInfoReport ',
					tradeData: {
						deviceCodeList: deviceCodeArr,
						expressPrice: that.kd,
						expressType: that.kdValue,
						openId: that.$store.getters.getOpenId,
						recipientAddress: that.addressObj.areaTxt + that.addressObj.addressTxt,
						recipientCompany: that.addressObj.companyName,
						recipientEmail: that.addressObj.email,
						recipientName: that.addressObj.name,
						recipientPhone: that.addressObj.tel,
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.loading.hide()
						that.sendOrder()
					} else {
						that.loading.hide()
						that.$tools.alert(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					that.loading.hide()
					that.$tools.alert(that, res.data.tradeRstMessage)
				})
			},
			sendOrder() {
				var that = this
				if(that.kpValue == '0') {
					//无卡下单
					that.sendBaseFunc('userNoCardOrder')
				} else {
					//有卡下单
					that.sendBaseFunc('userCardOrder')
				}
			},
			sendBaseFunc(api) {
				var that = this
				this.$tools.loading(that)
				//整理下单请求参数
				var deviceListArr = []

				//有卡
				if(api == 'userCardOrder') {
					that.kpSelect.map(function(item) {
						deviceListArr.push({
							deviceCode: item,
							orderList: []
						})
					})
				}
				//无卡
				if(api == 'userNoCardOrder') {
					that.kpSelect.map(function(item) {
						deviceListArr.push({
							deviceCode: item,
							expressType: that.kdValue,
							orderList: [],
							recipientAddress: that.addressObj.areaTxt + that.addressObj.addressTxt,
							recipientCompany: that.addressObj.companyName,
							recipientEmail: that.addressObj.email,
							recipientName: that.addressObj.name,
							recipientPhone: that.addressObj.tel
						})
					})
				}

				deviceListArr.map(function(i) {
					that.tcList.map(function(j) {
						if(i.deviceCode == j.card) {
							for(let t = 0; t < Number(j.currentNumber); t++) {
								let fee = null
								//当前套餐，当前支付类型下价格
								if(that.payType == 3) {
									fee = j.currentPricePp
								} else {
									fee = j.currentPriceWx
								}
								let orderNo = that.$tools.getNo() + that.$tools.generate(5)
								i.orderList.push({
									cardFee: that.kf,
									expressFee: that.kd,
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
					payAmount: that.langType ? that.totalCNY : that.totalUSD,
					payCurrency: (that.payType == 3 ? 'USD' : 'CNY'),
					payId: that.$store.getters.getPartnerCode + that.$tools.getNo() + that.$tools.generate(5),
					requestOrderId: that.$store.getters.getRequestOrderId
				}
				that.$post('/' + api, {
					tradeType: api,
					tradeData: data
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.loading.hide()
						//paypal加载
						that.paypalRender(data.payId, that.totalUSD)
						//ocean加载
						that.oceanRender(data.payId, that.totalCNY)

						//调起支付
						that.payShow = true
						that.payObj = {
							payId: data.payId
						}
					} else if(res.data.tradeRstCode == '0010') {
						that.loading.hide()
						that.$tools.alert(that, res.data.tradeRstMessage, function() {
							that.$store.commit('setCardListHave', [])
							that.$store.commit('setCardListNo', [])
							that.kfFunc(0)
							that.deleteCardBind()
							that.$router.push('/loginUser?type=1')
						})
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
							payAmount: that.totalCNY,
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
								if(index == 0) {
									//wxH5支付
									let returnUrl = that.$tools.getUrl() + '/payResult/2/' + pId + '/1/' + that.$store.getters.getDeviceCode
									let data = {
										appid: '',
										body: '',
										key: '',
										mch_id: '',
										payAmount: that.totalCNY,
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
										payAmount: that.totalCNY,
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.confirmOrder {
		overflow: hidden;
		.topCcontent {
			background: #fff;
			margin: 0 -0.7rem;
			padding: 0 0.7rem;
			.topBox {
				font-size: 0.7rem;
				line-height: 2rem;
				border-bottom: 1px solid #eee;
				.til {
					padding-right: 0.5rem;
				}
				.kpContent {}
				.editCard {
					font-size: 0.6rem;
					color: #a0a0a0;
				}
				.kdContent {
					max-width: calc(100% - 4rem);
					p {
						width: calc(100% - 1rem);
						text-align: right;
						padding-right: 1rem;
						background: url(../../assets/image/right.png) no-repeat right center;
						background-size: 0.5rem;
						color: #a0a0a0;
						font-size: 0.6rem;
						&.txt {
							color: #313131;
						}
					}
				}
			}
		}
		.secondTtil {
			font-size: 0.8rem;
			line-height: 2rem;
		}
		.meatchBox {
			margin-bottom: 1rem;
			.tcBox {
				ul {
					li {
						position: relative;
						background: #fff;
						border-radius: 0.5rem;
						padding: 0.4rem 0.5rem;
						margin-bottom: 0.5rem;
						.top {
							p {
								float: left;
								font-size: 0.7rem;
								line-height: 1rem;
								padding:0.1rem 0;
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
							padding:0.3rem 0 0.1rem;
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
		}
		.costBox {
			margin: 0 -0.7rem 2.4rem;
			padding: 0 0.7rem;
			background: #fff;
			ul {
				li {
					font-size: 0.7rem;
					color: #a0a0a0;
					line-height: 1rem;
					padding: 0.4rem 0;
					border-bottom: 1px solid #eee;
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
		.fixedBtns {
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
</style>