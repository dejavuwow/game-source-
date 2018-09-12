<template>
	<div class="bt_wrap">
		<slot name="b1"></slot>
		<ul>
			<li v-for="(item,index) in bData">
				<span>{{item.name}}</span>
				<div>
					<i>{{item.value}}</i>
					<img v-if="item.img" :src="item.img" alt="">
				</div>
				<em>{{item.other}}</em>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name:'tb',
		props:['bData'],
		data() {
			return {
				
			}
		}

	}
</script>
<style lang="scss">
	.bt_wrap{
		background-color:#fff;
		overflow: hidden;
		ul{
			li{
				height:80px;
				border-top: 1px solid #ececec;
				box-sizing: border-box;
				padding:10px 10px;
				&>span,div{
					float:left;
					width:50%;
					@include fl(14px,30px,#000);
				}
				div,em{
					text-align:right;

				}
				em{
					@include fl(12px,30px,#bcbcbc);
					float:right;
				}
				div{
					img{
						height:.4rem;
						vertical-align: middle;
						margin-left:5px;
						margin-bottom:4px;
					}
					i{
						vertical-align: middle;
						font-size:14px;
					}
				}
			}
		}
	}
</style>