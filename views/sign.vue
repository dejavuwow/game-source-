<template>
	<transition name="slide-left">
		<div class="body sign">
			<div class="top_pannel">
				<p>Lucky Day</p>
			</div>
			<p class="large">在开始游戏前，请先创建一个账户</p>
			<p class="other">可以通过新建或导入以太坊钱包创建账户</p>
			<div class="btn_wrap">
				<button class="btn1" @click="warn('/createwallet')">新建钱包</button>
				<button class="btn2" @click="warn('/importwallet')">导入钱包</button>
			</div>
			<Loading v-show="display"></Loading>
		</div>
	</transition>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import getVersion from '../assets/js/mixin.js'
	export default {
		name:'sign',
		mixins: [getVersion],
		data(){
			return {
				version_num:1,
				access:false,
				display:false,
				downUrl:'https://www.baidu.com/'
			}
		},
		methods:{
			warn(to) {
				if (!this.access) {
					return this.update();

				}
				MessageBox.confirm(
					'投资有风险,入场需谨慎！本人已承诺同意游戏规则，并自愿承担起奉献。',
					'风险提醒',
					{
						confirmButtonText:'接受进入',
						cancelButtonText:'不接受退出'
					}
					).then(
					confirm => {
						this.changeRoute(to);
					},
					cancel => {

					}
					);
				},
			},
			created() {
				if (!this.$route.query.path) {
					this.$store.commit('routeChange','/');
				}
			},
		}
	</script>
	<style lang='scss'>
		.sign{
			.top_pannel{
				width:100%;
				height:40vh;
				background-color:$bgcolor;
				overflow: hidden;
				p{
					height:1rem;
					width:60vw;
					border:1px solid #464765;
					border-radius:0.5rem;
					margin-top:20vh;
					@extend %margin;
					box-shadow: 0 0 5px #464765;
					@include fl(0.4rem,1rem,#ccd2f6);
					text-align: center;
					text-shadow:0 0 10px white;
				}
			}
			.btn_wrap{
				margin-top:1.2rem;
				button{
					width:60vw;
					height:.9rem;
					text-align: center;
					@include fl(16px,.9rem);
					box-sizing: border-box;
					@extend %margin;
					display: block;
					border-radius: 2px;
				}
				.btn1{
					background-color:$bgcolor;
					color:#fff;
				}
				.btn2{
					border:1px solid $bgcolor;
					color:$bgcolor;
					background:#fff;
					margin-top:20px;
				}
			}
		}
	</style>