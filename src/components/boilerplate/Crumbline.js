import React from "react";
import {Box, Text} from "grommet";
import {navigate} from "hookrouter";
import {CaretRightFill} from "grommet-icons";
import {useSelector} from "react-redux";

export const Crumbline = () => {

    const {crumbline} = useSelector(state => state.crumbline)

    const crumblineOut = crumbline.map((cl, index) => {
        const textCol = index < crumbline.length - 1 ? 'text-weak' : 'text';
        const separatorOut = index < crumbline.length - 1 ? <CaretRightFill size={'medium'} color={'text-weak'}/> : "";

        return (
            <Box direction={'row'} align={'center'} justify={'center'} key={`crmb_${index}`}>
                <Box pad={'small'} onClick={() => navigate(cl.url)} focusIndicator={false}
                     hoverIndicator={'background-contrast'}>
                    <Text color={textCol} weight={'bold'}>{cl.label}</Text>
                </Box>
                <Box align={'center'}>{separatorOut}</Box>
            </Box>
        )
    })
    return (
        <Box direction={'row'} gap={'none'} pad={{horizontal: 'small'}}>
            {crumblineOut}
        </Box>
    )
}