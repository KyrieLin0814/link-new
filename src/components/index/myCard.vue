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
							<span class="screenBtn" @click="screenFunc(idx)"></span>
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
				cardList: []
			}
		},
		created() {
			var that = this
			//默认选中
			this.cardList = JSON.parse(JSON.stringify(that.$store.getters.getCardListHave))
		},
		mounted() {
			var that = this
			if(this.$store.getters.getOpenId) {
				that.$tools.wxSaoConfig(that)
			}

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
				if(!this.cardList[this.cardList.length - 1].value) {
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
			},
			screenFunc(idx) {
				var that = this
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
						var deviceId = result.split(",")[1]
						that.cardList[idx].value = JSON.stringify(deviceId)
					},
					error: function(err) {
						//alert(JSON.stringify(err))
					}
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
			padding-bottom: 2.5rem;
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
						position: relative;
						margin-left: 0.5rem;
						background: #f3f3f3;
						border-radius: 0.2rem;
						input {
							display: block;
							width: calc(100% - 2.2rem);
							line-height: 1.8rem;
							background: #f3f3f3;
							padding-left: 2.2rem;
						}
						.screenBtn {
							position: absolute;
							left: 0;
							top: 0;
							width: 2.2rem;
							height: 100%;
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