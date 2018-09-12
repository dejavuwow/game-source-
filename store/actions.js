

export default {
	//获取钱包eth余额
	getBalance({commit, state}) {
		const address = localStorage.getItem('key_store')   
		? `0x${JSON.parse(localStorage.getItem('key_store')).address}` 
		: ''; 

		if (address === '') return;
		const promise = new Promise((resolve, reject) => {
			state.web3.eth.getBalance(address, (err, res) => {
				if (err) return;
				commit('getBalance', state.web3.fromWei(res.toString(10), 'ether'));
				resolve(res);
			});
		});
		return promise;
	},

	//获取玩家信息
	getPlayerInfo({commit, state}) {
		const address = localStorage.getItem('key_store')   
		? `0x${JSON.parse(localStorage.getItem('key_store')).address}` 
		: ''; 

		if (address === '') return;
		const promise = new Promise((resolve, reject) => {
			state.contract.getPlayerInfoByAddress(address,(err, res) => {
				if (err) return;
				const playerInfo = {
					name:state.web3.toDecimal(res[1]),
					pid:res[0].toString(10),
					seed:res[2].toString(10) / 1e18,
					win:res[3].toString(10),
					gen:res[4].toString(10),
					aff:res[5].toString(10),
					eth:res[6].toString(10),
					withdraw:res[7].toString(10)
				};
				commit('getPlayerInfo', playerInfo);
				resolve(res);
			});
		});
		return promise;
	},

	//获取奖池金额
	getPool({commit, state}) {
		const promise = new Promise((resolve, reject) => {
			state.contract.getCurrentRoundInfo((err, res) => {
				if (!err) {
					commit('getKeys',res[1].toString(10) / Math.pow(10,18));
					commit('getPool', state.web3.fromWei(res[4].toString(10),'ether'));
					resolve(res);
				}
			});
		});
		return promise;
	},

	//获取eth到cny的汇率
	getToCny({commit, state}) {
		const promise = new Promise((resolve, reject) => {
			const handler = function(){

				if (this.readyState === 4 && this.status === 200) {
					commit('getToCny',this.response.data.amount);
					resolve(this.response);
				}
			};
			const client = new XMLHttpRequest();
			client.open("GET", 'https://api.coinbase.com/v2/prices/ETH-CNY/spot');
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.send();

		});
		return promise;
	}
}