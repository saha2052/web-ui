import {createReducer} from "./utils";

export const MEMBER_LOAD = 'MEMBER_LOAD';
export const MEMBER_LOAD_SUCCESS = 'MEMBER_LOAD_SUCCESS';
export const MEMBER_LOAD_FAILED = 'MEMBER_LOAD_FAILED';
export const MEMBERS_LOAD = 'MEMBERS_LOAD';
export const MEMBERS_LOAD_SUCCESS = 'MEMBERS_LOAD_SUCCESS';
export const MEMBERS_LOAD_FAILED = 'MEMBERS_LOAD_FAILED';
export const MEMBERS_RESET = 'MEMBERS_RESET';
export const MEMBER_RESET = 'MEMBER_RESET';
export const MEMBER_SAVE = 'MEMBER_SAVE';
export const MEMBER_SAVE_SUCCESS = 'MEMBER_SAVE_SUCCESS';
export const MEMBER_SAVE_FAILED = 'MEMBER_SAVE_FAILED';

const initialState = {
    members: {
        status: 'uninitialized',
        data: []
    },
    member: {
        status: 'uninitialized',
        data: {},
    }
};

const handlers = {
    [MEMBER_LOAD]: () => ({
        member: {
            status: 'loading',
            data: {},
        }
    }),
    [MEMBER_LOAD_FAILED]: (error) => (
        { member: { status: 'error', data: { 'summary': error } }}
    ),
    [MEMBER_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {member: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [MEMBER_RESET]: () => ({member: {status: 'uninitialized', data: {}}}),

    [MEMBERS_LOAD]: () => ({
        members: {
            status: 'loading',
            data: [],
        }
    }),
    [MEMBERS_LOAD_FAILED]: (error) => (
        { members: { status: 'error', data: { 'summary': error } }}
    ),
    [MEMBERS_LOAD_SUCCESS]: (state, action) => {
        if (!action.error) {
            action.payload.error = undefined;
            return {members: {status: 'loaded', data: action.payload}};
        }
        return {error: action.payload}
    },
    [MEMBERS_RESET]: () => ({members: {status: 'uninitialized', data: []}}),
    [MEMBER_SAVE]: (member) => ({member: {status: 'saving', data: member }}),
    [MEMBER_SAVE_SUCCESS]: (data) => ({member: {status: 'saved'}, data: data}),
    [MEMBER_SAVE_FAILED]: (error) => ({member: {status: 'save_error'}, error: error}),
};

export default createReducer(initialState, handlers);
