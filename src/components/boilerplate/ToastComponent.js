import React, {useEffect} from "react";
import {Box, Layer, Text} from "grommet";
import PropTypes from "prop-types";
import {Close} from "grommet-icons";
import {useDispatch} from "react-redux";

export const ToastComponent = ({show, color, message, icon, title, timer, ...rest}) => {
    const closeMessage = () => { return {type: 'CLOSE_MESSAGE'} }

    const dispatch = useDispatch();
    const closeDialog = () => {
        dispatch(closeMessage());
    }

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                dispatch(closeMessage());
            }, timer);
        }
    }, [timer, dispatch]);

    return (
        <span>
            {show && (
                <Layer animate={true} animation={'fadeIn'} modal={false} plain={true} position={'top-right'}
                       background={'transparent'} margin={'medium'}>
                    <Box background={color} width={'medium'} direction={'row'} gap={'none'} justify={'start'}
                         align={'center'} round={'small'} elevation={'medium'}>
                        <Box width={'xsmall'} align={'center'} justify={'center'}>
                            {icon}
                        </Box>
                        <Box flex={true} pad={{horizontal: 'small', top: 'small', bottom: 'medium'}}
                             background={'white'} fill round={{size: 'small', corner: 'right'}} focusIndicator={false}
                             hoverIndicator={false}>
                            <Box align={'end'} focusIndicator={false} hoverIndicator={'white'}
                                 onClick={() => closeDialog()}><Close size={'small'} color={'dark-5'}/></Box>
                            <Box><Text weight={'bold'} size={'medium'}>{title}</Text></Box>
                            <Box><Text weight={'normal'} size={'medium'}>{message}</Text></Box>
                        </Box>
                    </Box>
                </Layer>
            )}
        </span>
    );
};

ToastComponent.defaultProps = {
    show: false,
}

ToastComponent.propTypes = {
    show: PropTypes.bool,
    icon: PropTypes.element,
    title: PropTypes.string,
    message: PropTypes.object,
};
