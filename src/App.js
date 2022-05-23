import './App.css';
import React, {useEffect} from "react";
import {HeaderSideMainFooter} from "./layout/HeaderSideMainFooter";
import {hpe} from "grommet-theme-hpe";
import {Grommet} from "grommet";
import Cookies from "universal-cookie/es6";
import {useAppContext} from "./AppContext";
import {useKeycloak} from "@react-keycloak/web";


function App() {
  const app = useAppContext();
  const cookies = new Cookies();
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  const userDarkMode = (cookies.get("darkMode") === "true");
  useEffect( () => {
    if( app.darkMode !== userDarkMode) {
      app.setDarkMode(userDarkMode);
    }
  }, [userDarkMode, app]);
  const themeMode = userDarkMode ? 'dark' : 'light';

  if(!isLoggedIn) { keycloak.login() }

  return (
      <Grommet theme={hpe} themeMode={themeMode} full>
          <HeaderSideMainFooter/>
      </Grommet>
  );
}

export default App;
