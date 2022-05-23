import React from 'react';
import {Box, Button, Main, Text} from "grommet";
import {AppContainer} from "../components/boilerplate/AppContainer";
import {useAppContext} from "../AppContext";
import {useKeycloak} from "@react-keycloak/web";

export const Login = () => {

    const app = useAppContext();
    const keycloak = useKeycloak();

    return (
        <AppContainer>
            <Box flex fill overflow="auto"  background={{ image: 'url("/login_back01.jpg")' }}>
                <Box height={{min: '100%'}} fill={true} flex={true}>
                    <Main
                        flex={true}
                        pad="small"
                    >
                        <Box fill={true}>
                            <Box direction={'column'} fill={true} gap={'small'} align={'start'} justify={'center'} pad={{ left: '10%', bottom: '12%'}}>
                                <Text size={'xxlarge'} color='white'>Welcome to <b>HPE DataSpaces</b></Text>
                                <Button plain focusIndicator={false}>
                                    <Box pad={{horizontal: 'medium', vertical: 'small'}} background={'brand'} round={'3px'}
                                         focusIndicator={false}
                                         onClick={() => {keycloak.login()}} hoverIndicator={'green'}>
                                        <Text weight='bold' size={'14pt'} color={'white'}>Login</Text></Box></Button></Box>

                        </Box>
                    </Main>
                </Box>
            </Box>
        </AppContainer>
    )
}


