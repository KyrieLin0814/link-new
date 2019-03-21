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
							{{$t("message.yuanFH")}}<span v-for="(i,idx) in tcList">{{i.price}}<i v-if="idx != tcList.length-1">+</i></span>
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

		<div class="masker" v-if="payShow" @click="payShowFunc"></div>
		<div class="maskBox" :class="{'show': payShow}">
			<p class="til">{{$t("message.payment")}}</p>
			<p class="priceActive"><span>{{$t("message.yuanFH")}}</span>{{total}}</p>
			<ul class="pauType">
				<li :class="{'active': payType == 1}" @click="payTypeFunc(1)">
					<i class="wx"></i><span>{{$t("message.WxPay")}}</span>
				</li>
			</ul>
			<cube-button class="color">{{$t("message.confirm")}}</cube-button>

		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
			<cube-button class="color flex-1" @click="payShowFunc">
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
				payShow: false,
				kpList: this.$store.getters.getOptionKpList,
				kdList: [{
					label: this.$t("message.ptkd") + this.$t("message.yuanFH") + 10,
					value: '0'
				}, {
					label: this.$t("message.sf") + this.$t("message.yuanFH") + 15,
					value: '1'
				}],
				cardList: [{
					text: '卡1',
					value: '1'
				}, {
					text: '卡2',
					value: '2'
				}],
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
				kpValue: '1',
				kdValue: '0',
				address: '',
				kd: '10',
				kf: '0',
				payType:1    //1微信  
			}
		},
		created() {

		},
		mounted() {},
		watch: {
			kpValue(newVal, oldVal) {
				if(newVal == '1') {
					this.kf = '0'
				}
				if(newVal == '0') {
					this.kf = '10'
				}
			},
			kdValue(newVal, oldVal) {
				if(newVal == '1') {
					this.kd = '15'
				}
				if(newVal == '0') {
					this.kd = '10'
				}
			},
		},
		computed: {
			total: function() {
				if(this.kpValue == '0') {
					return this.$tools.totalFunc(this.tcList, this.kd, this.kf)
				} else {
					return this.$tools.totalFunc(this.tcList)
				}

			}
		},
		methods: {
			back() {
				history.go(-1)
			},
			payShowFunc() {
				this.payShow = !this.payShow
			},
			addressFunc() {
				this.$router.push("/addressEdit")
			},
			payTypeFunc(i){
				this.payType = i
			},
			chooseCard() {
				var that = this
				this.picker = this.$createPicker({
					title: that.langType ? '选择卡片' : 'Choose card',
					data: [that.cardList],
					onSelect: (selectedVal, selectedIndex, selectedText) => {
						console.log(selectedVal)
						console.log(selectedIndex)
						console.log(selectedText)
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
									font-size:0.6rem;
									color:#a0a0a0;
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
		.maskBox {
			padding: 1rem 0.7rem;
			.priceActive {
				padding: 0 0.7rem;
				margin: 0.7rem -0.7rem 0;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
				font-size: 1.4rem;
				text-align: center;
				color: #F65200;
				line-height: 3rem;
				span {
					font-size: 1rem;
				}
			}
			ul.pauType {
				margin: 0 -0.7rem 0.7rem;
				li {
					position: relative;
					padding: 0 0.7rem;
					border-bottom: 1px solid #eee;
					span {
						display: inline-block;
						font-size: 0.7rem;
						line-height: 2.2rem;
						vertical-align: top;
					}
					i {
						display: inline-block;
						vertical-align: top;
						width: 1.2rem;
						height: 2.2rem;
						margin-right: 0.5rem;
						&.wx {
							background: url(../../assets/image/wx.png) no-repeat center;
							background-size: 1.2rem;
						}
					}
					&.active:after{
						content:'';
						display: inline-block;
						position: absolute;
						right: 1rem;
						top:0.6rem;
						width:0.9rem;
						height:0.5rem;
						border-bottom:2px solid #a0a0a0;
						border-left:2px solid #a0a0a0;
						transform:rotate(-45deg);
						-webkit-transform:rotate(-45deg);
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