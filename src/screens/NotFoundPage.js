import React from 'react';
import {Box, Text} from "grommet";

export const NotFoundPage = () => {

    return (
        <Box>
            <Box pad={{vertical: 'medium', horizontal: 'small'}} direction={'row'} gap={'small'} align={'center'}>
                <Text size={'xxlarge'} weight={'bold'}>There's nothing here...</Text>
            </Box>
        </Box>
    )
}
