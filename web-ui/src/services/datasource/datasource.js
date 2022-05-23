import {svc_datasource_uri} from "../config";
import {get, save} from "../utils";
import store from "../../configuration/store";

import {
    DATASOURCE_INSPECT, DATASOURCE_INSPECT_FAILED, DATASOURCE_INSPECT_RESET, DATASOURCE_INSPECT_SUCCESS,
    DATASOURCE_LOAD,
    DATASOURCE_LOAD_FAILED,
    DATASOURCE_LOAD_SUCCESS,
    DATASOURCE_RESET, DATASOURCE_SAVE_FAILED, DATASOURCE_SAVE_SUCCESS,
    DATASOURCES_LOAD, DATASOURCES_LOAD_FAILED,
    DATASOURCES_LOAD_SUCCESS,
    DATASOURCES_RESET
} from "../../reducers/datasource";


export const DATASOURCE_URL = 'meta/v1alpha1/datasource/';


export function resetDatasource() {
    return {type: DATASOURCE_RESET};
}

export function resetDatasources() {
    return {type: DATASOURCES_RESET};
}

export function resetInspection() {
    return {type: DATASOURCE_INSPECT_RESET};
}


export function loadMyDatasources() {
    return () => {
        store.dispatch({type: DATASOURCES_LOAD});
        get(`${svc_datasource_uri}/${DATASOURCE_URL}`)
            .then(datasource => {
                store.dispatch(loadDatasourcesSuccess(datasource))
            })
            .catch(error => {
                console.error("Received datasource error", error);
                store.dispatch(loadDatasourcesFailure(error))
            })
    }
};

export function loadDatasourcesSuccess(datasource) {
    return {type: DATASOURCES_LOAD_SUCCESS, payload: datasource};
}

export function loadDatasourcesFailure(error) {
    return {type: DATASOURCES_LOAD_FAILED, payload: error};
}

export function loadDatasource(id) {
    return () => {
        store.dispatch({type: DATASOURCE_LOAD});
        get(`${svc_datasource_uri}/${DATASOURCE_URL}${id}/`)
            .then(datasource => {
                store.dispatch(loadDatasourceSuccess(datasource))
            })
            .catch(error => {
                console.error("Received datasource error", error);
                store.dispatch(loadDatasourceFailure(error))
            })
    }
};

export function loadDatasourceSuccess(datasource) {
    return {type: DATASOURCE_LOAD_SUCCESS, payload: datasource};
}

export function loadDatasourceFailure(error) {
    return {type: DATASOURCE_LOAD_FAILED, payload: error};
}


export function saveDatasource(datasource) {
    const {dispatch} = store;
    if (datasource.hasOwnProperty('id') && datasource.id != null) {
        console.log('updating datasource');
        return save(`${svc_datasource_uri}/${DATASOURCE_URL}${datasource.id}/`, datasource, "PUT")
            .then(datasource => dispatch(saveDatasourceSuccess(datasource)))
            .catch(error => dispatch(saveDatasourceFailure(error)))
    } else {
        console.log('creating datasource');
        return save(`${svc_datasource_uri}/${DATASOURCE_URL}`, datasource,"POST")
            .then(datasource => dispatch(saveDatasourceSuccess(datasource)))
            .catch(error => dispatch(saveDatasourceFailure(error)))
    }
}

export function saveDatasourceSuccess(datasource) {
    return {type: DATASOURCE_SAVE_SUCCESS, payload: datasource}
}

export function saveDatasourceFailure(error) {
    return {type: DATASOURCE_SAVE_FAILED, payload: error}
}


export function inspectDatasource(id) {
    return () => {
        store.dispatch({type: DATASOURCE_INSPECT});
        get(`${svc_datasource_uri}/${DATASOURCE_URL}inspect/${id}/`)
            .then(datasource => {
                store.dispatch(inspectDatasourceSuccess(datasource))
            })
            .catch(error => {
                console.error("Received datasource error", error);
                store.dispatch(inspectDatasourceFailure(error))
            })
    }
};

export function inspectDatasourceSuccess(datasource) {
    return {type: DATASOURCE_INSPECT_SUCCESS, payload: datasource}
}

export function inspectDatasourceFailure(error) {
    return {type: DATASOURCE_INSPECT_FAILED, payload: error}
}