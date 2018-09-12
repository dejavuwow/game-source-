<template>
	<div class="balance_wp">
		<div class="balance_wrap">
			<div class="wallet_box">
				<p>余额</p>
				<p class="big">{{balance | roundOff(6)}}ETH</p>
				<div class="w_addr">{{address}}</div>
				<div class="backup">
					<span class="warn" @click="backup">请备份</span>
					<span @click="importWallet">导入钱包</span>
				</div>
			</div>
			<div class="btn_wp">
				<div @click="changeRoute('/collection')" class="btn1">
					<img src="../assets/img/src_assets_images_shoukuan.png" alt="">
					<span>收款</span>
				</div>
				<div @click="changeRoute('/transrecord')" class="btn2">
					<img src="../assets/img/src_assets_images_jilu.png" alt="">
					<span>转账记录</span>
				</div>
			</div>
		</div>
		<TabList :list="swichList"></TabList>
		<router-view></router-view>

	</div>
</template>
<script>
	import TabList from '../components/switch';
	import bus from '../assets/js/eventBus.js';
	import { MessageBox } from 'mint-ui';
	import { v_format} from '../assets/js/validate.js';
	export default {
		name:'wallet',
		components:{TabList},
		data() {
			return {
				swichList:[
				{name:'当前轮次',to:'/main/wallet/turn'},
				{name:'投资总计',to:'/main/wallet/total'},
				],
				loading:false
			}
		},
		watch:{
			//监听加载状态触发在mian.vue中的自定义事件
			loading(v) {
				bus.$emit('loading',v);
			},
		},
		methods:{
			//备份
			backup() {
				//验证PIN码
				MessageBox.prompt('请输入钱包PIN码','PIN码',{inputType:'password'}).then(
					({ value, action }) => {

						if (!v_format('PIN码',value)) return; //验证非空
						const privateKey = this.decrypt(localStorage.getItem('newPrivateKey'),value);//获取私钥字符串

						if ( privateKey === '') {
							this.$message({
								message:'PIN码错误',
								duration:1500
							});
							return;
						}

         				//验证成功则跳转到备份钱包页面
         				this.changeRoute('/backup');
         				
         			},
         			()=> {

         			}
         			);
			},

			//导入钱包
			importWallet() {
				MessageBox.confirm(
					'导入新钱包账户后会覆盖当前账户，请在导入之前备份当前账户的钱包助记词，否则将无法找回！！！',
					'警告',
					{
						cancelButtonClass:'mint-msgbox-confirm',
						confirmButtonClass:'mint-msgbox-cancel cancel_btn',
						cancelButtonText:'继续导入',
						confirmButtonText:'取消',
						
					}
					).then(
					confirm => {
						
					},
					cancel => {
						this.changeRoute('/importwallet');
					}
					);
				}
			}
		}
	</script>
	<style lang='scss'>
		.balance_wp .switch_list li {
			width:50%;
		}
		.balance_wrap{
			padding:15px;
			background-color:#d8e1e8;
			.btn_wp{
				margin-top:20px;
			}

		}
		.wallet_box{
			background-color:#fff;
			padding:10px 20px;
			p{
				text-align: center;
				margin-top:10px;
				font-size:14px;
				font-weight:700;
			}
			.big{
				margin:20px 0;
				font-size:20px;
			}
			.w_addr{
				width:90%;
				height:.7rem;
				border-radius: .35rem;
				background-color:#f2f2f2;
				border:1px solid #8e8e8e;
				@extend %margin;
				@include fl(12px,.7rem,#8e8e8e);
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.backup{
			@include flex(row,center);
			margin:20px 0 15px;
			span{
				font-size: 14px;
				display:block;
				width:auto;
				height:100%;
				font-weight:600;
			}
			.warn{
				color:#e93a57;
				margin-right:45px;
			}
		}
	</style>