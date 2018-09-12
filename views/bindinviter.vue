<template>
	<transition :name="transitionName">
		<div class="body bind_wrap">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<p class="large">绑定邀请人</p>
			<p class="other padding">输入您推荐人的邀请码。</p>
			<Inp :inputData="inpData" @input="writeVal"></Inp>
			<button type="" @click="nextStep">下一步</button>		
		</div>
	</transition>
</template>
<script>
	import Inp from '../components/Inp.vue';
	import { v_format } from '../assets/js/validate.js';
	export default {
		name:'bindInviter',
		components:{Inp},
		data() {
			return {
				transitionName:'slide-right',
				title:'绑定邀请人',
				inpData:{name:"invitecode",type:"text",placeholder:'邀请码',value:""},
			}
		},
		beforeRouteLeave(to, from, next) {
			this.transitionName = (to.path === '/importaccount' || to.path === '/createwallet')
			? 'slide-right'
			: 'slide-left';
			setTimeout(next,50);
		},
		methods:{
			//根据子组件中name属性确定更新主组件中的input的value
			writeVal({name,value}){
				this.inpData.value = value;
			},

			nextStep(){
				
				if (!v_format('邀请码',this.inpData.value)) return;//验证非空
				if (!/^\d+$/.test(this.inpData.value)) {	//验证整数
					this.$message({
						message: `请输入正确邀请码`,
						duration: 1500,
					});
					return;
				}
				localStorage.setItem('key_store', this.$route.query.key_store);
				localStorage.setItem('newPrivateKey',this.$route.query.newPrivateKey);
				localStorage.setItem('invitationId',this.inpData.value);
				this.changeRoute('/main/seed/turn');
			}
		}
	}
</script>
<style lang='scss'>
	.bind_wrap{
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
			padding:0 30px;
			box-sizing: border-box;
		}
		button{
			@extend %button;
			margin-top:2.5rem;
		}
	}
</style>