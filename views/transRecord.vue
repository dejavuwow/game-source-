<template>
	<transition :name="transitionName">
		<div class="body trans_record">
			<Hdbar :title="title">
				<i @click="changeRoute" slot="left" class="fa fa-angle-left"></i>
				<i slot="right"></i>
			</Hdbar>
			<div class="content" ref="wrapper">
				<div class="maincontent">
					<ul class="list_box">
						<li v-for="(item,index) in lists">
							<i :class="['fa',item.isSend ? 'fa-reply from' : 'fa-share to']"></i>
							<div class="det_wrap">
								<p>{{item.to}}</p>
								<div>
									<span>{{item.timeStamp | dateFormat(false)}}</span>
									<i :class="[item.isSend ? 'from':'to']">{{item.isSend ? '-': '+'}}{{item.value / 1e18 | roundOff(6)}}ETH</i>
								</div>
							</div>
						</li>
					</ul>
				</div>	
			</div>
			<Loading v-show="loading"></Loading>
		</div>
	</transition>
</template>
<script>
	import axios from 'axios';
	import Bscroll from 'better-scroll';
	export default {
		name:'transRecord',
		data() {
			return {
				transitionName:'slide-right',
				title:'转账记录',
				lists:[],
				loading:false
			}
		},
		filters:{
			dateFormat(date, is_full=true){
				//间隔大于7天则显示具体时期，否则显示多少时间之前
				let formatdata;
				if (is_full) {

					formatdata = new Date(date*1000).toLocaleDateString()
					.replace(/[\/年月日]/g,"-")
					.replace(/(^\d{4}-\d{1,2}-\d{1,2}).*/,"$1")+" "+new Date(date*1000).toLocaleTimeString("en-GB");
					formatdata = formatdata.replace(/(\sGMT\+\d*)/ig,"");

				} else {
					const diff = new Date().getTime() - date * 1000;	
					if(diff >= 7*864e+5){
						formatdata = new Date(date*1000).toLocaleDateString()
						.replace(/[\/年月日]/g,"-")
						.replace(/(^\d{4}-\d{1,2}-\d{1,2}).*/,"$1");
						formatdata = formatdata.replace(/(\sGMT\+\d*)/ig,"");

					}else if(diff >= 2 * 864e+5 && diff < 7*864e+5){

						formatdata = `${Math.floor(diff/864e+5)}天前`;

					}else if(diff >= 864e+5 && diff < 2*864e+5){

						formatdata = '昨天';

					}else if(diff >=36e+5 && diff < 864e+5){

						formatdata = `${Math.floor(diff/36e+5)}小时前`;

					}else if(diff >= 6e+4 && diff < 36e+5){

						formatdata = `${Math.floor(diff/6e+4)}分钟前`;

					}else{
						formatdata = '刚刚';
					}
				}
				return formatdata;
			},

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

			//获取当前钱包地址ETH的接收和发送记录
			getEthRecord() {
				const info = this.baseApi('', {
					module: 'account'
				}, {
					action: 'txlist'
				}, {
					address: this.address
				}, {
					startblock: 0
				}, {
					page:1
				},{
					offset:100
				},{
					endblock: 99999999
				},{
					sort: 'desc'
				}, {
					apikey: this.$store.state.apikey
				}, );

				this.loading = true;
				axios(info)
				.then(response => {
					this.lists = response.data.result.filter((v, i) => {
              			v.isSend = v.from === this.address ? true : false; //将每个条目发送方做个属性标识
              			return v.isError != 1 && v.from !== '' && v.to !== ''; //将返回数据中出错和接收或发送地址不存在的条目过滤掉
              		});
				})
				.then(() => {

					//初始化iscroll
					document.addEventListener('touchmove', function(e) {  
						e.preventDefault();  
					}, {passive:false,capture:false})
					
					this.myscroll=new Bscroll(this.$refs.wrapper,{
						click:true,
					});
				})
				.finally(() => {
					this.loading = false;
				});
			},

		},
		mounted() {
			this.getEthRecord();
		}
	}
</script>
<style lang='scss'>
	.trans_record{
		.content{
			background-color:#fff;
		}
	}
	.list_box{
		li{
			border-bottom: 1px solid #eee;
			padding:10px 10px;
			@include flex(row,center);
			align-items:center;
			.det_wrap{
				padding-left:10px;
				flex:1;
				height:100%;
				box-sizing: border-box;
				@include flex(column,center);
				p{
					font-size: 12px;
					word-wrap: break-word;
					word-break: break-all;
				}
				div{
					margin-top:5px;
					@include flex(row,space-between);
					align-items: center;
					span{
						font-size: 12px;
						color: #aaa;
					}
					i{
						font-size: 14px;
					}
				}
			}
		}
	}
	.from{
		color:#ff3300;
	}
	.to{
		color:#00cc00;
	}
</style>