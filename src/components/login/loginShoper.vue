<template>
	<div class="body-container loginShoper">
		<div class="header">
			<a class="shoper" @click="goUser">{{$t("message.userLogin")}}</a>
		</div>
		<div class="logo">
			<img src="../../assets/image/loginShoper.png" />
		</div>
		<div class="content">
			<div class="inputBox">
				<input type="text" class="user" :placeholder="p1" v-model="userName">
				<input type="password" class="pw" :placeholder="p2" v-model="passWord">
			</div>
			<cube-button class="color" @click="confirm">{{$t("message.loginBtn4")}}</cube-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'loginShoper',
		data() {
			return {
				langType: this.$lang == 'cn',
				p1: this.$t("message.enterUN"),
				p2: this.$t("message.enterPW"),
				userName: '',
				passWord: ''
			}
		},
		created() {
			
		},
		methods: {
			goUser() {
				this.$router.replace('/loginUser')
			},
			confirm() {
				if(!this.userName) {
					this.$tools.alert(this, this.langType ? '请输入用户名' : 'Please enter the username')
					return
				}
				if(!this.passWord) {
					this.$tools.alert(this, this.langType ? '请输入密码' : 'Please enter the password')
					return
				}
				var that = this
				that.$tools.loading(that)
				that.$post('/partnerLogin', {
					tradeType: 'partnerLogin',
					tradeData: {
						account: that.userName,
						password: that.passWord
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.loading.hide()
						that.$tools.toast(that, res.data.tradeRstMessage)
						this.$store.commit('setToken', res.data.token)
						setTimeout(function() {
							that.$router.replace("/index")
						}, 1000)
					} else {
						that.$tools.alert(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginShoper {
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
			padding: 3rem 0;
			img {
				display: block;
				width: 80%;
				max-width: 400px;
				margin: 0 auto;
			}
		}
		.content {
			padding: 0 0.8rem;
			.inputBox {
				padding-bottom: 1rem;
				input {
					display: block;
					padding-left: 1.5rem;
					font-size: 0.8rem;
					border-bottom: 1px solid #dcdcdc;
					margin-bottom: 1rem;
					line-height: 1.6rem;
					width: calc(100% - 1.5rem);
					&.user {
						background: url(../../assets/image/user.png) no-repeat 0.2rem center;
						background-size: 20px;
					}
					&.pw {
						background: url(../../assets/image/pw.png) no-repeat 0.2rem center;
						background-size: 18px;
					}
				}
			}
		}
	}
</style>