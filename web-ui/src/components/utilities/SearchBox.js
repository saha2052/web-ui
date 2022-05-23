import React, {useContext, useEffect, useRef, useState} from 'react';

import {Box, Button, Keyboard, ResponsiveContext, TextInput} from "grommet";
import {Search as SearchIcon} from "grommet-icons/icons";
import styled from "styled-components";

export const SearchBox = () => {
    const StyledTextInput = styled(TextInput).attrs(() => ({
        'aria-labelledby': 'search-icon-example',
    }))``;

    const size = useContext(ResponsiveContext);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (focused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focused, setFocused]);

    return (
        <React.Fragment>
            {!focused && size === 'small' && (
                <Button
                    icon={<SearchIcon/>}
                    hoverIndicator
                    onClick={() => setFocused(true)}
                />
            )}
            {(focused || size !== 'small') && (
                <Box background="background-contrast" round="xsmall" width="medium">
                    <Keyboard onEsc={() => setFocused(false)}>
                        <StyledTextInput
                            ref={inputRef}
                            icon={<SearchIcon id="search-icon-example"/>}
                            dropHeight="small"
                            placeholder="Search Noodle"
                            onBlur={() => setFocused(false)}
                            plain
                            reverse
                        />
                    </Keyboard>
                </Box>
            )}
        </React.Fragment>
    );
}
