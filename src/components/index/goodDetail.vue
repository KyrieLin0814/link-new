<template>
	<div class="body-container bg goodDetail">
		<div class="scrollContent">
			<div class="head">
				<!--<div class="back" @click="back">{{$t("message.back")}}</div>-->
				<img :src="obj.picDetailspage ? obj.picDetailspage: $store.getters.getBaseBg " />
			</div>

			<div class="content">
				<div class="tcDetail">
					<p class="title">{{obj.packageName}}</p>
					<div class="tcText clearfix">
						<div class="price">
							{{$t("message.yuanFH")}}<span>{{currentPrice}}</span>
						</div>
						<div class="oldPrice" v-if="obj.specialPriceCNY">{{$t("message.yuanFH")}}{{currentOldPrice}}</div>
						<!--<div class="detail">{{obj.packageFlow}}MB/{{$t("message.day")}}</div>-->
					</div>

					<div class="timeBox" v-if="showRadio">
						<div class="time">
							<p class="til">{{$t("message.timeChoose")}}：</p>
							<div class="timeChecker">
								<cube-checker v-model="timeValue" :options="options" type="radio">
									<cube-checker-item v-for="item in options" :key="item.value" :option="item">
										<span class="timeItem">{{item.text}}{{$t("message.yue")}}</span>
									</cube-checker-item>
								</cube-checker>
							</div>
						</div>
					</div>

				</div>
				<div class="useOption">
					<div class="model">
						<p class="modelTitle country">{{$t("message.fggj")}}</p>
						<p class="countriesTxt">{{obj.coverCountry}}</p>
					</div>
					<div class="model">
						<p class="modelTitle useTxt">{{$t('message.sysm')}}</p>
						<img src="../../assets/image/useOption.jpg" />
					</div>

				</div>
			</div>

		</div>

		<div class="fixedBtns">
			<div class="number clearfix">
				<p class="tip">{{$t('message.buyNum')}}：</p>
				<div class="numBox">
					<number-bar @currentNum="currentNum"></number-bar>
				</div>
			</div>
			<div class="btns flex">
				<cube-button class="gray flex-1" @click="back">{{$t('message.back')}}</cube-button>
				<cube-button class="color flex-1" @click="addCart">{{$t('message.addCar')}}</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	import NumberBar from '../model/number'
	export default {
		name: 'goodDetail',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				showRadio: false,
				currentNumber: 1,
				orderPeriod: '1',
				obj: {},
				timeValue: null,
				options: [{
						value: '1',
						text: '1'
					},
					{
						value: '3',
						text: '3'
					},
					{
						value: '6',
						text: '6'
					},
					{
						value: '12',
						text: '12'
					}
				],
				currentPrice: null,
				currentOldPrice: null,
				currentPriceWx: null,
				currentPricePp: null,
			}
		},
		components: {
			NumberBar
		},
		watch: {
			timeValue: function(newVal) {
				this.$nextTick(function() {
					this.orderPeriod = this.timeValue
					this.currentPrice = this.$tools.priceFinal(this.obj, newVal)
					this.currentOldPrice = this.$tools.priceFinal(this.obj, newVal, 'yj')
					this.currentPriceWx = this.$tools.priceWx(this.obj, newVal)
					this.currentPricePp = this.$tools.pricePp(this.obj, newVal)
				})
			}
		},
		created() {
			var that = this
			var meal = that.$store.getters.getCurrentPackage
			that.$post('/packageDetails', {
				tradeType: 'packageDetails',
				tradeData: {
					packageCode: meal.packageCode,
					salesType: meal.salesType
				}
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					that.obj = res.data.tradeData[0]
					let packageType = that.obj.packageType
					if(packageType == '0') {
						//默认订购周期
						that.orderPeriod = that.obj.minOrderPeriod
						//新老显示价格 & 微信 /paypal价格
						that.currentPrice = that.$tools.priceShow(that.obj)
						that.currentOldPrice = that.$tools.priceShow(that.obj, 'yj')
						that.currentPriceWx = that.$tools.priceWx(that.obj, 0, 1)
						that.currentPricePp = that.$tools.pricePp(that.obj, 0, 1)
					} else if(packageType == '1' || packageType == '5') {
						//默认订购周期
						that.orderPeriod = '1'
						//新老显示价格 & 微信 /paypal价格
						that.currentPrice = that.$tools.priceShow(that.obj)
						that.currentOldPrice = that.$tools.priceShow(that.obj, 'yj')
						that.currentPriceWx = that.$tools.priceWx(that.obj, 0, 1)
						that.currentPricePp = that.$tools.pricePp(that.obj, 0, 1)
					} else {
						if(packageType == '3') {
							that.options.splice(0, 1)
						} else if(packageType == '4') {
							that.options.splice(0, 2)
						}
						that.timeValue = that.options[0].value
						that.showRadio = true
					}
				} else {
					that.$tools.toast(that, res.data.tradeRstMessage)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		mounted() {

		},
		methods: {
			back() {
				history.go(-1)
			},
			currentNum(num) {
				this.currentNumber = num
			},
			addCart() {
				var that = this
				if(this.$store.getters.getDeviceCode) {
					var currentObj = JSON.parse(JSON.stringify(this.obj))
					currentObj.orderPeriod = this.orderPeriod
					currentObj.currentNumber = this.currentNumber
					currentObj.currentPrice = this.currentPrice
					currentObj.currentOldPrice = this.currentOldPrice
					currentObj.currentPriceWx = this.currentPriceWx
					currentObj.currentPricePp = this.currentPricePp

					var cartList = this.$store.getters.getCartList
					//购物车是否存在该套餐
					var have = false
					var haveIdx = null
					cartList.map(function(item, idx) {
						if(currentObj.packageCode == item.packageCode && currentObj.orderPeriod == item.orderPeriod) {
							haveIdx = idx
							have = true
						}
					})
					if(have) {
						cartList[haveIdx].currentNumber = cartList[haveIdx].currentNumber + currentObj.currentNumber
					} else {
						cartList.push(currentObj)
					}

					this.$store.commit('setCartList', cartList)
					this.$router.push('/car')
				} else {
					this.$tools.alert(that, that.langType ? '请使用用户登录' : 'Please login with the user')
				}
			},
			buyNow() {
				this.$router.push('/confirmOrder')
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodDetail {
		.head {
			position: relative;
			margin: 0 -0.7rem;
			img {
				display: block;
				width: 100%;
			}
			.back {
				position: absolute;
				top: 0;
				left: 0;
				font-size: 0.7rem;
				height: 1.8rem;
				line-height: 1.9rem;
				color: #313131;
				padding: 0 0.5rem 0 1rem;
				margin-left: 0.5em;
				background: url(../../assets/image/left.png) no-repeat 0.2rem center;
				background-size: 0.4rem;
			}
		}
		.content {
			margin-top: -3rem;
			position: relative;
			z-index: 9;
			.tcDetail {
				background: #fff;
				padding: 0.7rem;
				border-radius: 0.5rem;
				.title {
					font-size: 0.8rem;
					font-weight: normal;
					line-height: 1.2rem;
					padding: 0.4rem 0;
				}
				.tcText {
					line-height: 1.4rem;
					padding-bottom: 0.3rem;
					.price {
						float: left;
						font-size: 0.9rem;
						color: #f65200;
						span {
							padding-left: 0.2rem;
							font-size: 1.2rem;
							font-weight: bold;
						}
					}
					.oldPrice {
						float: left;
						margin-left: 1rem;
						color: #a0a0a0;
						font-size: 0.8rem;
						text-decoration: line-through;
					}
					.detail {
						font-size: 0.6rem;
						float: right;
						color: #b5b5b5;
					}
				}
				.timeBox {
					padding-top: 0.8rem;
					border-top: 2px dotted #e7e7e7;
					.time {
						background: #f5f5f5;
						border-radius: 0.3rem;
						padding: 0.5rem;
						.til {
							font-size: 0.7rem;
							line-height: 1rem;
							margin-bottom: 0.5rem;
						}
					}
				}
			}
		}
		.useOption {
			border-radius: 0.5rem;
			overflow: hidden;
			background: #fff;
			padding: 0.5rem;
			margin-top: 1rem;
			margin-bottom: 5.6rem;
			.model {
				border-bottom: 2px dotted #e7e7e7;
				margin-bottom: 0.5rem;
				&:last-child {
					border-bottom: none;
				}
				.modelTitle {
					font-size: 0.7rem;
					line-height: 1rem;
					padding-left: 1.4rem;
					&.country {
						background: url(../../assets/image/xinhao.png) no-repeat left center;
						background-size: 1rem;
					}
					&.useTxt {
						background: url(../../assets/image/shuoming.png) no-repeat left center;
						background-size: 0.8rem;
					}
				}
				.countriesTxt {
					margin: 0.8rem 0;
					font-size: 0.6rem;
					line-height: 1rem;
				}
				img {
					display: block;
					width: 100%;
					margin-top: 0.5rem;
				}
			}
		}
		.fixedBtns {
			.number {
				padding-bottom: 0.3rem;
				border-bottom: 1px solid #f5f5f5;
				margin: 0 -1rem 0.3rem;
				padding: 0 1rem;
				.tip {
					float: left;
					font-size: 0.7rem;
					line-height: 1.6rem;
				}
				.numBox {
					float: right;
				}
			}
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
</style>