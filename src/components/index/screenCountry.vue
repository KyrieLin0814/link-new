<template>
	<div class="body-container screenCountry">
		<nav-model></nav-model>

		<div class="screenContent">
			<div class="chooseBox flex">
				<span class="text-1 flex-1">{{country}}</span>
				<a class="addMore">可多选</a>
			</div>
			<div class="moreBtn" @click="more">更多选择</div>
			<cube-button class="color">开始搜索</cube-button>
			<div class="touch">向上滑动开启新世界</div>
		</div>
	</div>
</template>

<script>
	import NavModel from '../model/nav'

	export default {
		name: 'screenCountry',
		data() {
			return {
				langType: this.$lang,
				country: '中国',
			}
		},
		components: {
			NavModel
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			more(){
				this.$router.push("/chooseCountry");
			}
		}
	}
</script>

<style lang="less" scoped>
	.screenCountry {
		background: url(../../assets/image/countryBg.jpg) no-repeat;
		background-size: 100% 100%;
		.screenContent {
			background: #fff;
			border-radius: 10px;
			position: absolute;
			bottom: 3rem;
			left: 0.8rem;
			right: 0.8rem;
			padding: 0.8rem 0.7rem;
			font-size: 0.8rem;
			line-height: 2rem;
			.chooseBox {
				border-bottom: 1px solid #e5e5e5;
				.addMore {
					font-size: 0.6rem;
					color: #bababa;
					padding-right: 1.2rem;
					background: url(../../assets/image/more.png) no-repeat right center;
					background-size: 0.8rem 0.8rem;
				}
			}
			.moreBtn {
				color: #bababa;
				background: url(../../assets/image/right.png) no-repeat right center;
				background-size: 0.4rem 0.8rem;
				margin-bottom: 1rem;
			}
			.touch {
				position: absolute;
				bottom: -2rem;
				left: 0;
				right: 0;
				color: #fff;
				line-height: 1;
				font-size: 0.7rem;
				text-align: center;
				background: url(../../assets/image/top.png)no-repeat top center;
				padding-top: 0.7rem;
				background-size: 1rem 0.5rem;
			}
		}
	}
</style>