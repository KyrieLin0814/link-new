<template>
	<div class="body-container chooseCountry">
		<div class="topContent">
			<p class="title">{{$t("message.chooseCountry")}}</p>
			<div class="inputBox flex">
				<input class="flex-1" type="text" :placeholder="placeholder" v-model="param" />
				<cube-button class="color" @click="find()">{{$t("message.search")}}</cube-button>
			</div>
			<div class="myCountries">
				<div class="top clearfix">
					<p class="til">{{$t("message.choosedCountry")}}</p>
					<a class="clean" @click="cleanFunc"></a>
				</div>
				<ul class="clearfix" v-if="countryListSeleted.length > 0">
					<li class="color" v-for="(item,idx) in countryListSeleted">
						{{item}}
						<i @click="del(idx)">&times;</i>
					</li>
				</ul>
				<p class="zw" v-else>{{$t("message.zw")}}</p>
			</div>
		</div>
		<div class="list">
			<p class="til">{{$t("message.flxz")}}</p>

			<div class="tabBar">
				<div class="scroll">
					<div class="tabContent">
						<span :class="{'active': avtiveTab == '-1'}" @click="tabFunc('-1')">{{$t('message.qbgj')}}</span>
						<span :class="{'active': avtiveTab == idx}" v-for="(i,idx) in areaList" @click="tabFunc(idx, i.continentName)">{{i.continentName}}</span>
					</div>
				</div>
			</div>
			<div class="countriesBox">
				<div class="countriesScroll">
					<ul class="countriesList">
						<li v-for="i in countryList" @click="chooseFunc(i)">{{i.countryName}}</li>
					</ul>
				</div>
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
		name: 'chooseCountry',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				param: '',
				placeholder: '',
				countryListSeleted: [],
				avtiveTab: '-1',
				areaList: [],
				countryList: [],

			}
		},
		created() {
			var that = this
			//默认选中
			this.countryListSeleted = JSON.parse(JSON.stringify(that.$store.getters.getCountryList))

			//国家列表
			that.$tools.loading(that)
			that.$post('/continentList', {
				tradeType: 'continentList'
			}).then((res) => {
				if(res.data.tradeRstCode == '0000') {
					that.areaList = res.data.tradeData
				}
				that.loading.hide()
			}).catch(err => {
				console.log(err)
				that.loading.hide()
			})

			that.getCountry()

		},
		watch: {
			countryListSeleted() {
				this.$nextTick(function() {
					this.cssFunc()
				})
			}
		},
		mounted() {
			if(this.countryListSeleted.length > 0) {
				this.placeholder = this.countryListSeleted.join('/')
			} else {
				this.placeholder = this.langType ? '请选择国家' : 'Please select countries'
			}
			this.cssFunc()
		},
		methods: {
			cssFunc() {
				var t = $(".list")[0].offsetTop;
				$(".list").css('height', '100%').css('height', '-=' + t + 'px');
				var h = $(".til").height() + $(".tabBar").height() + $(".fixedBtns").height() + 15;
				$(".countriesBox").css('height', '100%').css('height', '-=' + h + 'px');
			},
			tabFunc(idx, txt) {
				this.avtiveTab = idx
				this.getCountry(txt ? txt : '')
			},
			getCountry(p, func) {
				var that = this
				that.$tools.loading(that)
				that.$post('/countryList', {
					tradeType: 'countryList',
					tradeData: {
						continentName: p
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.countryList = res.data.tradeData
						if(typeof(func) == 'function') {
							func()
						}
					}
					that.loading.hide()
				}).catch(err => {
					console.log(err)
					that.loading.hide()
				})
			},
			find() {
				var that = this
				this.avtiveTab = '-1'
				if(!this.param) {
					this.getCountry()
				} else {
					var countryParam = []
					that.getCountry('', function() {
						that.countryList.map(function(item) {
							if(item.countryName.indexOf(that.param) > -1) {
								countryParam.push(item)
							}
						})
						that.countryList = countryParam
					})
				}

			},
			chooseFunc(obj) {
				var have = false
				this.countryListSeleted.map(function(item) {
					if(obj.countryName == item) {
						have = true
					}
				})
				if(have) {
					this.$tools.toast(this, this.langType ? '已选择该国家' : 'The country has been selected')
				} else {
					this.countryListSeleted.push(obj.countryName)
				}
			},
			del(i) {
				this.countryListSeleted.splice(i, 1)
			},
			cleanFunc() {
				this.countryListSeleted = []
			},
			back() {
				var backRouter = this.$store.getters.getBackRouter
				if(backRouter) {
					this.$store.commit('setBackRouter', '')
					this.$router.replace({
						name: backRouter,
						params: {
							routerType: true
						}
					})
				} else {
					history.go(-1)
				}
			},
			confirm() {
				this.$store.commit('setCountryList', this.countryListSeleted)
				this.back()
			}

		}
	}
</script>

<style lang="less" scoped>
	.chooseCountry {
		overflow: auto;
		.topContent {
			padding: 0 0.8rem;
			background: #fff;
			font-size: 0.7rem;
			.inputBox {
				input {
					display: block;
					padding: 0 0.5rem;
					background: #f3f3f3;
					color: #666;
					border-radius: 5px;
				}
				button {
					margin-left: 0.3rem;
					width: 4rem;
					line-height: 1.8rem;
					height: 1.8rem;
					font-size: 0.7rem;
				}
			}
			.top {
				line-height: 2rem;
				.til {
					float: left;
				}
				.clean {
					display: inline-block;
					float: right;
					background: url(../../assets/image/delete.png) no-repeat center;
					background-size: 0.8rem 0.8rem;
					width: 2rem;
					height: 2rem;
				}
			}
			ul {
				li {
					float: left;
					font-size: 0.7rem;
					margin: 0 0.4rem 0.3rem 0;
					background: #f65200;
					color: #fff;
					line-height: 1.35rem;
					height: 1.4rem;
					border-radius: 0.7rem;
					padding: 0 0.8rem;
					i {
						margin-right: -0.2rem;
						margin-left: 0.1rem;
						color: #fff;
						display: inline-block;
						font-style: normal;
						font-size: 0.8rem;
					}
				}
			}
			.zw {
				color: #999;
				padding-left: 0.5rem;
			}
		}
		.list {
			margin-top: 0.5rem;
			overflow: hidden;
			.til {
				font-size: 0.8rem;
				line-height: 2rem;
				padding-left: 0.8rem;
			}
			.tabBar {
				width: 100%;
				.scroll {
					overflow: scroll;
					border-bottom: 4px solid #ccc;
					.tabContent {
						position: relative;
						z-index: 9;
						font-size: 0;
						white-space: nowrap;
						margin-bottom: 4px;
						span {
							display: inline-block;
							font-size: 0.7rem;
							padding: 0 0.5rem;
							line-height: 1.5rem;
							&.active {
								color: #f65200;
								border-bottom: 4px solid #f65200;
								margin-bottom: -4px;
							}
						}
					}
				}
			}
			.countriesBox {
				overflow: scroll;
				.countriesScroll {
					.countriesList {
						padding: 0.3rem 0.7rem;
						li {
							font-size: 0.7rem;
							line-height: 1.4rem;
						}
					}
				}
			}
		}
	}
</style>