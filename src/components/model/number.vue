<template>
	<div class="numberBar clearfix" @click.stop>
		<a class="del" @click="del">-</a>
		<span>{{num}}</span>
		<a class="add" @click="add">+</a>
	</div>
</template>

<script>
	export default {
		name: 'number',
		data() {
			return {
				langType: this.$store.getters.getLangType == 'cn',
				num: 1
			}
		},
		props: {
			currentNumber: {
				type: Number,
				default: 1
			}
			//			max: {
			//				type: String,
			//				default: '9999',
			//			},
			//			mix: {
			//				type: String,
			//				default: '1',
			//			}
		},
		mounted() {
			this.num = this.currentNumber
			//			if(this.max != '-1'){
			//				this.large = this.max
			//			}
		},
		methods: {
			del() {
				//				if(this.num > Number(this.mix)) {
				//					this.num--
				//				}else{
				//					this.$tools.toast(this, this.langType ? '不能再少了':'No less')
				//				}
				let flag = false
				if(this.num > 1) {
					this.num--
				}else{
					flag = true
				}
				this.$emit('currentNum', this.num, false, flag);
			},
			add() {
				//				if(this.num < Number(this.large)) {
				//					this.num++
				//				}else{
				//					this.$tools.toast(this, this.langType ? '不能再多了':'No more')
				//				}
				this.num++
					this.$emit('currentNum', this.num, true);
			}
		}
	}
</script>

<style lang="less" scoped>
	.numberBar {
		position: relative;
		display: inline-block;
		z-index: 999;
		border: 1px solid #ccc;
		font-size: 0.7rem;
		a {
			float: left;
			height: 1.2rem;
			display: inline-block;
			line-height: 1.15rem;
			padding: 0 0.3rem;
			&.add {}
			&.del {
				font-size: 1rem;
				padding: 0 0.35rem;
			}
		}
		span {
			float: left;
			display: inline-block;
			height: 1.2rem;
			line-height: 1.15rem;
			padding: 0 0.5rem;
			border-left: 1px solid #ccc;
			border-right: 1px solid #ccc;
		}
	}
</style>