export default {
	namespaced: true,
	state(){
		return{
			cart:JSON.parse(uni.getStorageSync('cart') || '[]') 
		}
	},
	mutations:{
		// 保存数据
		saveCart(state){
			try{
			uni.setStorageSync('cart',JSON.stringify(state.cart))
			}catch(e){
			 uni.showToast({
			 	title:e.message
			 })
			}
		},
		// 添加购物车的函数
		addCart(state,goodsInfo){
			// 查找购物车中是否有这个商品，有就数量加1，没有就加入购物车
			const result=state.cart.find(item=>item.goods_id===goodsInfo.goods_id)
			if(result){
				result.goods_count++
			}else{
				const { goods_id,goods_name,goods_price,goods_small_logo}=goodsInfo
				const cartObj={
					goods_id,
					goods_name,
					goods_price,
					goods_small_logo,
					goods_count:1,
					goods_state:true
				}
				state.cart.unshift(cartObj)
			}
			this.commit('m_cart/saveCart')
		},
		// 更改商品的状态
		changeGoodsState(state,id){
			const result=state.cart.find(item=>item.goods_id===id)
			result.goods_state=!result.goods_state
			this.commit('m_cart/saveCart')
		},
		// 更改商品的数量
		changeGoodsCount(state,arr){
			const result=state.cart.find(item=>item.goods_id===arr[0])
			result.goods_count=arr[1]
			this.commit('m_cart/saveCart')
		},
		// 删除商品
		deleteGoods(state,id){
			state.cart=state.cart.filter(item=>item.goods_id!==id)
			this.commit('m_cart/saveCart')
		},
		// 更改全部商品的状态
		changeAllGoodsState(state,flog){
			state.cart.forEach(item=> item.goods_state=!flog)
			this.commit('m_cart/saveCart')
		}
	},
	getters:{
		// 获取购物车商品的数量
		goods_total(state){
		const result= state.cart.reduce((sum,item)=>{
				return sum+item.goods_count
			},0)
			return result
		},
		// 获取所有商品的状态是否都是true
		getAllGoodsState(state){
			return state.cart.find(item=>item.goods_state===false)?false:true
		},
		// 获取购物车所有商品的总价
		getAllGoodsPrice(state){
			let result=0
			for(let i = 0; i<state.cart.length;i++){
				if(state.cart[i].goods_state){
					result=result+state.cart[i].goods_price*state.cart[i].goods_count
				}
			}
			return result.toFixed(2)
		},
		// 获取所有状态为ture的商品
		getAllGoodsCount(state){
			let result=0
			for(let i = 0; i<state.cart.length;i++){
				if(state.cart[i].goods_state){
					result=result+state.cart[i].goods_count
				}
			}
			return result
		}
	}
}