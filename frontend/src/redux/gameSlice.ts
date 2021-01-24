import { createSlice } from '@reduxjs/toolkit';
import { GameMode, PlayerData } from '../types/game';

interface GameState2 {
    mode: GameMode,
    lastRolled: number,
    player: PlayerData
};

const initialGameState: GameState2 = {
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
        setWood: (state: GameState2, action) => {
            state.player.wood = action.payload;
        },
        incrementWood: (state: GameState2) => {
            state.player.wood++;
        },
        setPlayerData: (state: GameState2, action) => {
            state.player = action.payload;
        },
        setGameState: (state: GameState2, action) => {
            state.mode = action.payload.mode;
            state.lastRolled = action.payload.mode;
        }
    }
});

// TODO: gameActions file?
export const { setWood, incrementWood, setPlayerData, setGameState } = gameSlice.actions;

export const initGame = () => {
    return { type: 'init_game' }
}

export const endGame = () => {
    return { type: 'end_game' }
}

export const setMode = (mode: string) => {
    return { type: 'set_mode', payload: mode }
}

export const rollDice = () => {
    return { type: 'roll_dice' }
}

export const gameActions = {
    initGame,
    endGame,
    setMode,
    rollDice,
    setWood: gameSlice.actions.setWood,
    incrementWood: gameSlice.actions.incrementWood
}

export default gameSlice.reducer;
