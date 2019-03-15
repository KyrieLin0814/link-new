<template>
	<div class="body-container bg confirmOrder">
		<div class="scrollContent">

			<div class="topCcontent">
				<div class="title">{{$t("message.qrdd")}}</div>
				<div class="topBox flex">
					<div class="kp">
						<p class="til">{{$t("message.kpxx")}}</p>
					</div>
					<div class="kpContent flex-1">
						<cube-radio-group v-model="kpValue" :options="kpList" :horizontal="true" :hollowStyle="true" />
					</div>
				</div>

				<div class="topBox flex">
					<div class="kd">
						<p class="til">{{$t("message.kdxx")}}</p>
					</div>
					<div class="kdContent flex-1">
						<p class="text-1" :class="{'txt': address }" @click="addressFunc">{{address ? address : (langType ? '编辑' :'Edit')}}</p>
					</div>
				</div>

				<div class="topBox flex">
					<div class="kp">
						<p class="til">{{$t("message.kdlx")}}</p>
					</div>
					<div class="kpContent flex-1">
						<cube-radio-group v-model="kdValue" :options="kdList" :horizontal="true" :hollowStyle="true" />
					</div>
				</div>
			</div>

			<p class="secondTtil">{{$t("message.meatch")}}</p>

			<div class="meatchBox">
				<div class="tcBox">
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
							<div class="chooseCard" @click="chooseCard">
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
				<span>{{$t("message.yuanFH")}}{{total}}</span> {{$t("message.pay")}}
			</cube-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'confirmOrder',
		data() {
			return {
				langType: this.$lang == 'cn',
				kpValue: '1',
				kpList: [{
					label: this.$t("message.haveCard"),
					value: '1'
				}, {
					label: this.$t("message.noCard"),
					value: '0'
				}],
				kdValue: '1',
				kdList: [{
					label: this.$t("message.ptkd") + this.$t("message.yuanFH") + 10,
					value: '1'
				}, {
					label: this.$t("message.sf") + this.$t("message.yuanFH") + 15,
					value: '0'
				}],
				address: '',
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
				kd: '10',
				kf: '10',
				total: 0,
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
			},
			addressFunc() {

			},
			chooseCard() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.confirmOrder {
		.topCcontent {
			background: #fff;
			margin: 0 -0.7rem;
			padding: 0 0.7rem;
			.topBox {
				font-size: 0.7rem;
				line-height: 2rem;
				border-bottom: 1px solid #eee;
				.til {
					padding-right:0.5rem;
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
			margin-bottom:1rem;
			.tcBox {
				ul {
					li {
						position: relative;
						background: #fff;
						border-radius: 0.5rem;
						padding: 0.4rem 0.5rem;
						margin-bottom: 0.5rem;
						.top {
							border-bottom: 2px dotted #f5f5f5;
							p {
								float: left;
								font-size: 0.7rem;
								line-height: 1.2rem;
								&.name {
									width: 40%;
									padding-bottom: 0.3rem;
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
			margin:0 -0.7rem 2.4rem;
			padding:0 0.7rem;
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