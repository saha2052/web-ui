import React, {useEffect, useState} from "react";
import {Box, FormField, Select, Text, TextInput, Form, Button} from "grommet";
import {useDispatch, useSelector} from "react-redux";
import {loadDatasource, resetDatasource, resetDatasources, saveDatasource} from "../../services/datasource/datasource";
import {datasourceDefaults} from "../../services/datasource/objectDefs";
import {Spinning} from "grommet-controls";
import {loadPlugins, resetPlugins} from "../../services/plugin/plugin";
import {DynamicField} from "../../components/boilerplate/DynamicField";
import {DATASOURCE_SAVE_FAILED, DATASOURCE_SAVE_SUCCESS} from "../../reducers/datasource";
import store from "../../configuration/store";
import {Save, StatusWarning} from "grommet-icons";
import {navigate} from "hookrouter";
import MDEditor from "@uiw/react-md-editor";

export const DatasourceEdit = ({id = null}) => {

    const dispatch = useDispatch();

    const action = id === null ? "New" : "Edit";

    useEffect(() => {
        dispatch({
            type: 'SET_CRUMBLINE',
            payload: [{label: "Home", url: "/"}, {label: "Datasources", url: "/datasources/"}, {
                label: "Loading...",
                url: ""
            }]
        })
    }, [dispatch]);

    const datasource = useSelector(state => state.datasource.datasource.data)
    const datasourceStatus = useSelector(state => state.datasource.datasource.status)

    const plugins = useSelector(state => state.plugin.plugins.data)
    const pluginsStatus = useSelector(state => state.plugin.plugins.status)

    const [formValues, setFormValues] = React.useState(datasourceDefaults);
    const [customFields, setCustomFields] = React.useState([]);

    const [dynamicFields] = React.useState({});
    const [tmpDescription, setTmpDescription] = useState("")


    /*const [renderTags, setRenderTags] = React.useState([]);*/

    const updateDynamicFields = (id, value) => {
        dynamicFields[id] = value;
    }

    const updateDatasourceType = (e) => {
        const type = plugins.find((p) => p.plugin_name === e.value.val);
        if (type.hasOwnProperty("custom_fields")) {
            const newFields = type.custom_fields.map((field, index) => {
                    const defaultValue = field.hasOwnProperty("defaultValue") ? field.defaultValue : "";
                    if (!dynamicFields.hasOwnProperty(field.id)) {
                        dynamicFields[field.id] = defaultValue;
                    }
                    return (
                        <DynamicField fieldData={field} key={`cf_${e.value.val}_${index}`} updateFunc={updateDynamicFields}
                                      value={dynamicFields[field.id]} edit={true}/>
                    );
                }
            )
            setCustomFields(newFields);
        } else {
            setCustomFields([]);
        }

    }

/*    const addTags = (tag) => {
        if (tag.trim() !== '') {
            const newFormValues = {...formValues};
            const newTag = {id: 0, label: tag.trim()};
            newFormValues.tags.push(newTag);
            setFormValues(newFormValues);
        }
    }

    const removeTag = (removeIndex) => {
        if (removeIndex !== -1) {
            const newFormValues = {...formValues};
            newFormValues.tags.splice(removeIndex, 1);
            setFormValues(newFormValues);
        }
    }*/

    const handleSave = () => {
        const saveObject = {...formValues};
        saveObject['typeData'] = dynamicFields;
        saveObject['type'] = saveObject['plugin_id']['lab']
        saveObject['plugin_id'] = saveObject['plugin_id']['val']
        saveObject['description'] = tmpDescription;

        saveDatasource(saveObject)
            .then((obj) => {
                if (obj.type === DATASOURCE_SAVE_FAILED) {
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<StatusWarning color={'white'} size={'medium'}/>),
                            title: `Error Saving Datasource`,
                            message: (
                                <Text>Error: {obj.payload.status} {obj.payload.statusText} {obj.payload.message}</Text>),
                            color: 'status-critical',
                            timer: 10000,
                            show: true,
                        }
                    });
                    return false;
                } else if (obj.type === DATASOURCE_SAVE_SUCCESS) {
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<Save color={'white'} size={'medium'}/>),
                            title: `Save Successful`,
                            message: (<Text>{datasource.name} updated successfully</Text>),
                            color: 'status-ok',
                            timer: 3000,
                            show: true,
                        }
                    });
                    navigate(`/datasources/`);
                    return false;
                } else {
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<StatusWarning color={'white'} size={'medium'}/>),
                            title: `Error Saving Datasource`,
                            message: (<Text>An Unknown Error Occurred: {obj}</Text>),
                            color: 'status-critical',
                            timer: 10000,
                            show: true,
                        }
                    });
                    return false;
                }
            })
            .catch((err) => {
                store.dispatch({
                    type: 'SHOW_MESSAGE', dialog: {
                        icon: (<StatusWarning color={'white'} size={'medium'}/>),
                        title: `Error Saving Datasource`,
                        message: (<Text>{err}</Text>),
                        color: 'status-error',
                        timer: 10000,
                        show: true,
                    }
                });
                console.error("Error saving", err);
                return false;
            })
    }

    useEffect(() => {
        if (pluginsStatus === 'uninitialized') {
            dispatch(loadPlugins())
        }
    }, [pluginsStatus, dispatch]);

    useEffect(() => {
        const populateCustomFields = () => {
            const type = datasource.plugin
            if (type.hasOwnProperty("custom_fields")) {
                const newFields = type.custom_fields.map((field, index) => {
                    let value = "";
                    if (datasource.typeData.hasOwnProperty(field.id)) {
                        value = datasource.typeData[field.id];
                    } else {
                        value = field.hasOwnProperty("defaultValue") ? field.defaultValue : "";
                    }
                    return (
                        <DynamicField fieldData={field} key={`cf_${type}_${index}`}
                                      value={value} edit={true}/>
                    );
                })
                setCustomFields(newFields);
            } else {
                setCustomFields([]);
            }
        }

        if ((datasourceStatus === 'uninitialized') && (id !== null)) {
            dispatch(loadDatasource(id));
        }
        if ((datasourceStatus === 'loaded') && (id !== null) && (datasource.hasOwnProperty("name"))) {
            setFormValues({...datasource});
            setTmpDescription(datasource['description']);
            populateCustomFields();
            dispatch({
                type: 'SET_CRUMBLINE',
                payload: [{label: "Home", url: "/"}, {
                    label: "Datasources",
                    url: "/datasources/"
                }, {label: `Edit ${datasource.name}`, url: `/datasource/edit/${id}/`}]
            })
        }
        if (id === null) {
            dispatch({
                type: 'SET_CRUMBLINE',
                payload: [{label: "Home", url: "/"}, {
                    label: "Datasources",
                    url: "/datasources/"
                }, {label: "New Datasource", url: "/datasource/create/"}]
            })
        }
        return (() => {
            if (datasourceStatus === 'loaded') {
                dispatch(resetDatasources());
                dispatch(resetDatasource());
                dispatch(resetPlugins())
            }
        })
    }, [dispatch, datasourceStatus, datasource, id]);


    let pluginOptions = [{val: '', lab: 'Loading...'}]
    if (pluginsStatus === 'loaded') {
        pluginOptions = plugins.map((p) => {
            return {val: p['plugin_name'], lab: p['list_label']}
        })
    }

    let renderOut = <Box pad={'none'}><Spinning size={'medium'} kind={'three-bounce'} color={'brand'}/></Box>

    if (datasourceStatus === "loaded" || id === null) {

/*
        const tagsOut = formValues.tags.map((t, index) => (
            <Box key={`ds_tag_${t.id}`} round={true} pad={{horizontal: 'small', vertical: 'xsmall'}}
                 background={'background-contrast'} align={'center'} justify={'center'} direction={'row'}
                 gap={'between'} margin={'xsmall'}>
                <Box flex={true} justify='center'><Text size={'small'}>{t.label}</Text></Box>
                <Box justify='center' align={'end'} round={true} hoverIndicator={'red'} focusIndicator={false}
                     onClick={() => {
                         removeTag(index)
                     }}><FormClose size={'medium'} color={'text'}/></Box>
            </Box>
        ));
*/

        renderOut = (
            <Box>
                <Box direction={'row'} gap={'medium'} fill={'horizontal'}>
                    <Box width={'large'}>
                        <Box>
                            <FormField
                                label="Datasource Name"
                                htmlFor="name"
                                name="name"
                                required
                            >
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formValues.name}
                                />
                            </FormField>
                            <FormField
                                label="Description"
                                htmlFor="description"
                                name="description"
                                required
                            >
                                <MDEditor
                                    id={'description'}
                                    name={'description'}
                                    value={tmpDescription}
                                    onChange={setTmpDescription}
                                />
                            </FormField> <FormField
                            label="More Info URL"
                            htmlFor="infoUrl"
                            name="infoUrl"
                        >
                            <TextInput
                                id="infoUrl"
                                name="infoUrl"
                                value={formValues.infoUrl}
                            />
                        </FormField>

{/*
                            <Box gap={'small'}>
                                <FormField
                                    label="New Tag"
                                    htmlFor="Tags"
                                    name="newTag"
                                >
                                    <TextInput
                                        id="newTag"
                                        onBlur={(e) => {
                                            addTags(e.target.value);
                                            e.target.value = "";
                                        }}
                                        onChange={(e) => {
                                            if (e.target.value.slice(-1) === ',') {
                                                e.target.value = e.target.value.slice(0, -1);
                                                addTags(e.target.value);
                                                e.target.value = "";
                                            }
                                        }}
                                    />
                                </FormField>
                                <Box pad={{vertical: 'none'}} direction={'row'} wrap={true} gap={'small'}>
                                    {tagsOut}
                                </Box>
                            </Box>
*/}
                            <FormField
                                label="Datasource Type"
                                htmlFor={`plugin_id`}
                                name="plugin_id"
                                required
                            >
                                <Select
                                    id={'plugin_id'}
                                    name={'plugin_id'}
                                    options={pluginOptions}
                                    labelKey={'lab'}
                                    valueKey={'val'}
                                    value={formValues.plugin_id}
                                    onChange={updateDatasourceType}
                                    mulitple={false}
                                />
                            </FormField>
                        </Box>
                    </Box>
                    <Box width={'large'}>
                        {customFields}
                    </Box>
                </Box>
                <Box pad={{vertical: 'small'}} direction={'row'} gap={'small'}>
                    <Button size='medium' type={'submit'} primary={true} label={"Save"} fill={false} onClick={handleSave}/>
                </Box>
            </Box>
        )
    }

    return (
        <Box pad={{horizontal: 'medium'}}>
            <Box pad={{vertical: 'small', horizontal: 'none'}} direction={'row'} gap={'small'}
                 align={'center'} justify={'between'}>
                <Text size={'xlarge'} weight={'bold'}>{action} Datasource</Text>
            </Box>
            <Form
                validate="blur"
                value={formValues}
                onChange={setFormValues}
                onSubmit={({value, touched}) => handleSave({value, touched})}
            >
                <Box pad={{vertical: 'none', horizontal: 'none'}} direction={'row'} gap={'small'}
                     align={'start'} fill={'horizontal'}>
                    {renderOut}
                </Box>
            </Form>
        </Box>
    );
}
