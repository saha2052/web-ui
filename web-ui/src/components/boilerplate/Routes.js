import React from "react";

import {Dashboard} from "../../screens/Dashboard";
import {NotFoundPage} from "../../screens/NotFoundPage";
import {Projects} from "../../screens/Projects/Projects";
import {ProjectDetail} from "../../screens/Projects/ProjectDetail";
import {ProjectEdit} from "../../screens/Projects/ProjectEdit";
import {Datasources} from "../../screens/Datasources/Datasources";
import {DatasourceEdit} from "../../screens/Datasources/DatasourceEdit";
import {DataSetList} from "../../screens/DataSets/DataSetList";
import {DatasourceDetail} from "../../screens/Datasources/DatasourceDetail";
import {ProjectWizard} from "../../screens/Projects/ProjectWizard";

export const routes = {
    '/': () => <Dashboard />,
    '/projects/': () => <Projects />,
    '/project/detail/:id/': ({id}) => <ProjectDetail id={id} />,
    '/project/create/': () => <ProjectWizard />,
    '/project/edit/:id/': ({id}) => <ProjectEdit id={id} />,
    '/project/datasets/:id/': ({id}) => <DataSetList projectId={id} />,
    '/datasources/': () => <Datasources />,
    '/datasource/detail/:id/': ({id}) => <DatasourceDetail id={id} />,
    '/datasource/create/:type/': ({type}) => <DatasourceEdit id={null} type={type} />,
    '/datasource/create/': () => <DatasourceEdit id={null} type={null} />,
    '/datasource/edit/:id/': ({id}) => <DatasourceEdit id={id} />,
    '*': () => <NotFoundPage />,
};
