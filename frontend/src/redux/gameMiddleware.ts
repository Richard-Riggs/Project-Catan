import { Middleware } from "@reduxjs/toolkit";
import GameSession from "../game/GameSession";

/**
 * Creates gameSessionMiddleware with a persistent GameSession in scope.
 * 
 * @returns {Middleware} middleware with a persistent game session in scope
 */
export const scopedSessionMiddleware = () => {
    // Persistent game session
    let game: GameSession | undefined;

    const middleware: Middleware = store => next => action => {
        switch (action.type) {

            case 'game/init_game':
                if (!game) {
                    game = new GameSession(store);
                }
                break;

            case 'game/set_mode':
                if (game) {
                    game.updater.setMode(action.payload);
                }
                break;
            
            case 'game/roll_dice':
                if (game) {
                    game.eventHandler.triggerGameEvent('roll_dice');
                }
                break;

            default:
                return next(action);
        }
    }

    return middleware
}

export const gameSessionMiddleware = scopedSessionMiddleware();
