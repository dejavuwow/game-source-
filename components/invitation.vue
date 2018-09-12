<template>
	<div class="balance_wp">
		<div class="invi_wrap">

			<div v-if="!isUnlocked">
				<p>请先解锁邀请系统</p>
				<button type="" @click="validatePin">花费{{value}}ETH解锁邀请系统</button>
			</div>

			<div v-if="isUnlocked" class="unlocked">
				<p>您的邀请码</p>
				<span>{{$store.state.playerInfo.pid}}</span>
			</div>
			<div class="rule"><img src="../assets/img/src_assets_images_wenhao.png" alt="" @click="changeTipsStatus"><span>邀请系统规则</span></div>
		</div>
		<TabList :list="swichList"></TabList>
		<router-view></router-view>

	</div>
</template>
<script>
	import TabList from '../components/switch';
	import EthereumTx from 'ethereumjs-tx';
	import { v_format, v_num, v_int, v_int2, v_range } from '../assets/js/validate.js';
	import { MessageBox } from 'mint-ui';
	import bus from '../assets/js/eventBus.js';
	export default {
		name:'invitation',
		components:{TabList},
		data() {
			return {
				swichList:[
				{name:'当前轮次',to:'/main/invitation/turn'},
				{name:'投资总计',to:'/main/invitation/total'},
				],
				value:0.01,
				txParams:{gasPrice:0,nonce:0,gasLimit:3e6},
				loading:false,
			}
		},
		watch:{
			//监听加载状态触发在mian.vue中的自定义事件
			loading(v) {
				bus.$emit('loading',v);
			},
		},
		computed:{
			isUnlocked() {
				return this.$store.state.playerInfo.name > 0 ? true : false;
			}
		},

		methods:{
			changeTipsStatus() {
				bus.$emit('tipsChange',{index:1,status:true});
			},
			//验证PIN码
			validatePin() {

				if (!v_num('钱包ETH', this.value, this.balance)) return; //验证钱包eth余额是否足够

				MessageBox.prompt('请输入钱包PIN码','PIN码',{inputType:'password'}).then(
					({ value, action }) => {

						if (!v_format('PIN码',value)) return; //验证非空

						this.loading = true;
						const privateKey = this.decrypt(localStorage.getItem('newPrivateKey'),value);//获取私钥字符串
						if ( privateKey === '') {
							this.loading = false;
							this.$message({
								message:'PIN码错误',
								duration:1500
							});
							return;
						}
         				this.unlock(privateKey);	
					},
					()=> {

					}
					);
			},

			unlock(privateKey) {
				//生成唯一字符串，取出邀请码
				const regName = Date.parse(new Date()).toString(16),
				affId = localStorage.getItem('invitationId');
				this.getGasPriceAndNonce().then((results) => {

					this.txParams.gasPrice = results[0];
					this.txParams.nonce = results[1];

					const rawTransaction = {
						from: this.address,
						nonce: `0x${this.txParams.nonce.toString(16)}`,
						gasPrice: `0x${this.txParams.gasPrice.toString(16)}`,
						gasLimit: `0x${this.txParams.gasLimit.toString(16)}`,
						to: this.contractAddress,
						value:`0x${(this.value * 1e18).toString(16)}`,
						data:this.contract.registerNameXID.getData(regName,affId,true,{from:this.address})
					};

					const tx = new EthereumTx(rawTransaction);
					tx.sign(keythereum.str2buf(privateKey));//获取真正的私钥(buffer)
       				const serializedTx = `0x${tx.serialize().toString('hex')}`; //交易参数序列化

       				return new Promise((resolve, reject) => {
       					this.web3.eth.sendRawTransaction(serializedTx, (err, hash)=> {
       						if (!err) {
       							this.loading = false;
       							this.$message({
       								message:'解锁成功',
       								duration:1500
       							});
       							resolve(hash);
       						}
       					});
       				});

       			}).then(() => {
       				this.$store.dispatch('getPlayerInfo');
       			});
       		}
       	},
       }
   </script>
   <style lang='scss'>
   	.balance_wp .switch_list li {
   		width:50%;
   	}
   	.invi_wrap{
   		padding:15px;
   		background-color:#d8e1e8;
   		p{
   			@include fl(16px,normal,#777c82);
   			text-align: center;
   			margin:40px 0;
   		}
   		.unlocked{
   			p{
   				margin:10px 0;
   			}
   			span{
   				display: block;
   				@include fl(16px,normal,#000);
   				text-align: center;
   			}
   		}
   		button{
   			display: block;
   			margin:60px auto;
   			margin-top:0;
   			width:3.6rem;
   			height:.9rem;
   			padding:2px 30px;
   			background-color:#282c35;
   			@include fl(14px,.35rem,#fff);
   			border-radius:3px;
   		}
   		.rule{
   			text-align: center;
   			line-height:.8rem;
   			span{
   				vertical-align: middle;
   			}
   			img{
   				height:.4rem;
   				vertical-align: middle;
   				margin-right:8px;
   			}
   		}
   	}
   </style>