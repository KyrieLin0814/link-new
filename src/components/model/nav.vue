<template>
	<div class="navContent">
		<a class="navBtn" @click="navFunc($event)"><img src="../../assets/image/nav.png"></a>
		<div class="navMask" :class="{'show': !showNav}" @click="navFunc($event)"></div>
		<ul class="nav" :class="{'hide': showNav}" @click="navFunc($event)">
			<li class="logo"></li>
			<li>帮助中心</li>
			<li>帮助中心</li>
			<li>帮助中心</li>
			<li>帮助中心</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'navModel',
		data() {
			return {
				showNav: true,
				langType: this.$lang
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
			img {
				display: block;
				width: 100%;
			}
		}
		.nav {
			background: #fff;
			position: absolute;
			z-index: 9;
			top: 0;
			bottom: 0;
			right: 0;
			width: 6rem;
			padding-top: 3rem;
			box-shadow: -3px 0px 15px 3px rgba(222, 65, 63, 0.2);
			border-bottom-left-radius: 10px;
			border-top-left-radius: 10px;
			transition: all 0.3s;
			li.logo {
				background: #ccc;
				height: 60px;
				margin-bottom: 0.5rem;
			}
			li {
				text-align: center;
				font-size: 0.8rem;
				line-height: 2rem;
			}
			&.hide {
				right: -6.5rem;
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