export default{
	namespaced:true,
	state(){
		return {
			address:JSON.parse(uni.getStorageSync('address') || '{}')
		}
	},
	mutations:{
		// 保存收货地址
		saveAddress(state){
			try{
			uni.setStorageSync('address',JSON.stringify(state.address))
			}catch(e){
			 uni.showToast({
			 	title:e.message
			 })
			}
		},
		// 修改收货地址
		changeAddress(state,res){
			state.address.name=res.userName
			state.address.telNumber=res.telNumber
			state.address.site=(res.provinceName+res.cityName+res.countyName+res.detailInfo)
			this.commit('m_address/saveAddress')
		}
	}
}