<template>
	<transition :name="transitionName">
		<div class="body">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<div class="common_content qa_wrap">
				<ul class="qa_list">
					<li v-for="(item,index) in helpList">
						<img src="../assets/img/src_assets_images_wenhao.png" alt="">
						<span>{{item.question}}</span>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name:'help',
		data(){
			return {
				transitionName:'',
				title:'帮助中心',
				helpList:[
				{question:'Lucky Day 游戏的时间规则',answer:''},
				{question:'如何创建Lucky Day账户',answer:''},
				]
			}
		}

	}
</script>
<style lang="scss">
	.qa_wrap{
		overflow: auto;
		ul{
			li{
				height:50px;
				@include fl(14px,50px,#000);
				padding:0 15px;
				border-bottom: 1px solid #e8e8e8;
				img{
					height:20px;
					vertical-align: middle;
					margin-right:8px;
				}
				span{
					vertical-align: middle;
				}
			}
		}
	}
</style>