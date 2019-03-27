import axios from 'axios'
import store from '@/vuex/store'
import md5 from 'js-md5'
import tools from '@/tools'
import Qs from 'qs'

//axios配置全局参数
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://wx.linksfield.net/vshop';

const Axios = axios.create({
	transformRequest: [function(data) {
		if(data) {
			let param = new Object()
			param.data = data
			param.data.connSeqNo = store.state.connSeqNo
			param.data.version = store.state.version
			param.data.lang = store.state.langType
			data.partnerCode = store.state.partnerCode
			param.data.tradeTime = tools.getNowFormatDate('-')
			if(store.state.token) {
				param.data.token = store.state.token
			}
			param.data = tools.objKeySort(param.data)

			//加密
			let sign = md5(JSON.stringify(param.data))
			param.sign = sign

			console.log(param)
			data = JSON.stringify(param)
		}
		return data;

	}],
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})
// http request 拦截器
Axios.interceptors.request.use(
	config => {
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
Axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return response;
	});

//get 请求
export function get(url, params) {
	return new Promise((resolve, reject) => {
		Axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

//post 请求
export function post(url, params) {
	return new Promise((resolve, reject) => {
		Axios.post(url, params)
			.then(res => {
				console.log(res.data)
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}