import { createSlice } from '@reduxjs/toolkit';
import { GameMode, PlayerData } from '../types/game';

interface GameState {
    mode: GameMode,
    lastRolled: number,
    player: PlayerData
};

const initialGameState: GameState = {
    mode: 'standby',
    lastRolled: 0,
    player: {
		name: '',
		brick: 0,
		ore: 0,
		sheep: 0,
		wheat: 0,
		wood: 0,
		cities: 0,
		devCards: 0,
		roads: 0,
		settlements: 0,
		ships: 0,
		canBuySettlement: false,
		canBuyRoad: false
	}
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        setWood: (state: GameState, action) => {
            state.player.wood = action.payload;
        },
        incrementWood: (state: GameState) => {
            state.player.wood++;
        }
    }
});

export const { setWood, incrementWood } = gameSlice.actions;

export default gameSlice.reducer;
