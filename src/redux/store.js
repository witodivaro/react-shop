import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

import { fetchCollectionsStart } from "./shop/shop.sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);
