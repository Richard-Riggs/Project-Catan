import { configureStore } from '@reduxjs/toolkit';
import catanReducer from './catanSlice';

export default configureStore({
    reducer: {
        catan: catanReducer
    }
});
