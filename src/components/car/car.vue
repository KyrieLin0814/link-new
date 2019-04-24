<template>
	<div class="body-container car">
		<div class="scrollContent">
			<div class="head clearfix">
				<a class="back">
					<i @click="back"><img src="../../assets/image/left.png"/></i> {{$t("message.car")}}
				</a>
			</div>
			<div v-if="tcList.length>0">
				<cube-checkbox-group v-model="checkList" class="checkboxBox">
					<cube-checkbox :option="i.checkId" v-for="(i,idx) in tcList" :key="i.id">
						<div class="checkBoxContent flex">
							<div class="imgBox">
								<img :src="i.picDetailspage" />
							</div>
							<div class="content flex-1">
								<p class="name text-2">{{i.packageName}}</p>
								<p class="detail">
									{{$t("message.orderPeriod")}}:{{i.orderPeriod}} {{(i.packageType == '0' || i.packageType == '1')? $t("message.day") : (i.packageType == '5' ? $t("message.nian") : $t("message.yue") ) }}
								</p>
								<p class="price">{{$t("message.yuanFH")}}<span>{{i.currentPrice}}</span></p>
							</div>

							<div class="delBox" @click.stop>
								<label @click="delFunc(idx,i)">X</label>
							</div>
							<div class="numModel" @click.stop>
								<label>
									<number-bar @currentNum="currentNum(idx, arguments)" :currentNumber='i.currentNumber'></number-bar>
								</label>
							</div>
						</div>

					</cube-checkbox>
				</cube-checkbox-group>
			</div>
			<p class="noData" v-else>{{$t("message.empty")}}</p>

		</div>

		<div class="fixedBtns flex">
			<cube-button class="gray flex-1" @click="back">{{$t('message.jixu')}}</cube-button>
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
				langType: this.$store.getters.getLangType == 'cn',
				total: 0,
				checkList: this.$store.getters.getCheckList,
				tcList: this.$store.getters.getCartList,
				cartSelect: this.$store.getters.getCartSelect
			}
		},
		components: {
			NumberBar
		},
		created() {
			this.tcList.map(function(item, idx) {
				if(!item.checkId) {
					var checkId = item.packageCode + ',' + item.orderPeriod
					item.checkId = checkId
				}
			})
			this.totalFunc()
		},
		watch: {
			checkList(newVal) {
				this.$nextTick(function() {
					var that = this
					this.$store.commit('setCheckList', that.checkList)
					this.totalFunc()
				})
			}
		},
		mounted() {

		},
		methods: {
			back() {
				this.$router.push("/index")
			},
			totalFunc() {
				var that = this
				var selectList = []
				this.tcList.map(function(i) {
					that.checkList.map(function(j) {
						if(i.checkId == j) {
							selectList.push(JSON.parse(JSON.stringify(i)))
						}
					})
				})
				
				let arr = []
				selectList.map(function(item){
					for(var i = 0; i <item.currentNumber; i ++){
						arr.push(JSON.parse(JSON.stringify(item)))
					}
				})
				arr.map(function(item){
					item.currentNumber = 1
				})
				this.cartSelect = arr
				this.$store.commit('setCartSelect', selectList)
				this.$store.commit('setCartSelect2', arr)
				
				console.log(arr)
				this.total = Number(that.$tools.totalFunc(selectList).toFixed(2))
			},
			delFunc(idx, obj) {
				var that = this
				that.$tools.alert(that, that.langType ? '确定要删除该套餐吗？' : 'Are you sure to delete the package?', function() {
					that.checkList.map(function(j, i) {
						if(obj.checkId == j) {
							that.checkList.splice(i, 1)
						}
					})
					that.tcList.splice(idx, 1)
					that.$store.commit('setCheckList', that.checkList)
					that.$store.commit('setCartList', that.tcList)
				})

			},
			currentNum() {
				const index = arguments[0]
				const tag = arguments[1][0]
				this.tcList[index].currentNumber = tag
				this.$store.commit('setCartList', this.tcList)
				this.totalFunc()
			},
			confirmOrder() {
				if(!this.checkList.length) {
					return
				}
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
				margin-right: 0.5rem;
				background: #f5f5f5;
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
						margin: 0.1rem 0;
						font-size: 0.6rem;
						color: #999;
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
			.delBox {
				font-size: 0;
				margin-right: -0.2rem;
				height: 1rem;
				label {
					display: inline-block;
					position: relative;
					z-index: 99;
					font-size: 0.7rem;
					line-height: 1.1rem;
					color: #dfdfdf;
					padding: 0 0.25rem;
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