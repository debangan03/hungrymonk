"use client"
import { store } from './Store'
import { Provider } from 'react-redux'
function CartProvider({children}){
    //console.log(store);
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default CartProvider;