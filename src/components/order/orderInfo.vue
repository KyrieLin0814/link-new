<template>
	<div class="body-container bg orderInfo">
		<div class="scrollContent">
			<div class="head">
				<img src="../../assets/image/orderBg.png">
				<div class="title">{{$t("message.myOrder")}}</div>
			</div>

			<div class="content">
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
			</div>

			<div class="fixedBtns flex">
				<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
				<cube-button class="color flex-1">
					<span>{{$t("message.yuanFH")}}{{total}}</span> {{$t("message.nextBuy")}}
				</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderInfo',
		data() {
			return {
				langType: this.$lang,
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
				}]
			}
		},
		created() {

		},
		mounted() {
			var t = 0;
			this.tcList.map(function(item) {
				t = t + Number(item.price)
			})
			this.total = t
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
			margin-top: -4.5rem;
			padding: 1rem 0.7rem;
			border-radius: 0.3rem;
			margin-bottom: 3.6rem;
			box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.1);
			background: #fff;
			position: relative;
			z-index: 9;
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
				margin-top: 0.4rem;
			}
			.contentList {
				border-bottom: 2px dotted #ccc;
				padding: 0 0.7rem 0.5rem;
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
					border-bottom: 0;
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
		}
		.fixedBtns {
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
</style>