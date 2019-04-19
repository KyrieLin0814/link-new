import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/tools'
Vue.use(Vuex)
const state = {
	//用户信息
	langType: localStorage.getItem("lang") ? localStorage.getItem("lang") : "cn",
	loginType: sessionStorage.getItem("loginType") ? sessionStorage.getItem("loginType") : "1",
	partnerCode: sessionStorage.getItem("partnerCode") ? sessionStorage.getItem("partnerCode") : 'P000270',
	requestOrderId: sessionStorage.getItem("requestOrderId") ? sessionStorage.getItem("requestOrderId") : '',
	token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : '',
	deviceCode: sessionStorage.getItem("deviceCode") ? sessionStorage.getItem("deviceCode") : '',
	openId: sessionStorage.getItem("openId") ? sessionStorage.getItem("openId") : '', //oc07A071Sr3kVbqqIWLGtTlwGIac
	connSeqNo: '',
	version: '2.0',
	
	baseBg: require('../assets/image/goodlist.jpg'),

	//跳转缓存
	pageParam: {
		backRouter: sessionStorage.getItem("backRouter") ? sessionStorage.getItem("backRouter") : '',
		currentPackage: sessionStorage.getItem("currentPackage") ? JSON.parse(sessionStorage.getItem("currentPackage")) : {},
		countryList: sessionStorage.getItem("countryList") ? JSON.parse(sessionStorage.getItem("countryList")) : [],
		packageType: sessionStorage.getItem("packageType") ? sessionStorage.getItem("packageType") : '',

	},
	//购物车数组
	cartList: sessionStorage.getItem("cartList") ? JSON.parse(sessionStorage.getItem("cartList")) : [],
	checkList: sessionStorage.getItem("checkList") ? JSON.parse(sessionStorage.getItem("checkList")) : [],
	cartSelect: sessionStorage.getItem("cartSelect") ? JSON.parse(sessionStorage.getItem("cartSelect")) : [],
	cartSelect2: sessionStorage.getItem("cartSelect2") ? JSON.parse(sessionStorage.getItem("cartSelect2")) : [],

	//卡片列表
	cardListHave: sessionStorage.getItem("cardListHave") ? JSON.parse(sessionStorage.getItem("cardListHave")) : [],
	cardListNo: sessionStorage.getItem("cardListNo") ? JSON.parse(sessionStorage.getItem("cardListNo")) : [],

	//用户绑定信息
	addressObj: sessionStorage.getItem("addressObj") ? JSON.parse(sessionStorage.getItem("addressObj")) : {
		name: '',
		tel: '',
		areaTxt: '',
		addressTxt: '',
		companyName: '',
		email: ''
	},
	//卡片、快递信息
	kpValue: sessionStorage.getItem("kpValue") ? sessionStorage.getItem("kpValue") : '1',
	kpPriceCn: sessionStorage.getItem("kpPriceCn") ? sessionStorage.getItem("kpPriceCn") : '0.1',
	kpPriceEn: sessionStorage.getItem("kpPriceEn") ? sessionStorage.getItem("kpPriceEn") : '0.1',
	kpNum: sessionStorage.getItem("kpNum") ? sessionStorage.getItem("kpNum") : '0',
	kpSelect: sessionStorage.getItem("kpSelect") ? JSON.parse(sessionStorage.getItem("kpSelect")) : [],

	kdValue: sessionStorage.getItem("kdValue") ? sessionStorage.getItem("kdValue") : '1',
	kdPriceCn: sessionStorage.getItem("kdPriceCn") ? sessionStorage.getItem("kdPriceCn") : '0.1',
	kdPriceEn: sessionStorage.getItem("kdPriceEn") ? sessionStorage.getItem("kdPriceEn") : '0.1',
	sfPriceCn: sessionStorage.getItem("sfPriceCn") ? sessionStorage.getItem("sfPriceCn") : '0.15',
	sfPriceEn: sessionStorage.getItem("sfPriceEn") ? sessionStorage.getItem("sfPriceEn") : '0.15',

	//选项数组
	listOptions: {
		//有无卡片
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
		//套餐时间
		sjListCn: [{
			label: '全部',
			value: ''
		}, {
			label: '日套餐',
			value: '1'
		}, {
			label: '月套餐',
			value: '2'
		}, {
			label: '季套餐',
			value: '3'
		}, {
			label: '半年套餐',
			value: '4'
		}, {
			label: '年套餐',
			value: '5'
		}],
		sjListEn: [{
			label: 'All set meals',
			value: '0'
		}, {
			label: 'Day set meal',
			value: '1'
		}, {
			label: 'Month set meal',
			value: '2'
		}, {
			label: 'Season set meal',
			value: '3'
		}, {
			label: 'Half year set meal',
			value: '4'
		}, {
			label: 'Year set meal',
			value: '5'
		}]
	},
};
//生成流水号
state.connSeqNo = state.partnerCode + tools.getNowFormatDate() + tools.generate(10)

const getters = {
	getOptionKpList(state) {
		if(state.langType == 'cn') {
			return state.listOptions.kpListCn
		} else {
			return state.listOptions.kpListEn
		}
	},
	getOptionSjList(state) {
		if(state.langType == 'cn') {
			return state.listOptions.sjListCn
		} else {
			return state.listOptions.sjListEn
		}
	},
	getLangType(state) {
		return state.langType
	},
	getLoginType(state) {
		return state.loginType
	},
	getOpenId(state) {
		return state.openId
	},
	getPartnerCode(state) {
		return state.partnerCode
	},
	getRequestOrderId(state) {
		return state.requestOrderId
	},
	getToken(state) {
		return state.token
	},
	getDeviceCode(state) {
		return state.deviceCode
	},
	getBaseBg(state) {
		return state.baseBg
	},
	getCurrentPackage(state) {
		return state.pageParam.currentPackage
	},
	getCountryList(state) {
		return state.pageParam.countryList
	},
	getBackRouter(state) {
		return state.pageParam.backRouter
	},
	getPackageType(state) {
		return state.pageParam.packageType
	},
	getCartList(state) {
		return state.cartList
	},
	getCheckList(state) {
		return state.checkList
	},
	getCartSelect(state) {
		return state.cartSelect
	},
	getCartSelect2(state) {
		return state.cartSelect2
	},
	getCardListHave(state) {
		return state.cardListHave
	},
	getCardListNo(state) {
		return state.cardListNo
	},
	getAddressObj(state) {
		return state.addressObj
	},
	getKP(state) {
		return state.kpValue
	},
	getKD(state) {
		return state.kdValue
	},
	getKPPrice(state) {
		if(state.langType == 'cn') {
			return state.kpPriceCn
		} else {
			return state.kpPriceEn
		}
	},
	getKPNum(state) {
		return state.kpNum
	},
	getKPSelect(state) {
		return state.kpSelect
	},
	getKDPrice(state) {
		if(state.langType == 'cn') {
			return state.kdPriceCn
		} else {
			return state.kdPriceEn
		}
	},
	getSFPrice(state) {
		if(state.langType == 'cn') {
			return state.sfPriceCn
		} else {
			return state.sfPriceEn
		}
	},
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
	setOpenId(state, param) {
		state.openId = param;
		sessionStorage.setItem("openId", param);
	},
	setPartnerCode(state, param) {
		state.partnerCode = param;
		sessionStorage.setItem("partnerCode", param);
	},
	setRequestOrderId(state, param) {
		state.requestOrderId = param;
		sessionStorage.setItem("requestOrderId", param);
	},
	setToken(state, param) {
		state.token = param;
		sessionStorage.setItem("token", param);
	},
	setDeviceCode(state, param) {
		state.deviceCode = param;
		sessionStorage.setItem("deviceCode", param);
	},
	setCurrentPackage(state, param) {
		state.pageParam.currentPackage = param;
		sessionStorage.setItem("currentPackage", JSON.stringify(param));
	},
	setCountryList(state, param) {
		state.pageParam.countryList = param;
		sessionStorage.setItem("countryList", JSON.stringify(param));
	},
	setBackRouter(state, param) {
		state.pageParam.backRouter = param;
		sessionStorage.setItem("backRouter", param);
	},
	setPackageType(state, param) {
		state.pageParam.packageType = param;
		sessionStorage.setItem("packageType", param);
	},
	setAddressObj(state, param) {
		state.addressObj = param;
		sessionStorage.setItem("addressObj", JSON.stringify(param));
	},
	setCartList(state, param) {
		state.cartList = param;
		sessionStorage.setItem("cartList", JSON.stringify(param));
	},
	setCheckList(state, param) {
		state.checkList = param;
		sessionStorage.setItem("checkList", JSON.stringify(param));
	},
	setCartSelect(state, param) {
		state.cartSelect = param;
		sessionStorage.setItem("cartSelect", JSON.stringify(param));
	},
	setCartSelect2(state, param) {
		state.cartSelect2 = param;
		sessionStorage.setItem("cartSelect2", JSON.stringify(param));
	},
	setCardListHave(state, param) {
		state.cardListHave = param;
		sessionStorage.setItem("cardListHave", JSON.stringify(param));
	},
	setCardListNo(state, param) {
		state.cardListNo = param;
		sessionStorage.setItem("cardListNo", JSON.stringify(param));
	},
	setKP(state, param) {
		state.kpValue = param;
		sessionStorage.setItem("kpValue", param);
	},
	setKD(state, param) {
		state.kdValue = param;
		sessionStorage.setItem("kdValue", param);
	},
	setKPPrice(state, param) {
		state.kpPrice = param;
		sessionStorage.setItem("kpPrice", param);
	},
	setKPNum(state, param) {
		state.kpNum = JSON.stringify(param);
		sessionStorage.setItem("kpNum", param);
	},
	setKPSelect(state, param) {
		state.kpSelect = param;
		sessionStorage.setItem("kpSelect", JSON.stringify(param));
	},
	setKDPrice(state, param) {
		state.kdPrice = param;
		sessionStorage.setItem("kdPrice", param);
	},
	setSFPrice(state, param) {
		state.sfPrice = param;
		sessionStorage.setItem("sfPrice", param);
	},

};
const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store;