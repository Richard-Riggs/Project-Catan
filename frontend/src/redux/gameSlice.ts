import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../types/game';

const initialGameState: GameState = {
    sessionStage: 'lobby',
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
        },
        setSessionStage: (state: GameState, action) => {
            state.sessionStage = action.payload;
        }
    }
});

// TODO: gameActions file?
export const { setWood, incrementWood, setPlayerData, setGameState, setSessionStage } = gameSlice.actions;

export const initSession = () => {
    return { type: 'game/init_session' }
}

export const startGame = () => {
    return { type: 'game/start_game' }
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
    initSession,
    startGame,
    endGame,
    setMode,
    rollDice,
    setWood: gameSlice.actions.setWood,
    incrementWood: gameSlice.actions.incrementWood,
    setSessionStage: gameSlice.actions.setSessionStage
}

export default gameSlice.reducer;
