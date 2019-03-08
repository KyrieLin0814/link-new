<template>
	<div class="body-container loginIndex">
		<div class="langBox">
			<span class="cn" @click="langFunc('cn')" :class="{'active': langType == 'cn'}">中文</span>
			<span class="en" @click="langFunc('en')" :class="{'active': langType == 'en'}">English</span>
		</div>
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
			return {
				langType: this.$lang
			}
		},
		created() {
			
		},
		methods:{
			loginFunc(){
				this.$router.push("/loginUser")
			},
			loginLook(){
				this.$router.push("/loginType")
			},
			langFunc(lg){
				this.$store.commit('langFunc', lg)
				this.$i18n.locale = lg
				this.langType = lg
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginIndex{
		background: url(../../assets/image/loginBg.jpg) no-repeat;
		background-size:100% 100% ;
		.langBox{
			position: absolute;
			right: 5%;
			top:0.8rem;
			font-size:0;
			border-radius:0.6rem;
			overflow:hidden;
			span{
				display: inline-block;
				font-size:0.7rem;
				line-height:1.1rem;
				height:1.2rem;
				color:#313131;
				padding:0 0.6rem;
				background: #fff;
			}
			span{
				&.active{
					color:#fff;
					background: #dd3f3f;
				}
			}
		}
		.btnBox{
			position: absolute;
			bottom:5%;
			left:0;
			right:0;
			margin:0 1.5rem;
			button:first-child{
				margin-right:1.5rem;
			}
		}
	}
</style>