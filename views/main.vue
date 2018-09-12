<template>
	<transition :name="transitionName">
		<div class="body main_page">
			<!-- 状态栏 -->
			<div class="status_bar">
				<div class="bar_in">
					<big >
						<img src="../assets/img/src_assets_images_seed.png" alt="">
						<span>{{seed | roundOff(2)}}</span>
					</big>
					<a class="setting" @click="changeRoute('/setting')">
						<img src="../assets/img/src_assets_images_setting.png" alt="">
					</a>
				</div>
			</div>

			<!-- 数据面板 -->
			<div class="content" ref="wrapper">
				<div class="maincontent">			
					<div class="assets_panel">
						<p class="tips">较差的网络环境将导致交易发送失败，数据同步缓慢等结果</p>
						<img src="../assets/img/src_assets_images_ethereum.png" alt="">
						<p class="num_show">{{$store.state.pool | carryOne(6)}}</p>
						<div class="notice">
							<img src="../assets/img/src_assets_images_horn.png" alt="">
							<span>{{notice}}</span>
						</div>
					</div>
					<TabList :list="swichList" :r3="r3"></TabList>
					<router-view></router-view>
				</div>		
			</div>

			<!-- 提现清单弹出层 -->
			<Popup v-model="$store.state.popupStatus" position="bottom" @click="changePopup">
				<div class="detail_wrap">
					<div class="dt_title">
						手续费信息
						<i class="fa fa-times-circle-o" @click="changePopup"></i>
					</div>
					<ul>
						<li v-for ="(item,index) in wList">
							<i>{{item.name}}</i>
							<div>				
								<span>{{item.value}}</span>
								
							</div>
						</li>
						<li>
							<i>{{fee.name}}</i>
							<div class="fee_wrap">				
								<span>{{fee.value | carryOne(6)}}ETH</span>
								<em>≈Gas{{fee.gasLimit}}*Gas Price({{fee.gasPrice / 1e9}}gwei)</em>
							</div>
						</li>
					</ul>
					<button type="" class="withdraw_btn" @click="enterPin">确定</button>
				</div>
			</Popup>

			<!-- 幸运数字键盘 -->
			<div class="keyboard" @click="close($event)" v-show="luckNum.display">
				<transition enter-active-class = "animated fadeInUp">
					<Keyboard v-show="luckNum.display"></Keyboard>
				</transition>
			</div>

			<!-- 帮助提示框 -->
			<Tips v-show="tips[0].display" :title="tips[0].title" :index="0">
				<div class="profit_wrp">
					<div v-for="(item,index) in tips[0].content">
						<span>{{item.title}}</span>
						- {{item.content}}
					</div>
				</div>

			</Tips>

			<Tips v-show="tips[1].display" :title="tips[1].title" :index="1">
				<div class="inv_wrap">
					<p v-for="(item,index) in tips[1].content">•  {{item}}</p>
				</div>
			</Tips>

			<Loading v-show="loading"></Loading>

			<!-- 版本遮罩层 -->
			<div class="cover" v-show="!access" @click="update"></div>
		</div>
	</transition>
</template>
<script>
	import TabList from '../components/switch'
	import abiList from '../assets/js/abi.js'
	import { mapActions, mapState } from 'vuex'
	import bus from '../assets/js/eventBus.js'
	import { Popup } from 'mint-ui'
	import Keyboard from '../components/lucknum'
	import Bscroll from 'better-scroll'
	import Tips from  '../components/tips'
	import getVersion from '../assets/js/mixin.js'
	export default {
		name:'main_page',
		components:{TabList,Popup,Keyboard,Tips},
		mixins: [getVersion],
		data() {
			return {
				transitionName:'slide-left',
				notice:'欢迎来到Lucky Day',
				swichList:[
				{name:'购买Key',to:'/main/seed/'},
				{name:'我的金库',to:'/main/finance/'},
				{name:'我的钱包',to:'/main/wallet/'},
				{name:'邀请玩家',to:'/main/invitation/'}
				],
				loading:false,
				withdrawList:[
				{name:'提现金额',value:0},
				{name:'支付地址',value:`0x${JSON.parse(localStorage.getItem('key_store')).address}`},
				{name:'收款地址',value:this.$store.state.contractAddress},
				],
				fee:{name:'矿工费',get value(){return this.gasLimit * this.gasPrice / 1e18},gasLimit:3e6,gasPrice:0},
				luckNum:{display:false},
				busEvent:[



				],
				tips:[
				{
					title:'金库说明',
					display:false,
					content:[
					{title:'获奖收益',content:'获奖收益是一个动态预期值'},
					{title:'分红收益',content:'分红收益来自于四部分'},
					{title:'邀请收益',content:'邀请收益来自下级玩家投资额的10%和下下级玩家投资额的3%'},
					{title:'已提现总收益',content:'总收益分为'}
					]
				},
				{
					title:'邀请规则',
					display:false,
					content:[
					'激活邀请系统需要花费0.01ETH',
					'Lucky Day支持2级邀请奖励，通过邀请码注册的玩家将成为邀请人的下级，下级邀请的玩家将成为邀请人的下下级',
					'邀请人可直接获得下级10%的投资',
					'邀请人可直接获得下下级3%的投资',
					'邀请人可以分享邀请码来绑定下级玩家'
					]
				}
				]

			}
		},

		/*页面跳转动画*/
		created() {
			this.transitionName = this.$route.query.path !== '/bindinviter' 
			? 'slide-left'
			: 'slide-right';
			if (!this.$route.query.path) {
				this.$store.commit('routeChange','/main/seed/turn');
			}
		},
		beforeRouteLeave(to, from, next) {
			this.transitionName = 'slide-left';
			setTimeout(next,50);
		},
		methods:{

			iScrollClick(){
				if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
				if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
				if (/Silk/i.test(navigator.userAgent)) return false;
				if (/Android/i.test(navigator.userAgent)) {
					var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
					return parseFloat(s[0]+s[3]) < 44 ? false : true
				}
			},

			//关闭虚拟键盘
			close(e) {
				if (e.target.className === 'keyboard') {
					this.luckNum.display = false;
					bus.$emit('clear');
				}
			},

			changePopup() {

				this.$store.commit('changePopupStatus',false);
			},
			enterPin() {
				bus.$emit('nextStep');
			},
			...mapActions([
				'getBalance',
				'getPlayerInfo',
				'getPool',
				'getToCny',
				]),

			//初始化基础数据
			getDataInit() {
				this.loading = true;
				return Promise.all([
					this.getPool(),
					this.getBalance(),
					this.getPlayerInfo(),
					this.getToCny()
					]);
			}

		},
		watch:{
			//监听当前路由变化，刷新iscroll
			$route() {
				setTimeout(() => {
					this.myscroll.refresh();
				}, 0);
			}

		},
		computed:{
			...mapState({
				wList(state) {
					this.withdrawList[0].value  = (Math.floor(state.allProfit / 1e18 * 1e6) / 1e6).toFixed(6) + 'ETH';
					return this.withdrawList;
				}
			}),

			seed() {
				return this.$store.state.playerInfo.seed;
			},

			r3() {
				return this.$route.path.match(/\/\w+\/\w+\/(\w+)/)[1];//截取路由字符串中第三级路由
			}
		},
		mounted() {
			this.getDataInit().then(()=> {
				this.loading = false;

				this.myscroll=new Bscroll(this.$refs.wrapper,{//初始化iscroll
					click:true,
					pullDownRefresh: {
						threshold: 50,
						stop: 20
					}
				});

				//下拉刷新
				this.myscroll.on("pullingDown",() => {    // 当下拉到超过顶部 50px 时执行这个函数        
					
					this.getDataInit().then(() => {
						this.loading = false;
					})

					this.$nextTick(() => {
						this.myscroll.finishPullDown();                                    
						this.myscroll.refresh();  
					});  
				});

				bus.$on('loading',(status) => {//绑定自定义事件控制加载动画状态
					this.loading = status;
				});
				bus.$on('getPrice',(gasPrice) => {//绑定自定义事件传递gasprice
					this.fee.gasPrice = Number(gasPrice);
				});
				bus.$on('keyboard',(status) => {//绑定自定义事件传递虚拟键盘状态
					this.luckNum.display = status;
				});
				bus.$on('tipsChange',({index,status}) =>  {//tips弹出框状态控制
					this.tips[index].display = status;
				});
			});
		},
		beforeDestroy(){
			bus.$off("loading");
			bus.$off("getPrice");
			bus.$off('keyboard');
			bus.$off('tipsChange');
		},
	}
</script>
<style lang='scss'>
	.main_page{
		.status_bar{
			background-color:$bgcolor;
			height:70px;
			width:100%;
			position:relative;
			.bar_in{
				font-family: -apple-system, BlinkMacSystemFont,
				"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
				"Fira Sans", "Droid Sans", "Helvetica Neue",
				sans-serif;
				padding:0 15px;
				@include position(top,left,20px,0);
				bottom:0;
				width:100%;
				box-sizing: border-box;
				z-index: 6;
				border-bottom: 1px solid #383c48;
				@include fl(14px,48px);
				font-weight: lighter;
				letter-spacing:1px;
				big{
					display: inline-block;
					font-size:12px;
				}
				img{
					height:0.4rem;
					margin-right:6px;
					vertical-align: middle;
				}
				span{
					@extend img;
				}
				a{
					float:right;
					img{
						margin-right:0;
					}
				}
			}
		}

		.assets_panel{
			background-color:$bgcolor;
			padding:0 20px;
			overflow: hidden;
			.tips{
				padding:10px;
				@include fl(12px,nomal,#8893a7);
				text-align: center;
			}
			&>img{
				width:0.9rem;
				height:auto;
				display: block;
				margin:40px auto;
				margin-bottom:20px;
			}
			.num_show{
				@include fl(.7rem,normal,#fff);
				text-align: center;
				margin-bottom:20px;
			}
			.time_show{
				margin:20px auto;
				text-align: center;
				@include fl(16px,normal,#909baf);
			}
			.notice{
				height:0.6rem;
				background-color:#3a3e4a;
				border-radius:.3rem;
				margin-bottom:20px;
				line-height: 0.6rem;
				padding:0 35px;
				font-size: 0;
				img{
					height:.35rem;
					vertical-align: middle;
				}
				span{
					margin-left:30px;
					display: inline-block;
					width:50vw;
					height:auto;
					vertical-align: middle;
					@include fl(14px,.6rem,#9b9ea7);
					text-align:center;
				}
			}
		}
	}
	.detail_wrap{
		width:100%;
		text-align: center;
		.dt_title{
			position:relative;
			height:.8rem;
			border-bottom:1px solid #969696;
			@include fl(14px,.8rem,#969696);
			i{
				@include position(right,top,0,0);
				@include fl(20px,.8rem,#000);
				width:40px;
			}
		}
		p{

			height:1.2rem;
			line-height: 1.2rem;
			box-sizing: border-box;
			font-size:20px;
			border-bottom: 1px solid #d2d2d2;
			span{
				font-size:14px;
				vertical-align: top;
				margin-left:5px;
				color:#a9a9a9;
			}
		}
		ul{
			li{
				padding:0 20px;
				height:1.2rem;
				@include flex(row,flex-start);
				align-items: center;
				position: relative;
				color:#a9a9a9;
				font-size: 14px;
				box-sizing: border-box;
				&::after{
					content:'';
					width:100%;
					display: block;
					@include position(bottom,left,0,20px);
					border-top:1px solid #d2d2d2;
				}
				div{
					max-width:80% ;
					padding:0 20px;
					box-sizing: border-box;
					span{
						word-wrap: break-word;
						font-size: 12px;
						display: block;
						text-align: left;
					}
					em{
						display: block;
						font-size: 12px;
					}
				}
				i{
					display: block;
					min-width: 20%;
				}
			}
			li:nth-of-type(4){
				&::after{
					left:0;
				}
			}
		}
	}
	.withdraw_btn{
		@extend %button;
		margin-top: 20px;
		margin-bottom:20px;
	}
	.inv_wrap{
		p:nth-of-type(2){
			margin-bottom: 20px;
		}
		p{
			@include fl(14px,1.7,#000);
			letter-spacing:0.5px;
		}
	}
	.profit_wrp{
		div{
			margin-bottom:30px;
			@include fl(14px,1.7,#555);
			span{
				display: block;
				font-weight: 600;
				color:#000;
			}
		}
	}
	.cover{
		@include position(top,left,0,0,fixed);
		width:100%;
		height: 100%;
		background-color:rgba(0,0,0,0.3);
		align-items: center;
		z-index:999;
	}
</style>