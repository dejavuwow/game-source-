
export default {
	
	changeKeystore(state, keystore) {	//更改keystore
		state.keystore = keystore;
	},

	changePrivatekey(state, privatekey) { //更改私钥
		state.privatekey = privatekey;
	},

	getBalance(state, balance) { //动态获取余额
		state.balance = balance;
	},

	getPlayerInfo(state, playerInfo) { //动态获取玩家信息
		state.playerInfo = playerInfo;
	},

	getPool(state, pool) {//改变奖池金额
		state.pool = pool;
	},

	changePopupStatus(state, status) {
		state.popupStatus = status;
	},
	getKeys(state, keys) {
		state.keys = keys;
	},
	getToCny(state, toCny) {
		state.toCny = toCny;
	},
	validateVersion(state) {
		state.IsversionValidated = true;
	},

	/**
	 * 去往的路由字符串始终指向路由记录数组routeHistory中的最后一项
	 * 如果数组中最后一项和newRoute不全是main开头的路由，往路由记录中新增newRoute，路由前进
	 * 如果routeHistory数组中最后一项和newRoute都是main开头的路由，则以newRoute替换routeHistory数组中最后一项
	 * 如果传入的是其他，路由数组routeHistory删除最后一项，路由后退
	*/
	routeChange(state, newRoute) {
		const isSimilar = /\/main\/\w+\/\w+/.test(state.routeHistory[state.routeHistory.length - 1]) &&  /\/main\/\w+\/\w+/.test(newRoute);
		if (typeof newRoute === 'string' && !isSimilar) 
		{
			state.routeHistory.push(newRoute);
		} else if (isSimilar) {
			state.routeHistory.splice(state.routeHistory.length - 1,1,newRoute);
		} else {
			state.routeHistory.pop();
		}
	},
}