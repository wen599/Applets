export default {
	namespaced:true,
	state(){
		return{
			userInfo: JSON.parse(uni.getStorageSync('token') || '{}') 
		}
	},
	mutations:{
		
	}
}