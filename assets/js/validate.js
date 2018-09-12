import Vue from 'vue';
import { MessageBox } from 'mint-ui';
function validateFormat (prop, value,) {
	//验证非空
	if (value === '' || value === null) {
		Vue.prototype.$message({
			message: `${prop}不能为空`,
			duration: 1500,
		});
		return false;
	}
	return true;
}

//验证两次输入是否相同
function repeat(prop, v1, v2) {
	if (v1 !== v2) {
		Vue.prototype.$message({
			message: `两次${prop}不一致`,
			duration: 1500,
		});
		return false;
	}
	return true;
} 

//验证钱包地址
function v_address(prop, value) {
	if (!/^0x\S{40}$/.test(value)) {
		Vue.prototype.$message({
			message: `${prop}格式错误`,
			duration: 1500,
		});
		return false;
	}
	return true;
}

//验证数值范围是否正确
function v_num(prop,v1, v2) {
	if ( Number(v1) > Number(v2)) {
		MessageBox.alert(`${prop}余额不足`,'提示');
		return false;
	}
	return true;
}

//验证输入值是否为整数
function v_int(prop, value) {
	if (!/^\d+$/.test(value)) {
		MessageBox.alert('请输入整数','提示');
		return false;
	}
	return true;
}

function v_int2(prop, value) {
	if (!/^\d+$/.test(value)) {
		Vue.prototype.$message({
			message: `${prop}必须是整数`,
			duration: 1500,
		});
		return false;
	}
	return true;
}

function v_range(prop,v1, v2) {
	if (v1 < 1 || v1 > v2) {
		Vue.prototype.$message({
			message: `${prop}必须在1~${v2}之间`,
			duration: 1500,
		});
		return false;
	}
	return true;
}


export {
	validateFormat as v_format,
	repeat as v_repeat,
	v_address,
	v_num,
	v_int,
	v_int2,
	v_range
}