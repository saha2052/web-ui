import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
 url: "https://localhost:8443",
 realm: "dataspaces",
 clientId: "web-ui",
});
