<template>
	<div class="tips_wrap">
		<div class="tips_box">
			<p>{{title}}<i class="fa fa-times-circle-o" @click="closeTips(index)"></i></p>
			<div class="tip_content" ref="tipper">
				<div class="maincontent">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	'use strict'
	import Bscroll from 'better-scroll'
	import bus from '../assets/js/eventBus.js'
	export default {
		name:'tips',
		props:{
			title:{
				require:true,
				type:String
			},
			index:{
				require:true,
				type:Number
			}
		},
		updated() {
			this.$nextTick().then(() => {
				if (!this.myscroll) {
					this.myscroll=new Bscroll(this.$refs.tipper,{//初始化bscroll
						click:true,
					});
				} else {
					this.myscroll.refresh();
				}
			})	
		},

		methods:{
			closeTips(index) {
				bus.$emit('tipsChange',{index,status:false});
			}
		}
	}
</script>
<style lang="scss">
	.tips_wrap{
		@include position(top,left,0,0,fixed);
		width:100%;
		height:100%;
		background:rgba(0,0,0,.3);
		@include flex(row,center);
		align-items: center;
	}
	.tips_box{
		width:90%;
		height:60%;
		border-radius: 5px;
		background-color:#fff;
		&>p{
			position:relative;
			@include fl(14px,.8rem,#333);
			text-align: center;
			border-bottom: 1px solid #000;
			i{
				height:100%;
				width:.8rem;
				display: block;
				@include position(top,right,0,0);
				@include fl(20px,.8rem,#000);
			}
		}
	}
	.tip_content{
		height:calc(100% - .8rem);
		overflow: hidden;
		.maincontent{
			min-height:100.5%;
			padding:20px;
			box-sizing: border-box;
		}
	}
</style>