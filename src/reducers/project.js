import {createReducer} from "./utils";

export const PROJECT_LOAD = 'PROJECT_LOAD';
export const PROJECT_LOAD_SUCCESS = 'PROJECT_LOAD_SUCCESS';
export const PROJECT_LOAD_FAILED = 'PROJECT_LOAD_FAILED';
export const PROJECTS_LOAD = 'PROJECTS_LOAD';
export const PROJECTS_LOAD_SUCCESS = 'PROJECTS_LOAD_SUCCESS';
export const PROJECTS_LOAD_FAILED = 'PROJECTS_LOAD_FAILED';
export const PROJECTS_RESET = 'PROJECTS_RESET';
export const PROJECT_RESET = 'PROJECT_RESET';
export const PROJECT_SAVE = 'PROJECT_SAVE';
export const PROJECT_SAVE_SUCCESS = 'PROJECT_SAVE_SUCCESS';
export const PROJECT_SAVE_FAILED = 'PROJECT_SAVE_FAILED';

const initialState = {
    projects: {
        status: 'uninitialized',
        data: []
    },
    project: {
        status: 'uninitialized',
        data: {},
    }
};

const handlers = {
    [PROJECT_LOAD]: () => ({
        project: {
            status: 'loading',
            data: {},
        }
    }),
    [PROJECT_LOAD_FAILED]: (error) => (
        { project: { status: 'error', data: { 'summary': error } }}
    ),
    [PROJECT_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {project: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [PROJECT_RESET]: () => ({project: {status: 'uninitialized', data: {}}}),

    [PROJECTS_LOAD]: () => ({
        projects: {
            status: 'loading',
            data: [],
        }
    }),
    [PROJECTS_LOAD_FAILED]: (error) => (
        { projects: { status: 'error', data: { 'summary': error } }}
    ),
    [PROJECTS_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {projects: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [PROJECTS_RESET]: () => ({projects: {status: 'uninitialized', data: []}}),
    [PROJECT_SAVE]: (project) => ({project: {status: 'saving', data: project }}),
    [PROJECT_SAVE_SUCCESS]: (data) => ({project: {status: 'saved'}, data: data}),
    [PROJECT_SAVE_FAILED]: (error) => ({project: {status: 'save_error'}, error: error}),
};

export default createReducer(initialState, handlers);
