<template>
	<div class="body-container car">
		<div class="scrollContent">
			<div class="head clearfix">
				<a class="back">
					<i @click="back"><img src="../../assets/image/left.png"/></i> {{$t("message.car")}}
				</a>
			</div>

			<cube-checkbox-group v-model="checkList" class="checkboxBox">
				<cube-checkbox :option="i.id" v-for="i in tcList" :key="i.id">
					<div class="checkBoxContent flex">
						<div class="imgBox">
							<img src="../../assets/image/goodlist.jpg" />
						</div>
						<div class="content flex-1">
							<p class="name text-2">{{i.name}}</p>
							<p class="detail">{{i.detail}}</p>
							<p class="price">{{$t("message.yuanFH")}}<span>{{i.price}}</span></p>
						</div>
						<div class="numModel" @click.stop>
							<label>
								<number-bar @currentNum="currentNum"></number-bar>
							</label>
						</div>
					</div>

				</cube-checkbox>

			</cube-checkbox-group>
		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
			<cube-button class="color flex-1" @click="confirmOrder">
				<span>{{$t("message.yuanFH")}}{{total}}</span> {{$t("message.jiesuan")}}
			</cube-button>
		</div>
	</div>
</template>

<script>
	import NumberBar from '../model/number'
	export default {
		name: 'car',
		data() {
			return {
				langType: this.$lang == 'cn',
				total: 0,
				checkList: ['1'],
				tcList: [{
					id: '1',
					name: '套餐11111套餐11111套餐11111',
					detail: "50MB/月",
					price: "90",
					card: '卡1',
					large: '5'
				}, {
					id: '2',
					name: '套餐2222',
					detail: "100MB/月",
					price: "188",
					card: '卡1',
					large: '20'
				}]
			}
		},
		components: {
			NumberBar
		},
		created() {

		},
		mounted() {
			this.total = this.$tools.totalFunc(this.tcList)
		},
		methods: {
			back() {
				history.go(-1)
			},
			currentNum(num) {
				this.currentNumber = num
			},
			confirmOrder() {
				this.$router.push("/confirmOrder")
			}
		}
	}
</script>

<style lang="less" scoped>
	.car {
		.head {
			line-height: 2rem;
			border-bottom: 1px solid #eee;
			margin: 0 -0.7rem;
			padding: 0 0.7rem;
			.back {
				float: left;
				display: block;
				font-size: 0.9rem;
				color: #313131;
				i {
					display: inline-block;
					width: 0.5rem;
					height: 100%;
					padding-right: 0.2rem;
					img {
						width: 100%;
						display: inline-block;
						vertical-align: top;
						margin-top: 0.5rem;
					}
				}
			}
		}
		.checkboxBox {
			margin: -1px -16px 2.4rem;
		}
		.checkBoxContent {
			position: relative;
			width: 100%;
			.imgBox {
				padding-right: 0.5rem;
				img {
					display: block;
					width: 6rem;
				}
			}
			.content {
				width: calc(100% - 9rem);
				p {
					max-width: 100%;
					line-height: 1rem;
					font-size: 0.7rem;
					&.detail {
						font-size: 0.6rem;
						color: #bfbfbf;
					}
					&.price {
						font-size: 0.6rem;
						span {
							vertical-align: bottom;
							display: inline-block;
							padding-left: 0.2rem;
							font-size: 1rem;
							color: #f65200;
						}
					}
				}
			}
			.numModel {
				position: absolute;
				right: 0;
				bottom: 0;
				z-index: 99;
				font-size: 0;
			}
		}
		.fixedBtns {
			span {
				font-size: 0.6rem;
				padding-right: 0.3rem;
			}
		}
	}
</style>