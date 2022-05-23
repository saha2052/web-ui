import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, Table, TableBody, TableCell, TableRow, Text} from "grommet";
import {navigate} from "hookrouter";
import {useDispatch, useSelector} from "react-redux";
import {GetStarted} from "../components/Dashboard/GetStarted";
import {CirclePlay, StatusGoodSmall, StatusUnknownSmall} from "grommet-icons";
import {loadMyProjects, resetProjects} from "../services/project/project";
import {Spinning} from "grommet-controls";

export const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'SET_CRUMBLINE', payload: [{}]})
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

    const [checklistDismissed, setChecklistDismissed] = useState(true);

    let projectPanel = (
        <Box flex={true} round={'small'} elevation={'small'} pad={'medium'} align={'center'} justify={'center'}>
            <Spinning kind={'three-bounce'} size={'medium'} color={'brand'} fadeIn={'full'}/>
        </Box>
    );

    if (projectsStatus === 'error') {
        projectPanel = (
            <Box>{projectsStatus.toUpperCase()} :: Not Authorised</Box>
        )
    }

    if (projectsStatus === 'loaded') {
        const projectRows = projects.map((p) => {
                let statusIcon = "";
                switch (p.status) {
                    case "active":
                        statusIcon = <StatusGoodSmall size={'medium'} color={'status-ok'}/>
                        break;
                    default:
                        statusIcon = <StatusUnknownSmall size={'medium'} color={'status-ok'}/>
                        break;
                }
                return (
                    <TableRow key={`tbl_proj_${p.id}`}>
                        <TableCell pad={'none'} scope="row" flex={true} direction={'row'} align={'center'} justify='start'
                                   gap={'small'}>
                            {statusIcon}
                            <Button plain onClick={() => navigate(`/project/detail/${p.id}/`)}
                                    label={<Text style={{textDecoration: 'underline'}} color={'text'} size={'small'}>{p.name}</Text>}/>
                        </TableCell>
                        <TableCell align={'end'}>{p.datasets.length} Data
                            Set{p.datasets.length === 1 ? "" : "s"}</TableCell>
                    </TableRow>
                )
            }
        );

        projectPanel = (
            <Box flex={true} round={'small'} elevation={'small'} pad={'medium'}>
                <Text size={'xlarge'} weight={'bold'}>Projects</Text>
                <Text size={'small'}>{projects.length} Project{projects.length === 1 ? "" : "s"}</Text>
                <Box pad={{vertical: 'small'}} border={{size: "1px", side: "bottom"}}>
                    <Table>
                        <TableBody>
                            {projectRows}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        );
    }

    return (
        <Box pad={{horizontal: 'medium'}}>
            <GetStarted dismissed={checklistDismissed} task1Complete={false} task2Complete={false} task3Complete={false}/>
            <Box pad={{vertical: 'medium', horizontal: 'none'}} direction={'row'} gap={'small'} align={'center'}>
                <Text size={'xlarge'} weight={'bold'}>Home</Text>
            </Box>

            <Box direction={'row'} wrap={true} gap={'medium'}>
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
                        <Text size={'medium'}>Start with the DataSpaces basics</Text>
                        <Box pad={{vertical: 'small'}}>
                            <Button plain onClick={() => navigate('/project/create/')}
                                    label={<Text style={{textDecoration: 'underline'}} color={'text'} size={'small'}>Create
                                        a project</Text>}/>
                            <Button plain onClick={() => navigate('/datasource/create/')}
                                    label={<Text style={{textDecoration: 'underline'}} color={'text'} size={'small'}>Add
                                        a datasource</Text>}/>
                            <br/>
                            <Button plain onClick={() => setChecklistDismissed(false)}
                                    label={<Text style={{textDecoration: 'underline'}} color={'text'} size={'small'}>Show
                                        Checklist</Text>}/>

                        </Box>
                    </Box>
                </Box>
                {projectPanel}
            </Box>
        </Box>
    )
}
