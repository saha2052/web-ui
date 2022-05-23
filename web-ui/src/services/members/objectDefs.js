import PropTypes from "prop-types";

export const projectDefaults = {
    name: '',
    status: '',
    description: '',
    project_image: '',
    volume_info: {},
    datasets: [],
    members: []
};


export const projectPropTypes = PropTypes.shape(
    {
        name: PropTypes.string,
        status: PropTypes.string,
        description: PropTypes.string,
        project_image: PropTypes.string,
        volume_info: PropTypes.object,
        datasets: PropTypes.arrayOf(PropTypes.object),
        members: PropTypes.arrayOf(PropTypes.object),
    }
);
