import {createReducer} from "./utils";

export const PLUGIN_LOAD = 'PLUGIN_LOAD';
export const PLUGIN_LOAD_SUCCESS = 'PLUGIN_LOAD_SUCCESS';
export const PLUGIN_LOAD_FAILED = 'PLUGIN_LOAD_FAILED';
export const PLUGINS_LOAD = 'PLUGINS_LOAD';
export const PLUGINS_LOAD_SUCCESS = 'PLUGINS_LOAD_SUCCESS';
export const PLUGINS_LOAD_FAILED = 'PLUGINS_LOAD_FAILED';
export const PLUGINS_RESET = 'PLUGINS_RESET';
export const PLUGIN_RESET = 'PLUGIN_RESET';

const initialState = {
    plugins: {
        status: 'uninitialized',
        data: []
    },
    plugin: {
        status: 'uninitialized',
        data: {},
    }
};

const handlers = {
    [PLUGIN_LOAD]: () => ({
        plugin: {
            status: 'loading',
            data: {},
        }
    }),
    [PLUGIN_LOAD_FAILED]: (error) => (
        { plugin: { status: 'error', data: { 'summary': error } }}
    ),
    [PLUGIN_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {plugin: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [PLUGIN_RESET]: () => ({plugin: {status: 'uninitialized', data: {}}}),

    [PLUGINS_LOAD]: () => ({
        plugins: {
            status: 'loading',
            data: [],
        }
    }),
    [PLUGINS_LOAD_FAILED]: (error) => (
        { plugins: { status: 'error', data: { 'summary': error } }}
    ),
    [PLUGINS_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {plugins: {status: 'loaded', data: action.payload}};
        }
        console.error("err: ", action.error);
        return {error: action.payload}
    },
    [PLUGINS_RESET]: () => ({plugins: {status: 'uninitialized', data: []}}),
};

export default createReducer(initialState, handlers);
