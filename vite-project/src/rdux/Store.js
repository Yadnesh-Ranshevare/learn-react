import {configureStore} from '@reduxjs/toolkit'
import myReducer from "./Slice"     //you can give any name to your reducer

export const Store = configureStore({
    reducer:{myReducer}
})