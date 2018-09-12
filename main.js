import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import MintUI from 'mint-ui'
import './assets/js/index.js'

//以太坊相关模块
import './assets/js/keythereum.min.js';
import './assets/js/web3.min.js';
import { CryptoJS } from './assets/js/aes.min.js';

import './assets/sass/reset.scss'
import './assets/css/animate.css'
import 'font-awesome/css/font-awesome.css'
import 'mint-ui/lib/style.css'
import Hdbar from './components/hdbar.vue'
import 'url-search-params-polyfill';
import  Fastclick from 'fastclick'
require('promise.prototype.finally').shim();//promise的finally方法兼容手机环境
Fastclick.attach(document.body);			//手机环境点击0.2秒延迟强制取消
import VueClipboard from 'vue-clipboard2';
import { Toast } from 'mint-ui';
import Loading from './components/loading.vue'

Vue.use(VueClipboard);
Vue.use(MintUI);
Object.assign(Vue.prototype,{$message:Toast});


/**全局注册组件*/

Vue.component('Hdbar',Hdbar);//导航栏
Vue.component('Loading',Loading);//加载动画


/**全局混入mixin*/

Vue.mixin({
	computed:{
		address() {
			const addr =  localStorage.getItem('key_store')
			? `0x${JSON.parse(localStorage.getItem('key_store')).address}`
			: '';
			return addr;
		},

		/*===========全局混入state,防止注入第三方模板========*/
		balance() {
			if (this.$store) {
				return this.$store.state.balance;
			}	
		},
		routeHistory() {
			if (this.$store) {
				return this.$store.state.routeHistory;
			}
		},
		contractAddress() {
			if (this.$store) {
				return this.$store.state.contractAddress;
			}	
		},
		contract() {
			if (this.$store) {
				return this.$store.state.contract;
			}
		},
		web3() {
			if (this.$store) {
				return this.$store.state.web3;
			}
		}
	},
	filters:{
		//舍入过滤器
		roundOff(num, digit) {
			return (Math.floor(num * Math.pow(10,digit)) / Math.pow(10,digit)).toFixed(digit);
		},

		//进位过滤器
		carryOne(num, digit) {
			return (Math.ceil(num * Math.pow(10,digit)) / Math.pow(10,digit)).toFixed(digit);
		}
	},
	methods:{
		changeRoute(newRoute, routeQuery) {

			//newRoute是空字符串或者和路由记录数组最后一项相同则直接返回，不跳转路由
			if (!this.$store) return;
			if (newRoute === '') return;
			if (this.routeHistory[this.routeHistory.length - 1] === newRoute) return;

			this.$store.commit('routeChange',newRoute);
			this.$router.push({path:this.routeHistory[this.routeHistory.length - 1],query:{path:this.$route.path,...routeQuery}});
		},

		baseApi(api,...args){//封装axios参数
			const basInfo = {
				method:"get",
				url: this.$store.state.url+api,
				params:{}
			};
			for(let i of args){
				Object.assign(basInfo.params,i)
			}
			return basInfo;
		},

		//加密私钥和密码
		encrypt(privateKey, password) {
			const key = CryptoJS.MD5(password).toString();
			return CryptoJS.AES.encrypt(privateKey, key).toString();
		},

		//解密私钥
		decrypt(newPrivateKey, password) {
			const key = CryptoJS.MD5(password).toString();
			return CryptoJS.AES.decrypt(newPrivateKey, key).toString(CryptoJS.enc.Utf8);
		},	
		
		//获取gasprice和nonce
		getGasPriceAndNonce() {
			const getPrice = new Promise((resolve, reject) => {

				this.web3.eth.getGasPrice((err, res) => {
					if(err) reject(err);
					resolve(res);	
				});

			}),

			getNonce = new Promise((resolve, rejectt) => {
				this.web3.eth.getTransactionCount(this.address,(err, res) => {
					if(err) reject(err);
					resolve(res);
				});

			});

			return	Promise.all([getPrice,getNonce]);
		},
	}	
})


Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
