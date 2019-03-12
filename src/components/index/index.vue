<template>
	<div class="body-container index">
		<div class="scrollContent">
			<div class="top">
				<div class="title">首页</div>
				<div class="flex">
					<input :placeholder="placeholder" @focus="toScreen" class="flex-1" />
					<nav-model class="indexNav"></nav-model>
				</div>
			</div>

			<div class="tuijian">
				<div class="tilBox clearfix">
					<p class="til">为您推荐</p>
					<a class="more">查看更多</a>
				</div>

				<div class="tuijianContent">
					<div class="imageBox flex">
						<div class="img flex-1" v-for="(i,idx) in tuijian" :class="{'active':idx == tjActive}" @click="tjFunc(idx)">
							<img src="../../assets/image/tj.jpg" />
						</div>
					</div>
					<div class="textBox">
						<p class="tjName text-1">{{tjActiveObj.name}}</p>
						<p class="tjTil text-1">{{tjActiveObj.name2}}</p>
						<p class="tjPrice text-1">{{$t('message.yuanFH')}}{{tjActiveObj.price}}</p>
					</div>
				</div>
			</div>

			<div class="tejiaContent">
				<p class="til">特价展示</p>
				<div class="tejiaList clearfix">
					<div class="content" v-for="i in tejia">
						<div class="con">
							<div class="imgBox">
								<img src="../../assets/image/tejia.jpg" />
							</div>
							<div class="name text-2">
								<i>特价</i>
								<span>{{i.name}}</span>
							</div>
							<div class="price flex">
								<p class="now">{{$t('message.yuanFH')}}{{i.priceNow}}</p>
								<p class="old flex-1">{{$t('message.yuanFH')}}{{i.priceOld}}</p>
							</div>
						</div>
					</div>
				</div>
				<a class="more" @click="more">更多特价</a>
			</div>

			<div class="hotType">
				<p class="til">热门分类</p>
				<div class="hotList clearfix">
					<div class="content">
						<div class="con" @click="hotFunc(1)">
							<img src="../../assets/image/yazhou.jpg" />
							<p>亚洲</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(2)">
							<img src="../../assets/image/ouzhou.jpg" />
							<p>欧洲</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(3)">
							<img src="../../assets/image/feizhou.jpg" />
							<p>非洲</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(4)">
							<img src="../../assets/image/nanmei.jpg" />
							<p>南美洲</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(5)">
							<img src="../../assets/image/beimei.jpg" />
							<p>北美洲</p>
						</div>
					</div>

					<div class="content">
						<div class="con" @click="hotFunc(6)">
							<img src="../../assets/image/dayang.jpg" />
							<p>大洋洲</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavModel from '../model/nav'

	export default {
		name: 'index',
		data() {
			return {
				langType: this.$lang,
				placeholder: '请选择',
				tjActive: 0,
				tjActiveObj: {},
				tuijian: [{
						name: '产品名称1产品名称1产品名称1',
						name2: '副标题111',
						price: '2888'

					},
					{
						name: '产品名称2产品名2产品名称2',
						name2: '副标题222',
						price: '999'

					},
					{
						name: '产品名称3产品名称3产品名称3',
						name2: '副标题333',
						price: '555'

					}
				],
				tejia: [{
					name: '产品名称1产品名称1产品名称1产品名称1产品名称1',
					priceNow: '2888',
					priceOld: '3888'

				}, {
					name: '产品名称1',
					priceNow: '2888',
					priceOld: '3888'

				}, {
					name: '产品名称1',
					priceNow: '2888',
					priceOld: '3888'

				}, {
					name: '产品名称1',
					priceNow: '2888',
					priceOld: '3888'

				}]
			}
		},
		components: {
			NavModel
		},
		created() {

		},
		mounted() {
			this.tjFunc(0)

		},
		methods: {
			toScreen() {
				this.$router.push('/chooseCountry')
			},
			tjFunc(idx) {
				this.tjActive = idx
				this.tjActiveObj = this.tuijian[idx]
			},
			more(){
				this.$router.push('/')
			},
			hotFunc(tyle){
				this.$router.push('/')
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
				padding: 0 0.5rem;
				background: #f3f3f3;
				border-radius: 0.2rem;
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
				padding-top: 0.5rem;
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
							box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
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
						font-size: 0.8rem;
						line-height: 1rem;
						color: #f65200;
						font-weight: bold;
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
					.con {
						margin: 0.25rem 0.25rem 0.6rem;
						.imgBox {
							border-radius: 0.2rem;
							overflow: hidden;
							img {
								display: block;
								width: 100%;
							}
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
			.more {
				display: block;
				font-size: 0.7rem;
				color: #707070;
				background: #eeeeee;
				line-height: 1.2rem;
				width: 5rem;
				text-align: center;
				border-radius: 0.6rem;
				margin: 0 auto;
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