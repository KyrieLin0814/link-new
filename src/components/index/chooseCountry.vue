<template>
	<div class="body-container chooseCountry">
		<div class="topContent">
			<p class="title">选择国家</p>
			<div class="inputBox flex">
				<input class="flex-1" type="text" placeholder="请选择国家" v-model="param" />
				<cube-button class="color">查询</cube-button>
			</div>
			<div class="myCountries">
				<div class="top clearfix">
					<p class="til">已选择国家</p>
					<a class="clean"></a>
				</div>
				<ul class="clearfix">
					<li class="color" v-for="item in countryList">{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="list">
			<p class="til">分类选择</p>
			<cube-tab-bar v-model="selectedLabel" show-slider>
				<cube-tab v-for="(item, index) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
				</cube-tab>
			</cube-tab-bar>
			<div class="scrollContent">
				<cube-tab-panels v-model="selectedLabel">
					<cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
						<ul>
							<li class="tab-panel-li" v-for="(hero, index) in item.heroes">
								{{hero}}
							</li>
						</ul>
					</cube-tab-panel>
				</cube-tab-panels>
				<div class="btns flex">
					<cube-button class="white flex-1" @click="back">{{$t("message.cancel")}}</cube-button>
					<cube-button class="color flex-1" @click="confirm">{{$t("message.confirm")}}</cube-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'chooseCountry',
		data() {
			return {
				langType: this.$lang,
				param: '',
				countryList: ['中国', '欧洲'],
				selectedLabel: '全部国家',
				tabs: [{
					label: '全部国家',
					heroes: ['中国', '法国', '美国', '韩国', '日本', '幻影长矛手', '复仇之魂', '力丸', '矮人狙击手', '圣堂刺客', '露娜', '赏金猎人', '熊战士', '法国', '美国', '韩国', '日本', '幻影长矛手', '复仇之魂', '力丸', '矮人狙击手', '圣堂刺客', '露娜', '赏金猎人', '熊战士']
				}, {
					label: '亚洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}, {
					label: '欧洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}, {
					label: '大洋洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}, {
					label: '南美洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}, {
					label: '北美洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}, {
					label: '非洲',
					heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
				}]

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			back(){
				history.go(-1)
			},
			confirm(){
				
				this.$router.replace("/screenCountry")
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
					color: #b5b5b5;
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
					margin: 0 0.4rem 0.3rem 0;
					background: #f65200;
					color: #fff;
					line-height: 1.4rem;
					height: 1.4rem;
					border-radius: 0.7rem;
					padding: 0 0.8rem;
				}
			}
		}
		.list {
			margin-top: 0.5rem;
			.til {
				font-size: 0.8rem;
				line-height: 2rem;
				padding-left: 0.8rem;
			}
			.cube-tab-bar {
				.cube-tab {
					font-size: 0.7rem;
				}
			}
			.scrollContent {
				padding-bottom: 3rem;
				.cube-tab-panel {
					.tab-panel-li {
						font-size: 0.7rem;
						text-indent: 2em;
						line-height: 1.4rem;
					}
				}
				.btns{
					position: fixed;
					left:0;
					right:0;
					bottom:0;
					padding:0.3rem 1rem;
					background: #fff;
					border-top:1px solid #d5d5d5;
					button{
						margin:0 0.5rem;
						line-height:1.8rem;
						height:1.8rem;
						font-size:0.7rem;
					}
					.white{
						background: #d5d5d5;
						color:#000;
					}
					
				}
			}
		}
	}
</style>