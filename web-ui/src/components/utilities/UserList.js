import React from "react";
import {Box, Text} from "grommet";
import {FormClose} from "grommet-icons";

export const UserList = ({members, removeMemberFunc}) => {
     const membersOut = members.map((pm, index) => (
            <Box key={`prj_mbr_${pm.id}`} round={true} pad={{horizontal: 'small', vertical: 'xsmall'}}
                 background={'background-contrast'} align={'center'} justify={'center'} direction={'row'}
                 gap={'between'} margin={'xsmall'}>
                <Box flex={true} justify='center'><Text size={'small'}>{pm.email}</Text></Box>
                <Box justify='center' align={'end'} round={true} hoverIndicator={'red'} focusIndicator={false}
                     onClick={() => {
                         removeMemberFunc(index)
                     }}><FormClose size={'medium'} color={'text'}/></Box>
            </Box>
        ));

    return (
        <Box>Members are: {membersOut}</Box>
    )
}