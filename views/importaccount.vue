<template>
	<transition :name="transitionName">
		<div class="body create_wallet">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<p class="large">输入PIN码</p>
			<p class="other padding">PIN码用于交易签名。Lucky Day不存储PIN码，无法提供找回功能，请牢记。</p>
			<Inp :inputData="inpData" @input="writeVal" v-show="!showPwd"><i class="fa fa-eye-slash" @click="showPwd=true"></i></Inp>
			<div class="inp_wrap" v-show="showPwd">
				<input
				type="text" 
				v-model = "inpData.value"
				:placeholder = "inpData.placeholder"
				:name = "inpData.name"
				:disabled="inpData.disabled"
				>
				<i class="fa fa-eye" @click="showPwd=false"></i>
			</div>
			<button type="" @click="nextStep">下一步</button>
			<Loading v-show="loading"></Loading>
		</div>
	</transition>
</template>
<script>
	import { v_format } from '../assets/js/validate.js';
	import Inp from '../components/Inp.vue';
	import { CryproJS } from '../assets/js/aes.min.js'
	export default {
		name:'createWallet',
		components:{Inp},
		data() {
			return {
				transitionName:'',
				title:'导入账户',
				inpData:{name:"pin",type:"password",placeholder:'输入PIN码',value:""},
				showPwd:false,
				loading:false,
				privateKey:''
			}
		},
		created() {
			this.transitionName = this.$route.query.path === '/importwallet'
			? 'slide-right'
			: 'slide-left';

		},
		beforeRouteLeave(to, from, next) {
			this.transitionName = to.path === '/importwallet'
			? 'slide-right'
			: 'slide-left';
			setTimeout(next,50);
		},
		methods:{
			//根据子组件中name属性确定更新主组件中的input的value
			writeVal({name,value}){
				this.inpData.value = value;
			},

			//生成keystore成功后的回调函数
			createdCallback(keystore) {

				const newPrivateKey = this.encrypt(this.privateKey,this.inpData.value);//将私钥和密码加密成新私钥
				this.changeRoute('/bindinviter',{
					key_store:JSON.stringify(keystore),
					newPrivateKey:newPrivateKey
				});
			},

			//点击下一步
			nextStep() {

				//验证非空
				if (!v_format('PIN码',this.inpData.value)) return;

				//从store中keystore和privatekey属性状态判断导入的是keystore还是私钥，对应两种不同的处理方式
				if(JSON.stringify(this.$store.state.keystore) !== '{}') {

					//判断PIN码和keystore是否匹配
					this.loading = true;
					setTimeout(() => {

						//尝试以用户输入的pin码和keystore恢复私钥来验证用户的pin码是否正确
						keythereum.recover(this.inpData.value, this.$store.state.keystore,(privateKey) => {
							this.loading = false;
							const key = privateKey.toString('hex');
							if (/Error/g.test(key)) {
								this.$message({
									message: 'PIN码与Keystore不匹配',
									duration: 1500,
								})
								return;
							}
							this.privateKey = key;
							this.createdCallback(this.$store.state.keystore);
						})
					},200)
					

				} else {
					const params = {
						keyBytes: 32,
						ivBytes: 16
		  			}, //默认参数
		  			dk = keythereum.create(params), //生成包含私钥的对象
		  			kdf = 'pbkdf2',
		  			options = {
		  				kdf: "pbkdf2",
		  				cipher: "aes-128-ctr",
		  				kdfparams: {
		  					c: 262144,
		  					dklen: 32,
		  					prf: "hmac-sha256"
		  				}
		  			};

					//生成keystore对象
					this.privateKey = this.$store.state.privatekey;
					keythereum.dump(this.inpData.value, this.$store.state.privatekey, dk.salt, dk.iv, options, this.createdCallback);
				}
			}
		}
	}
</script>
<style lang='scss'>
	.create_wallet{
		.padding{
			font-size:14px;
			padding:0 25px;
		}
		.inp_wrap{
			border-top:1px solid $tipscolor;
			border-bottom:1px solid $tipscolor;
			margin-top:20px;
			height:1.1rem;
			width:100%;
			padding-left:15px;
			box-sizing: border-box;
			line-height:1.1rem;
			@include flex(row,space-between);
			align-items: center;
			input{
				flex:1;
			}
			i{
				display: inline-block;
				height:100%;
				width:50px;
				@include flex(row,center);
				align-items: center;
				line-height: 1.1rem;
			}
		}
		button{
			@extend %button;
			margin-top:2.5rem;
		}
	}
</style>