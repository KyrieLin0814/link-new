<template>
	<div class="body-container bg orderList">
		<div class="scrollContent">
			<p class="title">
				<i @click="back"><img src="../../assets/image/left.png"/></i> {{$t("message.myOrder")}}
				<span>{{$t("message.gong")}}{{list.length}}{{$t("message.geOrder")}}</span>
			</p>

			<ul class="list" v-if="list.length > 0">
				<li class="item" v-for="i in list">
					<div class="top clearfix">
						<p>{{$t("message.order")}}：{{i.payId}}</p>
						<span>{{$tools.timeShow(i.orderTime)}}</span>
					</div>
					<p class="til">{{$t("message.tcCost")}}</p>
					<ul class="content">
						<li class="clearfix">
							<p class="costTxt">{{$t("message.tcCost")}}</p>
							<p class="costNum">{{$t("message.yuanFH")}}{{i.packageFee}}</p>
						</li>
						<li class="clearfix">
							<p class="costTxt">{{$t("message.kdCost")}}</p>
							<p class="costNum">{{$t("message.yuanFH")}}{{i.expressFee}}</p>
						</li>
						<li class="clearfix">
							<p class="costTxt">{{$t("message.kpCost")}}</p>
							<p class="costNum">{{$t("message.yuanFH")}}{{i.cardFee}}</p>
						</li>
					</ul>
					<div class="totalCost">{{$t("message.heji")}}：<span>{{$t("message.yuanFH")}}{{i.paymentAmount}}</span></div>
					<div class="line"></div>
					<cube-button class="color" @click="toInfo(i)">{{$t("message.clickToInfo")}}</cube-button>
				</li>
			</ul>
			<p class="noData" v-else>{{$t("message.emptyOrder")}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderList',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				list: []
			}
		},
		created() {
			var that = this
			that.$tools.loading(that)
			that.$post('/myOrder ', {
				tradeType: 'myOrder ',
				tradeData: {
					deviceCode: that.$store.getters.getDeviceCode
				}
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					let result = res.data.tradeData
					that.list = result.sort(that.$tools.compare('orderTime'))
					that.loading.hide()
				}else{
					that.$tools.alert(that, res.data.tradeRstMessage,that.$tools.toIndex)
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
			toInfo(obj) {
				this.$store.commit('setCurrentPackage',obj)
				this.$router.push("/orderInfo")
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderList {
		.title {
			span {
				display: inline-block;
				margin-left: 0.5rem;
				font-size: 0.65rem;
				color: #bfbfbf;
			}
			i {
				display: inline-block;
				width: 0.5rem;
				vertical-align: top;
				height: 100%;
				padding-right: 0.2rem;
				img {
					width: 100%;
					display: inline-block;
					vertical-align: top;
					margin-top: 0.5rem;
				}
			}
		}
		.list {
			padding: 0.2rem 0 1rem;
			.item {
				position: relative;
				margin-bottom: 1.3rem;
				background: #fff;
				padding: 0.5rem;
				border-radius: 0.3rem;
				.top {
					font-size: 0.6rem;
					color: #bfbfbf;
					margin-bottom: 0.3rem;
					line-height: 1rem;
					p {
						float: left;
					}
					span {
						float: right;
					}
				}
				.til {
					font-size: 0.8rem;
					line-height: 1.4rem;
				}
				.content {
					li {
						border-bottom: 1px solid #eee;
						line-height: 1.5rem;
						font-size: 0.7rem;
						color: #a7a7a7;
						.costTxt {
							float: left;
						}
						.costNum {
							float: right;
						}
					}
				}
				.totalCost {
					text-align: right;
					font-size: 0.7rem;
					line-height: 2rem;
					span {
						color: #db3749;
						font-size: 1rem;
					}
				}
				.color {
					margin: 0.6rem auto 0.2rem;
					width: 50%;
					line-height: 1.3rem;
					height: 1.4rem;
					font-size: 0.7rem;
				}
			}
		}
	}
</style>