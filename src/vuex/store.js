import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
	langType: localStorage.getItem("lang") ? localStorage.getItem("lang") : "cn",
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
	isShow(state) {
		return state.data
	}
};

const mutations = {
	langFunc(state, param) {
		state.langType = param;
		//console.log(param)
		localStorage.setItem("lang", param);
	}
};
const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store;