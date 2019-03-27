<template>
	<div class="body-container loginUser">
		<div class="header">
			<a class="shoper" @click="goShoper">{{$t("message.bussinessLogin")}}</a>
		</div>
		<div class="logo">
			<img src="../../assets/image/logo1.png" />
		</div>
		<p>{{$t("message.welcome")}}</p>
		<div class="cardBox">
			<input type="text" :placeholder="placeholder" v-model="cardNum" />
			<a class="sao" @click="saoFunc"></a>
		</div>
		<div class="btns">
			<cube-button class="color" @click="loginFunc">{{$t("message.loginBtn1")}}</cube-button>
			<cube-button class="none" @click="loginLook">{{$t("message.loginBtn2")}}</cube-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'loginUser',
		data() {
			return {
				langType: this.$lang == 'cn',
				placeholder: this.$t("message.inputTxt"),
				cardNum: ''

			}
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			goShoper() {
				this.$router.replace('/loginShoper')
			},
			saoFunc() {
				console.log(1)
			},
			loginFunc() {
				if(!this.cardNum) {
					this.$tools.alert(this, this.langType ? '请输入卡号' : 'Please enter the card number')
					return
				}
				var that = this
				that.$post('/userLogin', {
					tradeType: 'userLogin',
					tradeData: {
						deviceCode: that.cardNum,
						partnerScope: that.$store.getters.getLoginType
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000'){
						that.$tools.toast(that, res.data.tradeRstMessage)
						that.$store.commit('setToken', res.data.token)
						that.$store.commit('setDeviceCode', that.cardNum)
						setTimeout(function(){
							that.$router.replace("/index")
						},1000)
					}else{
						that.$tools.alert(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			loginLook() {
				this.$router.push("/")
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginUser {
		padding: 0 0.8rem;
		.header {
			height: 2rem;
			.shoper {
				display: inline-block;
				margin-top: 0.5rem;
				font-size: 0.7rem;
				line-height: 1.1rem;
				height: 1.2rem;
				padding: 0 0.5rem;
				border: 1px solid #707070;
				color: #707070;
				border-radius: 0.7rem;
			}
		}
		.logo {
			padding-top: 20%;
			img {
				display: block;
				width: 66%;
				max-width: 400px;
				margin: 0 auto;
			}
		}
		p {
			text-align: center;
			font-size: 36px;
			line-height: 36px;
			padding: 2.4rem 0 2rem;
		}
		.cardBox {
			position: relative;
			margin: 0 0.7rem;
			border: 1px solid #707070;
			border-radius: 5px;
			overflow: hidden;
			input {
				display: block;
				width: calc(100% - 2.1rem);
				padding-left: 0.3rem;
				padding-right: 1.8rem;
				font-size: 0.8rem;
				line-height: 1.8rem;
			}
			.sao {
				display: block;
				position: absolute;
				right: 0;
				top: 0;
				width: 1.8rem;
				height: 1.8rem;
				background: url(../../assets/image/sao.png) no-repeat center;
				background-size: 70%;
			}
		}
		.btns {
			margin: 0 0.7rem;
			padding-top: 4rem;
			button {
				margin-bottom: 0.8rem;
			}
		}
	}
</style>