import {createReducer} from "./utils";
import {Text} from "grommet";

const initialState = {
    dialog: {
        show: false,
        title: '',
        message: (<Text></Text>),
        icon: null,
        color: 'status-info',
        timer: 0,
    },
};

const handlers = {
    'CLOSE_MESSAGE': () => (initialState),
    'SHOW_MESSAGE': (state, action) => {
        return {
            dialog: {
                show: true,
                title: action.dialog.title,
                message: action.dialog.message,
                icon: action.dialog.icon,
                color: action.dialog.color,
                timer: action.dialog.timer,
            }
        };
    },
};

export default createReducer(initialState, handlers);
