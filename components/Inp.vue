<template>
	<div class="inp_wrap">
		<input
		:type="inputData.type" 
		:value = "inputData.value"
		:placeholder = "inputData.placeholder"
		:name = "inputData.name"
		:disabled="inputData.disabled"
		@input="updateVal($event.target.value,inputData.name)"
		>
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:"inp",
		props:["inputData"],
		data(){
			return{
			}
		},
		computed:{
		},
		methods:{
			//oninput事件触发父组件中的'input'自定义事件传参
			updateVal(value,name){
				this.$emit("input",{value,name});
			}
		}
	}

</script>
<style lang="scss">
	.inp_wrap{
		input{
			height:100%;
			width:100%;
			display: inline-block;
		}
	}
	@include placeholder(".inp_wrap");
</style>