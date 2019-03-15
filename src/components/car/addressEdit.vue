<template>
	<div class="body-container addressEdit">
		<div class="scrollContent">
			<div class="title">{{$t("message.kdxx")}}</div>
			<div class="formContent">

				<div class="inputBox flex">
					<label>姓名：</label>
					<input type="text" class="flex-1" v-model="addressObj.name" />
				</div>
				<div class="inputBox flex tel">
					<label>电话：</label>
					<input type="tel" class="flex-1" v-model="addressObj.tel" />
				</div>

				<div class="inputBox flex">
					<label>所在地区：</label>
					<p class="flex-1 areaTxt">{{addressObj.areaTxt}}</p>
				</div>
				<div class="inputBox flex area">
					<label>详细地址：</label>
					<input type="text" class="flex-1" v-model="addressObj.addressTxt" />
				</div>

				<div class="inputBox flex">
					<label>公司名称：</label>
					<input type="text" class="flex-1" v-model="addressObj.companyName" />
				</div>
				<div class="inputBox flex">
					<label>邮箱号码：</label>
					<input type="text" class="flex-1" v-model="addressObj.email" />
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
		name: 'addressEdit',
		data() {
			return {
				langType: this.$lang == 'cn',
				addressObj: {
					name: '',
					tel: '',
					areaTxt: '',
					addressTxt: '',
					companyName: '',
					email: ''
				}
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
			confirm() {
				this.$router.push("/confirmOrder")
			}
		}
	}
</script>

<style lang="less" scoped>
	.addressEdit {
		.formContent {
			margin: 0 -0.7rem;
			.inputBox {
				padding: 0.7rem 0.7rem;
				font-size: 0.7rem;
				line-height: 1.2rem;
				label {
					padding-right:0.3rem;
				}
				input,
				p {
					border-bottom: 1px solid #eee;
				}
				&.tel,
				&.area {
					padding-bottom:0.5rem;
					border-bottom:1rem solid #f8f8f8;
				}
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