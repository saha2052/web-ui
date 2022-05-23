import {createReducer} from "./utils";

export const DATASET_LOAD = 'DATASET_LOAD';
export const DATASET_LOAD_SUCCESS = 'DATASET_LOAD_SUCCESS';
export const DATASET_LOAD_FAILED = 'DATASET_LOAD_FAILED';
export const DATASETS_LOAD = 'DATASETS_LOAD';
export const DATASETS_LOAD_SUCCESS = 'DATASETS_LOAD_SUCCESS';
export const DATASETS_LOAD_FAILED = 'DATASETS_LOAD_FAILED';
export const DATASETS_RESET = 'DATASETS_RESET';
export const DATASET_RESET = 'DATASET_RESET';
export const DATASET_SAVE = 'DATASET_SAVE';
export const DATASET_SAVE_SUCCESS = 'DATASET_SAVE_SUCCESS';
export const DATASET_SAVE_FAILED = 'DATASET_SAVE_FAILED';
export const DATASET_INSPECT = 'DATASET_INSPECT';
export const DATASET_INSPECT_SUCCESS = 'DATASET_INSPECT_SUCCESS';
export const DATASET_INSPECT_FAILED = 'DATASET_INSPECT_FAILED';
export const DATASET_INSPECT_RESET = 'DATASET_INSPECT_RESET';
export const DATASETS_REGISTER = 'DATASETS_REGISTER';
export const DATASETS_REGISTER_SUCCESS = 'DATASETS_REGISTER_SUCCESS';
export const DATASETS_REGISTER_FAILED = 'DATASETS_REGISTER_FAILED';
export const DATASETS_REGISTER_RESET = 'DATASETS_RESET';

const initialState = {
    datasets: {
        status: 'uninitialized',
        data: []
    },
    dataset: {
        status: 'uninitialized',
        data: {},
    },
};

const handlers = {
    [DATASET_LOAD]: () => ({
        dataset: {
            status: 'loading',
            data: {},
        }
    }),
    [DATASET_LOAD_FAILED]: (error) => (
        { dataset: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASET_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {dataset: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [DATASET_RESET]: () => ({dataset: {status: 'uninitialized', data: {}}}),

    [DATASETS_LOAD]: () => ({
        datasets: {
            status: 'loading',
            data: [],
        }
    }),
    [DATASETS_LOAD_FAILED]: (error) => (
        { datasets: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASETS_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {datasets: {status: 'loaded', data: action.payload}};
        }
        console.log("err: ", action.error);
        return {error: action.payload}
    },
    [DATASETS_RESET]: () => ({datasets: {status: 'uninitialized', data: []}}),
    [DATASET_SAVE]: (dataset) => ({dataset: {status: 'saving', data: dataset }}),
    [DATASET_SAVE_SUCCESS]: (data) => ({dataset: {status: 'saved'}, data: data}),
    [DATASET_SAVE_FAILED]: (error) => ({dataset: {status: 'save_error'}, error: error}),
    [DATASET_LOAD_FAILED]: (error) => (
        { dataset: { status: 'error', data: { 'summary': error } }}
    ),
    [DATASETS_REGISTER_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {inspection: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [DATASETS_REGISTER]: () => ({
        inspection: {
            status: 'loading',
            data: [],
        }
    }),
    [DATASETS_REGISTER_RESET]: () => ({inspection: {status: 'uninitialized', data: []}}),
};

export default createReducer(initialState, handlers);
