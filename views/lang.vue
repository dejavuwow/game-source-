<template>
	<transition :name="transitionName">
		<div class="body">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left" tag="i"></i>
				<i slot="right"></i>
			</Hdbar>
			<div class="common_content unit_wrap">
				<ul class="unit_box">
					<li @click="changeRoute" v-for="(item,index) in langList" :key="index">
						<span>{{item.name}}</span>
						<i class="fa fa-check-circle"></i>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name:'lang',
		data(){
			return {
				transitionName:'',
				title:'选择语言',
				langList:[
				{name:'简体中文',value:'zh-CN'},
				{name:'English',value:'en-US'},
				]
			}
		}

	}
</script>
<style lang="scss">
	.unit_wrap{
		box-sizing: border-box;
		background: #f4f7fc;
		padding-top:20px;
	}
	.unit_box{
		background-color:#fff;
		border-top:1px solid #ececec;
		border-bottom: 1px solid #ececec;
		li{
			padding:0 10px;
			height:50px;
			@include flex(row,space-between);
			align-items: center;
			position:relative;
			&::after{
				content:'';
				display: block;
				border-top:1px solid #ececec;
				width:98%;
				@include position(top,right,100%,0);
			}
			
			i{
				color:#2b7dd1;
			}
		}
	}
</style>