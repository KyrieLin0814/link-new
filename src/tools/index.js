const tools = {
	//提示
	alert(v, txt, til) {
		v.$createDialog({
			type: 'alert',
			title: til ? til : v.$t('message.ts'),
			content: txt,
			confirmBtn: v.$t('message.confirm')
		}).show()
	}
};

export default tools;