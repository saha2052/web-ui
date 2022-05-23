import React from 'react';
import {Box, Main} from 'grommet';
import {AppContainer} from "../components/boilerplate/AppContainer";
import {AppHeader} from "../components/boilerplate/AppHeader";
import {AppFooter} from "../components/boilerplate/AppFooter";
import {useRoutes} from "hookrouter";
import {routes} from "../components/boilerplate/Routes";
import {NotFoundPage} from "../screens/NotFoundPage";
import {Crumbline} from "../components/boilerplate/Crumbline";
import {ToastComponent} from "../components/boilerplate/ToastComponent";
import {useSelector} from "react-redux";

export const HeaderMainFooter = () => {

    const routeResult = useRoutes(routes);
    const dialog = useSelector(state => state.dialog.dialog);

    return (
        <AppContainer>
            <Box flex overflow="auto" background={'background'}>
                <Box height={{min: '100%'}} fill={true} flex={true}>
                    <AppHeader/>
                    <Crumbline />
                    <ToastComponent show={dialog.show} color={dialog.color} icon={dialog.icon}
                                    message={dialog.message} timer={dialog.timer} title={dialog.title}/>
                    <Main
                        flex={true}
                        pad={{vertical: 'none', horizontal: 'none'}}
                    >
                        {routeResult || <NotFoundPage/>}
                    </Main>
                    <AppFooter/>
                </Box>
            </Box>
        </AppContainer>
    )
};