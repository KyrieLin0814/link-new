<template>
	<div class="body-container bg payResult">

		<div class="result" v-if="payStatus==0">
			<img src="../../assets/image/payError.png" />
			<p>{{$t("message.zfsb")}}</p>
			<span>{{txt}}</span>
			<cube-button class="color" @click="toIndex()">{{$t("message.confirm")}}</cube-button>
		</div>

		<div class="result" v-if="payStatus==1">
			<img src="../../assets/image/paySuccess.png" />
			<p>{{$t("message.zfcg")}}</p>
			<cube-button class="color" @click="toIndex()">{{$t("message.confirm")}}</cube-button>
		</div>

		<div class="result" v-if="payStatus==2">
			<div class="noResult">
				<p>{{$t("message.jgtip")}}</p>
				<cube-button class="color" @click="getPayStatus()">{{$t("message.ckzfjg")}}</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'payResult',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				payStatus: 2, //0支付失败     1支付成功     2其他方式（需要查询）
				txt: '',
				pId: null,
				pType: null,
				deviceCode: null
			}
		},
		mounted() {
			this.payStatus = this.$route.params.payStatus
			this.pId = this.$route.params.payId
			this.pType = this.$route.params.payType
			this.deviceCode = this.$route.params.deviceCode

			var that = this
			
			//清空购物车已购买商品
			if(that.payStatus == 1) {
				that.$tools.renderCart(that)
			}

			//自动登录
			that.$store.commit('setDeviceCode', that.deviceCode)
			if(that.payStatus == 2) {
				//查询支付结果
				that.getPayStatus()
			}
		},
		methods: {
			toIndex() {
				this.$router.push("/index")
			},
			getPayStatus() {
				//支付结果
				var that = this
				that.$tools.loading(that)
				that.$post('https://wx.linksfield.net/payment/weixinQuery', {
					tradeType: 'weixinQuery',
					tradeData: {
						appid: '',
						key: '',
						mch_id: '',
						payId: that.pId,
						payType: that.pType
					}
				}).then((res) => {
					that.loading.hide()
					if(res.data.tradeRstCode == '0000') {
						that.payStatus = 1
						that.$tools.renderCart(that)
					} else if(res.data.tradeRstCode == '9998') {
						that.payStatus = 2
					} else {
						that.payStatus = 0
						that.txt = res.data.tradeRstMessage
					}
				}).catch(err => {
					that.loading.hide()
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.payResult {
		.result {
			padding-top: 4rem;
			img {
				width: 5rem;
				display: block;
				margin: 0 auto;
			}
			p {
				font-size: 1.2rem;
				margin-top: 1rem;
				text-align: center;
			}
			span {
				margin-top: 1rem;
				display: block;
				font-size: 0.8rem;
				text-align: center;
				color: #666;
			}
			button {
				width: 90%;
				margin: 0 auto;
				margin-top: 2rem;
			}
			.noResult {
				p {
					width: 65%;
					margin: 0 auto;
					font-size: 0.8rem;
					color: #333;
					line-height: 1.2rem;
				}
			}
		}
	}
</style>