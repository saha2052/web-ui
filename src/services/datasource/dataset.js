import {svc_datasource_uri} from "../config";
import {get, save} from "../utils";
import store from "../../configuration/store";

import {
    DATASET_INSPECT, DATASET_INSPECT_FAILED, DATASET_INSPECT_RESET, DATASET_INSPECT_SUCCESS,
    DATASET_LOAD,
    DATASET_LOAD_FAILED,
    DATASET_LOAD_SUCCESS,
    DATASET_RESET, DATASET_SAVE_FAILED, DATASET_SAVE_SUCCESS,
    DATASETS_LOAD, DATASETS_LOAD_FAILED,
    DATASETS_LOAD_SUCCESS,
    DATASETS_RESET,
    DATASETS_REGISTER_SUCCESS, DATASETS_REGISTER_FAILED, DATASETS_REGISTER
} from "../../reducers/dataset";


export const DATASET_URL = 'meta/v1alpha1/dataset/';


export function resetDataset() {
    return {type: DATASET_RESET};
}

export function resetDatasets() {
    return {type: DATASETS_RESET};
}

export function resetInspection() {
    return {type: DATASET_INSPECT_RESET};
}


export function loadMyDatasets() {
    return () => {
        store.dispatch({type: DATASETS_LOAD});
        get(`${svc_datasource_uri}/${DATASET_URL}`)
            .then(dataset => {
                store.dispatch(loadDatasetsSuccess(dataset))
            })
            .catch(error => {
                console.error("Received dataset error", error);
                store.dispatch(loadDatasetsFailure(error))
            })
    }
};

export function loadDatasetsSuccess(dataset) {
    return {type: DATASETS_LOAD_SUCCESS, payload: dataset};
}

export function loadDatasetsFailure(error) {
    return {type: DATASETS_LOAD_FAILED, payload: error};
}

export function loadDataset(id) {
    return () => {
        store.dispatch({type: DATASET_LOAD});
        get(`${svc_datasource_uri}/${DATASET_URL}${id}/`)
            .then(dataset => {
                store.dispatch(loadDatasetSuccess(dataset))
            })
            .catch(error => {
                console.error("Received dataset error", error);
                store.dispatch(loadDatasetFailure(error))
            })
    }
};

export function loadDatasetSuccess(dataset) {
    return {type: DATASET_LOAD_SUCCESS, payload: dataset};
}

export function loadDatasetFailure(error) {
    return {type: DATASET_LOAD_FAILED, payload: error};
}


export function saveDataset(dataset) {
    const {dispatch} = store;
    if (dataset.hasOwnProperty('id') && dataset.id != null) {
        console.log('updating dataset');
        return save(`${svc_datasource_uri}/${DATASET_URL}${dataset.id}/`, dataset, "PUT")
            .then(dataset => dispatch(saveDatasetSuccess(dataset)))
            .catch(error => dispatch(saveDatasetFailure(error)))
    } else {
        console.log('creating dataset');
        return save(`${svc_datasource_uri}/${DATASET_URL}`, dataset, "POST")
            .then(dataset => dispatch(saveDatasetSuccess(dataset)))
            .catch(error => dispatch(saveDatasetFailure(error)))
    }
}

export function saveDatasetSuccess(dataset) {
    return {type: DATASET_SAVE_SUCCESS, payload: dataset}
}

export function saveDatasetFailure(error) {
    return {type: DATASET_SAVE_FAILED, payload: error}
}


export function inspectDataset(id) {
    return () => {
        store.dispatch({type: DATASET_INSPECT});
        get(`${svc_datasource_uri}/${DATASET_URL}inspect/${id}/`)
            .then(dataset => {
                store.dispatch(inspectDatasetSuccess(dataset))
            })
            .catch(error => {
                console.error("Received dataset error", error);
                store.dispatch(inspectDatasetFailure(error))
            })
    }
};

export function inspectDatasetSuccess(dataset) {
    return {type: DATASET_INSPECT_SUCCESS, payload: dataset}
}

export function inspectDatasetFailure(error) {
    return {type: DATASET_INSPECT_FAILED, payload: error}
}

export function registerDatasets(datasets) {
    store.dispatch({type: DATASETS_REGISTER});
    return save(`${svc_datasource_uri}/${DATASET_URL}register/`, datasets, 'POST')
        .then(dataset => {store.dispatch(registerDatasetsSuccess(dataset))})
        .catch(error => {store.dispatch(registerDatasetsFailure(error))})
}

export function registerDatasetsSuccess(dataset) {
    console.log("dataset", dataset);
    return {type: DATASETS_REGISTER_SUCCESS, payload: dataset};
}

export function registerDatasetsFailure(error) {
    return {type: DATASETS_REGISTER_FAILED, payload: error};
}
