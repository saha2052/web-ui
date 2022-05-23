import React, {useEffect} from "react";
import {Box, Button, DataTable, Image, Text, TextInput} from "grommet";
import {useDispatch, useSelector} from "react-redux";
import {Spinning} from "grommet-controls";
import {loadMyDatasources, resetDatasources} from "../../services/datasource/datasource";
import {Filter, Plug, Search, Storage} from "grommet-icons";
import {loadPlugins, resetPlugins} from "../../services/plugin/plugin";
import {navigate} from "hookrouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Datasources = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'SET_CRUMBLINE',
            payload: [{label: "Home", url: "/"}, {label: "Datasources", url: "/datasources/"}]
        })
    }, [dispatch]);

    const datasources = useSelector(state => state.datasource.datasources.data)
    const datasourceStatus = useSelector(state => state.datasource.datasources.status)

    const plugins = useSelector(state => state.plugin.plugins.data)
    const pluginsStatus = useSelector(state => state.plugin.plugins.status)

    useEffect(() => {
        if (datasourceStatus === 'uninitialized') {
            dispatch(loadMyDatasources());
        }
        return (() => {
            if (datasourceStatus === 'loaded') {
                dispatch(resetDatasources());
            }
        })
    }, [dispatch, datasourceStatus]);

    useEffect(() => {
        if (pluginsStatus === 'uninitialized') {
            dispatch(loadPlugins('datasource'))
        }
        return (() => {
            if (pluginsStatus === 'loaded') {
                dispatch(resetPlugins());
            }
        })
    }, [pluginsStatus, dispatch]);

    let datasourcePanel = <Spinning kind={'three-bounce'} size={'medium'} color={'brand'} fadeIn={'full'}/>;

    if (datasourceStatus === 'loaded') {
        if (datasources.length > 0) {
            datasourcePanel = (
                <DataTable
                    columns={[
                        {
                            property: 'type_icon',
                            header: "",
                            render: datum => (
                                <Box pad={{vertical: 'xsmall'}}>
                                    <Image src={datum.type_icon} width={'28px'}/>
                                </Box>
                            ),
                            size: '40px'
                        },
                        {
                            property: 'name',
                            header: <Text>Name</Text>,
                            primary: true,
                            search: true,
                            size: '1/2',
                            render: datum => (
                                <Box width={'large'} flex={false}>
                                    <Box  onClick={() => navigate(`/datasource/detail/${datum.id}/`)}><Text weight={'bold'} style={{ textDecoration: 'underline'}}>{datum.name}</Text></Box>
                                    <Text truncate={'tip'} color='text' size={'xsmall'}><ReactMarkdown children={datum.description} remarkPlugins={[remarkGfm]}/></Text>
                                </Box>
                            )
                        },
                        {
                            property: 'data_sets',
                            size: '1/4',
                            header: <Text>Data Sets</Text>,
                            render: datum => (
                                <Text>{datum.data_sets.length} data set{datum.data_sets.length === 1 ? "" : "s"}</Text>
                            )
                        }
                    ]}
                    data={datasources}
                />
            )
        } else {
            datasourcePanel = (
                <Box><Text>No Datasources Found</Text></Box>
            )
        }
    }

    let pluginPanel = <Spinning kind={'three-bounce'} size={'medium'} color={'brand'} fadeIn={'full'}/>;

    if (pluginsStatus === 'loaded') {
        if (plugins.length === 0) {
            pluginPanel = (
                <Box><Text>No Plugins Found</Text></Box>
            )
        } else {
            pluginPanel = plugins.map((p) => {
                return (
                    <Box key={`plg_${p.plugin_id}_${p.plugin_name}`} fill='horizontal' width={'small'} pad={"medium"} elevation={'small'}
                         round={'small'}>
                        <Box direction={'row'} gap={'small'}>
                            <Box><Image src={p.icon} width={'28px'}/></Box>
                            <Box gap={'none'}>
                                <Text weight={'bold'} size={'large'}>{p.list_label}</Text>
                                <Text truncate={true} size={'xsmall'}>{p.description}</Text>
                                <Box pad={{top: 'small'}}>
                                    <Button plain label={<Text style={{textDecoration: 'underline'}} weight={'bold'}
                                                               color={'text'} size={'small'}>Register
                                        new {p.plugin_name} datasource</Text>} onClick={()=>{navigate(`/datasource/create/${p.plugin_name}/`)}}/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            })
        }
    }

    return (
        <Box pad={{horizontal: 'medium'}}>
            <Box pad={{vertical: 'medium', horizontal: 'none'}} direction={'row'} gap={'small'} align={'center'}>
                <Text size={'xlarge'} weight={'bold'}>Data Sources</Text>
                <Box flex={true} align='start' justify={'end'} direction={'row'} gap={'xssmall'}>
                    <Box pad={{horizontal: 'small', vertical: 'xsmall'}} onClick={() => {navigate('/datasource/create/')}}
                     hoverIndicator={'status-ok'}
                         background={'brand'}
                         round={false} direction={'row'}>
                        <Text color={'text-strong'} weight={'bold'}>Register Data Source</Text>
                    </Box>
                </Box>
            </Box>

            <Box direction={'row'} justify={'between'} gap={'medium'}>
                <Box basis={'2/3'} pad={"medium"} elevation={'small'} round={'small'}>
                    <Box direction={'row'} justify={'between'}>
                        <Box direction={'row'} gap={'xsmall'} align={'center'}>
                            <Storage size={'medium'}/>
                            <Text weight={'bold'}>Your Datasources</Text>
                        </Box>
                        <Box width={'medium'} direction={'row'} gap={'small'}>
                            <TextInput icon={<Search/>} reverse={true} placeholder="Search datasources"
                                       size={'medium'}/>
                            <Box round={'xsmall'} align='center' justify={'center'}
                                 border={{size: '1px', side: 'all'}}><Button icon={<Filter/>} onClick={() => {
                            }}/></Box>
                        </Box>
                    </Box>

                    <Box fill={'horizontal'} pad={{top: 'small'}}>
                        {datasourcePanel}
                    </Box>
                </Box>
                <Box basis={'1/3'} pad={"medium"} elevation={'small'} round={'small'}>
                    <Box direction={'row'} gap={'xsmall'} align={'center'}>
                        <Plug size={'medium'}/>
                        <Text weight={'bold'}>Datasource Plugins</Text>
                    </Box>
                    <Box fill={'horizontal'} pad={{top: 'small'}}>
                        {pluginPanel}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}