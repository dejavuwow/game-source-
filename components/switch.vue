<template>
	<ul class="switch_list">
		<li v-for="(item,index) in list" @click="changeRoute(item.to+(r3?r3:''))" 
		:key="index" 
		:class="[$route.path === item.to+(r3?r3:'') ? 'router-link-active' : '']"
		>{{item.name}}</li>
	</ul>
</template>
<script>
	export default {
		name:'tablist',
		props:{
			list:{
				type:[Object,String,Array],
				require:true,
			},

			//嵌套的第三级路由
			r3:{
				type:String
			}
		},
	}
</script>
<style lang='scss'>
	.switch_list{
		height:50px;
		@include flex(row,space-around);
		align-items: center;
		background:#fff;
		li{
			height:100%;
			line-height:50px;
			box-sizing: border-box;
			font-size:14px;
			width:25%;
			text-align: center;
			border-bottom:1px solid #ededed;
		}
		.router-link-active{
			border-color:#000;
		}
	}
</style>