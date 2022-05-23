import React, {useEffect} from "react";
import {Box, Text, Anchor, Image, CheckBox, Button} from "grommet";
import {useDispatch, useSelector} from "react-redux";
import {
    inspectDatasource,
    loadDatasource, resetDatasource,
    resetDatasources,
    resetInspection
} from "../../services/datasource/datasource";
import {Spinning} from "grommet-controls";
import {DynamicField} from "../../components/boilerplate/DynamicField";
import {Alert, Save, StatusWarning, Update} from "grommet-icons";
import store from "../../configuration/store";
import {registerDatasets} from "../../services/datasource/dataset";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {sizeLabel} from "../../components/utilities/SizeLabel";

export const DatasourceDetail = ({id = null}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'SET_CRUMBLINE',
            payload: [{label: "Home", url: "/"}, {label: "Datasources", url: "/datasources/"}, {
                label: "Loading...",
                url: ""
            }]
        })
        return (() => {
            dispatch(resetDatasources());
            dispatch(resetDatasource());
            dispatch(resetInspection());
        })
    }, [dispatch]);

    const datasource = useSelector(state => state.datasource.datasource.data)
    const datasourceStatus = useSelector(state => state.datasource.datasource.status)
    const inspection = useSelector(state => state.datasource.inspection.data)
    const inspectionStatus = useSelector(state => state.datasource.inspection.status)

    const [customFields, setCustomFields] = React.useState([]);

    const [selectedDataSets, setSelectedDataSets] = React.useState([]);

    const handleRegister = () => {
        registerDatasets(selectedDataSets)
            .then((obj) => {
                store.dispatch({
                    type: 'SHOW_MESSAGE', dialog: {
                        icon: (<Save color={'white'} size={'medium'}/>),
                        title: `Data Set Registration Successful`,
                        message: (<Text>{datasource.name} registered data sets successfully</Text>),
                        color: 'status-ok',
                        timer: 3000,
                        show: true,
                    }
                });
                dispatch(resetInspection());
                dispatch(resetDatasource());
                return false;
            })
            .catch((err) => {
                store.dispatch({
                    type: 'SHOW_MESSAGE', dialog: {
                        icon: (<StatusWarning color={'white'} size={'medium'}/>),
                        title: `Error Registering Data Sets`,
                        message: (<Text>{err}</Text>),
                        color: 'status-error',
                        timer: 10000,
                        show: true,
                    }
                });
                console.error("Error registering", err);
                return false;
            })
    }

    useEffect(() => {
        if ((datasourceStatus === 'uninitialized') && (id !== null)) {
            dispatch(loadDatasource(id));
        }
        if ((datasourceStatus === 'loaded') && (id !== null) && (datasource.hasOwnProperty("name"))) {
            dispatch({
                type: 'SET_CRUMBLINE',
                payload: [{label: "Home", url: "/"}, {
                    label: "Datasources",
                    url: "/datasources/"
                }, {label: `Details of ${datasource.name}`, url: `/datasource/edit/${id}/`}]
            })
        }
        return (() => {
            if (datasourceStatus === 'loaded') {
                dispatch(resetDatasources());
            }
        })
    }, [dispatch, datasourceStatus, datasource, id]);

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
                                      value={value} edit={false}/>
                    );
                })
                setCustomFields(newFields);
            } else {
                setCustomFields([]);
            }
        }

        if (datasourceStatus === 'loaded' && datasource.plugin_id !== '') {
            populateCustomFields();
        }

    }, [datasourceStatus, datasource.plugin, datasource.plugin_id, datasource.typeData])

    const inspectDatasourceForDataSets = () => {
        dispatch(inspectDatasource(id));
    }

    const noDataSets = (
        <Box pad={{horizontal: 'small', bottom: 'small'}} direction={'row'} gap={'small'} align={'center'}><Alert
            color={'status-warning'} size={'medium'}/><Text>No Data Sets Found</Text></Box>);

    const datasetsOut = datasource.hasOwnProperty("data_sets") ? datasource.data_sets.length > 0 ? datasource.data_sets.map((ds, index) => {
        return (
            <Box direction={'row'} align='center' justify={'between'} key={`ds-reg-${index}`} pad={{left: 'small'}}>
                <Box className={'code'} justify={'start'} flex={true}>{ds.name}</Box>
                <Box className={'code'} pad={{right: 'small'}}>{sizeLabel(ds.size, ds.size_type, 2)}</Box>
            </Box>

        )
    }) : noDataSets : noDataSets;

    const toggleDataSet = (dataset) => {
        const currentDataSets = selectedDataSets;
        let existing = false;
        currentDataSets.forEach((ds, index) => {
            if (ds.name === dataset.name) {
                existing = true;
                currentDataSets.splice(index, 1);
            }
        });
        if (!existing) currentDataSets.push(dataset);
        setSelectedDataSets([...currentDataSets]);
    }

    let inspectionOut = "";
    if (inspectionStatus === 'loaded') {
        const inspectionList = inspection.map((insp, index) => {
            const checked = (selectedDataSets.find((o) => o.name === insp.name) !== undefined);
            if (datasource.data_sets.find((o) => o.name === insp.name) === undefined) {
                return (
                    <Box direction={'row'} align='center' justify={'between'} key={`ds-insp-${index}`}>
                        <Box><CheckBox checked={checked} onClick={() => toggleDataSet(insp)}/></Box>
                        <Box className={'code'} justify={'start'} flex={true}>{insp.name}</Box>
                        <Box className={'code'} pad={{right: 'small'}}>{sizeLabel(insp.size, insp.size_type, 2)}</Box>
                    </Box>
                )
            } else {
                return null
            }
        });
        if (inspectionList.length > 0) {
            inspectionOut = <Box justify={'center'}>
                <Box pad={'small'}><Text weight={'bold'} color={'text-strong'}>Discovered Unregistered Data Sets</Text></Box>
                {inspectionList}
                <Box width={'small'} pad={'small'}><Button label={'Register Data Sets'} primary={true}
                                                           color={'background-front'} onClick={handleRegister}/></Box>
            </Box>
        } else {
            inspectionOut = (<Text>No unregistered datasets found within the data source</Text>);
        }
    } else if (inspectionStatus === 'loading') {
        inspectionOut =
            <Box direction={'row'} align={'center'} gap={'small'}><Spinning size={'medium'} kind={'three-bounce'}
                                                                            color={'brand'}/><Text size={'medium'}
                                                                                                   color={'text-weak'}>Inspecting
                Datasource</Text></Box>
    }

    let renderOut = <Box pad={'none'}><Spinning size={'medium'} kind={'three-bounce'} color={'brand'}/></Box>

    if (datasourceStatus === "loaded" || id === null) {
        const tagsOut = datasource.tags.map((t, index) => (
            <Box key={`ds_tag_${t.id}`} round={true} pad={{horizontal: 'small', vertical: 'xsmall'}}
                 background={'background-contrast'} align={'center'} justify={'center'} direction={'row'}
                 gap={'between'} margin={'xsmall'}>
                <Box flex={true} justify='center'><Text size={'small'}>{t.label}</Text></Box>
            </Box>
        ));

        renderOut = (
            <Box direction={'row'} fill gap={'medium'}>
                <Box gap={'medium'} width={'large'}>
                    <Box direction={'row'} gap={'medium'} fill={'horizontal'}>
                        <Box width={'large'} background={'background-contrast'} gap={'small'}>
                            <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                                 background={'background-contrast'} pad={'small'}>
                                <Box><Text size={'medium'} weight={'bold'}>{datasource.name}</Text></Box>
                            </Box>
                            <Box fill={'horizontal'} pad={{horizontal: 'small'}}>
                                <Box align={'start'} justify={'start'}>
                                    <Text size={'medium'} color={'text'}>
                                        <ReactMarkdown children={datasource.description} remarkPlugins={[remarkGfm]}/>
                                    </Text>
                                </Box>
                            </Box>
                            {datasource.infoUrl.length > 0 && <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                                 pad={{horizontal: 'small'}}>
                                <Box>More Info</Box>
                                <Box><Anchor href={datasource.infoUrl} target={'_blank'}
                                             label={datasource.infoUrl}/></Box>
                            </Box>}
                            <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}>
                                <Box pad={{vertical: 'none'}} direction={'row'} wrap={true} gap={'small'}>
                                    {tagsOut}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box width={'large'} background={'background-contrast'} gap={'small'} pad={{vertical: "small"}}>
                        <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                             background={'background-contrast'} pad={'small'}>
                            <Box><Text size={'medium'} weight={'bold'}>Type Specific Data</Text></Box>
                            <Box align={'end'} justify={'center'} direction={'row'} gap={'small'}>{datasource.plugin_id}<Image
                                src={datasource.type_icon} width={'28px'}/></Box>
                        </Box>
                        {customFields}
                    </Box>
                </Box>
                <Box gap={'medium'} width={'large'}>
                    <Box direction={'row'} gap={'medium'} fill={'horizontal'}>
                        <Box width={'large'} background={'background-contrast'} gap={'xsmall'}>
                            <Box direction={'row'} width={'medium'} justify={'between'} fill={'horizontal'}
                                 background={'background-contrast'} pad={'small'} align={'center'}>
                                <Text size={'medium'} weight={'bold'}>Data Sets</Text>
                                <Box hoverIndicator={'blue'} pad='small' round={true} background={'green'}
                                     onClick={inspectDatasourceForDataSets}>
                                    <Update size={'small'} color={'text-strong'}/>
                                </Box>
                            </Box>
                            {datasetsOut}
                            <Box pad={'none'}>
                                {inspectionOut}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box pad={{horizontal: 'medium'}}>
            <Box pad={{vertical: 'small', horizontal: 'none'}} direction={'row'} gap={'small'}
                 align={'end'} justify={'start'}>
                <Text size={'xlarge'} weight={'bold'}>Datasource Details</Text>
                <Anchor href={`/datasource/edit/${id}/`}><Text size={'xsmall'} color={'text-weak'}>EDIT</Text></Anchor>
            </Box>
            <Box pad={{vertical: 'none', horizontal: 'none'}} direction={'row'} gap={'small'}
                 align={'start'} fill={'horizontal'}>
                {renderOut}
            </Box>
        </Box>
    );
}
