<template>
	<div class="body-container orderList">
		<div class="scrollContent">
			<p class="title">我的订单<span>共{{total}}个订单</span></p>

			<ul class="list">
				<li class="item" v-for="i in list">
					<div class="top clearfix">
						<p>订单 {{i.orderCode}}</p>
						<span>2019-01-07 13:00</span>
					</div>
					<p class="til">套餐费用</p>
					<ul class="content">
						<li class="clearfix">
							<p class="costTxt">套餐费用</p>
							<p class="costNum">x{{i.TCnum}}</p>
						</li>
						<li class="clearfix">
							<p class="costTxt">快递费用</p>
							<p class="costNum">x{{i.KDnum}}</p>
						</li>
						<li class="clearfix">
							<p class="costTxt">卡片费用</p>
							<p class="costNum">x{{i.KPnum}}</p>
						</li>
					</ul>
					<div class="totalCost">合计：<span>{{$t("message.yuanFH")}}{{i.total}}</span></div>
					<cube-button class="color">点击查看详情</cube-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				langType: this.$lang,
				total: '2',
				list: [{
					orderCode: '000025692',
					TCnum: '2',
					KDnum: '1',
					KPnum: '1',
					total: '180'
				},{
					orderCode: '000025692',
					TCnum: '2',
					KDnum: '1',
					KPnum: '1',
					total: '180'
				}]
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.orderList {
		.title {
			span {
				display: inline-block;
				margin-left: 0.5rem;
				font-size: 0.65rem;
				color: #bfbfbf;
			}
		}
		.list {
			padding: 0.2rem 0 1rem;
			.item {
				margin-bottom:1.3rem;
				background: #fff;
				padding: 0.5rem;
				border-radius: 0.3rem;
				box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1);
				.top {
					font-size: 0.6rem;
					color: #bfbfbf;
					margin-bottom:0.3rem;
					line-height:1rem;
					p {
						float: left;
					}
					span{
						float:right;
					}
				}
				.til{
					font-size:0.8rem;
					line-height:1.4rem;
				}
				.content{
					li{
						border-bottom:1px solid #eee;
						line-height:1.5rem;
						font-size:0.7rem;
						color:#a7a7a7;
						.costTxt{
							float:left;
						}
						.costNum{
							float:right;
						}
					}
				}
				.totalCost{
					text-align: right;
					font-size:0.7rem;
					line-height:2rem;
					border-bottom:1px dotted #ccc;
					span{
						color:#db3749;
						font-size:1rem;
					}
					
				}
				.color{
					margin:0.6rem auto 0.2rem;
					width:50%;
					line-height:1.3rem;
					height:1.4rem;
					font-size:0.7rem;
				}
			}
		}
	}
</style>