<template>
	<transition :name="transitionName">
		<div class="body import_wallet">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<ul>
				<li :class="[isMemory?'active':'']" @click="isMemory=true">Keystore</li>
				<li :class="[!isMemory?'active':'']" @click="isMemory=false">私钥</li>
			</ul>
			<div class="text_wrap">
				<span v-show="isMemory" class="memory">{{keyStore}}</span>
				<span v-show="!isMemory" class="private">{{priveteKey}}</span>
				<textarea v-show="isMemory" v-model="keyStore" placeholder="输入Keystore" 
				@input="changeHeight($event,'memory')"
				@paste="changeHeight($event,'memory')"
				></textarea>
				<textarea v-show="!isMemory" v-model="priveteKey" placeholder="输入明文私钥" 
				@input="changeHeight($event,'private')"
				@paste="changeHeight($event,'private')"
				></textarea>
			</div>
			<span class="tips_span">注：使用Keystore导入过程较长，请耐心等待</span>
			<button type="" @click="nextStep">确定</button>
		</div>
	</transition>
</template>
<script>
	import Inp from '../components/Inp.vue';
	import { v_format } from '../assets/js/validate.js';
	export default {
		name:'importWallet',
		components:{Inp},
		data() {
			return {
				transitionName:'',
				title:'导入钱包',
				keyStore:'',
				priveteKey:'',
				isMemory:true,			
			}
		},
		created() {
			//根据路由参数决定路由跳转动画
			this.transitionName = ( this.$route.query.path === '/' ||
			 		/main\/wallet/.test(this.$route.query.path)    ||
			 		this.$route.query.path === '/collection'
			 )
			? 'slide-right'
			: 'slide-left';

		},
		//根据路由去向决定路由跳转动画
		beforeRouteLeave(to, form, next) {
			this.transitionName = (to.path === '/' 	||
			 		/main\/wallet/.test(to.path)    ||
			 		to.path === '/collection'
			 )
			? 'slide-right'
			: 'slide-left';
			setTimeout(next,50);
		},
		computed:{
			to() {
				return this.$route.query.path !== '/importaccount' ? this.$route.query.path : '/sign';
			}
		},
		methods:{
			//动态缩放textarea高度
			changeHeight(e,classname) { 
				
				const dom = document.getElementsByClassName(classname)[0];
				setTimeout(() => {
					e.target.style.height = dom.clientHeight + 'px';
					e.target.scrollTop = 0;
				},200);

			},

			nextStep() {

				//判断是keystore还是私钥
				if (this.isMemory) {
					if (!v_format('keyStore', this.keyStore.trim())) return;//验证非空

					//验证keystore是否为json格式
					try{
						const obj = JSON.parse(this.keyStore.trim())
						if ( !(typeof obj === 'object') || !obj ) {
							this.$message({
								message: 'keyStore格式错误',
								duration: 1500,
							});
							return;
						}
					} catch(e) {
						this.$message({
							message: 'keyStore格式错误',
							duration: 1500,
						});
						return;
					}

					//改变store中keystore或私钥状态，同时将另一个状态置为空
					this.$store.commit('changeKeystore',JSON.parse(this.keyStore.trim()));
					this.$store.commit('changePrivatekey','');
				} else {

					if (!v_format('私钥', this.priveteKey.trim())) return;//验证非空
					if (!/^\w{64}$/.test(this.priveteKey.trim())) {
						this.$message({
							message: '私钥无效',
							duration: 1500,
						});
						return;
					}

					this.$store.commit('changePrivatekey',this.priveteKey.trim());
					this.$store.commit('changeKeystore',{});
					
				}
				this.changeRoute('/importaccount');
			}
		}
	}
</script>
<style lang='scss'>
	.import_wallet{
		ul{
			height:.8rem;
			@include flex(row,justify-content);
			li{
				width:50%;
				@include fl(14px,.8rem,#000);
				text-align: center;
				border-bottom:1px solid $tipscolor;
			}
			.active{
				border-width:2px;
				border-color:#000;
			}
		}
		.text_wrap{
			position:relative;
			height:2rem;
			border-bottom:1px solid #aaa;
			padding-left:30px;
			padding-right:30px;
			@include flex(row,justify-content);
			align-items: center;
			span{
				width:100%;
				word-break: break-all;
				word-wrap: break-word;
				height:auto;
				min-height:20px;
				max-height:60px;
				display: block;
				visibility:hidden;
				overflow: auto;
			}
		}
		textarea{
			position:absolute;
			top:50%;
			left:30px;
			transform:translateY(-50%);
			width:calc(100% - 60px);
			height:20px;
			@include fl(14px,20px,#000);
			border:0;
		}
		textarea::-webkit-input-placeholder{
			color:$tipscolor;
		}
		button{
			@extend %button;
			margin-top:.4rem;
		}
	}
	.tips_span{
		display: block;
		text-align: center;
		@include fl(14px,normal,#aaa);
		margin-top:.4rem;
	}
</style>