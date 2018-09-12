<template>
	<router-view></router-view>
</template>
<script>
	export default {
		name:'app',
		data() {
			return {
				time:60,
				timedone:"",
			}
		},
		// watch:{
		// 	$route(newRoute, oldRoute) {

		// 	}
		// },
		created() {
			const th = this;
			document.addEventListener( "plusready", onPlusReady, false );
			function onPlusReady(){

				//设置沉浸式状态栏
				plus.navigator.setStatusBarBackground('#1C385D');
				plus.navigator.setStatusBarStyle('light');

				//监听app切换到后台运行，时间超过60秒则重新启动app，防止假死
				document.addEventListener('pause', function(){
					if(!!th.timedone){
						clearTimeout(th.timedone);
					}       
					localStorage.setItem("restTime",60);
					for(let i = 1;i<= localStorage.getItem('restTime');i++){
						th.timedone = setTimeout(function(){
							localStorage.setItem('restTime',Number(localStorage.getItem('restTime') - 1));
						},i*1000);
					}
				},false);
				document.addEventListener('resume', function(){
					if(Number(localStorage.getItem("restTime")) == 0){
						plus.runtime.restart();
					}
				},false);
			}
		}
	}
</script>