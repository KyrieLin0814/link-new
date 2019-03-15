<template>
	<div class="body-container goodList">
		<div class="scrollContent">
			<div class="head clearfix">
				<a class="back">
					<i @click="back"><img src="../../assets/image/left.png"/></i>
					{{$t("message.goodList")}}<span>{{$t("message.gong")}}{{goodList.length}}{{$t("message.zhong")}}</span>
				</a>
				<span class="screen"><img src="../../assets/image/screen.png"/></span>
			</div>
			<div class="listContent">
				<ul>
					<li class="flex" v-for="i in goodList">
						<div class="imgBox">
							<img src="../../assets/image/goodlist.jpg" />
						</div>
						<div class="content flex-1">
							<p class="name text-1">{{i.name}}</p>
							<p class="detail">{{i.detail}}</p>
							<p class="price">{{$t("message.yuanFH")}}<span>{{i.price}}</span></p>
						</div>
						<div class="carBox">
							<a class="carBtn" @click="addCar(i)"><img src="../../assets/image/car.png" /></a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'goodList',
		data() {
			return {
				langType: this.$lang == 'cn',
				goodList: [{
					name: '套餐11111套餐11111套餐11111',
					detail: "50MB/月",
					price: "90"
				}, {
					name: '套餐2222',
					detail: "100MB/月",
					price: "188"
				}]
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			back() {
				history.go(-1)
			},
			addCar(obj){
				this.$router.push("/car")
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodList {
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
				i{
					display: inline-block;
					width:0.5rem;
					vertical-align: middle;
					height: 100%;
					padding-right: 0.2rem;
					img{
						width:100%;
						display: inline-block;
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
					margin-bottom:1rem;
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
							line-height: 1.2rem;
							font-size: 0.8rem;
							&.detail{
								font-size:0.7rem;
								color:#bfbfbf;
							}
							&.price{
								font-size:0.7rem;
								span{
									vertical-align: bottom;
									display: inline-block;
									padding-left:0.2rem;
									font-size:1rem;
									color:#f65200;
								}
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