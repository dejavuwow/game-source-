<template>
	<div class="balance_wp">
		<div class="balance_wrap">
			<div class="bl_box">
				<ul>
					<li v-for="(item,index) in earningList">
						<span >{{item.name}}</span>
						<div>
							<i class="e_value">{{item.value / 1e18 | roundOff(6)}}</i>
							<img src="../assets/img/src_assets_images_ethereumblack.png" alt="">
						</div>
					</li>
				</ul>
				<div class="line"></div>
				<div class="no_withdraw">
					<span >已提现总收益</span>
					<div>	
						<i class="e_value">{{pInfo.withdraw / 1e18 | roundOff(6)}}</i>
						<img src="../assets/img/src_assets_images_ethereumblack.png" alt="">
					</div>
				</div>
				<p>(不含锁定收益)</p>
				<div class="descrip">
					<img src="../assets/img/src_assets_images_wenhao.png" alt="" @click="changeTipsStatus">
					<span>金库说明</span>
					<span class="fright">≈{{cny}}CNY</span>
				</div>
			</div>
			<div class="bigBtn" @click="changePopup(true)">
				<img src="../assets/img/src_assets_images_tixian.png" alt="">
				<span>提现到钱包</span>
			</div>
		</div>
		<TabList :list="swichList"></TabList>
		<router-view></router-view>
		
	</div>
</template>
<script>
	import TabList from './switch'
	import { mapState } from 'vuex'
	import bus from '../assets/js/eventBus.js'
	import { MessageBox } from 'mint-ui'
	import { v_format} from '../assets/js/validate.js'
	import EthereumTx from 'ethereumjs-tx'
	export default {
		name:'balance',
		components:{TabList},
		data() {
			return {
				swichList:[
				{name:'当前轮次',to:'/main/finance/turn'},
				{name:'投资总计',to:'/main/finance/total'},
				],
				list:[
				{name:'获奖收益',value:'0.000000'},
				{name:'分红收益',value:'0.000000'},
				{name:'邀请收益',value:'0.000000'},
				],
				cny:'0.000000',
				loading:false,
				popupVisible:false,
				txParams:{count:0,gasPrice:0}
			}
		},
		computed:{
			...mapState({
				pInfo:state => state.playerInfo,
				earningList (state) {
					this.list[0].value = state.playerInfo.win;
					this.list[1].value = state.playerInfo.gen;
					this.list[2].value = state.playerInfo.aff;

					return this.list;
				},
			})
		},
		watch:{
			//监听加载状态触发在mian.vue中的自定义事件
			loading(v) {
				bus.$emit('loading',v);
			},
		},
		methods:{
			changeTipsStatus() {
				bus.$emit('tipsChange',{index:0,status:true});
			},
			changePopup(status) {

				//判断是否有可提现的分红
				console.log(this.$store.state.playerInfo)
				if (this.$store.state.allProfit == 0 ) {

					MessageBox.alert('没有可提现分红','提示');
					return;
				}
				return this.$store.commit('changePopupStatus',status);
			},

			//获取gasprice和nonce
			getGasPriceAndNonce() {

				this.web3.eth.getGasPrice((err1, res1) => {
					if(err1) return;
					this.txParams.gasPrice = res1;
					bus.$emit('getPrice',res1);		
				});

				this.web3.eth.getTransactionCount(this.address,(err, res) => {
					if(err) return;
					this.txParams.count = res;
				});

			},
			//验证PIN码
			validatePin() {
				this.$store.commit('changePopupStatus',false);//关闭弹出层

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
						this.withdraw(privateKey);

					},
					()=> {

					}
					);
			},
			withdraw(privateKey) {

				const rawTransaction = {
					from: this.address,
					nonce: `0x${this.txParams.count.toString(16)}`,
					gasPrice: `0x${this.txParams.gasPrice.toString(16)}`,
					gasLimit: `0x${(3e6).toString(16)}`,
					to: this.contractAddress,
					value:'0x0',
					data:this.contract.withdraw.getData({from:this.address}),
				};

				const tx = new EthereumTx(rawTransaction);
				tx.sign(keythereum.str2buf(privateKey));
       			const serializedTx = `0x${tx.serialize().toString('hex')}`; //交易参数序列化

       			this.web3.eth.sendRawTransaction(serializedTx, (err, hash)=> {
       				this.loading = false;
       				if (!err) {	
       					this.$message({
       						message:'提现成功',
       						duration:1500
       					});
       				}
       			});
       		}
       	},
       	mounted() {
       		bus.$on('nextStep',() =>{
       			this.validatePin();
       		})
       		this.getGasPriceAndNonce();
       	},
       	beforeDestroy() {
       		bus.$off('nextStep');
       	},
       }
   </script>
   <style lang='scss'>
   	.balance_wp .switch_list li {
   		width:50%;
   	}
   	.balance_wrap{
   		padding:15px;
   		background-color:#d8e1e8;

   	}
   	.bl_box{
   		background-color:#fff;
   		padding:10px 20px;
   		ul{
   			li{
   				height:.8rem;
   				@include fl(14px,.8rem,#000);
   				div{
   					float:right;
   					height:100%;
   					line-height:.8rem;
   					img{
   						margin-left:8px;
   						height:.4rem;
   						vertical-align: middle;
   						margin-bottom:4px;
   					}
   				}
   			}
   		}
   		.no_withdraw {
   			height:.8rem;
   			@include fl(14px,.8rem,#000);
   			div{
   				float:right;
   				height:100%;
   				line-height:.8rem;
   				img{
   					margin-left:8px;
   					height:.4rem;
   					vertical-align: middle;
   					margin-bottom:4px;
   				}
   			}
   		}
   		p{
   			margin:-10px 0 10px;
   			font-size:14px;
   		}
   	}
   	.line{
   		margin:10px 0;
   		border-top:1px solid #e6e6e6;
   	}
   	.descrip{
   		height:.8rem;
   		@include fl(14px,.7rem,#000);
   		img{
   			height:.4rem;
   			vertical-align: middle;
   			margin-right:5px;
   		}
   		span{
   			color:#9b9b9b;
   		}
   		.fright{
   			float:right;
   		}
   	}
   	.bigBtn{
   		height:.8rem;
   		background-color:$btncolor;
   		border-radius: 2px;
   		margin-top:15px;
   		@include flex(row,center);
   		align-items: center;
   		@include fl(14px,.8rem,#fff);
   		img{
   			height:.3rem;
   			margin-right:10px;
   		}
   	}

   </style>