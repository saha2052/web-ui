import PropTypes from "prop-types";

export const pluginDefaults = {
    plugin_name: "",
    list_label: "",
    publisher: "",
    licence: "",
    plugin_id: "",
};


export const pluginPropTypes = PropTypes.shape(
    {
        plugin_name: PropTypes.string,
        plugin_id: PropTypes.string,
        list_label: PropTypes.string,
        publisher: PropTypes.string,
        licence: PropTypes.string,
    }
);