<template>
	<transition :name="transitionName">
		<div class="body">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left" ></i>
				<i slot="right"></i>
			</Hdbar>
			<div class="common_content collect_wrap">
				<div class="col_wrap">	
					<p>余额：{{balance | roundOff(6)}}ETH</p>
					<vue-qr :text="address" :size="qrConfig.size" :margin="qrConfig.qrMargin"
					v-clipboard:copy="address"
					v-clipboard:success="onCopy"
					v-clipboard:error="onError"
					></vue-qr>
					<span>点击二维码复制钱包地址</span>
				</div>
				<div class="person_wrap">
					<div class="wallet_addr">
						<span>地址</span>
						<p>{{address}}</p>
					</div>
					<ul>
						<li v-for="(item,index) in options" tag="li" :key="index" @click="nextStep(item.alias)">
							<span>{{item.name}}</span>
							<i class="fa fa-angle-right"></i>
						</li>
					</ul>
				</div>
			</div>
			<Loading v-show="loading"></Loading>
		</div>
	</transition>
</template>
<script>
	import VueQr from 'vue-qr'
	import { MessageBox } from 'mint-ui';
	import { v_format} from '../assets/js/validate.js';
	export default {
		name:'collection',
		components:{VueQr},
		data(){
			return {
				qrConfig:{qrMargin:0,size:Math.floor(document.documentElement.clientWidth * 200 /375)},
				transitionName:'',
				title:'收款',
				options:[
				{name:'备份钱包',alias:'backup'},
				{name:'导入钱包',alias:'importWallet'},
				{name:'转账记录',alias:'transRecord'},
				],
				loading:false,
			}
		},
		created() {
			this.transitionName = /main\/wallet/.test(this.$route.query.path)
			? 'slide-right'
			: 'slide-left';
		},
		beforeRouteLeave(to, from, next) {
			this.transitionName = /main\/wallet/.test(to.path)
			? 'slide-right'
			: 'slide-left';
			setTimeout(next,50);
		},
		methods:{
			onCopy() {
				this.$message({
					message:"复制成功，请粘贴保存到安全地方",
					duration:1500
				})
			},
			onError() {
				this.$message({
					message:"复制失败，请重新尝试",
					duration:1500
				})
			},

			
			nextStep(alias) {

				switch(alias){
					case 'backup':
					return this.backup();

					case  'importWallet':
					return this.importWallet();

					case 'transRecord':
					return this.changeRoute('/transrecord');
				}

			},

			//备份
			backup() {
				//验证PIN码
				MessageBox.prompt('请输入钱包PIN码','PIN码',{inputType:'password'}).then(
					({ value, action }) => {

						if (!v_format('PIN码',value)) return; //验证非空
						//以PIN码来恢复私钥来验证是否正确
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
	<style lang="scss">
		.collect_wrap{
			background: #f4f7fc;
		}
		.col_wrap{
			padding:10px 0;
			p{
				text-align: center;
				font-size: 16px;

			}
			img{
				display: block;
				margin-top:15px;
				margin-bottom:20px;
				@extend %margin;
			}
			span{
				display: block;
				font-size:14px;
				color:#919294;
				text-align: center;
			}
		}
		.person_wrap{
			background-color:#fff;
			.wallet_addr{
				padding:0 20px;
				height:1.2rem;
				@include flex(row,space-between);
				align-items: center;
				&>span{
					width:15%;
					@include fl(14px,1.2rem,#9d9d9d);
				}
				p{

					width:85%;
					padding:10px 0;
					@include fl(14px,0.4rem,#000);
					word-break: break-all;
				}
			}
			ul{
				li{
					font-size: 14px;
					height:1rem;
					border-top:2px solid #f3f3f3;
					padding:0 20px;
					@include flex(row,space-between);
					align-items: center;
					i{
						font-size: 20px;
						color:#b0b0b0;
					}
				}
			}
		}
	</style>