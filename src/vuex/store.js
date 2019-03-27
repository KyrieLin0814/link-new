import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/tools'
Vue.use(Vuex)
const state = {
	langType: localStorage.getItem("lang") ? localStorage.getItem("lang") : "cn",
	loginType: sessionStorage.getItem("loginType") ? sessionStorage.getItem("loginType") : "1",
	partnerCode: sessionStorage.getItem("partnerCode") ? sessionStorage.getItem("partnerCode") : 'P000270',
	token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : '',
	deviceCode: sessionStorage.getItem("deviceCode") ? sessionStorage.getItem("deviceCode") : '',
	connSeqNo:'',
	version:'2.0',
	
	
	listOptions: {
		//		有无卡片
		kpListCn: [{
			label: '有卡',
			value: '1'
		}, {
			label: '无卡',
			value: '0'
		}],
		kpListEn: [{
			label: 'Have card',
			value: '1'
		}, {
			label: 'No card',
			value: '0'
		}],
		//		套餐时间
		sjListCn: [{
			label: '全部',
			value: '1'
		}, {
			label: '日套餐',
			value: '2'
		}, {
			label: '月套餐',
			value: '3'
		}, {
			label: '季套餐',
			value: '4'
		}, {
			label: '半年套餐',
			value: '5'
		}, {
			label: '年套餐',
			value: '6'
		}],
		sjListEn: [{
			label: 'All set meals',
			value: '1'
		}, {
			label: 'Day set meal',
			value: '2'
		}, {
			label: 'Month set meal',
			value: '3'
		}, {
			label: 'Season set meal',
			value: '4'
		}, {
			label: 'Half year set meal',
			value: '5'
		}, {
			label: 'Year set meal',
			value: '6'
		}]
	},
	data: 1,
};

state.connSeqNo = state.partnerCode +  tools.getNowFormatDate() + tools.generate(10)

const getters = {
	getOptionKpList(state) {
		if(state.langType == 'cn'){
			return state.listOptions.kpListCn
		}else{
			return state.listOptions.kpListEn
		}
	},
	getOptionSjList(state) {
		if(state.langType == 'cn'){
			return state.listOptions.sjListCn
		}else{
			return state.listOptions.sjListEn
		}
	},
	getLoginType(state) {
		return state.loginType
	},
	getToken(state){
		return state.token
	},
	getDeviceCode(state){
		return state.deviceCode
	}
}

const mutations = {
	langFunc(state, param) {
		state.langType = param;
		localStorage.setItem("lang", param);
	},
	setLoginType(state, param) {
		state.loginType = param;
		sessionStorage.setItem("loginType", param);
	},
	setPartnerCode(state,param){
		state.partnerCode = param;
		sessionStorage.setItem("partnerCode", param);
	},
	setToken(state,param){
		state.token = param;
		sessionStorage.setItem("token", param);
	},
	setDeviceCode(state,param){
		state.deviceCode = param;
		sessionStorage.setItem("deviceCode", param);
	},
};
const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store;