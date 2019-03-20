<template>
	<div class="body-container bg orderInfo">
		<div class="scrollContent">
			<div class="head">
				<img src="../../assets/image/orderBg.png">
				<div class="title">{{$t("message.myOrder")}}</div>
			</div>

			<div class="content">

				<div class="okBox">
					<p class="wc">订单已完成，感谢！</p>
					<p class="code"><span>编号：0000025621</span><span class="date">2019-03-09 13:05</span></p>
				</div>

				<div class="contentBg">

					<p class="til">{{$t("message.orderDetail")}}</p>

					<div class="tcBox">
						<p class="secondTil">{{$t("message.meatch")}}</p>
						<ul class="contentList">
							<li v-for="i in tcList">
								<div class="top clearfix">
									<p class="name text-1">{{i.name}}</p>
									<p class="detail">{{i.detail}}</p>
									<p class="price">{{$t('message.yuanFH')}}{{i.price}}</p>
								</div>
								<div class="bottom">
									<span class="card">{{i.card}}</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="costBox">
						<p class="secondTil">{{$t("message.costDetail")}}</p>
						<ul class="contentList">
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.tcCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}<span v-for="(i,idx) in tcList">{{i.price}}<i v-if="idx != tcList.length-1">+</i>
								</span>
								</div>
							</li>
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.kdCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}<span>{{kd}} x 1</span>
								</div>
							</li>
							<li class="clearfix">
								<p class="thirdTil">{{$t("message.kpCost")}}</p>
								<div class="total">
									{{$t("message.yuanFH")}}<span>{{kf}} x 1</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="payBox">
						<p class="secondTil">{{$t("message.payDetail")}}</p>
						<ul class="contentList">
							<li>交易方式：支付宝</li>
							<li>交易号码：20215532645820003620</li>
							<li>交易流水：20215532640036452</li>
						</ul>
					</div>

					<div class="tcBox">
						<p class="secondTil">{{$t("message.tcDetail")}}</p>
						<div class="cards clearfix">
							<span class="cardItem" v-for="i in cardList" :class="{'active': i.val == '1'}">{{i.text}}</span>
						</div>
					</div>

				</div>

			</div>
		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
			<cube-button class="color flex-1">
				<span>{{$t("message.yuanFH")}}{{total}}</span> {{$t("message.nextBuy")}}
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
				kd: '10',
				kf: '10',
				total: 0,
				tcList: [{
					name: '套餐11111套餐11111套餐11111',
					detail: "50MB/月",
					price: "90",
					card: '卡1'
				}, {
					name: '套餐2222',
					detail: "100MB/月",
					price: "188",
					card: '卡1'
				}],
				cardList: [{
					text: '卡1',
					val: '1'
				}, {
					text: '卡2',
					val: '2'
				}, {
					text: '卡3',
					val: '3'
				}]
			}
		},
		created() {

		},
		mounted() {
			this.total = this.$tools.totalFunc(this.tcList, this.kd, this.kf)
		},
		methods: {
			back() {
				history.go(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderInfo {
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
						font-size: 0.7rem;
						&.date {
							font-size: 0.6rem;
							padding-left: 1rem;
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
									float: left;
									font-size: 0.7rem;
									line-height: 1.2rem;
									&.name {
										width: 40%;
									}
									&.detail {
										width: 30%;
										text-align: center;
									}
									&.price {
										width: 30%;
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
						border:1px solid #a0a0a0;
						color:#a0a0a0;
						font-size: 0.7rem;
						line-height: 1.3rem;
						height: 1.4rem;
						border-radius: 0.7rem;
						padding: 0 0.6rem;
						margin: 0 0.5rem 0.5rem 0; 
						&.active{
						border:1px solid #F65200;
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