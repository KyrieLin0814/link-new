<template>
	<div class="navContent">
		<a class="navBtn" @click="navFunc($event)"><img src="../../assets/image/nav.png"></a>
		<div class="navMask" :class="{'show': !showNav}" @click="navFunc($event)"></div>
		<ul class="nav" :class="{'hide': showNav}" @click="navFunc($event)">
			<li class="logo"><img :src="logoUrl"></li>
			<li class="navItem" @click="router('/orderList')"><i class="nav1"></i>{{$t("message.orderNav")}}</li>
			<li class="navItem" @click="router('/car')"><i class="nav2"></i>{{$t("message.car")}}</li>
			<li class="navItem" @click="contactFunc()"><i class="nav3"></i>{{$t("message.contactNav")}}</li>
		</ul>
	</div>

</template>

<script>
	export default {
		name: 'navModel',
		data() {
			return {
				showNav: true,
				showTel: false,
				langType: this.$lang == 'cn',
				logoUrl:require('../../assets/image/navLogo.png')
			}
		},
		created(){
			var that = this
			that.$tools.loading(that)
			that.$post('/partnerShowInfo', {
				tradeType: 'partnerShowInfo'
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					that.loading.hide()
					that.logoUrl = res.data.tradeData.companylogo
				} else {
					that.loading.hide()
				}
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			navFunc(event) {
				var el = event.currentTarget
				if($(el).attr("class") == "navBtn") {
					this.showNav = !this.showNav
				} else {
					this.showNav = true
				}
			},
			router(str) {
				this.$router.push(str)
				console.log(str)
			},
			contactFunc() {
				this.$createDialog({
					type: 'alert',
					title: this.$t("message.contactNav"),
					maskClosable:true,
					confirmBtn :{
						text:''
					},
				}, (createElement) => {
					return [
						createElement('div', {
							'class': {
								'phoneContent': true
							},
							slot: 'content'
						}, [
							createElement('span', {
								'class': {
									'phoneText': true
								}
							},'4001-123-123'),
						])
					]
				}).show()
				$(".cube-dialog-btns").hide();
			}
		}
	}
</script>

<style lang="less" scoped>
	.navContent {
		.navBtn {
			display: block;
			width: 2rem;
			height: 2rem;
			right: .7rem;
			top: .7rem;
			position: absolute;
			border-radius: 1rem;
			background: #fff;
			img {
				display: block;
				width: 1.2rem;
				margin: 0 auto;
				padding-top: 0.4rem;
			}
		}
		&.indexNav {
			.navBtn {
				position: inherit;
			}
		}
		.nav {
			background: #fff;
			position: absolute;
			z-index: 9;
			top: 0;
			bottom: 0;
			right: 0;
			width: 7.4rem;
			padding-top: 3rem;
			box-shadow: -3px 0px 15px 3px rgba(222, 65, 63, 0.2);
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
			transition: all 0.3s;
			li.logo {
				margin: 0 0 0.5rem;
				font-size:0;
				padding:0;
				img {
					display: block;
					width: 100%;
					margin: 0;
				}
			}
			li {
				text-align: left;
				padding-left: 0.1rem;
				font-size: 0.7rem;
				line-height: 2.4rem;
				vertical-align: middle;
				margin: 0 0.5rem;
				border-bottom: 1px solid #e5e5e5;
				i {
					width: 0.9rem;
					height: 0.9rem;
					display: inline-block;
					margin-right: 0.3rem;
					vertical-align: middle;
					margin-top: -4px;
				}
				.nav1 {
					background: url(../../assets/image/nav1.png) no-repeat;
					background-size: contain;
				}
				.nav2 {
					background: url(../../assets/image/nav2.png) no-repeat;
					background-size: contain;
				}
				.nav3 {
					background: url(../../assets/image/nav3.png) no-repeat;
					background-size: contain;
				}
			}
			&.hide {
				right: -8rem;
			}
		}
		.navMask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 8;
			display: none;
			transition: all 0.3s;
			&.show {
				display: block;
			}
		}
	}
</style>