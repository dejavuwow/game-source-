<template>
	<div class="cover">
		<Spinner type="snake" color="#26a2ff"></Spinner>
		<slot></slot>
	</div>
</template>
<script>
	import { Spinner } from 'mint-ui';
	export default {
		name:'loading',
		components:{Spinner}
	}
</script>
<style lang="scss">
	.cover{
		@include position(top,left,0,0,fixed);
		width:100%;
		height: 100%;
/*		background-color:rgba(0,0,0,0);*/
		@include flex(row,center);
		align-items: center;
		z-index:999;
	}
</style>