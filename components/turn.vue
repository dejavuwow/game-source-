<template>
	<data-table :bData="list">
		<div slot="b1" class="bd1">
			<p>本轮的奖池金额和您的Key及提现收益</p>
		</div>
	</data-table>
</template>
<script>
	import dataTable from './table'
	import { mapState } from 'vuex'
	export default {
		name:'turn',
		components:{dataTable},
		data() {
			return {
				time:'2:23:23',
				bData:[
				{name:'奖池金额',value:0,other:'≈363434.2323CNY',img:require('../assets/img/src_assets_images_ethereumblack.png')},
				{name:'我的Key',value:0,other:'玩家共购买3683423.1个Key',img:require('../assets/img/src_assets_images_seed3.png')},
				{name:'我的已提现总收益',value:0,other:'0.000000CNY',img:require('../assets/img/src_assets_images_ethereumblack.png')},
				]
			}
		},
		computed:{
			...mapState({
				list(state) {
					this.bData[0].value = (Math.ceil(state.pool * 1e6) / 1e6).toFixed(6);
					this.bData[0].other = `≈${(Math.ceil(state.toCny * state.pool * 1e2) / 1e2).toFixed(2)}CNY`
					this.bData[1].value = (Math.floor(state.playerInfo.seed * 1e2) / 1e2).toFixed(2);
					this.bData[1].other = `玩家共购买${(Math.ceil(state.keys * 1e2) / 1e2).toFixed(2)}个Key`;
					this.bData[2].value = (Math.floor(state.playerInfo.withdraw / 1e18 * 1e6) / 1e6).toFixed(6);
					this.bData[2].other = `≈${(Math.floor(state.playerInfo.withdraw / 1e18 * state.toCny * 1e2) / 1e2).toFixed(2)}CNY`;
					return this.bData;
				}
			})
		}
	}
</script>
<style lang="scss">
	.bd1{
		text-align: center;
		span{
			display: block;
			margin-top:30px;
			font-size:14px;
		}
		p{
			text-align: center;
			margin:25px 0;
			font-size:14px;
			color:#b8b8b8;
		}
	}
</style>