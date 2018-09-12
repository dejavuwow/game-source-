
import abiList from '../assets/js/abi';

export const state =  {
	IsversionValidated:false,
	routeHistory:[],
	url:'https://api-kovan.etherscan.io/api',
	apikey:'WFC69PYR1TJUFZMMJS1J661I7E31SJKB3D',
	toCny:0,
	keystore:{},
	privatekey:'',
	contractAddress:'0xeA519ab486Ef9BE372b683CC9233cD4d3B3Fe1E7',
	balance:0,//钱包eth余额
	pool:0,//奖池金额
	keys:0,//总key数
	playerInfo:{
		name:'',//标识用户的唯一字符串
		pid:'',//邀请码
		seed:0,//key数量
		win:0,//获奖收益
		gen:0,//分红收益
		aff:0,//邀请收益
		eth:0,//玩家投资
		withdraw:0
	},
	popupStatus:false,//弹出层状态
	/* 总收益 */
	get allProfit() {
		return Number(this.playerInfo.win) + Number(this.playerInfo.gen) + Number(this.playerInfo.aff);
	},

	/* 初始化web3 */
	get web3() {
		const web3 = new Web3();
		web3.setProvider(new web3.providers.HttpProvider("https://kovan.infura.io/v3/1f77aa357ef24b1084860170a2737bb9"));
		return web3;
	},

	/* contract */
	get contract() {
		return this.web3.eth.contract(abiList).at(this.contractAddress);
	},
}