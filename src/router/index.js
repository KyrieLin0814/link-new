import Vue from 'vue'
import Router from 'vue-router'

//login
import loginIndex from '@/components/login/loginIndex'
import loginUser from '@/components/login/loginUser'
import loginType from '@/components/login/loginType'
import loginShoper from '@/components/login/loginShoper'

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
			name: 'HelloWorld',
			component: HelloWorld
		},{
			path: '/loginType',
			name: 'loginType',
			component: loginType
		},
	]
})