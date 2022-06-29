import { createStore } from 'vuex'
import cart from '@/store/cart/cart.js'


const store= createStore({
	modules:{
		m_cart:cart
	}
})
export default store