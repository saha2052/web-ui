const apiProjectMethod = window._env_.REACT_APP_API_PROJECT_METHOD;
const apiProjectHost = window._env_.REACT_APP_API_PROJECT_HOST;
const apiProjectPort = window._env_.REACT_APP_API_PROJECT_PORT;

const apiDatasourceMethod = window._env_.REACT_APP_API_DATASOURCE_METHOD;
const apiDatasourceHost = window._env_.REACT_APP_API_DATASOURCE_HOST;
const apiDatasourcePort = window._env_.REACT_APP_API_DATASOURCE_PORT;


module.exports = {
    svc_project_uri: `${apiProjectMethod}://${apiProjectHost}:${apiProjectPort}`,
    svc_datasource_uri: `${apiDatasourceMethod}://${apiDatasourceHost}:${apiDatasourcePort}`,
};
