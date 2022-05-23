import React, {useContext, useState} from 'react';
import {Box, Button, ResponsiveContext, Sidebar, Text} from "grommet";
import {Menu} from "grommet-icons";
import {menuItems} from "./menuItems";

export const AppSidebar = () => {
    const size = useContext(ResponsiveContext);
    const [collapsed, setCollapsed] = useState(true);
    const navOut = menuItems.map((m, index) => (
        <Box key={`mnu_${index}`} direction={'row'} align={"center"}>
            <Button key={m.id} icon={m.icon} onClick={m.onClick}/>
            {!collapsed ? <Box pad={{right: 'small'}}><Text weight={'bold'} color={'text-strong'}>{m.label}</Text></Box> : ""}
        </Box>
    ))
    return (
        <Sidebar
            direction={size !== 'small' ? 'column' : 'row'}
            flex={false}
            height={size !== 'small' ? {min: '100%'} : undefined}
            pad="small"
            background="#263040"
            align={'center'}
            header={<Box fill='horizontal' align='start' pad={{left: 'small', top: 'xsmall'}} focusIndicator={false}
                         onClick={() => setCollapsed(!collapsed)}><Menu size={'medium'} color={'white'}/></Box>}
        >

            <Box gap={'medium'}>
                {navOut}
            </Box>
        </Sidebar>
    );
};