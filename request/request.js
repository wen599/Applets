export default {
	async get(url,obj){
		const {data:res} = obj ? (await uni.$http.get(url,obj)):(await uni.$http.get(url))
		 if(res.meta.status!==200){
			return uni.showToast({
			 	title:"获取数据失败"
			 })
		 }
		return  res.message
		}
	}