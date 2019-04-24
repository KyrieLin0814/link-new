import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/tools'
Vue.use(Vuex)
const state = {
	//用户信息
	langType: localStorage.getItem("lang") ? localStorage.getItem("lang") : "cn",
	loginType: localStorage.getItem("loginType") ? localStorage.getItem("loginType") : "1",
	partnerCode: localStorage.getItem("partnerCode") ? localStorage.getItem("partnerCode") : 'P000270',
	requestOrderId: localStorage.getItem("requestOrderId") ? localStorage.getItem("requestOrderId") : '',
	token: localStorage.getItem("token") ? localStorage.getItem("token") : '',
	deviceCode: localStorage.getItem("deviceCode") ? localStorage.getItem("deviceCode") : '',
	openId: localStorage.getItem("openId") ? localStorage.getItem("openId") : '', //oc07A071Sr3kVbqqIWLGtTlwGIac
	connSeqNo: '',
	version: '2.0',
	youke: localStorage.getItem("youke") ? localStorage.getItem("youke") : '0',

	baseBg: require('../assets/image/goodlist.jpg'),

	//跳转缓存
	pageParam: {
		backRouter: localStorage.getItem("backRouter") ? localStorage.getItem("backRouter") : '',
		currentPackage: localStorage.getItem("currentPackage") ? JSON.parse(localStorage.getItem("currentPackage")) : {},
		countryList: localStorage.getItem("countryList") ? JSON.parse(localStorage.getItem("countryList")) : [],
		packageType: localStorage.getItem("packageType") ? localStorage.getItem("packageType") : '',

	},
	//购物车数组
	cartList: localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : [],  
	checkList: localStorage.getItem("checkList") ? JSON.parse(localStorage.getItem("checkList")) : [],
	cartSelect: localStorage.getItem("cartSelect") ? JSON.parse(localStorage.getItem("cartSelect")) : [],
	cartSelect2: localStorage.getItem("cartSelect2") ? JSON.parse(localStorage.getItem("cartSelect2")) : [],

	//卡片列表
	cardListHave: localStorage.getItem("cardListHave") ? JSON.parse(localStorage.getItem("cardListHave")) : [],
	cardListNo: localStorage.getItem("cardListNo") ? JSON.parse(localStorage.getItem("cardListNo")) : [],

	//用户绑定信息
	addressObj: localStorage.getItem("addressObj") ? JSON.parse(localStorage.getItem("addressObj")) : {
		name: '',
		tel: '',
		areaTxt: '',
		addressTxt: '',
		companyName: '',
		email: ''
	},
	//卡片、快递信息
	kpValue: localStorage.getItem("kpValue") ? localStorage.getItem("kpValue") : '1',
	kpPriceCn: localStorage.getItem("kpPriceCn") ? localStorage.getItem("kpPriceCn") : '0.1',
	kpPriceEn: localStorage.getItem("kpPriceEn") ? localStorage.getItem("kpPriceEn") : '0.1',
	kpNum: localStorage.getItem("kpNum") ? localStorage.getItem("kpNum") : '0',
	kpSelect: localStorage.getItem("kpSelect") ? JSON.parse(localStorage.getItem("kpSelect")) : [],

	kdValue: localStorage.getItem("kdValue") ? localStorage.getItem("kdValue") : '1',
	kdPriceCn: localStorage.getItem("kdPriceCn") ? localStorage.getItem("kdPriceCn") : '0.1',
	kdPriceEn: localStorage.getItem("kdPriceEn") ? localStorage.getItem("kdPriceEn") : '0.1',
	sfPriceCn: localStorage.getItem("sfPriceCn") ? localStorage.getItem("sfPriceCn") : '0.15',
	sfPriceEn: localStorage.getItem("sfPriceEn") ? localStorage.getItem("sfPriceEn") : '0.15',

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
	getYouke(state) {
		return state.youke
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
		localStorage.setItem("loginType", param);
	},
	setOpenId(state, param) {
		state.openId = param;
		localStorage.setItem("openId", param);
	},
	setYouke(state, param) {
		state.youke = param;
		localStorage.setItem("youke", param);
	},
	setPartnerCode(state, param) {
		state.partnerCode = param;
		localStorage.setItem("partnerCode", param);
	},
	setRequestOrderId(state, param) {
		state.requestOrderId = param;
		localStorage.setItem("requestOrderId", param);
	},
	setToken(state, param) {
		state.token = param;
		localStorage.setItem("token", param);
	},
	setDeviceCode(state, param) {
		state.deviceCode = param;
		localStorage.setItem("deviceCode", param);
	},
	setCurrentPackage(state, param) {
		state.pageParam.currentPackage = param;
		localStorage.setItem("currentPackage", JSON.stringify(param));
	},
	setCountryList(state, param) {
		state.pageParam.countryList = param;
		localStorage.setItem("countryList", JSON.stringify(param));
	},
	setBackRouter(state, param) {
		state.pageParam.backRouter = param;
		localStorage.setItem("backRouter", param);
	},
	setPackageType(state, param) {
		state.pageParam.packageType = param;
		localStorage.setItem("packageType", param);
	},
	setAddressObj(state, param) {
		state.addressObj = param;
		localStorage.setItem("addressObj", JSON.stringify(param));
	},
	setCartList(state, param) {
		state.cartList = param;
		localStorage.setItem("cartList", JSON.stringify(param));
	},
	setCheckList(state, param) {
		state.checkList = param;
		localStorage.setItem("checkList", JSON.stringify(param));
	},
	setCartSelect(state, param) {
		state.cartSelect = param;
		localStorage.setItem("cartSelect", JSON.stringify(param));
	},
	setCartSelect2(state, param) {
		state.cartSelect2 = param;
		localStorage.setItem("cartSelect2", JSON.stringify(param));
	},
	setCardListHave(state, param) {
		state.cardListHave = param;
		localStorage.setItem("cardListHave", JSON.stringify(param));
	},
	setCardListNo(state, param) {
		state.cardListNo = param;
		localStorage.setItem("cardListNo", JSON.stringify(param));
	},
	setKP(state, param) {
		state.kpValue = param;
		localStorage.setItem("kpValue", param);
	},
	setKD(state, param) {
		state.kdValue = param;
		localStorage.setItem("kdValue", param);
	},
	setKPPrice(state, param) {
		state.kpPrice = param;
		localStorage.setItem("kpPrice", param);
	},
	setKPNum(state, param) {
		state.kpNum = JSON.stringify(param);
		localStorage.setItem("kpNum", param);
	},
	setKPSelect(state, param) {
		state.kpSelect = param;
		localStorage.setItem("kpSelect", JSON.stringify(param));
	},
	setKDPrice(state, param) {
		state.kdPrice = param;
		localStorage.setItem("kdPrice", param);
	},
	setSFPrice(state, param) {
		state.sfPrice = param;
		localStorage.setItem("sfPrice", param);
	},

};
const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store;