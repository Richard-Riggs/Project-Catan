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
        },
        setPlayerData: (state: GameState, action) => {
            state.player = action.payload;
        },
        setGameState: (state: GameState, action) => {
            state.mode = action.payload.mode;
            state.lastRolled = action.payload.lastRolled;
        }
    }
});

// TODO: gameActions file?
export const { setWood, incrementWood, setPlayerData, setGameState } = gameSlice.actions;

export const initGame = () => {
    return { type: 'game/init_game' }
}

export const endGame = () => {
    return { type: 'game/end_game' }
}

export const setMode = (mode: string) => {
    return { type: 'game/set_mode', payload: mode }
}

export const rollDice = () => {
    return { type: 'game/roll_dice' }
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
