import PropTypes from "prop-types";

export const datasourceDefaults = {
    name: "",
    description: "",
    infoUrl: "",
    type: "",
    plugin_id: "",
    tags: [],
    environment_id: null,
    data_sets: []
};


export const datasourcePropTypes = PropTypes.shape(
    {
        name: PropTypes.string,
        description: PropTypes.string,
        infoUrl: PropTypes.string,
        type: PropTypes.string,
        plugin_id: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        environment_id: PropTypes.string,
        data_sets: PropTypes.arrayOf(PropTypes.object)
    }
);