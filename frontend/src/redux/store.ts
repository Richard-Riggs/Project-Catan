import { configureStore } from '@reduxjs/toolkit';
import { gameSessionMiddleware } from './gameMiddleware';
import gameReducer from './gameSlice';

export default configureStore({
    reducer: {
        game: gameReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(gameSessionMiddleware)
});
