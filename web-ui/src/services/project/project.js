import {svc_project_uri} from "../config";
import {get, save} from "../utils";
import store from "../../configuration/store";

import {
    PROJECT_LOAD,
    PROJECT_LOAD_FAILED,
    PROJECT_LOAD_SUCCESS,
    PROJECT_RESET, PROJECT_SAVE_FAILED, PROJECT_SAVE_SUCCESS,
    PROJECTS_LOAD, PROJECTS_LOAD_FAILED,
    PROJECTS_LOAD_SUCCESS,
    PROJECTS_RESET
} from "../../reducers/project";


export const PROJECT_URL = 'project/v1alpha1/project/';


export function resetProject() {
    return {type: PROJECT_RESET};
}

export function resetProjects() {
    return {type: PROJECTS_RESET};
}

export function loadMyProjects() {
    return () => {
        store.dispatch({type: PROJECTS_LOAD});
        get(`${svc_project_uri}/${PROJECT_URL}`)
            .then(project => {
                store.dispatch(loadProjectsSuccess(project))
            })
            .catch(error => {
                console.error("Received project error", error);
                store.dispatch(loadProjectsFailure(error))
            })
    }
};

export function loadProjectsSuccess(project) {
    return {type: PROJECTS_LOAD_SUCCESS, payload: project};
}

export function loadProjectsFailure(error) {
    return {type: PROJECTS_LOAD_FAILED, payload: error};
}

export function loadProject(id) {
    return () => {
        store.dispatch({type: PROJECT_LOAD});
        get(`${svc_project_uri}/${PROJECT_URL}${id}/`)
            .then(project => {
                store.dispatch(loadProjectSuccess(project))
            })
            .catch(error => {
                console.error("Received project error", error);
                store.dispatch(loadProjectFailure(error))
            })
    }
};

export function loadProjectSuccess(project) {
    return {type: PROJECT_LOAD_SUCCESS, payload: project};
}

export function loadProjectFailure(error) {
    return {type: PROJECT_LOAD_FAILED, payload: error};
}


export function saveProject(project) {
    const {dispatch} = store;
    if (project.hasOwnProperty('id') && project.id != null) {
        return save(`${svc_project_uri}/${PROJECT_URL}${project.id}/`, project, "PUT")
            .then(project => dispatch(saveProjectSuccess(project)))
            .catch(error => dispatch(saveProjectFailure(error)))
    } else {
        return save(`${svc_project_uri}/${PROJECT_URL}`, project,"POST")
            .then(project => dispatch(saveProjectSuccess(project)))
            .catch(error => dispatch(saveProjectFailure(error)))
    }
}

export function saveProjectSuccess(project) {
    return {type: PROJECT_SAVE_SUCCESS, payload: project}
}

export function saveProjectFailure(error) {
    return {type: PROJECT_SAVE_FAILED, payload: error}
}