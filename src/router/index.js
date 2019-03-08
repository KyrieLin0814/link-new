import Vue from 'vue'
import Router from 'vue-router'

//login
import loginHaveCard from '@/components/login/loginHaveCard'
import loginUser from '@/components/login/loginUser'
import loginShoper from '@/components/login/loginShoper'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/loginHaveCard',
			name: 'loginHaveCard',
			component: loginHaveCard
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
		}
	]
})