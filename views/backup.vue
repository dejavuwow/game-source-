<template>
	<transition :name="transitionName">
		<div class="body backup_wrap">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<p class="ba_tt">请复制你的钱包Keystore粘贴保存到安全的地方</p>
			<p class="ba_tips">钱包Keystore包含您的钱包地址和其他信息，并用于恢复您的私钥，任何时候请不要泄露它。</p>
			<p class="keytxt_wrap">{{keystore}}</p>
			<button type="" 
			v-clipboard:copy="keystore"
			v-clipboard:success="onCopy"
			v-clipboard:error="onError">复制</button>
		</div>
	</transition>
</template>
<script>
	export default {
		name:'backup',
		data() {
			return {
				transitionName:'slide-right',
				title:'备份钱包',
				keystore:localStorage.getItem('key_store')	
			}
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
			}
		}
	}
</script>
<style lang='scss'>
	.backup_wrap{
		.ba_tt{
			@include fl(16px,normal,#000);
			padding:15px 0;
			text-align: center;
		}
		.ba_tips{
			padding:10px 15px;
			@include fl(14px,normal,$tipscolor);
		}
		.keytxt_wrap{
			padding:10px 20px;
			@include fl(16px,1.3,#000);
			background-color:#eef1f6;
			word-wrap: break-word;
			word-break: break-all;
		}
		button{
			margin-top:20px;
			@extend %button;
		}
	}

</style>