import {navigate} from 'hookrouter';
import {Home, Scorecard, Storage} from "grommet-icons";

export const menuItems = [
    {
        id: 'mnu_home',
        label: 'Home',
        icon: <Home size={'medium'} color={'white'} />,
        onClick: () => {navigate('/')},
    },
    {
        id: 'mnu_projects',
        label: 'Projects',
        icon: <Scorecard size={'medium'} color={'white'} />,
        onClick: () => {navigate('/projects/')},
    },    {
        id: 'mnu_datasources',
        label: 'Data Sources',
        icon: <Storage size={'medium'} color={'white'} />,
        onClick: () => {navigate('/datasources/')},
    },
];