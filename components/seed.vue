<template>
	<div class="seed_wp">
		<div class="seed_wrap">
			<p>总投资金额小于100ETH时，限购1ETH，超出部分会返回到你金库</p>
			<div class="seed_input">
				<div class="seed_img">
					<img src="../assets/img/src_assets_images_seed2.png" alt="">
				</div>
				<div class="seed_enter">
					<Inp :inputData="inpData" @input="writeVal"></Inp>
					<p>Key</p>
				</div>
				<p class="toEth">@{{toEth | carryOne(6)}} ETH</p>
			</div>
			<ul>
				<li v-for="(item,index) in addList" @click="add(item.value)">{{item.txt}}</li>
			</ul>
			<p class="eth_tips">购买Key会花费一定的ETH手续费，如不足以支付，将会购买失败</p>
			<div class="btn_wp">
				<div class="btn1" @click="validateWallet(true)">
					<img src="../assets/img/src_assets_images_ethereumwhite.png" alt="">
					<span>使用ETH购买</span>
				</div>
				<div class="btn2" @click="validateWallet(false)">
					<img src="../assets/img/src_assets_images_fenhong.png" alt="">
					<span>使用分红购买</span>
				</div>
			</div>
		</div>
		<TabList :list="swichList"></TabList>
		<router-view></router-view>
		
	</div>
</template>
<script>
	import Inp from './Inp';
	import TabList from './switch';
	import { v_format, v_num, v_int, v_int2, v_range } from '../assets/js/validate.js';
	import EthereumTx from 'ethereumjs-tx';
	import { MessageBox } from 'mint-ui';
	import bus from '../assets/js/eventBus.js';
	export default {
		name:'seed',
		components:{Inp,TabList},
		data() {
			return {
				inpData:{type:'text',name:'seedNum',placeholder:'',value:1},
				toEth:0,
				addList:[
				{txt:'+1 Key',value:1},
				{txt:'+2 Key',value:2},
				{txt:'+5 Key',value:5},
				{txt:'+10',value:10},
				{txt:'+100',value:100},
				{txt:'+1000',value:1000},
				],
				swichList:[
				{name:'当前轮次',to:'/main/seed/turn'},
				{name:'投资总计',to:'/main/seed/total'},
				],
				loading:false,
				txParams:{gasPrice:0,nonce:0,gasLimit:3e6},
				isEth:true,
			}
		},
		methods:{

			//根据子组件中name属性确定更新主组件中的input的value
			writeVal({name, value}) {
				this.inpData.value = value;
			},

			needEth() {

				//根据输入的key数量动态改变eth
				const keyNum = Number(this.inpData.value) * 1e18;
				this.contract.iWantXKeys(keyNum, (err, res) => {
					this.toEth = this.web3.fromWei(res.toString(10),'ether') ;
				});
				
			},

			//通过点击按钮增加key数量
			add(value) {
				this.inpData.value = Number(this.inpData.value) + Number(value);
			},

			//验证输入值和余额
			validateWallet(isEth) {
				this.isEth = isEth;
				if (!v_int('Key',this.inpData.value)) return; //验证输入值是否是整数

				//判断用钱包eth购买还是分红购买
				if (this.isEth) {
					if (!v_num('钱包ETH', this.toEth, this.balance)) return; //验证钱包eth余额是否足够
				} else {
					if (!v_num('分红', this.toEth, this.$store.state.allProfit)) return; //验证分红余额是否足够
				}

				//填写幸运数字
				bus.$emit('keyboard',true);
			},

			//验证PIN码
			validatePin(luckNum) {

				MessageBox.prompt('请输入钱包PIN码','PIN码',{inputType:'password'}).then(
					({ value, action }) => {

						if (!v_format('PIN码',value)) return; //验证非空

						this.loading = true
						const privateKey = this.decrypt(localStorage.getItem('newPrivateKey'),value);//获取私钥字符串
						if ( privateKey === '') {
							
							this.loading = false;
							this.$message({
								message:'PIN码错误',
								duration:1500
							});
							return;
						}

						this.payWithEth(luckNum,privateKey);

					},
					()=> {

					}
					);
			},

			//使用钱包的eth购买
			payWithEth(luckNum,privateKey) {

				const money = Number(this.web3.toWei(this.toEth));
				let value, data;
				if (this.isEth) {
					value = `0x${money.toString(16)}`;
					data = this.contract.buy.getData(luckNum,{from:this.address});
				} else {
					value = '0x0';
					data = this.contract.reLoad.getData(`0x${money.toString(16)}`,luckNum,{from:this.address});
				}

				this.getGasPriceAndNonce().then((results) => {
					this.txParams.gasPrice = results[0];
					this.txParams.nonce = results[1];

					const rawTransaction = {
						from: this.address,
						nonce: `0x${this.txParams.nonce.toString(16)}`,
						gasPrice: `0x${this.txParams.gasPrice.toString(16)}`,
						gasLimit: `0x${this.txParams.gasLimit.toString(16)}`,
						to: this.contractAddress,
						value,
						data,
					};

					const tx = new EthereumTx(rawTransaction);
					tx.sign(keythereum.str2buf(privateKey));//获取真正的私钥(buffer)

       				const serializedTx = `0x${tx.serialize().toString('hex')}`; //交易参数序列化
       				return new Promise((resolve, reject) => {
       					this.web3.eth.sendRawTransaction(serializedTx, (err, hash)=> {
       						this.loading = false;
       						if (!err) {		
       							this.$message({
       								message:'购买成功',
       								duration:1500
       							});

       							resolve(hash);
       						} else {
       							this.$message({
       								message:'购买失败',
       								duration:1500
       							});
       							reject(err);
       						}
       					});
       				});
       			});
       		},
       	},
       	watch:{
			//监听输入值的变化调用方法
			inpData:{
				handler(v, ov) {
					this.needEth();
				},
				deep:true
			},

			//监听加载状态触发在mian.vue中的自定义事件
			loading(v) {
				bus.$emit('loading',v);
			}
		},
		mounted() {
			this.needEth();
			bus.$on('getLuckNum',(num) => {
				this.validatePin(num);
			});
		},
		beforeDestroy() {
			bus.$off('getLuckNum');
		},

	}
</script>
<style lang='scss'>
	.seed_wp .switch_list li {
		width:50%;
	}
	.seed_wrap{
		padding:15px;
		background-color:#d8e1e8;
		p{
			@include fl(12px,normal,#000);

		}
		.seed_input{
			height:1.4rem;
			margin:10px 0;
			border:1px solid #cacfd3;
			border-radius: 4px;
			display: flex;
			.seed_img{
				width:15%;
				line-height: 1.4rem;
				text-align: center;
				font-size: 0;
				img{
					width:33.33%;
					height:auto;
					vertical-align: middle
				}

			}
			.seed_enter{
				flex:1;
				background-color:#fff;
				display: flex;
				.inp_wrap{
					height:100%;
					flex:1;
					input{
						text-align: center;
						padding:0 5px;
					}
				}
				&>p{
					float:left;
					padding:0 5px;
					@include fl(15px,1.4rem,#000);
				}
			}
			.toEth{
				width:auto;
				padding:0 5px;
				@include fl(14px,1.4rem,#9b9ea7);
			}
		}
		ul{
			background-color:#fff;
			border:1px solid #cacfd3;
			height:.8rem;
			width:100%;
			@include flex(row,justify-content);
			box-sizing: border-box;
			li{
				width:calc(100% / 6);
				border-right: 1px solid #cacfd3;
				box-sizing: border-box;
				@include fl(12px,.8rem,#000);
				text-align: center;
			}
		}
		.eth_tips{
			margin:15px 0;
			@include fl(12px,normal,#777c80);
			word-wrap: break-word;
			span{
				color:#ff3300;
			}
		}
	}
</style>