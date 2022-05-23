import {svc_datasource_uri} from "../config";
import {get, save} from "../utils";
import store from "../../configuration/store";

import {apiRequest} from "../../configuration/msalConfig";
import {
    TAG_LOAD,
    TAG_LOAD_FAILED,
    TAG_LOAD_SUCCESS,
    TAG_RESET, TAG_SAVE_FAILED, TAG_SAVE_SUCCESS,
    TAGS_LOAD, TAGS_LOAD_FAILED,
    TAGS_LOAD_SUCCESS,
    TAGS_RESET
} from "../../reducers/tag";


export const TAG_URL = 'meta/v1alpha1/tag/';


export function resetTag() {
    return {type: TAG_RESET};
}

export function resetTags() {
    return {type: TAGS_RESET};
}

export function loadMyTags(instance, account) {
    return () => {
        store.dispatch({type: TAGS_LOAD});
        const tagRequest = {
            ...apiRequest,
            account: account
        };
        get(`${svc_datasource_uri}/${TAG_URL}`, instance, account, tagRequest)
            .then(tag => {
                store.dispatch(loadTagsSuccess(tag))
            })
            .catch(error => {
                console.error("Received tag error", error);
                store.dispatch(loadTagsFailure(error))
            })
    }
};

export function loadTagsSuccess(tag) {
    return {type: TAGS_LOAD_SUCCESS, payload: tag};
}

export function loadTagsFailure(error) {
    return {type: TAGS_LOAD_FAILED, payload: error};
}

export function loadTag(instance, account, id) {
    return () => {
        store.dispatch({type: TAG_LOAD});
        const tagRequest = {
            ...apiRequest,
            account: account
        };
        get(`${svc_datasource_uri}/${TAG_URL}${id}/`, instance, account, tagRequest)
            .then(tag => {
                store.dispatch(loadTagSuccess(tag))
            })
            .catch(error => {
                console.error("Received tag error", error);
                store.dispatch(loadTagFailure(error))
            })
    }
};

export function loadTagSuccess(tag) {
    return {type: TAG_LOAD_SUCCESS, payload: tag};
}

export function loadTagFailure(error) {
    return {type: TAG_LOAD_FAILED, payload: error};
}


export function saveTag(instance, account, tag, imageFile = null) {
    const {dispatch} = store;
    const tagRequest = {
        ...apiRequest,
        account: account
    };
    if (tag.hasOwnProperty('id') && tag.id != null) {
        console.log('updating tag');
        return save(`${svc_datasource_uri}/${TAG_URL}${tag.id}/`, instance, account, tagRequest, tag, "PUT", imageFile)
            .then(tag => dispatch(saveTagSuccess(tag)))
            .catch(error => dispatch(saveTagFailure(error)))
    } else {
        console.log('creating tag');
        return save(`${svc_datasource_uri}/${TAG_URL}/`, instance, account, tagRequest, tag,"POST", imageFile)
            .then(tag => dispatch(saveTagSuccess(tag)))
            .catch(error => dispatch(saveTagFailure(error)))
    }
}

export function saveTagSuccess(tag) {
    return {type: TAG_SAVE_SUCCESS, payload: tag}
}

export function saveTagFailure(error) {
    return {type: TAG_SAVE_FAILED, payload: error}
}