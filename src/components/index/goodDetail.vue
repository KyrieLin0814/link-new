<template>
	<div class="body-container bg goodDetail">
		<div class="scrollContent">
			<div class="head">
				<div class="back" @click="back">返回</div>
				<img src="../../assets/image/detailBg.png">
			</div>

			<div class="content">
				<div class="tcDetail">
					<p class="title">{{obj.title}}</p>
					<div class="tcText clearfix">
						<div class="price">{{$t("message.yuanFH")}}<span>{{obj.price}}</span></div>
						<div class="detail">{{obj.detail}}</div>
					</div>
					<div class="time">
						<p class="til">{{$t("message.timeChoose")}}：</p>
						<div class="timeChecker">
							<cube-checker v-model="timeValue" :options="options" type="radio">
								<cube-checker-item v-for="item in options" :key="item.value" :option="item">
									<span class="timeItem">{{item.text}}{{$t("message.yue")}}</span>
								</cube-checker-item>
							</cube-checker>
						</div>
					</div>
				</div>
				<div class="useOption">
					<img src="../../assets/image/useOption.jpg" />
				</div>
			</div>

		</div>

		<div class="fixedBtns">
			<div class="number clearfix">
				<p class="tip">{{$t('message.buyNum')}}：</p>
				<div class="numBox">
					<number-bar :large="obj.large"></number-bar>
				</div>
			</div>
			<div class="btns flex">
				<cube-button class="gray flex-1" @click="addCart">{{$t('message.addCar')}}</cube-button>
				<cube-button class="color flex-1" @click="buyNow">{{$t('message.buyNow')}}</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	import NumberBar from '../model/number'
	export default {
		name: 'goodDetail',
		data() {
			return {
				langType: this.$lang == 'cn',
				obj: {
					title: '套餐1套餐1套餐1套餐1',
					price: '90',
					detail: '50M/天',
					large:'4'
				},
				timeValue: 1,
				options: [{
						value: 1,
						text: '1'
					},
					{
						value: 3,
						text: '3'
					},
					{
						value: 6,
						text: '6'
					},
					{
						value: 12,
						text: '12'
					}
				]
			}
		},
		components: {
			NumberBar
		},
		created() {

		},
		mounted() {
			//			var t = 0;
			//			this.tcList.map(function(item) {
			//				t = t + Number(item.price)
			//			})
			//			this.total = t

		},
		methods: {
			back() {
				history.go(-1)
			},
			addCart() {
				this.$router.push('/car')
			},
			buyNow() {
				this.$router.push('/car')
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodDetail {
		.head {
			position: relative;
			margin: 0 -0.7rem;
			img {
				display: block;
				width: 100%;
			}
			.back{
				position: absolute;
				top:0;
				left:0;
				font-size:0.7rem;
				height:1.8rem;
				line-height:1.9rem;
				color:#313131;
				padding:0 0.5rem 0 1rem;
				margin-left:0.5em;
				background: url(../../assets/image/left.png) no-repeat 0.2rem center;
				background-size: 0.4rem;
			}
		}
		.content {
			margin-top:-9rem;
			position: relative;
			z-index: 9;
			.tcDetail {
				background: #fff;
				padding: 0.7rem;
				border-radius:0.5rem;
				
				.title {
					font-size: 0.8rem;
					font-weight: normal;
				}
				.tcText {
					border-bottom: 2px dotted #e7e7e7;
					line-height: 1.4rem;
					padding-bottom: 0.3rem;
					.price {
						float: left;
						font-size: 0.9rem;
						color: #f65200;
						span {
							padding-left: 0.2rem;
							font-size: 1.2rem;
							font-weight: bold;
						}
					}
					.detail {
						font-size: 0.6rem;
						float: right;
						color: #b5b5b5;
					}
				}
				.time {
					margin-top: 0.8rem;
					background: #f5f5f5;
					border-radius: 0.3rem;
					padding: 0.5rem;
					.til {
						font-size: 0.7rem;
						line-height: 1rem;
						margin-bottom: 0.5rem;
					}
				}
			}
		}
		.useOption {
			margin-top:1rem;
			border-radius: 0.5rem;
			overflow: hidden;
			margin-bottom:5.6rem;
			img {
				display: block;
				width: 100%;
			}
		}
		.fixedBtns {
			.number{
				padding-bottom:0.3rem;
				border-bottom:1px solid #f5f5f5;
				margin:0 -1rem 0.3rem;
				padding:0 1rem;
				.tip{
					float:left;
					font-size:0.7rem;
					line-height:1.6rem;
				}
				.numBox{
					float:right;
				}
			}
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
</style>