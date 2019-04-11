import Vue from 'vue'
import axios from 'axios'
import store from '@/vuex/store'
import { Dialog } from 'cube-ui'
import md5 from 'js-md5'
import tools from '@/tools'
import Qs from 'qs'

Vue.use(Dialog)
//axios配置全局参数
axios.defaults.timeout = 50000;
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
		var lang = store.state.langType == 'en' ? false : true
		if(error && error.response) {
			switch(error.response.status) {
				case 400:
					error.message = lang ? '请求错误(400)' : 'Request error(400)';
					break;

				case 401:
					error.message = lang ? '未授权，请重新登录(401)' : 'Unauthorized, please login again(401)';
					break;

				case 403:
					error.message = lang ? '拒绝访问(403)' : 'Access denied(403)';
					break;

				case 404:
					error.message = lang ? '请求出错(404)' : 'Request error(404)';
					break;

				case 408:
					error.message = lang ? '请求超时(408)' : 'Request timeout(408)';
					break;

				case 500:
					error.message = lang ? '服务器错误(500)' : 'Server error(500)';
					break;

				case 501:
					error.message = lang ? '服务未实现(501)' : 'Service not implemented(501)';
					break;

				case 502:
					error.message = lang ? '网络错误(502)' : 'network error(502)';
					break;

				case 503:
					error.message = lang ? '服务不可用(503)' : 'Service unavailability(503)';
					break;

				case 504:
					error.message = lang ? '网络超时(504)' : 'Network Timeout(504)';
					break;

				case 505:
					error.message = lang ? 'HTTP版本不受支持(505)' : 'HTTP version is not supported(505)';
					break;

				default:
					error.message = lang ? `连接出错(${error.response.status})!` : `Link error(${error.response.status})!`;
			}
		} else {
			error.message = lang ? '连接服务器失败!' : 'Connection server failed'
		}
		Dialog.$create({
			type: 'alert',
			title: lang? '提示': 'Prompt',
			content: error.message,
			onConfirm: () => {
				tools.toIndex()
			}
		}).show()
		return Promise.reject(error)
	})

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