<template>
	<div class="body-container loginIndex">
		<div class="btnBox flex">
			<cube-button class="white flex-1" @click="loginLook">{{$t("message.loginBtn2")}}</cube-button>
			<cube-button class="color flex-1" @click="loginFunc">{{$t("message.loginBtn3")}}</cube-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loginIndex',
		data() {
			return {}
		},
		created() {},
		methods: {
			loginFunc() {
				this.$router.push("/loginUser?type=1")
			},
			loginLook() {
				var that = this
				that.$tools.loading(that)
				that.$post('/random', {
					tradeType: 'random',
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.$store.commit('setYouke', '1')
						that.$store.commit('setDeviceCode', res.data.deviceCode)
						that.loading.hide()
						that.$router.push("/screenCountry")
					} else {
						that.loading.hide()
						that.$tools.alert(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					that.loading.hide()
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginIndex {
		background: url(../../assets/image/loginBg.jpg) no-repeat;
		background-size: 100% 100%;
		.btnBox {
			position: absolute;
			bottom: 5%;
			left: 0;
			right: 0;
			margin: 0 1.5rem;
			button:first-child {
				margin-right: 1.5rem;
			}
		}
	}
</style>