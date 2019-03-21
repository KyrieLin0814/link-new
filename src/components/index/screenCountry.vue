<template>
	<div class="body-container screenCountry">
		<nav-model></nav-model>

		<div class="screenContent">
			<div class="chooseBox flex" @click="moreCountry">
				<span class="text-1 flex-1">{{country}}</span>
				<a class="addMore">{{$t('message.duoxuan')}}</a>
			</div>
			<div class="moreBtn" @click="screenFunc">{{$t('message.moreChoice')}}</div>
			<cube-button class="color">{{$t('message.startFind')}}</cube-button>
			<div class="touch" v-swipeup="{fn:vuetouch,name:'上滑'}">{{$t("message.moveUp")}}</div>
		</div>

		<div class="masker" v-if="screenFlag" @click="screenFunc"></div>
		<div class="maskBox" :class="{'show': screenFlag}">
			<p class="til">已选择国家</p>
			<div class="radioBox three">
				<cube-radio-group v-model="kpValue" :options="kpList" :horizontal="true" :hollowStyle="true" />
			</div>
			<p class="til">已选择时间</p>
			<div class="radioBox three">
				<cube-radio-group v-model="sjValue" :options="sjList" :horizontal="true" :hollowStyle="true" />
			</div>
			<div class="fixedBtns flex">
				<cube-button class="gray flex-1" @click="screenFunc">{{$t('message.cancel')}}</cube-button>
				<cube-button class="color flex-1" @click="confirm">{{$t("message.confirm")}}</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	import NavModel from '../model/nav'

	export default {
		name: 'screenCountry',
		data() {
			return {
				langType: this.$lang == 'cn',
				country: '中国',
				name: '开始',
				screenFlag:false,
				kpList: this.$store.getters.getOptionKpList,
				sjList: this.$store.getters.getOptionSjList,
				kpValue: '1',
				sjValue: '1'
			}
		},
		components: {
			NavModel
		},
		created() {
			
		},
		mounted() {
			console.log( this.$store.getters.getOptionKpList)
		},
		methods: {
			moreCountry() {
				this.$router.push("/chooseCountry");
			},
			vuetouch(s, e) {
				this.name = s.name;
				this.$router.push("/")
			},
			screenFunc() {
				this.screenFlag = !this.screenFlag
			},
			confirm(){
				this.screenFunc()
			},

		}
	}
</script>

<style lang="less" scoped>
	.screenCountry {
		overflow: hidden;
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
				bottom: -3.6rem;
				left: 0;
				right: 0;
				color: #fff;
				line-height: 2;
				font-size: 0.7rem;
				text-align: center;
				background: url(../../assets/image/top.png)no-repeat center 1rem;
				padding-top: 1.7rem;
				padding-bottom: 1rem;
				background-size: 1rem 0.5rem;
			}
		}
	}
</style>