export default {
	async get(url){
		const {data:res} = await uni.$http.get(url)
		 if(res.meta.status!==200){
			return uni.showToast({
			 	title:"获取数据失败"
			 })
		 }
		return  res.message
		}
	}