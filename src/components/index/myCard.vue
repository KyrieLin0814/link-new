<template>
	<div class="body-container myCard">
		<div class="scrollContent">
			<div class="head clearfix">
				<p>{{$t("message.myCard")}}</p>
				<div class="addCard clearfix">
					<span class="til">{{$t("message.cardInfo")}}</span>
					<span class="addBtn" @click="addCard">{{$t("message.addCard")}}</span>
				</div>
			</div>

			<div class="cardAddBox">
				<ul v-if="cardList.length>0">
					<li class="flex" v-for="(i,idx) in cardList">
						<div class="card">{{i.text.split('：')[0]}}</div>
						<div class="inputBox flex-1">
							<input type="text" v-model="i.value" :placeholder="placeholder" />
							<span class="screenBtn" @click="screenFunc()"></span>
						</div>
					</li>
				</ul>
				<div class="tip">{{$t("message.tixing")}}</div>
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
		name: 'myCard',
		data() {
			return {
				langType: this.$lang == 'cn',
				placeholder: this.$t("message.inputTxt"),
				cardList: this.$store.getters.getCardListHave
			}
		},
		created() {

		},
		mounted() {
			if(this.cardList.length == 0) {
				this.cardList.push({
					text: (this.langType ? '卡' : 'Card') + (this.cardList.length + 1) + "：",
					value: ''
				})
			}
		},
		methods: {
			back() {
				history.go(-1)
			},
			confirm() {
				var that = this
				if(this.cardList.length == 1 && !this.cardList[0].value) {
					return
				}
				let arr = JSON.parse(JSON.stringify(that.cardList))
				if(!this.cardList[this.cardList.length-1].value){
					arr.pop()
				}
				
				arr.map(function(item, idx) {
					item.text = (that.langType ? '卡' : 'Card') + (idx + 1) + '：' + item.value
				})
				this.$store.commit('setCardListHave', arr)
				this.$router.replace("/confirmOrder")
			},
			addCard() {
				if(this.cardList.length > 0) {
					if(!this.cardList[this.cardList.length - 1].value) {
						return
					}
				}
				this.cardList.push({
					text: (this.langType ? '卡' : 'Card') + (this.cardList.length + 1) + "：",
					value: ''
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.myCard {
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
			ul {
				padding: 0.8rem 0;
				li {
					margin-bottom: 1rem;
					font-size: 0.7rem;
					line-height: 1.8rem;
					.card {
						padding: 0 0.3rem;
						background: #F65200;
						color: #fff;
						border-radius: 0.2rem;
					}
					.inputBox {
						margin-left: 0.5rem;
						background: #f3f3f3;
						border-radius: 0.2rem;
						input {
							display: block;
							width: calc(100% - 2.2rem);
							line-height: 1.8rem;
							background: #f3f3f3;
							padding-left: 2.2rem;
							background: url(../../assets/image/saoma.png)no-repeat 0.2rem center;
							background-size: 1.4rem;
						}
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