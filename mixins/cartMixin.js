import { mapGetters } from 'vuex'

export default {
	methods:{
		setBadge(){
			if(this.goods_total>0){
				uni.setTabBarBadge({
					index:2,
					text:this.goods_total.toString()
				})
			}else{
				uni.removeTabBarBadge({
					index:2
				})
			}
		}
	},
	computed:{
			...mapGetters('m_cart',['goods_total'])
	},
	onShow(){
		this.setBadge()
	}
	
}