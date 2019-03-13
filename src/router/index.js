import Vue from 'vue'
import Router from 'vue-router'

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


//order
import orderList from '@/components/order/orderList'
import orderInfo from '@/components/order/orderInfo'



import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/loginIndex',
			name: 'loginIndex',
			component: loginIndex
		},{
			path: '/loginUser',
			name: 'loginUser',
			component: loginUser
		},{
			path: '/loginShoper',
			name: 'loginShoper',
			component: loginShoper
		},
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/goodList',
			name: 'goodList',
			component: goodList
		},
		{
			path: '/loginType',
			name: 'loginType',
			component: loginType
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
		}
		
	]
})