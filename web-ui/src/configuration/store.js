import { createStore, compose, applyMiddleware } from 'redux';
import root from '../reducers/root';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

export default store;
