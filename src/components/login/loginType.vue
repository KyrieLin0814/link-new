<template>
	<div class="body-container loginType">
		<div class="tips">{{$t('message.tips')}}</div>
		<ul>
			<li @click="typeFunc('1')" >
				<p>{{$t('message.wlw')}}</p>
				<div class="content">
					<img src="../../assets/image/type1.png" />
					<div class="txts flex">
						<span class="flex-1">{{$t('message.znsb')}}</span>
						<span class="flex-1">{{$t('message.gzq')}}</span>
						<span class="flex-1">{{$t('message.fyj')}}</span>
					</div>
				</div>
				<div class="check" :class="{'active': type == '1'}">{{$t('message.tcsy')}}</div>
			</li>
			<li @click="typeFunc('2')">
				<p>{{$t('message.lvk')}}</p>
				<div class="content move">
					<img src="../../assets/image/type2.jpg" />
					<div class="txts flex">
						<span class="flex-1">{{$t('message.sim')}}</span>
					</div>
				</div>
				<div class="check" :class="{'active': type == '2'}">{{$t('message.tcsy')}}</div>
			</li>
		</ul>
		<cube-button class="color" @click="confirm">{{$t('message.qrxz')}}</cube-button>
	</div>
</template>

<script>
	export default {
		name: 'loginType',
		data() {
			return {
				type: this.$store.getters.getLoginType
			}
		},
		created() {
			var that = this
			//处理cookie参数
			function getCookie(cookieName) {
				var strCookie = document.cookie;
				var arrCookie = strCookie.split("; ");
				for(var i = 0; i < arrCookie.length; i++) {
					var arr = arrCookie[i].split("=");
					if(cookieName == arr[0]) {
						return arr[1];
					}
				}
				return "";
			}
			//处理url参数
			function getQuery(paramName) {
				return that.$route.query[paramName]
			}

			var user_deviceCode = getQuery("deviceId") ? getQuery("deviceId") : getCookie("deviceId");
			var user_openId = getQuery("openId") ? getQuery("openId") : getCookie("openId");
			var user_partnerCode = getQuery("partnerCode") ? getQuery("partnerCode") : getCookie("partnerCode");
			var user_requestOrderId = getQuery("requestOrderId") ? getQuery("requestOrderId") : getCookie("requestOrderId");

			if(user_deviceCode) {
				that.$store.commit('setDeviceCode', user_deviceCode)
			}
			if(user_openId) {
				that.$store.commit('setOpenId', user_openId)
			}
			if(user_partnerCode) {
				that.$store.commit('setPartnerCode', user_partnerCode)
			}

			if(user_requestOrderId) {
				that.$store.commit('setRequestOrderId', user_requestOrderId)
			}
		},
		methods: {
			typeFunc(p){
				this.type = p
				this.$store.commit('setLoginType', p)
			},
			confirm(){
				if(this.type== '1'){
					this.$router.push('/loginUser')
				}
				if(this.type== '2'){
					this.$router.push('/loginIndex')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginType {
		padding: 0 0.8rem;
		.tips {
			margin-top: 2rem;
			margin-bottom: 2rem;
			font-size: 0.7rem;
			color: #dcdcdc;
			text-align: center;
		}
		ul {
			padding-bottom:1rem;
			li {
				position: relative;
				padding: 0.5rem 1rem;
				box-shadow: 0px 0px 20px 3px rgba(222, 65, 63, 0.2);
				border-radius: 5px;
				margin-bottom:1.5rem;
				p {
					font-size: 0.8rem;
					line-height: 1.5rem;
					text-align: center;
				}
				.content {
					margin-left:2rem;
					img {
						display: block;
						width: 100%;
					}
					.txts {
						padding:0.3rem 0 0.2rem;
						span {
							font-size: 0.7rem;
							line-height: 0.8rem;
							text-align: center;
						}
					}
					&.move{
						transform: translateX(-1rem);
						-webkit-transform: translateX(-1rem);
					} 
				}
				.check{
					position: absolute;
					left:0;
					top:50%;
					font-size:0.7rem;
					line-height:0.8rem;
					width:0.8rem;
					padding:0.6rem 0.8rem 0.6rem 0.5rem;
					background: #b7b7b7;
					color:#fff;
					transform: translateY(-50%);
					-webkit-transform:translateY(-50%);
					border-bottom-right-radius: 15rem;
					border-top-right-radius: 15rem;
					transition: all 0.2s;
					-webkit-transition: all 0.2s;
					&.active{
						background: #de4140;
					}
				}
			}
		}
	}
</style>