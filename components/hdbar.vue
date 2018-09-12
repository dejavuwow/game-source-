<template>
	<div class="hdf">		
		<div class="hd1">
			<slot name="left"></slot>
			<span class="aic">{{title}}</span>
			<slot name="right"></slot>
		</div>
	</div>
</template>
<script>
	export default{
		name:"hdbar",
		props:{
			title:{
				type:String,
				required: true
			}
		},
		mounted(){

		}
	}
</script>
<style lang="scss">
	.hdf{
		background-color: $bgcolor;
		height:70px;
		width:100%;
		position:relative;
	}
	.hd1{
		@include position(top,left,20px,0);
		bottom:0;
		width:100%;
		@include flex(row,space-between);
		align-items: center;
		box-sizing: border-box;
		z-index: 6;
		i{
			@include fl(.6rem,1.1rem,#fff);
			width:1.1rem;
			display:block;
			@include flex(row,center);
			align-items: center;
		}
	}
	.aic{
		@include fl(0.4rem,1.1rem);
		@extend %textstyle;
		white-space: nowrap;
	}
	
</style>