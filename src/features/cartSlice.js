import { createSelector, createSlice } from '@reduxjs/toolkit';



const initialState = {
    cart: JSON.parse(window.localStorage.getItem("data"))?.cartItems ? [...JSON.parse(window.localStorage.getItem("data")).cartItems] : [],
};




export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        setCart: (state, action) => state.cart = action.payload,
        addToCart: (state, action) => {

            const found = action.payload.cartItems.find(item => item.productId === action.payload.productId);
            if (found) {
                return {
                    ...state,
                    cart: action.payload.cartItems.map(item => {
                        if (item.productId === found.productId) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        } else {
                            return {
                                ...item
                            }
                        }
                    })
                }
            }
            return {
                ...state,
                cart: [...state.cart, {
                    productId: action.payload.productId,
                    images: action.payload.images,
                    metadata: action.payload.metadata,
                    name: action.payload.name,
                    price: action.payload.price,
                    priceId: action.payload.priceId,
                    quantity: 1
                }]
            }
        },

        deleteItemFromCart: (state, action) => {
            const found = action.payload.cartItems.find(item => item.productId === action.payload.id);

            if (found) {
                if (found.quantity > 1) {
                    state.cart = action.payload.cartItems.map(item => {
                        if (item.productId === found.productId) {
                            return {
                                ...item,
                                quantity: item.quantity - 1
                            }
                        }

                        return {
                            ...item
                        }
                    })
                } else {
                    state.cart = action.payload.cartItems.filter(item => item.productId !== found.productId);
                }
            }
        }

    },

});

export const { addToCart, deleteItemFromCart, setCart } = cartSlice.actions;

export const selectCartitems = state => state.cart.cart;

export const selectTotalPriceInCart = state => {
    let sum = 0;

    state.cart.cart?.forEach(item => {
        sum += item.quantity * item.price;
    })

    return sum;
}

export const selectNumberOfItemsInCart = state => state.cart.cart ? state.cart.cart?.length : 0;


const lineitems = state => {
    return state.cart?.cart?.map(item => {
        return {
            price: item.priceId,
            quantity: item.quantity
        };
    });
};

export const selectLineItems = createSelector([lineitems], (a) => {
    return a;
})

export default cartSlice.reducer;
