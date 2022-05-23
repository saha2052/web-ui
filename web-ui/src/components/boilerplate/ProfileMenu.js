import {Box, Button, CheckBox, Text} from "grommet";
import {Logout, Moon, Sun} from "grommet-icons";
import {navigate} from "hookrouter";
import React from "react";
import Cookies from "universal-cookie/es6";
import {useAppContext} from "../../AppContext";
import {useKeycloak} from "@react-keycloak/web";

export const ProfileMenu = ({user}) => {

    const app = useAppContext();
    const cookies = new Cookies();
    const {keycloak} = useKeycloak();

    const toggleDarkMode = () => {
        if (!app.darkMode) {
            cookies.set('darkMode', true, {path: '/'});
            app.setDarkMode(true)
        } else {
            cookies.set('darkMode', false, {path: '/'});
            app.setDarkMode(false)
        }
    }

    return (
        <Box width={'medium'}>
            <Box direction={'row'} align={'center'} pad={'small'}>
                <Box flex={true}>
                    <Text weight={'bold'} size={'large'}>{user.displayName}</Text>
                    <Text size={'small'}>{user.email}</Text>
                </Box>
                <Box direction='row' gap='small' onClick={() => {
                    keycloak.logout();
                }}><Logout/></Box>
            </Box>
            <Box border={{color: 'background-back', size: '2px', side: 'top'}} gap={'none'}
                 pad={{vertical: 'small'}}>
                <Box align='center' direction='row' justify={'between'} onClick={() => {
                    toggleDarkMode()
                }} focusIndicator={false} hoverIndicator={'background-back'}
                     pad={{horizontal: 'small'}}>
                    <Box direction={'row'} gap={'small'}>
                        <Text size={'medium'}
                              color={'text'}>{app.darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
                        {app.darkMode ? <Sun/> : <Moon/>}
                    </Box>
                    <CheckBox toggle={true} checked={app.darkMode}/>
                </Box>
                <Box onClick={() => {
                    navigate('/profile')
                }} focusIndicator={false} hoverIndicator={'background-back'}
                     pad={{horizontal: 'small', vertical: 'xsmall'}}> <Text size={'medium'}
                                                                            color={'text'}>Profile</Text></Box>
                <Box onClick={() => {
                    navigate('/tenants')
                }} focusIndicator={false} hoverIndicator={'background-back'}
                     pad={{horizontal: 'small', vertical: 'xsmall'}}>
                    <Text size={'medium'} color={'text'}>My Tenants</Text>
                </Box>
                <Box onClick={() => {
                    navigate('/profile')
                }} focusIndicator={false} hoverIndicator={'background-back'}
                     pad={{horizontal: 'small', vertical: 'xsmall'}}>
                    <Text size={'medium'} color={'text'}>Preferences & Settings</Text>
                </Box>
                <Box onClick={() => {
                    navigate('https://hpe.com')
                }} focusIndicator={false} hoverIndicator={'background-back'}
                     pad={{horizontal: 'small', vertical: 'xsmall'}}>
                    <Text size={'medium'} color={'text'}>Visit hpe.com
                    </Text></Box>
                <Box pad={{horizontal: 'small', vertical: 'xsmall'}} align={'center'}>
                    <Button fill={'horizontal'} primary={true} label={'Launch HPE GreenLake'}/>
                </Box>
            </Box>
        </Box>
    );
}