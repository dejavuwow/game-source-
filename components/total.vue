<template>
	<data-table :bData="list">
		<div slot="b1" class="bd2">
			<p>本轮所有玩家的投资和分红统计</p>
		</div>
	</data-table>
</template>
<script>
	import dataTable from './table'
	import { mapState } from 'vuex'
	export default {
		name:'total',
		components:{dataTable},
		data() {
			return {
				time:'2:23:23',
				bData:[
				{name:'玩家总投资',value:'16400.822177',other:'≈363434.2323CNY',img:require('../assets/img/src_assets_images_ethereumblack.png')},
				{name:'分红的奖励',value:'0.0',other:'≈363434.2323CNY',img:require('../assets/img/src_assets_images_ethereumblack.png')},
				{name:'邀请的奖励',value:'5.85年',other:'≈18232312秒',img:require('../assets/img/src_assets_images_ethereumblack.png')},
				]
			}
		},
		computed:{
			...mapState({
				list(state) {
					this.bData[0].value = (Math.ceil(state.playerInfo.eth / 1e18 * 1e6) / 1e6).toFixed(6);
					this.bData[0].other = `≈${(Math.ceil(state.toCny * state.playerInfo.eth / 1e18 * 1e2) / 1e2).toFixed(2)}CNY`;
					this.bData[1].value = (Math.floor(state.playerInfo.gen / 1e18 * 1e6) /1e6).toFixed(6);
					this.bData[1].other = `≈${(Math.ceil(state.toCny * state.playerInfo.gen / 1e18 * 1e2) / 1e2).toFixed(2)}CNY`;
					this.bData[2].value = (Math.floor(state.playerInfo.aff / 1e18 * 1e6) /1e6).toFixed(6);
					this.bData[2].other = `≈${(Math.ceil(state.toCny * state.playerInfo.aff / 1e18 * 1e2) / 1e2).toFixed(2)}CNY`;
					return this.bData;
				}
			})
		}

	}
</script>
<style lang="scss">
	.bd2{
		p{
			text-align: center;
			margin:25px 0;
			font-size:14px;
			color:#b8b8b8;
		}
	}
</style>