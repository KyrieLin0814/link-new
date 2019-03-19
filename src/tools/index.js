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
	//计算总价格
	totalFunc(arr,kd,kf){
		var t = 0;
		arr.map(function(item) {
			t = t + Number(item.price)
		})
		if(kd){
			t = t + Number(kd)
		}
		if(kf){
			t = t + Number(kf)
		}
		return t
	}
	
};



export default tools;