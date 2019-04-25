<template>
	<div class="body-container addressEdit">
		<div class="scrollContent">
			<div class="title">{{$t("message.kdxx")}}</div>
			<div class="formContent">

				<div class="inputBox name">
					<label>{{$t("message.name")}}：</label>
					<input type="text" v-model="addressObj.name" :placeholder=" langType ? '请输入收件人姓名':'Please enter your name' " />
				</div>
				<div class="inputBox tel">
					<label>{{$t("message.tel")}}：</label>
					<input type="text" maxlength="11" v-model="addressObj.tel" :placeholder=" langType ? '请输入联系电话':'Please enter your telephone number'" />
				</div>

				<div class="inputBox local" v-if="langType">
					<label>{{$t("message.myLocation")}}：</label>
					<p class="areaTxt" :class="{'have': addressObj.areaTxt}" @click="areaFunc">
						{{addressObj.areaTxt ? addressObj.areaTxt : '请点击选择所在地区'}}
					</p>
				</div>
				<div class="inputBox local" v-else>
					<label>{{$t("message.myLocation")}}：</label>
					<input type="text" v-model="addressObj.areaTxt" placeholder="Please enter your location" />
				</div>
				<div class="inputBox area">
					<label>{{$t("message.address")}}：</label>
					<input type="text" v-model="addressObj.addressTxt" :placeholder=" langType ? '请输入详细地址':'Please enter a detailed address' " />
				</div>

				<div class="inputBox company">
					<label>{{$t("message.company")}}：</label>
					<input type="text" v-model="addressObj.companyName" :placeholder=" langType ? '请输入公司名称':'Please enter the name of your company' " />
				</div>
				<div class="inputBox email">
					<label>{{$t("message.email")}}：</label>
					<input type="text" v-model="addressObj.email" :placeholder=" langType ? '请输入电子邮件':'Please enter your e-mail' " />
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
	import { provinceList, cityList, areaList } from '@/assets/js/area'
	const addressData = provinceList
	addressData.forEach(province => {
		province.children = cityList[province.value]
		province.children.forEach(city => {
			city.children = areaList[city.value]
		})
	})
	export default {
		name: 'addressEdit',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				addressObj: {}
			}
		},
		created() {
			var that = this
			this.addressObj = JSON.parse(JSON.stringify(that.$store.getters.getAddressObj))
		},
		mounted() {
			var that = this
			that.addressPicker = this.$createCascadePicker({
				title: that.langType ? '选择地区' : 'Choose the area',
				data: addressData,
				onSelect: (selectedVal, selectedIndex, selectedText) => {
					that.addressObj.areaTxt = selectedText.join('')
				},
				onCancel: () => {}
			})
		},
		methods: {
			back() {
				history.go(-1)
			},
			confirm() {
				var that = this
				let reg1 = /^[1-9]\d*$/
				let reg2 = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
				if(!reg1.test(this.addressObj.tel)) {
					that.$tools.alert(that, this.langType ? '请输入正确的电话' : 'Please enter the correct phone number')
					return
				}
				if(!reg2.test(this.addressObj.email)) {
					that.$tools.alert(that, this.langType ? '请输入正确的邮箱' : 'Please enter the correct E-mail')
					return
				}

				if(this.addressObj.name &&
					this.addressObj.tel &&
					this.addressObj.areaTxt &&
					this.addressObj.addressTxt &&
					this.addressObj.email &&
					this.addressObj.companyName) {
					that.$store.commit('setAddressObj', that.addressObj)
					that.$router.replace("/confirmOrder")
				} else {
					that.$tools.alert(that, this.langType ? '请将信息填写完整' : 'Please fill in the complete information')
				}
			},
			areaFunc() {
				this.addressPicker.show()
			}
		}
	}
</script>

<style lang="less" scoped>
	.addressEdit {
		.formContent {
			margin: 0 -0.7rem;
			padding-bottom: 2.5rem;
			.inputBox {
				padding: 0.3rem 0.7rem;
				label {
					display: block;
					padding-left: 1rem;
					font-size: 0.8rem;
					line-height: 1.4rem;
				}
				&.name label {
					background: url(../../assets/image/name.png)no-repeat left center;
					background-size: 0.6rem;
				}
				&.tel label {
					background: url(../../assets/image/tel.png)no-repeat left center;
					background-size: 0.7rem;
				}
				&.local label {
					background: url(../../assets/image/local.png)no-repeat left center;
					background-size: 0.6rem;
				}
				&.area label {
					background: url(../../assets/image/place.png)no-repeat left center;
					background-size: 0.7rem;
				}
				&.company label {
					background: url(../../assets/image/company.png)no-repeat left center;
					background-size: 0.7rem;
				}
				&.email label {
					background: url(../../assets/image/email.png)no-repeat left center;
					background-size: 0.7rem;
				}
				input {
					display: block;
					width: 100%;
				}
				input,
				p {
					font-size: 0.7rem;
					line-height: 1.4rem;
				}
				.areaTxt {
					color: #757575;
					&.have {
						color: #313131;
					}
				}
				&.tel,
				&.area {
					padding-bottom: 0.5rem;
					border-bottom: 1rem solid #f1f1f1;
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