import PropTypes from "prop-types";

export const tagDefaults = {
    id: null,
    label: '',
};


export const tagPropTypes = PropTypes.shape(
    {
        id: PropTypes.string,
        label: PropTypes.string,
    }
);
