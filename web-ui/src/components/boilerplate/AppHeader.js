import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Box,
    Button, DropButton,
    Header,
    Nav,
    ResponsiveContext, Tab, Tabs,
    Text,
} from 'grommet';
import {HelpOption, Home, Hpe, Notification, Projects} from "grommet-icons";
import {useAppContext} from '../../AppContext';
import {navigate} from "hookrouter";
import {ProfileMenu} from "./ProfileMenu";

export const AppHeader = () => {
    const app = useAppContext();

    const user = app.user || {displayName: '', email: '', avatar: ''};

    const size = useContext(ResponsiveContext);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (focused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focused, setFocused]);

    const showNotifications = () => {
    };
    const targetComponent = useRef();

    return (
        <Header
            fill="horizontal"
            pad={{horizontal: 'small', vertical: 'none'}}
            background="background"
            elevation={'none'}
            border={{size: '1px', side: 'bottom', color: 'text-weak'}}
        >
            <Box>
                <Button onClick={() => navigate('/')}>
                    <Box
                        direction="row"
                        align="start"
                        gap="medium"
                        pad={{vertical: 'small'}}
                        responsive={false}
                    >
                        <Hpe size='medium' color="brand"/>
                        {(size !== 'small' || (size === 'small' && !focused)) && (
                            <Box direction="row" gap="xsmall" wrap>
                                <Text color="text-strong" weight="bold">
                                    HPE
                                </Text>
                                <Text color="text-strong">DataSpaces</Text>
                            </Box>
                        )}
                    </Box>
                </Button>
            </Box>

            <Nav id='navmain' direction="row" align={'center'} gap={'xsmall'}>
                <Button icon={(<Notification size={'medium'} color={'text'}/>)} onClick={showNotifications}/>
                <DropButton icon={(<HelpOption size={'medium'} color={'text'}/>)} dropContent={
                    <Box width={'medium'} pad={'none'}>
                        <Tabs>
                            <Tab title={(<Box width={'xxsmall'} align={'center'}>Help</Box>)}>
                                <Box pad="medium">Help</Box>
                            </Tab>
                            <Tab title={(<Box width={'xxsmall'} align={'center'}>Feedback</Box>)}>
                                <Box pad="medium">Feedback</Box>
                            </Tab>
                            <Tab title={(<Box width={'xxsmall'} align={'center'}>Legal</Box>)}>
                                <Box pad="medium">Legal</Box>
                            </Tab>
                        </Tabs>
                    </Box>
                } dropAlign={{top: 'bottom', right: 'right'}} dropTarget={targetComponent.current}/>

                <DropButton icon={(<Projects size={'medium'} color={'text'}/>)} dropContent={
                    <Box width={'medium'} pad={'none'}>
                        <Box direction={'row'} align={'center'} pad={'small'}>
                            <Box flex={true} justify={'center'}>
                                <Text weight={'bold'}>HPE GreenLake</Text>
                            </Box>
                            <Box justify={'center'}>
                                <Home size={'medium'} color={'text'}/>
                            </Box>
                        </Box>
                        <Box border={{color: 'background-back', size: '2px', side: 'top'}} gap={'xsmall'}
                             pad={{vertical: 'small'}}>
                            <Box pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'small'} color={'text-weak'}>Cloud Consoles</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>HPE GreenLake Cloud Services</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>Data Services</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>Compute Ops Manager</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>Aruba Central</Text>
                            </Box>

                        </Box>
                        <Box border={{color: 'background-back', size: '2px', side: 'top'}} gap={'xsmall'}
                             pad={{vertical: 'small'}}>
                            <Box pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'small'} color={'text-weak'}>HPE GreenLake Administration</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>Manage Workspaces</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>Manage Resources</Text>
                            </Box>
                        </Box>
                        <Box border={{color: 'background-back', size: '2px', side: 'top'}} gap={'xsmall'}
                             pad={{vertical: 'small'}}>
                            <Box pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'small'} color={'text-weak'}>HPE Resources</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>HPE Support Center</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>HPE Developer</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>HPE Communities</Text>
                            </Box>
                            <Box onClick={() => {
                                navigate('/')
                            }} focusIndicator={false} hoverIndicator={'background-back'}
                                 pad={{horizontal: 'small', vertical: 'none'}}>
                                <Text size={'medium'} color={'text'}>HPE Financial Services</Text>
                            </Box>
                        </Box>
                    </Box>
                } dropAlign={{top: 'bottom', right: 'right'}} dropTarget={targetComponent.current}/>
                <DropButton
                    ref={targetComponent}
                    dropAlign={{top: 'bottom', right: 'right'}}
                    label={<Text weight={'bold'}>{user.displayName}</Text>}
                    reverse={true}
                    icon={
                        <Avatar size={'medium'} background='brand'
                                src={user.avatar || '/no-user.png'}/>
                    }
                    dropContent={
                        <ProfileMenu user={user}/>
                    }
                />
            </Nav>
        </Header>
    );
};