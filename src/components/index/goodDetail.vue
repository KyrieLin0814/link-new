<template>
	<div class="body-container bg goodDetail">
		<div class="scrollContent">
			<div class="head">
				<div class="back" @click="back">返回</div>
				<img :src="obj.picDetailspage" />
			</div>

			<div class="content">
				<div class="tcDetail">
					<p class="title">{{obj.packageName}}</p>
					<div class="tcText clearfix">
						<div class="price">{{$t("message.yuanFH")}}<span>{{langType ? obj.originalPriceCNY : obj.originalPriceUSD}}</span></div>
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
						<p class="modelTitle country">覆盖国家</p>
						<p class="countriesTxt">{{obj.coverCountry}}</p>
					</div>
					<div class="model">
						<p class="modelTitle useTxt">使用说明</p>
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
				<cube-button class="gray flex-1" @click="addCart">{{$t('message.addCar')}}</cube-button>
				<cube-button class="color flex-1" @click="buyNow">{{$t('message.buyNow')}}</cube-button>
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
				langType: this.$lang == 'cn',
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
				]
			}
		},
		components: {
			NumberBar
		},
		watch: {
			timeValue: function() {
				this.$nextTick(function() {
					this.orderPeriod = this.timeValue
				})
			}
		},
		created() {
			console.log(this.$store.getters.getCurrentPackage)
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
					let packageType = res.data.tradeData[0].packageType
					if(packageType == '0') {
						that.orderPeriod = res.data.tradeData[0].minOrderPeriod
					} else if(packageType == '1' || packageType == '5') {
						that.orderPeriod = '1'
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
				this.$router.push('/car')
			},
			buyNow() {
				this.$router.push('/car')
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
				&:last-child{
					border-bottom:none;
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
					margin-top:0.5rem;
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