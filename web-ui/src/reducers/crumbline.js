import {createReducer} from "./utils";

const initialState = {
    crumbline: [],
};

const handlers = {
    'CLEAR_CRUMBLINE': () => (initialState),
    'SET_CRUMBLINE': (state, action) => {
        return {
            crumbline: action.payload,
        };
    },
};

export default createReducer(initialState, handlers);
