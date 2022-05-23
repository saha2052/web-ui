import { combineReducers } from 'redux';

import project from './project';
import members from './members';
import dialog from "./dialog";
import crumbline from "./crumbline";
import datasource from "./datasource";
import plugin from "./plugin";
import tag from "./tag";

const appReducer = combineReducers({
    dialog,
    crumbline,
    project,
    members,
    datasource,
    plugin,
    tag,
});

const rootReducer = (state, action) => {
    if(action.type === 'RESET') {
        state = undefined
    }
    return appReducer(state, action);
};

export default rootReducer;
