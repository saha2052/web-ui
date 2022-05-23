import {createReducer} from "./utils";

export const DATASOURCE_LOAD = 'DATASOURCE_LOAD';
export const DATASOURCE_LOAD_SUCCESS = 'DATASOURCE_LOAD_SUCCESS';
export const DATASOURCE_LOAD_FAILED = 'DATASOURCE_LOAD_FAILED';
export const DATASOURCES_LOAD = 'DATASOURCES_LOAD';
export const DATASOURCES_LOAD_SUCCESS = 'DATASOURCES_LOAD_SUCCESS';
export const DATASOURCES_LOAD_FAILED = 'DATASOURCES_LOAD_FAILED';
export const DATASOURCES_RESET = 'DATASOURCES_RESET';
export const DATASOURCE_RESET = 'DATASOURCE_RESET';
export const DATASOURCE_SAVE = 'DATASOURCE_SAVE';
export const DATASOURCE_SAVE_SUCCESS = 'DATASOURCE_SAVE_SUCCESS';
export const DATASOURCE_SAVE_FAILED = 'DATASOURCE_SAVE_FAILED';
export const DATASOURCE_INSPECT = 'DATASOURCE_INSPECT';
export const DATASOURCE_INSPECT_SUCCESS = 'DATASOURCE_INSPECT_SUCCESS';
export const DATASOURCE_INSPECT_FAILED = 'DATASOURCE_INSPECT_FAILED';
export const DATASOURCE_INSPECT_RESET = 'DATASOURCE_INSPECT_RESET';

const initialState = {
    datasources: {
        status: 'uninitialized',
        data: []
    },
    datasource: {
        status: 'uninitialized',
        data: {},
    },
    inspection: {
        status: 'uninitialized',
        data: [],
    }
};

const handlers = {
    [DATASOURCE_LOAD]: () => ({
        datasource: {
            status: 'loading',
            data: {},
        }
    }),
    [DATASOURCE_LOAD_FAILED]: (error) => (
        { datasource: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASOURCE_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {datasource: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [DATASOURCE_RESET]: () => ({datasource: {status: 'uninitialized', data: {}}}),

    [DATASOURCES_LOAD]: () => ({
        datasources: {
            status: 'loading',
            data: [],
        }
    }),
    [DATASOURCES_LOAD_FAILED]: (error) => (
        { datasources: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASOURCES_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {datasources: {status: 'loaded', data: action.payload}};
        }
        console.log("err: ", action.error);
        return {error: action.payload}
    },
    [DATASOURCES_RESET]: () => ({datasources: {status: 'uninitialized', data: []}}),
    [DATASOURCE_SAVE]: (datasource) => ({datasource: {status: 'saving', data: datasource }}),
    [DATASOURCE_SAVE_SUCCESS]: (data) => ({datasource: {status: 'saved'}, data: data}),
    [DATASOURCE_SAVE_FAILED]: (error) => ({datasource: {status: 'save_error'}, error: error}),
    [DATASOURCE_LOAD_FAILED]: (error) => (
        { datasource: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASOURCE_INSPECT_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {inspection: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [DATASOURCE_INSPECT]: () => ({
        inspection: {
            status: 'loading',
            data: [],
        }
    }),
    [DATASOURCE_INSPECT_RESET]: () => ({inspection: {status: 'uninitialized', data: []}}),
};

export default createReducer(initialState, handlers);
