import {svc_datasource_uri} from "../config";
import {get} from "../utils";
import store from "../../configuration/store";

import plugin, {
    PLUGIN_LOAD,
    PLUGIN_LOAD_FAILED,
    PLUGIN_LOAD_SUCCESS,
    PLUGIN_RESET,
    PLUGINS_LOAD, PLUGINS_LOAD_FAILED,
    PLUGINS_LOAD_SUCCESS,
    PLUGINS_RESET
} from "../../reducers/plugin";


export const PLUGIN_URL = 'meta/v1alpha1/plugins/';


export function resetPlugin() {
    return {type: PLUGIN_RESET};
}

export function resetPlugins() {
    return {type: PLUGINS_RESET};
}

export function loadPlugins(pluginType= null) {
    return () => {
        store.dispatch({type: PLUGINS_LOAD});
        const pluginUrl = typeof pluginType === 'string' ? `${PLUGIN_URL}${pluginType.toLowerCase()}/` : PLUGIN_URL
        get(`${svc_datasource_uri}/${pluginUrl}`)
            .then(plugin => {
                store.dispatch(loadPluginsSuccess(plugin))
            })
            .catch(error => {
                console.error("Received plugin error", error);
                store.dispatch(loadPluginsFailure(error))
            })
    }
};

export function loadPluginsSuccess(plugin) {
    return {type: PLUGINS_LOAD_SUCCESS, payload: plugin};
}

export function loadPluginsFailure(error) {
    return {type: PLUGINS_LOAD_FAILED, payload: error};
}

export function loadPlugin(id) {
    return () => {
        store.dispatch({type: PLUGIN_LOAD});
        get(`${svc_datasource_uri}/${PLUGIN_URL}${id}/`)
            .then(plugin => {
                store.dispatch(loadPluginSuccess(plugin))
            })
            .catch(error => {
                console.error("Received plugin error", error);
                store.dispatch(loadPluginFailure(error))
            })
    }
};

export function loadPluginSuccess(plugin) {
    return {type: PLUGIN_LOAD_SUCCESS, payload: plugin};
}

export function loadPluginFailure(error) {
    return {type: PLUGIN_LOAD_FAILED, payload: error};
}
