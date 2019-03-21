<template>
	<div class="navContent">
		<a class="navBtn" @click="navFunc($event)"><img src="../../assets/image/nav.png"></a>
		<div class="navMask" :class="{'show': !showNav}" @click="navFunc($event)"></div>
		<ul class="nav" :class="{'hide': showNav}" @click="navFunc($event)">
			<li class="logo colorBg"><img src="../../assets/image/navLogo.png"></li>
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
				langType: this.$lang == 'cn'
			}
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
					content: '4001-123-123',
				}).show()
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
			width: 7.2rem;
			padding-top: 3rem;
			box-shadow: -3px 0px 15px 3px rgba(222, 65, 63, 0.2);
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
			transition: all 0.3s;
			li.logo {
				padding: 0.8rem 0;
				margin: 0 0 0.5rem;
				img {
					display: block;
					width: 84%;
					margin: 0 auto;
				}
			}
			li {
				text-align: left;
				padding-left: 0.3rem;
				font-size: 0.8rem;
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
				right: -7.5rem;
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