import React, {useState} from 'react';
import {
    Box, Main
} from 'grommet';
import {AppContainer} from "../components/boilerplate/AppContainer";
import {AppHeader} from "../components/boilerplate/AppHeader";
import {AppFooter} from "../components/boilerplate/AppFooter";
import {useRoutes} from "hookrouter";
import {routes} from "../components/boilerplate/Routes";
import {AppSidebar} from "../components/boilerplate/AppSidebar";
import {ToastComponent} from "../components/boilerplate/ToastComponent";
import {useSelector} from "react-redux";

export const HeaderSideMainFooter = () => {

    const routeResult = useRoutes(routes);
    const [showFooter] = useState(false);
    const dialog = useSelector(state => state.dialog.dialog);

    return (
        <AppContainer>
            <AppSidebar />
            <Box flex overflow="auto" background={'background'}>
                <Box height={{min: '100%'}} fill={true} flex={true}>
                    <AppHeader/>
                    <Main
                        flex={true}
                        pad="small"
                    >
                        {routeResult}
                    </Main>
                    <ToastComponent show={dialog.show} color={dialog.color} icon={dialog.icon}
                                    message={dialog.message} timer={dialog.timer} title={dialog.title}/>
                    {showFooter ? <AppFooter/> : null}
                </Box>
            </Box>
        </AppContainer>
    )
};