const signInAuthority = window._env_.REACT_APP_TENANT;
const applicationID = window._env_.REACT_APP_APPLICATIONID;
const redirectUri = window._env_.REACT_APP_REDIRECTURI;

// Msal Configurations

export const loginRequest = {
    scopes: [
        "openid",
        'User.read',
        'User.ReadBasic.All',
        'mailboxsettings.read',
        'api://hpe-dataspaces/Projects.Read',
    ]
};

export const userListRequest = {
    scopes: [
        "openid",
        'User.Read',
        'User.ReadBasic.All',
        'mailboxsettings.read',
    ]
}

export const apiRequest = {
    scopes: [
        "openid",
        'User.read',
        'User.ReadBasic.All',
        "api://hpe-dataspaces/Projects.Read",
    ]
};

export const msalConfig = {
    auth: {
        clientId: applicationID,
        authority: signInAuthority,
        redirectUri: redirectUri,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
}

