import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

//login
import loginIndex from '@/components/login/loginIndex'
import loginUser from '@/components/login/loginUser'
import loginType from '@/components/login/loginType'
import loginShoper from '@/components/login/loginShoper'

//index
import screenCountry from '@/components/index/screenCountry'
import chooseCountry from '@/components/index/chooseCountry'
import index from '@/components/index/index'
import goodList from '@/components/index/goodList'
import goodDetail from '@/components/index/goodDetail'
import myCard from '@/components/index/myCard'
import noCard from '@/components/index/noCard'

//order
import orderList from '@/components/order/orderList'
import orderInfo from '@/components/order/orderInfo'

//car
import car from '@/components/car/car'
import confirmOrder from '@/components/car/confirmOrder'
import addressEdit from '@/components/car/addressEdit'
import payResult from '@/components/car/payResult'

Vue.use(Router)

const router = new Router({
	//mode: 'history',
	routes: [{
			path: '/loginIndex',
			name: 'loginIndex',
			component: loginIndex
		}, {
			path: '/loginUser',
			name: 'loginUser',
			component: loginUser
		}, {
			path: '/loginShoper',
			name: 'loginShoper',
			component: loginShoper
		},
		{
			path: '/',
			name: 'loginType',
			component: loginType
		},
		{
			path: '/index',
			name: 'index',
			component: index
		},
		{
			path: '/goodList',
			name: 'goodList',
			component: goodList
		},
		{
			path: '/goodDetail',
			name: 'goodDetail',
			component: goodDetail
		},
		{
			path: '/myCard',
			name: 'myCard',
			component: myCard
		},
		{
			path: '/noCard',
			name: 'noCard',
			component: noCard
		},
		{
			path: '/screenCountry',
			name: 'screenCountry',
			component: screenCountry
		},
		{
			path: '/chooseCountry',
			name: 'chooseCountry',
			component: chooseCountry
		},
		{
			path: '/orderList',
			name: 'orderList',
			component: orderList
		},
		{
			path: '/orderInfo',
			name: 'orderInfo',
			component: orderInfo
		},
		{
			path: '/car',
			name: 'car',
			component: car
		},
		{
			path: '/confirmOrder',
			name: 'confirmOrder',
			component: confirmOrder
		},
		{
			path: '/addressEdit',
			name: 'addressEdit',
			component: addressEdit
		},
		{
			path: '/payResult/:payStatus/:payId/:payType',
			name: 'payResult',
			component: payResult
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.name.indexOf('login') != -1) {
		//清理token
		store.state.token = ''
		sessionStorage.removeItem('token')
		next()
	} else {

		next()
	}
})

export default router