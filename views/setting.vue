<template>
	<transition :name="transitionName">
		<div class="body">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<div class="common_content setting_wrap">
				<ul>
					<li v-for="(item,index) in options" @click="changeRoute(item.to)" :key="index">
						<span>{{item.name}}</span>
						<div>
							<i v-if="item.value">{{item.value}}</i>
							<em v-if="item.to"  class="fa fa-angle-right"></em>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>
<script>
	export default { 
		name:'setting',
		data(){
			return {
				transitionName:'',
				title:'设置',
				options:[
				{name:'货币',value:'CNY',to:'/unit'},
				{name:'选择语言',value:'简体中文',to:'/lang'},
				{name:'帮助中心',value:'',to:'/help'},
				{name:'版本',value:'1.0.0',to:''},
				]
			}
		},
		created() {
			this.transitionName = /main/.test(this.$route.query.path)
			? 'slide-right'
			: 'slide-left';
		},
		beforeRouteLeave(to,from,next) {
			this.transitionName = /main/.test(to.path)
			? 'slide-right'
			: 'slide-left';
			setTimeout(next,50);
		}
	}
</script>
<style lang="scss">
	.setting_wrap{
		box-sizing: border-box;
		background: #f4f7fc;
		padding-top:25px;
		ul{
			li{
				height:50px;
				background-color:#fff;
				margin-bottom: 20px;
				border-top:1px solid #ececec;
				border-bottom:1px solid #ececec;
				box-sizing: border-box;
				@include fl(14px,48px,#515151);
				padding:0 20px;
				div{
					float:right;
					color:#dfdfe1;
					i{
						vertical-align: middle;
					}
					em{
						margin-left:15px;
						color:#a2a2a2;
						font-size: 20px;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>