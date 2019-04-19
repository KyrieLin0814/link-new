<template>
	<div class="body-container index">
		<div class="scrollContent">
			<div class="top">
				<div class="title">{{$t("message.homepage")}}</div>
				<div class="flex">
					<input :placeholder="placeholder ? placeholder : (langType?'请选择':'Please choose')" @focus="toScreen" class="flex-1" />
					<nav-model class="indexNav"></nav-model>
				</div>
			</div>

			<div class="tuijian" v-if="tuijian.length>0">
				<div class="tilBox clearfix">
					<p class="til">{{$t("message.wntj")}}</p>
					<!--<a class="more" @click="tjMore">{{$t("message.ckgd")}}</a>-->
				</div>
				<div>
					<div class="swiper-container" v-if="tuijian.length>=3">
						<div class="swiper-wrapper">
							<div class="swiper-slide" 
								v-for="(i,idx) in tuijian" 
								:style="{backgroundImage: 'url(' + i.picHomepage + ')', backgroundSize: 'cover', backgroundPosition: 'center'}">
								<span>{{idx}}</span>
							</div>
						</div>
					</div>
					<div class="imgsBox clearfix" v-else>
						<div class="imgItem" v-for="(i,idx) in tuijian" :style="{backgroundImage: 'url(' + i.picHomepage + ')', backgroundSize: 'cover', backgroundPosition: 'center'}" @click="clickFunc(idx)" :class="{'active': tjActiveObj == i}"></div>
					</div>
				</div>

				<div class="tuijianContent">
					<div class="textBox">
						<p class="tjName text-1">{{tjActiveObj.packageName}}</p>
						<!--<p class="tjTil text-1">{{tjActiveObj.name2}}</p>-->
						<div class="clearfix">
							<p class="tjPrice">{{$t('message.yuanFH')}}{{$tools.priceShow(tjActiveObj)}}</p>
							<p class="oldPrice" v-if="tjActiveObj.specialPriceCNY">{{$t("message.yuanFH")}}{{$tools.priceShow(tjActiveObj,'yj')}}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="tejiaContent" v-if="tejia.length>0">
				<p class="til">{{$t("message.tjzs")}}</p>
				<div class="tejiaList clearfix">
					<div class="content" :class="{'en': !langType}" v-for="i in tejia" @click="detailFunc(i)">
						<div class="con">
							<div class="imgBox" :style="{backgroundImage: 'url(' + i.picHomepage + ')', backgroundSize: 'cover', backgroundPosition: 'center'}">
							</div>
							<div class="name text-2">
								<i>{{$t("message.tj")}}</i>
								<span>{{i.packageName}}</span>
							</div>
							<div class="price flex">
								<p class="now">{{$t('message.yuanFH')}}{{$tools.priceShow(i)}}</p>
								<p class="old flex-1" v-if="i.specialPriceCNY">{{$t('message.yuanFH')}}{{$tools.priceShow(i,'yj')}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="moreBox">
					<a class="more" @click="more">{{$t("message.moreTj")}}</a>
				</div>
			</div>

			<div class="hotType">
				<p class="til">{{$t("message.rmfl")}}</p>
				<div class="hotList clearfix">
					<div class="content">
						<div class="con" @click="hotFunc(1)">
							<img src="../../assets/image/yazhou.jpg" />
							<p>{{langType?'亚洲':'Asia'}}</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(2)">
							<img src="../../assets/image/ouzhou.jpg" />
							<p>{{langType?'欧洲':'Europe'}}</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(3)">
							<img src="../../assets/image/feizhou.jpg" />
							<p>{{langType?'非洲':'Africa'}}</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(4)">
							<img src="../../assets/image/nanmei.jpg" />
							<p>{{langType?'南美洲':'South America'}}</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(5)">
							<img src="../../assets/image/beimei.jpg" />
							<p>{{langType?'北美洲':'North America'}}</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(6)">
							<img src="../../assets/image/dayang.jpg" />
							<p>{{langType?'大洋洲':'Oceania'}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavModel from '../model/nav'
	import Swiper from 'swiper';

	export default {
		name: 'index',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				placeholder: '',
				tjActiveObjOld: null,
				tjActiveObj: {},
				tuijian: [],
				tejia: []
			}
		},
		components: {
			NavModel
		},
		created() {
			var that = this
			if(that.$store.getters.getDeviceCode) {
				//首页数据
				that.$post('/packageHomePage', {
					tradeType: 'packageHomePage',
					tradeData: {
						deviceCode: that.$store.getters.getDeviceCode,
						partnerScope: that.$store.getters.getLoginType
					}
				}).then((res) => {
					if(res.data.tradeRstCode == '0000') {
						that.tejia = res.data.teJia
						that.tuijian = res.data.tuiJian
						console.log(res.data.tuiJian)
					} else {
						that.$tools.toast(that, res.data.tradeRstMessage)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted() {
			
		},
		watch: {
			tuijian: function() {
				this.$nextTick(function() {
					var that = this
					if(that.tuijian.length >= 3) {

						//轮播渲染
						var width = document.body.clientWidth
						var swiper = new Swiper('.swiper-container', {
							slidesPerView: 3,
							spaceBetween: width * 0.05,
							speed: 100,
							loop: true,
							on: {
								transitionEnd: function() {
									var t = Number($(".swiper-slide-active span").html())
									that.tjActiveObj = that.tuijian[t]
								}
							}
						})

						//推荐3图以上点击绑定
						$(".swiper-container .swiper-slide").on('click', function(event) {
							var str = $(event.currentTarget).attr('class')
							var idx = Number($(event.currentTarget).find('span').text())
							if(str.indexOf('active') != -1) {
								that.$store.commit("setCurrentPackage", that.tuijian[idx])
								that.$router.push("/goodDetail")
							}
						})
					} else {
						that.tjActiveObj = that.tjActiveObjOld = that.tuijian[0]
					}

				})
			}
		},
		methods: {
			//3图以下推荐点击
			clickFunc(idx) {
				if(this.tuijian[idx] == this.tjActiveObjOld) {
					this.detailFunc(this.tjActiveObj)
				} else {
					this.tjActiveObj = this.tjActiveObjOld = this.tuijian[idx]
				}
			},
			//跳转详情
			detailFunc(obj) {
				this.$store.commit("setCurrentPackage", obj)
				this.$router.push("/goodDetail")
			},
			toScreen() {
				this.$router.push('/screenCountry')
			},
			tjMore() {
				this.$router.push('/goodList')
			},
			more() {
				this.$router.push({
					name: 'goodList',
					params: {
						sale: '1'
					}
				})
			},
			hotFunc(t) {
				this.$router.push({
					name: 'goodList',
					params: {
						type: t
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.index {
		overflow: hidden;
		.title {
			padding: 0;
		}
		.til {
			line-height: 1.6rem;
			font-size: 0.8rem;
		}
		.top {
			input {
				font-size: 0.7rem;
				color: #d1d1d1;
				padding: 0 0.5rem 0 2rem;
				border-radius: 0.2rem;
				background: url(../../assets/image/fdj.png) no-repeat #f3f3f3 0.3rem center;
				background-size: 1rem;
			}
		}
		.tuijian {
			margin-top: 0.5rem;
			.tilBox {
				line-height: 1.6rem;
				.til {
					float: left;
				}
				.more {
					font-size: 0.6rem;
					float: right;
					color: #9d9d9d;
				}
			}
			.tuijianContent {
				.imageBox {
					width: 100%;
					.img {
						position: relative;
						overflow: hidden;
						border-radius: 0.2rem;
						margin: 0 0.3rem;
						font-size: 0;
						line-height: 0;
						transition: all 0.3s;
						-webkit-transition: all 0.3s;
						img {
							width: 100%;
							height: 100%;
						}
						&:after {
							content: "";
							background: rgba(255, 255, 255, 0.3);
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
						}
						&.active {
							margin-top: -0.1rem;
							transform: scale(1.1);
							-webkit-transform: scale(1.1);
							box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
							&:after {
								display: none;
							}
						}
					}
				}
				.textBox {
					margin-top: 0.5rem;
					.tjName {
						font-size: 0.8rem;
						line-height: 1.2rem;
					}
					.tjTil {
						font-size: 0.7rem;
						line-height: 1rem;
						color: #a0a0a0;
					}
					.tjPrice {
						float: left;
						font-size: 0.8rem;
						line-height: 1rem;
						color: #f65200;
						font-weight: bold;
					}
					.oldPrice {
						float: left;
						margin-left: 0.5rem;
						color: #a0a0a0;
						font-size: 0.6rem;
						text-decoration: line-through;
						line-height: 1rem;
					}
				}
			}
		}
		.imgsBox {
			margin-top: 0.4rem;
			.imgItem {
				position: relative;
				float: left;
				width: 30%;
				margin: 0 2%;
				float: left;
				height: 0;
				padding-bottom: 40%;
				border-radius: 0.2rem;
				box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
				transition: all 0.2s;
				&:after {
					content: "";
					background: rgba(255, 255, 255, 0.3);
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					transition: all 0.2s;
				}
				&.active {
					transform: scale(1.1);
					&:after {
						background: none;
					}
				}
			}
		}
		.tejiaContent {
			padding-top: 0.5rem;
			.tejiaList {
				margin: -0.25rem -0.25rem 0;
				.content {
					position: relative;
					width: 50%;
					float: left;
					&:after {
						position: absolute;
						top: 0.15rem;
						right: 0.15rem;
						content: '';
						display: block;
						width: 35px;
						height: 35px;
						background: url(../../assets/image/tjIcon.png) no-repeat right top;
						background-size: 100%;
						z-index: 8;
					}
					&.en:after{
						background: url(../../assets/image/tjIcon_en.png) no-repeat right top;
						background-size: 100%;
						z-index: 8;
					}
					.con {
						margin: 0.25rem 0.25rem 0.6rem;
						.imgBox {
							border-radius: 0.2rem;
							height: 0;
							padding-bottom: 5.2rem;
							background: #f5f5f5;
						}
						.name {
							margin-top: 0.2rem;
							margin-bottom: 0.3rem;
							font-size: 0.7rem;
							line-height: 1rem;
							height: 2rem;
							i {
								font-style: normal;
								background: #f74031;
								color: #fff;
								font-size: 0.6rem;
								border-radius: 0.1rem;
								padding: 0 0.2rem;
							}
						}
						.price {
							font-size: 0.8rem;
							.now {
								color: #f74031;
								font-weight: bold;
								margin-right: 1rem;
							}
							.old {
								color: #a0a0a0;
								font-size: 0.6rem;
								text-decoration: line-through;
							}
						}
					}
				}
			}
			.moreBox {
				text-align: center;
				.more {
					display: inline-block;
					font-size: 0.7rem;
					color: #707070;
					background: #eeeeee;
					line-height: 1.3rem;
					height: 1.4rem;
					text-align: center;
					border-radius: 0.6rem;
					padding: 0 1rem;
				}
			}
		}
		.hotType {
			padding: 0.8rem 0 0.3rem;
			.hotList {
				margin: 0 -0.25rem;
				.content {
					position: relative;
					width: 50%;
					float: left;
					.con {
						margin: 0 0.25rem 0.5rem;
						img {
							display: block;
							width: 100%;
						}
						p {
							position: absolute;
							bottom: 1.3rem;
							width: 100%;
							text-align: center;
							font-size: 0.8rem;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>