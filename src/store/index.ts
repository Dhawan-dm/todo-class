import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./reducers/index";

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));

export default store;
