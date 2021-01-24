import { Middleware } from "@reduxjs/toolkit";
import GameSession from "../game/GameSession";

// const settings: GameSettings = {

// }

export const gameSessionMiddleware: Middleware = store => next => action => {
    let game: GameSession | undefined;
    console.log('here');

    switch (action.type) {

        case 'init_game':
            game = new GameSession(store);
            return;

        case 'set_mode':
            if (game) {
                game.updater.setMode(action.payload);
            }
            return;
        
        case 'roll_dice':
            if (game) {
                game.eventHandler.triggerGameEvent('roll_dice');
            }
    }

    return next(action);

}
