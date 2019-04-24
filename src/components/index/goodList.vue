<template>
	<div class="body-container goodList">
		<div class="scrollContent">
			<div class="head clearfix">
				<a class="back">
					<i @click="back"><img src="../../assets/image/left.png"/></i> {{$t("message.goodList")}}
					<span>{{$t("message.gong")}}{{goodList.length}}{{$t("message.zhong")}}</span>
				</a>
				<span class="screen" @click="showMask"><img src="../../assets/image/screen.png"/></span>
			</div>
			<div class="listContent" v-if="goodList.length > 0">
				<ul>
					<li class="flex" v-for="i in goodList">
						<div class="imgBox">
							<img :src="i.picDetailspage">
						</div>
						<div class="content flex-1">
							<p class="name text-2">{{i.packageName}}</p>
							<!--<p class="detail">{{i.detail}}</p>-->
							<div class="priceBox clearfix">
								<p class="price">{{$t("message.yuanFH")}}<span>{{$tools.priceShow(i)}}</span></p>
								<p class="oldPrice" v-if="i.originalPriceCNY">{{$t("message.yuanFH")}}{{$tools.priceShow(i,'yj')}}</p>
							</div>

						</div>
						<div class="carBox">
							<a class="carBtn" @click.stop="addCar(i)"><img src="../../assets/image/car.png" /></a>
						</div>
					</li>
				</ul>
			</div>
			<p class="noData" v-else>{{$t("message.noData")}}</p>
		</div>

		<div class="masker" v-if="screenFlag" @click="hideMask"></div>
		<div class="maskBox" :class="{'show': screenFlag}">
			<p class="til">{{$t('message.yxzgj')}}</p>
			<div class="countryChooses clearfix">
				<span class="countryItem" v-for="(i,idx) in country">{{i}}<i @click="deleteFunc(idx)">&times;</i></span>
				<span class="add" @click="addFunc">{{$t('message.add')}}</span>
			</div>
			<p class="til">{{$t('message.yxzsj')}}</p>
			<div class="radioBox three">
				<cube-radio-group v-model="sjValue" :options="sjList" :horizontal="true" :hollowStyle="true" />
			</div>
			<div class="fixedBtns flex">
				<cube-button class="gray flex-1" @click="hideMask">{{$t('message.cancel')}}</cube-button>
				<cube-button class="color flex-1" @click="confirm">{{$t("message.confirm")}}</cube-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'goodList',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				screenFlag: false,
				goodList: [],
				country: ['中国', '欧洲'],
				sjList: this.$store.getters.getOptionSjList,
				sjValue: this.$store.getters.getPackageType,
				sjValueOld: this.$store.getters.getPackageType,
			}
		},
		created() {

		},
		mounted() {
			this.country = JSON.parse(JSON.stringify(this.$store.getters.getCountryList))
			if(this.$route.params.routerType) {
				this.screenFlag = true
			} else {
				var that = this
				let type = this.$route.query.type
				let zhou = ''
				let country = ''
				let packageType = ''

				if(type == 1) {
					zhou = that.langType ? '亚洲' : 'Asia'
				} else if(type == 2) {
					zhou = that.langType ? '欧洲' : 'Europe'
				} else if(type == 3) {
					zhou = that.langType ? '非洲' : 'Africa'
				} else if(type == 4) {
					zhou = that.langType ? '南美洲' : 'SouthAmerica'
				} else if(type == 5) {
					zhou = that.langType ? '北美洲' : 'NorthAmerica'
				} else if(type == 6) {
					zhou = that.langType ? '大洋洲' : 'Oceania'
				} else {
					country = that.$store.getters.getCountryList.join(',')
					packageType = that.$store.getters.getPackageType
				}
				that.getList(zhou, country, packageType)
			}
		},
		methods: {
			getList(z, g, t) {
				var that = this
				that.$tools.loading(that)
				var sale = that.$route.params.sale ? that.$route.params.sale : ''
				that.$post('/packageList', {
					tradeType: 'packageList',
					tradeData: {
						continent: z ? z : '',
						country: g ? g : '',
						packageType: t ? t : '',
						partnerScope: that.$store.getters.getLoginType,
						salesType: sale
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.goodList = that.cutFunc(res.data.tradeData)
					}

					that.loading.hide()
				}).catch(err => {

					that.loading.hide()
					console.log(err)
				})
			},
			cutFunc(arr) {
				var codes = []
				var arrFinal = []
				arr.map(function(i) {
					if(JSON.stringify(codes).indexOf(i.packageCode) == -1) {
						codes.push(i.packageCode)
						arrFinal.push(i)
					}
				})
				return arrFinal
			},
			back() {
				history.go(-1)
			},
			addCar(obj) {
				this.$store.commit("setCurrentPackage", obj)
				this.$router.push("/goodDetail")
			},
			deleteFunc(i) {
				this.country.splice(i, 1)
			},
			addFunc() {
				this.$store.commit('setBackRouter', this.$route.name)
				this.$router.replace("/chooseCountry")
			},
			showMask() {
				this.sjValueOld = this.sjValue
				this.screenFlag = !this.screenFlag
			},
			hideMask() {
				this.country = JSON.parse(JSON.stringify(this.$store.getters.getCountryList))
				this.sjValue = this.sjValueOld
				this.screenFlag = !this.screenFlag
			},
			confirm() {
				this.$store.commit('setCountryList', this.country)
				this.$store.commit('setPackageType', this.sjValue)
				this.sjValueOld = this.sjValue
				this.screenFlag = !this.screenFlag

				var country = this.$store.getters.getCountryList.join(',')
				var packageType = this.$store.getters.getPackageType
				this.getList('', country, packageType)
			},
		}
	}
</script>

<style lang="less" scoped>
	.goodList {
		overflow: hidden;
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
					vertical-align: top;
					height: 100%;
					padding-right: 0.2rem;
					img {
						width: 100%;
						display: inline-block;
						vertical-align: top;
						margin-top: 0.5rem;
					}
				}
				span {
					color: #bfbfbf;
					font-size: 0.7rem;
					padding-left: 0.5rem;
				}
			}
			.screen {
				float: right;
				width: 2rem;
				height: 2rem;
				img {
					display: block;
					width: 1.2rem;
					margin: 0.5rem auto;
				}
			}
		}
		.listContent {
			padding: 1rem 0;
			ul {
				li {
					margin-bottom: 1rem;
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
							line-height: 1.2rem;
							font-size: 0.8rem;
							&.detail {
								font-size: 0.7rem;
								color: #bfbfbf;
							}
							&.price {
								float: left;
								font-size: 0.7rem;
								span {
									vertical-align: bottom;
									display: inline-block;
									padding-left: 0.2rem;
									font-size: 1rem;
									color: #f65200;
								}
							}
							&.oldPrice {
								float: left;
								margin-left: 0.5rem;
								color: #a0a0a0;
								font-size: 0.7rem;
								text-decoration: line-through;
							}
						}
					}
					.carBox {
						width: 2.5rem;
						position: relative;
						a {
							display: block;
							text-align: right;
							position: absolute;
							right: 0;
							bottom: 0;
							img {
								display: inline-block;
								width: 2.2rem;
							}
						}
					}
				}
			}
		}
	}
</style>