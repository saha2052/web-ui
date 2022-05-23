import React, {useEffect} from 'react';
import {Box, Button, Meter, Text, Tip} from "grommet";
import {Spinning} from "grommet-controls";
import {useDispatch, useSelector} from "react-redux";
import {loadProject, resetProject} from "../../services/project/project";
import {Baby, Cluster, Cubes, Edit, Group, Run, Scorecard, Storage, Trash, User} from "grommet-icons";
import {navigate} from "hookrouter";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {LineageGraph} from "../../components/utilities/LineageGraph";

export const ProjectDetail = ({id}) => {
    const dispatch = useDispatch();
    console.log("id", id);

    useEffect(() => {
        dispatch({
            type: 'SET_CRUMBLINE',
            payload: [{label: "Home", url: "/"}, {label: "Projects", url: "/projects/"}, {
                label: "Loading...",
                url: `/project/edit/${id}/`
            }]
        })
    }, [dispatch, id]);

    const project = useSelector(state => state.project.project.data)
    const projectStatus = useSelector(state => state.project.project.status)

    useEffect(() => {
        if (projectStatus === 'uninitialized') {
            dispatch(loadProject(id));
        }
        if (projectStatus === 'loaded') {
            dispatch({
                type: 'SET_CRUMBLINE',
                payload: [{label: "Home", url: "/"}, {label: "Projects", url: "/projects/"}, {
                    label: project.name,
                    url: `/project/detail/${id}/`
                }]
            })
        }
        return (() => {
            if (projectStatus === 'loaded') {
                dispatch(resetProject());
            }
        })
    }, [dispatch, projectStatus, id, project.name]);

    let renderOut = <Box pad={'small'}><Spinning size={'medium'} kind={'three-bounce'} color={'brand'}/></Box>

    if (projectStatus === 'loaded') {
        const volumeValues = [
            {
                value: parseInt(project.volume_info.total_used),
                label: "Total Used",
                color: 'status-ok',
            },
            {
                value: parseInt(project.volume_info.advisory_quota),
                label: "Advisory Quota",
                color: 'grey',
            },
            {
                value: parseInt(project.volume_info.volume_quota),
                label: "Volume Quota",
                color: 'status-warning',
            }
        ]
        const volumeChartOut = project.volume_info.status === 'OK' ?
            <Meter values={volumeValues} max={parseInt(project.volume_info.volume_quota)} color={'blue'} size={'full'}
                   thickness={'large'}/> : <Box><Text>Volume info currently unavailable</Text></Box>

        const projectMembersOut = project.members.map((pm) => {
                const statusColor = pm.username.substring(0,4) === 'tmp_' ? ['background-contrast', 'text-weak'] : ['status-ok', 'white'];
                const stateIcon = pm.username.substring(0,4) === 'tmp_' ?
                    <Baby size={'medium'} color={statusColor[1]}/> :
                    <User size={'medium'} color={statusColor[1]}/>;
                return (
                    <Box key={`prj_mbr_${pm.id}`} round={true} pad={{horizontal: 'small', vertical: 'xsmall'}}
                         background={statusColor[0]} align={'center'} justify={'center'} direction={'row'}
                         gap={'between'} margin={'xsmall'}>
                        <Box flex={true} justify='center' direction={'row'} gap={'xsmall'}>{stateIcon}<Text
                            color={'text-strong'} size={'small'}>{pm.email}</Text></Box>
                    </Box>)
            }
        );

        const handleDelete = () => {
            console.log("Delete");
        }

        const handleEdit = () => {
            navigate(`/project/edit/${project.id}/`);
        }

        renderOut = (
            <>
                <Box pad={{vertical: 'small', horizontal: 'medium'}} direction={'row'} gap={'medium'} align={'center'}
                     justify={'start'} fill={'horizontal'}>
                    <Text size={'xlarge'} weight={'bold'}>{project.name}</Text>
                    <Box gap={'none'} align={'center'} justify={'center'}><Tip content={project.status}><Run
                        color={'status-ok'} size={'medium'}/></Tip></Box>
                    <Box flex={true} align='start' justify={'end'} direction={'row'} gap={'xssmall'}>
                        <Box pad='small' onClick={() => handleDelete()} hoverIndicator={'background-contrast'}
                             round={true}>
                            <Trash size={'medium'} color={'red'}/>
                        </Box>
                        <Box pad='small' onClick={() => handleEdit()} hoverIndicator={'background-contrast'}
                             round={true}>
                            <Edit size={'medium'} color={'brand'}/>
                        </Box>

                    </Box>
                </Box>
                <Box direction={'row'} justify={'between'} gap={'medium'}>
                    <Box basis={'1/3'} pad={"medium"} elevation={'small'} round={'small'}>
                        <Box direction={'row'} gap={'xsmall'} align={'center'}>
                            <Scorecard size={'medium'}/>
                            <Text weight={'bold'}>Project Details</Text>
                        </Box>
                        <Box fill={'horizontal'} pad={{top: 'small'}}>
                            <Text size={'medium'} color={'text'}>
                                <ReactMarkdown children={project.description} remarkPlugins={[remarkGfm]}/></Text>
                        </Box>
                    </Box>
                    <Box basis={'1/3'} pad={"medium"} elevation={'small'} round={'small'}>
                        <Box direction={'row'} gap={'xsmall'} align={'center'}>
                            <Cubes size={'medium'}/>
                            <Text weight={'bold'}>Data Summary</Text>
                        </Box>

                        <Box pad={{vertical: 'none'}} gap={'small'} direction={'row'} align={'center'}
                             justify={'between'}
                             border={{size: '1px', side: 'bottom', style: 'dashed', color: 'text-weak'}}>
                            <Box pad={{vertical: 'small'}} gap={'small'} direction={'row'}>
                                <Text>Number of Datasets: </Text>
                                <Text weight={'bold'}>{project.datasets.length}</Text>
                            </Box>
                            <Box align={'end'} justify={'end'}><Button label={"Manage Data Sets"} onClick={() => {
                                navigate(`/project/datasets/${id}/`)
                            }}/>
                            </Box>
                        </Box>
                        <Box pad={{vertical: 'small'}} gap={'medium'}>
                            <Box direction={'row'} gap={'xsmall'} align={'center'}>
                                <Cluster size={'medium'}/>
                                <Text weight={'bold'}>Data Lineage</Text>
                            </Box>
                            <LineageGraph/>
                        </Box>
                    </Box>
                    <Box basis={'1/3'} pad={"medium"} elevation={'small'} round={'small'}>
                        <Box pad={{vertical: 'small'}} gap={'small'}
                             border={{size: '1px', side: 'bottom', style: 'dashed', color: 'text-weak'}}>
                            <Box direction={'row'} gap={'xsmall'} align={'center'}>
                                <Storage size={'medium'}/>
                                <Text weight={'bold'}>Project Volume</Text>
                            </Box>
                            {volumeChartOut}
                        </Box>
                        <Box pad={{top: 'small'}} direction={'row'} gap={'xsmall'} align={'center'}>
                            <Group size={'medium'}/>
                            <Text weight={'bold'}>Members</Text>
                        </Box>
                        <Box pad={{vertical: 'small'}} gap={'small'}>
                            <Box pad={{vertical: 'none'}} direction={'row'} wrap={true}
                                 gap={'small'}>{projectMembersOut}</Box>
                        </Box>

                    </Box>
                </Box>
            </>
        )

    }

    return (
        <Box pad={'none'}>
            {renderOut}
        </Box>
    )
}
