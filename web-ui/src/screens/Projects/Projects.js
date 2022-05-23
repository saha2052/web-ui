import React, {useEffect} from 'react';
import {Box, Button, DataTable, Stack, Text, TextInput} from "grommet";
import {Spinning} from "grommet-controls";
import {useDispatch, useSelector} from "react-redux";
import {loadMyProjects, resetProjects} from "../../services/project/project";
import {CirclePlay, Filter, Scorecard, Search, StatusGoodSmall} from "grommet-icons";
import {navigate} from "hookrouter";

export const Projects = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'SET_CRUMBLINE', payload: [{label: "Home", url: "/"}, {label: "Projects", url: "/projects"}]})
    }, [dispatch]);

    const projects = useSelector(state => state.project.projects.data)
    const projectsStatus = useSelector(state => state.project.projects.status)

    useEffect(() => {
        if (projectsStatus === 'uninitialized') {
            dispatch(loadMyProjects());
        }
        return (() => {
            if (projectsStatus === 'loaded') {
                dispatch(resetProjects());
            }
        })
    }, [dispatch, projectsStatus]);

    let projectsPanel = <Spinning kind={'three-bounce'} size={'medium'} color={'brand'} fadeIn={'full'}/>;

    if (projectsStatus === 'loaded') {
        if (projects.length > 0) {
            projectsPanel = (
                <DataTable
                    columns={[
                        {
                            property: 'status',
                            header: "",
                            render: datum => (
                                <Box pad={{vertical: 'xsmall'}}>
                                    <StatusGoodSmall size={'medium'} color={'status-ok'}/>
                                </Box>
                            ),
                            size: '40px'
                        },
                        {
                            property: 'name',
                            header: <Text>Name</Text>,
                            primary: true,
                            render: datum => (
                                <Box>
                                    <Box onClick={() => navigate(`/project/detail/${datum.id}/`)}>
                                        <Text style={{textDecoration: 'underline'}} weight={'bold'}>{datum.name}</Text>
                                    </Box>
                                    <Text truncate={'tip'} color='text' size={'xsmall'}>{datum.description}</Text>
                                </Box>
                            )
                        },
                        {
                            property: 'data_sets',
                            header: <Text>Associated Data Sets</Text>,
                            render: datum => (
                                <Text>{datum.datasets.length} data set{datum.datasets.length === 1 ? "" : "s"}</Text>
                            )
                        }
                    ]}
                    data={projects}
                />
            )
        } else {
            projectsPanel = (
                <Box><Text>No Projects Found</Text></Box>
            )
        }
    }


    return (
        <Box pad={{horizontal: 'medium'}}>
            <Box pad={{vertical: 'medium', horizontal: 'none'}} direction={'row'} gap={'small'} align={'center'}>
                <Text size={'xlarge'} weight={'bold'}>Projects</Text>
                <Box flex={true} align='start' justify={'end'} direction={'row'} gap={'xssmall'}>
                    <Box pad={{ horizontal: 'small', vertical: 'xsmall'}} onClick={() => {navigate('/project/create/')
                    }} hoverIndicator={'status-ok'}
                         background={'brand'}
                         round={false} direction={'row'}>
                        <Text color={'text-strong'} weight={'bold'}>Start New Project</Text>
                    </Box>
                </Box>
            </Box>


            <Box direction={'row'} wrap={true} gap={'medium'}>
                <Box width='medium' fill='vertical' round={'small'} elevation={'small'}>
                    <Box width='medium' fill='vertical' round={'small'} elevation={'small'}>
                        <Box align={'center'} justify={'center'} height={'300px'} round={{size: 'small', corner: 'top'}}
                             background={'#BDC4CE'} pad={'small'}>
                            <Stack anchor={'center'}>
                                <Box pad={{top: 'xlarge'}}><Text>Video Missing</Text></Box>
                                <CirclePlay size={'large'} color={'text-strong'}/>
                            </Stack>
                        </Box>
                        <Box pad={'small'}>
                            <Text size={'xlarge'} weight={'bold'}>Getting Started</Text>
                            <Text size={'medium'}>Understand Projects in DataSpaces</Text>
                            <Box pad={{vertical: 'small'}}>
                                <Button plain onClick={() => navigate('/datasource/create/')}
                                        label={<Text style={{textDecoration: 'underline'}} color={'text'}
                                                     size={'small'}>What are projects?</Text>}/>
                                <Button plain onClick={() => navigate('/project/create/')}
                                        label={<Text style={{textDecoration: 'underline'}} color={'text'}
                                                     size={'small'}>Creating a new Project</Text>}/>
                                <Button plain onClick={() => navigate('/project/create/')}
                                        label={<Text style={{textDecoration: 'underline'}} color={'text'}
                                                     size={'small'}>Managing Membership</Text>}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box basis={'2/3'} pad={"medium"} elevation={'small'} round={'small'}>
                    <Box direction={'row'} gap={'xlarge'} align={'center'} justify={'between'}>
                        <Box direction={'row'} gap={'small'}>
                            <Scorecard size={'medium'}/>
                            <Text weight={'bold'}>Your Projects</Text>
                        </Box>
                        <Box width={'large'} direction={'row'} gap={'small'}>
                            <TextInput icon={<Search/>} reverse={true} placeholder="Search Projects" size={'medium'}/>
                            <Box round={'xsmall'} align='center' justify={'center'} border={{size: '1px', side: 'all'}}>
                                <Button icon={<Filter/>} onClick={() => {
                                }}/>
                            </Box>
                        </Box>
                    </Box>


                    <Box fill={'horizontal'} pad={{top: 'small'}}>
                        {projectsPanel}
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}
