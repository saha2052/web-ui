import React from "react";
import {Box, ResponsiveContext} from "grommet";

export const AppContainer = ({ ...rest }) => {
    const size = React.useContext(ResponsiveContext);
    return (
        <Box
            direction={size === 'small' ? 'column-reverse' : 'row'}
            fill
            flex={true}
            margin="auto"
            width={{ max: '100%' }}
            {...rest}
        />
    );
};