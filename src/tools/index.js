import Vue from 'vue'
const tools = {
	//提示
	alert(v, txt, til) {
		v.$createDialog({
			type: 'alert',
			title: til ? til : v.$t('message.ts'),
			content: txt,
			confirmBtn: v.$t('message.confirm')
		}).show()
	},
	//计算价格
	totalFunc(arr,kd,kf){
		var t = 0;
		arr.map(function(item) {
			t = t + Number(item.price)
		})
		this.total = t
	}
	
};



export default tools;