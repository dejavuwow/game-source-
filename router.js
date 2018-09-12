import Vue from 'vue'
import Router from 'vue-router'
function loadView(level, component) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/${level}/${component}.vue`)
}
/**
import Sign from './views/sign'
import CreateWallet from './views/createwallet'
import ImportWallet from './views/importwallet'
import ImportAccount from './views/importaccount'
import BindInviter from './views/bindinviter'
import Main from './views/main'
import Setting from './views/setting'
import Collection from './views/collection'
import Backup from './views/backup'
import TransRecord from './views/transRecord'

//设置选项
import Unit from './views/unit.vue'
import Lang from './views/lang.vue'
import Help from './views/help.vue'

//主页第一个嵌套路由组件列表
import Seed from './components/seed'
import Balance from './components/balance'
import Wallet from './components/wallet'
import Invitation from './components/invitation'

//主页第二个嵌套路由组件列表
import Turn from './components/turn'
import Total from './components/total'
*/

Vue.use(Router)

export default new Router({
	routes: [
	{
		name:'sign',
		path:'/',
		component:loadView('views','sign'),
		beforeEnter(to, from, next){
			if(!localStorage.getItem('key_store') || !localStorage.getItem('invitationId')){
				next(true);
			} else {
				next({path:'/main/seed/turn'});
			}
		}
	},
	{
		name:'transrecord',
		path:'/transrecord',
		component:loadView('views','transRecord')
	},
	{
		name:'backup',
		path:'/backup',
		component:loadView('views','backup')
	},
	{
		name:'createwallet',
		path:'/createwallet',
		component:loadView('views','createwallet')
	},
	{
		name:'importwallet',
		path:'/importwallet',
		component:loadView('views','importwallet')
	},
	{
		name:'importaccount',
		path:'/importaccount',
		component:loadView('views','importaccount')
	},
	{
		name:'bindinviter',
		path:'/bindinviter',
		component:loadView('views','bindinviter')
	},
	{
		name:'collection',
		path:'/collection',
		component:loadView('views','collection')
	},
	{
		name:'setting',
		path:'/setting',
		component:loadView('views','setting')
	},
	{
		name:'unit',
		path:'/unit',
		component:loadView('views','unit')
	},
	{
		name:'lang',
		path:'/lang',
		component:loadView('views','lang')
	},
	{
		name:'help',
		path:'/help',
		component:loadView('views','help')
	},
	{
		name:'main',
		path:'/main',
		component:loadView('views','main'),
		children:[
		{
			name:'seed',
			path:'seed',
			component:loadView('components','seed'),
			children:[
			{name:'turn1',path:'turn',component:loadView('components','turn')},
			{name:'total1',path:'total',component:loadView('components','total')}	
			]
		},
		{
			name:'finance',
			path:'finance',
			component:loadView('components','balance'),
			children:[
			{name:'turn2',path:'turn',component:loadView('components','turn')},
			{name:'total2',path:'total',component:loadView('components','total')}	
			]

		},
		{
			name:'wallet',
			path:'wallet',
			component:loadView('components','wallet'),
			children:[
			{name:'turn3',path:'turn',component:loadView('components','turn')},
			{name:'total3',path:'total',component:loadView('components','total')}	
			]
		},
		{
			name:'invitation',
			path:'invitation',
			component:loadView('components','invitation'),
			children:[
			{name:'turn4',path:'turn',component:loadView('components','turn')},
			{name:'total4',path:'total',component:loadView('components','total')}	
			]
		}
		]
	},
	]
})
