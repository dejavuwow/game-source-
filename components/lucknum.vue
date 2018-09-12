<template>
	<div class="key_wrap">
		<p>请填写幸运数字</p>
		<ul>
			<li v-for="(item,index) in numList">{{item}}</li>
		</ul>		
		<div class="num_board">
			<div class="num_in">
				<div v-for="(item,index) in keyNum" @click="drive(item)" :class="[item ==='确定'?'pri':'']"><img v-if="item==='x'" src="../assets/img/delete.svg"></img>{{item !== 'x' ? item :''}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import bus from '../assets/js/eventBus.js';
	export default {
		name:'keyboard',
		data() {
			return {
				keyNum:[1,2,3,4,5,6,7,8,9,'x',0,'确定'],
				inputNum:[]
			}
		},
		computed:{
			numList() {
				const arr = ['','','','','',''];
				for (let i = 0; i<=5; i++) {
					if (this.inputNum[i] !== undefined) {
						arr[i] = this.inputNum[i];
					}
				}
				return arr;
			}
		},
		mounted() {
			//清空数据
			bus.$on('clear',() => {
				this.inputNum = [];
			})
		},
		beforeDestroy() {
			bus.$off('clear');
		},
		methods:{
			//判断点击的内容决定执行操作
			drive(item) {
				switch(true) {

					case item !== 'x' && item !== '确定':
					return this.enterNum(item);
					case item === 'x':
					return this.deleteNum(item);
					case item === '确定':
					return this.sendNum();
				}
			},

			//是数字
			enterNum(item) {
				if (this.inputNum.length >= 6 ) return;
				this.inputNum.push(item);
			},

			//删除键
			deleteNum(item) {
				if (this.inputNum.length === 0) return;
				this.inputNum.pop();
			},

			//确定按钮
			sendNum() {
				if (this.inputNum.length < 6) {
					this.$message({
						message:'请填满6位数字',
						duration:1500
					});
					return;
				}
				
				bus.$emit('getLuckNum',Number(this.inputNum.join('')));
				this.close();	
			},

			//关闭虚拟键盘
			close() {
				bus.$emit('keyboard',false);
				this.inputNum = [];	
			}
		}
	}

</script>
<style lang="scss">
	.key_wrap{
		width:100%;
		p{
			background-color:#fff;
			text-align: center;
			@include fl(14px,normal,#aaa);
			padding-top:15px;
		}
	}
	.keyboard{
		@include position(top,left,0,0,fixed);
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,.2);
		@include flex(column-reverse,flex-star);
		align-items: center;
		ul{
			width:100%;
			padding:15px 0;
			background:#fff;
			@include flex(row,center);
			li{
				height:.7rem;
				width:.7rem;
				border:1px solid #000;
				border-right:0;
				text-align: center;
				line-height: .7rem;
			}
			li:last-child{
				border-right:1px solid #000;
				@include fl(14px,.7rem,#000);
			}
		}
	}
	.num_board{
		background-color:#fff;
		width:100%;
	}
	.num_in{
		@include flex(row,center);
		flex-wrap: wrap;
		border-right:1px solid #eee;
		border-bottom: 1px solid #eee;
		div{
			width:33.3%;
			height:1rem;
			@include fl(16px,1rem,#000);
			text-align: center;
			border-top:1px solid #eee;
			border-left:1px solid #eee;
			box-sizing: border-box;
			img{
				height:.5rem;
				vertical-align: middle;
			}
		}
		.pri{
			background-color:$btncolor;
			color:#fff;
		}
	}

</style>