<template>
	<div class="container">
		<div class="logo">
			<img src="../../assets/image/logo1.png" />
		</div>
		<p>欢迎您！</p>
		<div class="cardBox">
			<input type="text" :placeholder="placeholder" />
			<a class="sao"></a>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'loginHaveCard',
		data() {
			return {
				placeholder: "请输入19/20位的ICCID卡号"
				
			}
		},
		created() {
			
		}
	}
</script>

<style lang="less" scoped>
	.container{
		.logo{
			img{
				display: block;
				width:66%;
				max-width:400px;
				margin:0 auto;
			}
		}
	}
</style>