import React, {useState} from "react";
import {Box, FormField, Text, TextInput} from "grommet";
import {FormView, FormViewHide} from "grommet-icons";

export const DynamicField = ({fieldData, updateFunc, value, edit = false}) => {
    let field = "";

    const [fieldValue, setFieldValue] = useState(value);
    const [viewSecret, setViewSecret] = useState(false);

    const updateField = (value) => {
        setFieldValue(value);
        updateFunc(fieldData.id, value)
    }

    const toggleSecret = () => {
        setViewSecret(!viewSecret);
    }

    switch (fieldData.type) {
        case "text":
            if (edit) {
                field = (
                    <FormField
                        label={fieldData.label}
                        htmlFor={fieldData.id}
                        required={fieldData.required}
                    >
                        <TextInput
                            id={fieldData.id}
                            type="text"
                            value={fieldValue}
                            onChange={(e) => updateField(e.target.value)}
                        />
                    </FormField>
                )
            } else {
                field = (
                    <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                         pad={{horizontal: 'small'}}>
                        <Box>{fieldData.label}</Box>
                        <Box><Text weight={'bold'}>{fieldValue}</Text></Box>
                    </Box>
                )
            }
            break;
        case "number":
            if (edit) {
                field = (
                    <FormField
                        label={fieldData.label}
                        htmlFor={fieldData.id}
                        required={fieldData.required}
                    >
                        <TextInput
                            id={fieldData.id}
                            type="number"
                            min={fieldData.min}
                            max={fieldData.max}
                            value={fieldValue}
                            onChange={(e) => updateField(e.target.value)}
                        />
                    </FormField>
                )
            } else {
                field = (
                    <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                         pad={{horizontal: 'small'}}>
                        <Box>{fieldData.label}</Box>
                        <Box><Text weight={'bold'}>{fieldValue}</Text></Box>
                    </Box>
                )
            }
            break;
        case "secret":
            if (edit) {
                field = (
                    <FormField
                        label={fieldData.label}
                        htmlFor={fieldData.id}
                        required={fieldData.required}
                    >
                        <Box direction={'row'} align={'center'} justify={'between'}>
                            <TextInput
                                id={fieldData.id}
                                type={viewSecret ? 'text' : 'password'}
                                value={fieldValue}
                                onChange={(e) => updateField(e.target.value)}
                                plain
                            />
                            <Box pad={{horizontal: 'small'}}>
                                {viewSecret ?
                                    <FormView size={'medium'} color={'text-weak'} onClick={toggleSecret}/> :
                                    <FormViewHide size={'medium'} color={'text-weak'} onClick={toggleSecret}/>
                                }
                            </Box>
                        </Box>
                    </FormField>
                )
            } else {
                field = (
                    <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                         pad={{horizontal: 'small'}}>
                        <Box>{fieldData.label}</Box>
                        <Box direction={'row'} gap={'small'}>
                            <Text weight={'bold'}>{viewSecret ? fieldValue : "********"}</Text>
                            {viewSecret ?
                                <FormView size={'medium'} color={'text-weak'} onClick={toggleSecret}/> :
                                <FormViewHide size={'medium'} color={'text-weak'} onClick={toggleSecret}/>
                            }
                        </Box>
                    </Box>
                )
            }
            break;
        default:
            break;
    }
    return (
        <Box>{field}</Box>
    )
}