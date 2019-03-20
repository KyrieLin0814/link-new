<template>
	<div class="body-container noCard">
		<div class="scrollContent">
			<div class="head clearfix">
				<p>{{$t("message.myCard")}}</p>
				<div class="addCard clearfix">
					<span class="til">卡片信息</span>
					<span class="addBtn" @click="addCard">添加多张卡片</span>
				</div>
			</div>

			<div class="cardAddBox">
				<div class="cards">
					<p class="card" v-for="(i,idx) in cardList">
						{{$t("message.card")}}{{idx + 1}}
						<span @click="delFunc(idx)">X</span>
					</p>
				</div>
				<div class="tip">提醒：可添加多张卡片，进行套餐匹配充值</div>
			</div>

		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.cancel')}}</cube-button>
			<cube-button class="color flex-1" @click="confirm">{{$t("message.confirm")}}</cube-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'noCard',
		data() {
			return {
				langType: this.$lang == 'cn',
				placeholder: this.$t("message.inputTxt"),
				cardList: [{
					card: '',

				}, {
					card: '',

				}],
			}
		},
		created() {

		},
		mounted() {},
		methods: {
			back() {
				history.go(-1)
			},
			confirm() {
				this.$router.push("/confirmOrder")
			},
			addCard() {
				this.cardList.push({
					card: ''
				})
			},
			delFunc(idx){
				this.cardList.splice(idx-1, 1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.noCard {
		.head {
			border-bottom: 1px solid #eee;
			margin: 0 -0.7rem;
			padding: 0 0.7rem;
			p {
				line-height: 2rem;
				font-size: 0.9rem;
				color: #313131;
			}
			.addCard {
				font-size: 0.6rem;
				line-height: 1.2rem;
				span {
					&.til {
						float: left;
					}
					&.addBtn {
						color: #c6c6c6;
						float: right;
						padding-right: 1rem;
						background: url(../../assets/image/add.png) no-repeat right center;
						background-size: 0.8rem;
					}
				}
			}
		}
		.cardAddBox {
			.cards {
				padding: 1rem 0;
				.card {
					position: relative;
					display: inline-block;
					margin: 0 1rem 1rem 0;
					font-size: 0.7rem;
					line-height: 1.8rem;
					padding: 0 0.6rem;
					background: #F65200;
					color: #fff;
					border-radius: 0.2rem;
					span{
						display: block;
						position: absolute;
						right:-0.3rem;
						top:-0.3rem;
						background: #fff;
						border:1px solid #F65200;
						color:#F65200;
						z-index:9;
						width:0.8rem;
						height:0.8rem;
						font-size:0.6rem;
						line-height:0.8rem;
						text-align: center;
						border-radius:0.4rem;
						
					}
				}
			}
			.tip {
				padding-top: 1rem;
				font-size: 0.6rem;
				color: #dedede;
				text-align: center;
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