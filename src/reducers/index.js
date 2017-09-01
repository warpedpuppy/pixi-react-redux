import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import Helpers from "./helpers";
import Resize from "./resize";
import GameState from "./GameState";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  helpers: Helpers,
  resize: Resize,
  gameState: GameState,
  // your reducer here
});
