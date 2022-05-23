import {createReducer} from "./utils";

export const TAG_LOAD = 'TAG_LOAD';
export const TAG_LOAD_SUCCESS = 'TAG_LOAD_SUCCESS';
export const TAG_LOAD_FAILED = 'TAG_LOAD_FAILED';
export const TAGS_LOAD = 'TAGS_LOAD';
export const TAGS_LOAD_SUCCESS = 'TAGS_LOAD_SUCCESS';
export const TAGS_LOAD_FAILED = 'TAGS_LOAD_FAILED';
export const TAGS_RESET = 'TAGS_RESET';
export const TAG_RESET = 'TAG_RESET';
export const TAG_SAVE = 'TAG_SAVE';
export const TAG_SAVE_SUCCESS = 'TAG_SAVE_SUCCESS';
export const TAG_SAVE_FAILED = 'TAG_SAVE_FAILED';

const initialState = {
    tags: {
        status: 'uninitialized',
        data: []
    },
    tag: {
        status: 'uninitialized',
        data: {},
    }
};

const handlers = {
    [TAG_LOAD]: () => ({
        tag: {
            status: 'loading',
            data: {},
        }
    }),
    [TAG_LOAD_FAILED]: (error) => (
        { tag: { status: 'error', data: { 'summary': error } }}
    ),
    [TAG_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {tag: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [TAG_RESET]: () => ({tag: {status: 'uninitialized', data: {}}}),

    [TAGS_LOAD]: () => ({
        tags: {
            status: 'loading',
            data: [],
        }
    }),
    [TAGS_LOAD_FAILED]: (error) => (
        { tags: { status: 'error', data: { 'summary': error } }}
    ),
    [TAGS_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {tags: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [TAGS_RESET]: () => ({tags: {status: 'uninitialized', data: []}}),
    [TAG_SAVE]: (tag) => ({tag: {status: 'saving', data: tag }}),
    [TAG_SAVE_SUCCESS]: (data) => ({tag: {status: 'saved'}, data: data}),
    [TAG_SAVE_FAILED]: (error) => ({tag: {status: 'save_error'}, error: error}),
};

export default createReducer(initialState, handlers);
