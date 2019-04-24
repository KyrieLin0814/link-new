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
						<span>{{$t("message.order")}}:{{currentObj.payId}}</span>
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
					<div class="line"></div>

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
					<div class="line"></div>

					<div class="payBox" v-if="payDetails">
						<p class="secondTil">{{$t("message.payDetail")}}</p>
						<ul class="contentList">
							<li>{{$t("message.jyfs")}}：{{$t("message.payArr")[payDetails.paymentType]}}</li>
							<li>{{$t("message.jyhm")}}：{{payDetails.transactionId}}</li>
							<li>{{$t("message.jyls")}}：{{payDetails.payId}}</li>
						</ul>
					</div>
					<div class="line"></div>

					<div class="tcBox">
						<p class="secondTil">{{$t("message.tcDetail")}}</p>
						<div class="cards clearfix">
							<span class="cardItem" v-for="(i,idx) in cardList" :class="{'active': i.deviceCode == activeCard}" @click="alertFunc(i)">{{$t("message.card")}}{{idx+1}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--支付按钮-->
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
				langType: this.$store.getters.getLangType == 'cn',
				isWx: this.$store.getters.getOpenId ? true : false,
				currentObj: this.$store.getters.getCurrentPackage,
				total: 0,
				tcList: [],
				costDetails: null,
				payDetails: null,
				packageUsingDetails: [],
				cardList:[],
				activeCard: null,
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
					that.costDetails = res.data.costDetails[0]
					that.payDetails = res.data.payDetails[0]
					that.tcList.map(function(i){
						that.total  = that.total + Number(i.paymentAmount)
					})
					that.packageUsingDetails = res.data.packageUsingDetails
					
					that.packageUsingDetails.map(function(item){
						if(JSON.stringify(that.cardList).indexOf(item.deviceCode) == -1){
							//所有卡列表
							that.cardList.push(item)
						}
					})
					that.activeCard = that.cardList[0].deviceCode
					
					that.xdPriceCNY = res.data.xdPriceCNY
					that.xdPriceUSD = res.data.xdPriceUSD

					for(let i = 0; i < that.cardList.length; i++) {
						for(let j = 0; j < that.tcList.length; j++) {
							if(that.cardList[i].deviceCode == that.tcList[j].deviceCode) {
								that.tcList[j].cardNum = i + 1
							}
						}
					}
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
			alertFunc(i) {
				var that = this
				that.$tools.loading(that)
				that.activeCard = i.deviceCode
				that.$post('/usedPackageDetails  ', {
					tradeType: 'usedPackageDetails  ',
					tradeData: {
						deviceCode: i.deviceCode,
						orderId: ''
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
			buyNext() {
				this.$router.push("/buyAgain")
				
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
				/*box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.1);*/
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
					padding: 0 0.7rem 0.7rem;
					margin: 0 -0.7rem;
				}
				.line {
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