import { createSlice } from '@reduxjs/toolkit';

interface CatanState {
    wood: number
};

const initialPlayerState: CatanState = { wood: 8 };

export const catanSlice = createSlice({
    name: 'catan',
    initialState: initialPlayerState,
    reducers: {
        setWood: (state: CatanState, action) => {
            state.wood = action.payload;
        },
        incrementWood: (state: CatanState) => {
            state.wood++;
        }
    }
});

export const { setWood, incrementWood } = catanSlice.actions;

export default catanSlice.reducer;
