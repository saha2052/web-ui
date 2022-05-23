import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {keycloak} from "./configuration/keycloak"
import {ProvideAppContext} from "./AppContext";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import store from "./configuration/store";
import {Box} from "grommet";

ReactDOM.render(
    <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Box pad='medium' fill={true} align={'center'} justify={'center'}>Loading DataSpaces...</Box>}>
        <Provider store={store}>
            <ProvideAppContext>
                <App/>
            </ProvideAppContext>
        </Provider>
    </ReactKeycloakProvider>,
document.getElementById('root')
)
;

reportWebVitals();
