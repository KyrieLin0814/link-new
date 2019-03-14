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
				num: 1
			}
		},
		props: {
			large: {
				type: String,
				default: '999999',
			}
		},
		
		methods: {
			del() {
				if(this.num > 1) {
					this.num--
				}
			},
			add() {
				if(this.num < Number(this.large)) {
					this.num++
				}
				return false;
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
		font-size: 0.8rem;
		a {
		float:left;
			height: 1.6rem;
			display: inline-block;
			line-height: 1.5rem;
			padding: 0 0.4rem;
			&.add {}
			&.del {
				font-size: 1rem;
				padding: 0 0.45rem;
			}
		}
		span {
		float:left;
			display: inline-block;
			height: 1.6rem;
			line-height: 1.5rem;
			padding: 0 0.5rem;
			border-left: 1px solid #ccc;
			border-right: 1px solid #ccc;
		}
	}
</style>