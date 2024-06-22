import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



interface WorkPhotoPath {
    [key: string]: any;  // Adjust the type as necessary
}

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    workPhotoPaths: WorkPhotoPath[];
    qty?: number;
    total?: number;
}

interface InitialState {
    productData: Product[];
    userInfo: any;
    orderData: any[];
}

const initialState: InitialState = {
    productData: [],
    userInfo: null,
    orderData: [],
};

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.productData.find((item) => item._id === action.payload._id);
            if (existingProduct) {
                toast(`${action.payload.title} already in cart`);
            } else {
                toast(`${action.payload.title} added successfully`);
                const total = action.payload.price;
                state.productData = [
                    ...state.productData,
                    { ...action.payload, qty: 1, total: total },
                ];
            }
        },
        increaseQty: (state, action: PayloadAction<string>) => {
            const index = state.productData.findIndex((el) => el._id === action.payload);
            if (index >= 0) {
                const product = state.productData[index];
                product.qty = (product.qty || 0) + 1;
                product.total = product.price * product.qty;
            }
        },
        decreaseQty: (state, action: PayloadAction<string>) => {
            const index = state.productData.findIndex((el) => el._id === action.payload);
            if (index >= 0) {
                const product = state.productData[index];
                if (product.qty && product.qty > 1) {
                    product.qty -= 1;
                    product.total = product.price * product.qty;
                } else {
                    state.productData.splice(index, 1);
                }
            }
        },
        resetCart: (state) => {
            state.productData = [];
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter((item) => item._id !== action.payload);
        },
        addUser: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        deleteUser: (state) => {
            state.userInfo = null;
        },
        saveOrder: (state, action: PayloadAction<any[]>) => {
            state.orderData = action.payload;
        },
        resetOrder: (state) => {
            state.orderData = [];
        }
    },
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    deleteProduct,
    resetCart,
    addUser,
    deleteUser,
    saveOrder,
    resetOrder,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
