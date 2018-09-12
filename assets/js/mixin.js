//混入首页和注册页两个组件,验证版本号
import { MessageBox } from 'mint-ui';

export default {
	data() {
		return {
			version_num:1,
			access:false,
			display:false,
			downUrl:'https://www.baidu.com/'
		}
	},
	methods:{
		getVersion() {
			const promise = new Promise((resolve, reject) => {
				const handler = function(){
					if (this.readyState === 4 && this.status === 200) {
						resolve(this.response);
					}
				};
				const client = new XMLHttpRequest();
				client.open("GET", 'http://test.abcblockchain.io/version.php');
				client.onreadystatechange = handler;
				client.responseType = "json";
				client.setRequestHeader("Accept", "application/json");
				client.send();

			});
			return promise;

		},

		update() {
			MessageBox.alert('有新版本可用，请立即更新').then(action => {
				window.plus.runtime.openURL(this.downUrl);
			})
		}
	},
	mounted(){
		//验证版本号
		if (!this.$store.state.IsversionValidated) {
			this.display = true;
			this.getVersion().then((res) => {
				if (this.version_num !== res.version_num && res.is_update === 1) {
					this.update();
				} else if (this.version_num !== res.version_num && res.is_update === 0) {
					this.access = true;
					this.$store.commit('validateVersion');
					MessageBox.confirm(
						'有新版本可用，请立即更新',
						'版本更新',
						{
							confirmButtonText:'下载最新版本',
							cancelButtonText:'取消'
						}
						).then(
						confirm => {
							window.plus.runtime.openURL(this.downUrl);
						},
						cancel => {

						}
						);

					} else {
						this.access = true;
						this.$store.commit('validateVersion');
					}
				}).finally(() => {
					this.display = false;
				})
			} else {
				this.access = true;
			}
		}
	}