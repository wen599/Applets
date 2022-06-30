import { createStore } from 'vuex'
import cart from '@/store/cart/cart.js'
import address from './address/address'
import userInfo from './userInfo/userInfo'


const store= createStore({
	modules:{
		m_cart:cart,
		m_address:address,
		m_userInfo:userInfo
	}
})
export default store