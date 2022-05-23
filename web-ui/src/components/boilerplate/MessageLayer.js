import React from "react";
import {Box, Button, Layer, Card, Text, CardHeader, CardBody, CardFooter} from "grommet";
import PropTypes from "prop-types";

export const MessageLayer = ({show, message, icon, title, buttons, bg, ...rest}) => {
    return (
        <span>
            {show && (
                <Layer animate={true} animation={'fadeIn'} modal={true} plain={false}>
                    <Card width={'large'} height={'small'} round={'small'}>
                        <CardHeader pad={'small'} background={bg}>
                            <Box fill='horizontal' direction={'row'} gap={'medium'} justify={'between'}
                                 align={'center'}>
                                <Box><Text weight={'bold'} size={'large'}>{title}</Text></Box>
                                <Box>{icon}</Box>
                            </Box>
                        </CardHeader>
                        <CardBody pad={'medium'}>{message}</CardBody>
                        <CardFooter justify={'end'} pad={'small'}>
                            {buttons.map((b) => (
                                <Button
                                    width={'dmsll'}
                                    key={`msgbtn-${b.label}`}
                                    color={b.color}
                                    icon={b.icon}
                                    label={b.label}
                                    focusIndicator={false}
                                    onClick={b.action}
                                    primary={b.primary}
                                    href={b.href}
                                />
                            ))}
                        </CardFooter>
                    </Card>
                </Layer>
            )}
        </span>
    );
};

MessageLayer.defaultProps = {
    show: false,
}

MessageLayer.propTypes = {
    show: PropTypes.bool,
    icon: PropTypes.element,
    title: PropTypes.string,
    message: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.element,
        action: PropTypes.func,
        color: PropTypes.string,
        primary: PropTypes.bool,
        href: PropTypes.string,
    }))
};
