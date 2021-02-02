import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middleware = [logger, ReduxThunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
