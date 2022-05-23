import React, {useEffect, useState} from 'react';
import {Box, TextInput, FormField, Form, Select, Text, Button} from "grommet";
import {projectDefaults} from '../../services/project/objectDefs';
import {Spinning} from "grommet-controls";
import {useDispatch, useSelector} from "react-redux";
import {loadProject, loadProjectSuccess, resetProject, saveProject} from "../../services/project/project";
import {AddCircle, FormClose, Save, StatusWarning} from "grommet-icons";
import {UserFinderLayer} from "../../components/utilities/UserFinder";
import {navigate} from "hookrouter";
import store from "../../configuration/store";
import {PROJECT_SAVE_FAILED, PROJECT_SAVE_SUCCESS} from "../../reducers/project";
import MDEditor from '@uiw/react-md-editor';

export const ProjectEdit = ({id}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const curl = id !== null ? `edit/${id}` : 'create';
        dispatch({type: 'SET_CRUMBLINE',
            payload: [{label: "Home", url: "/"}, {label: "Projects", url: "/projects/"}, {
                label: "Loading...",
                url: `/project/${curl}/`
            }]
        })
    }, [dispatch, id]);

    const project = useSelector(state => state.project.project.data)
    const projectStatus = useSelector(state => state.project.project.status)

    const [formValues, setFormValues] = React.useState(projectDefaults);

    const handleSave = () => {
        const saveObject = {...formValues};
        delete saveObject["volume_info"];
        delete saveObject["error"];
        delete saveObject["datasets"];
        saveObject['description'] = tmpDescription;
        saveProject(saveObject)
            .then((obj) => {
                if (obj.type === PROJECT_SAVE_FAILED) {
                    console.log("obj", obj)
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<StatusWarning color={'white'} size={'medium'}/>),
                            title: `Error Saving Project`,
                            message: (
                                <Text>Error: {obj.payload.status} {obj.payload.statusText} {obj.payload.message}</Text>),
                            color: 'status-critical',
                            timer: 10000,
                            show: true,
                        }
                    });
                    return false;
                } else if (obj.type === PROJECT_SAVE_SUCCESS) {
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<Save color={'white'} size={'medium'}/>),
                            title: `Save Successful`,
                            message: (<Text>{project.name} updated successfully</Text>),
                            color: 'status-ok',
                            timer: 3000,
                            show: true,
                        }
                    });
                    navigate(`/project/detail/${id}/`);
                    return false;
                } else {
                    store.dispatch({
                        type: 'SHOW_MESSAGE', dialog: {
                            icon: (<StatusWarning color={'white'} size={'medium'}/>),
                            title: `Error Saving Project`,
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
                        title: `Error Saving Project`,
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

    const [tmpDescription, setTmpDescription] = useState("")

    useEffect(() => {
        if (projectStatus === 'uninitialized') {
            if (id !== null) {
                dispatch(loadProject(id));
            } else {
                dispatch(loadProjectSuccess(projectDefaults));
            }
        }
        return (() => {
            if (projectStatus === 'loaded') {
                dispatch(resetProject());
            }
        })
    }, [dispatch, projectStatus, id]);


    useEffect(() => {
        if ((projectStatus === 'loaded') && (project.hasOwnProperty("name"))) {
            setFormValues({...project});
            setTmpDescription(project.description);
            dispatch({type: 'SET_CRUMBLINE',
                payload: [{label: "Home", url: "/"}, {label: "Projects", url: "/projects/"}, {
                    label: project.name,
                    url: `/project/detail/${id}/`
                }]
            })
        }
    }, [dispatch, projectStatus, project, id]);

    const addUser = () => {
        setShowUserFinder(true);
    }

    const [showUserFinder, setShowUserFinder] = useState(false);

    const hideUserFinder = () => setShowUserFinder(false);

    const addUserToMembers = (user) => {
        const newFormValues = {...formValues};
        newFormValues.members.push(user);
        setFormValues(newFormValues);
    }

    const removeMember = (removeIndex) => {
        if (removeIndex !== -1) {
            const newFormValues = {...formValues};
            newFormValues.members.splice(removeIndex, 1);
            setFormValues(newFormValues);
        }
    }

    let renderOut = <Box pad={'small'}><Spinning size={'medium'} kind={'three-bounce'} color={'brand'}/></Box>

    if (projectStatus === 'loaded') {

        const projectMembersOut = project.members.map((pm, index) => (
            <Box key={`prj_mbr_${pm.id}`} round={true} pad={{horizontal: 'small', vertical: 'xsmall'}}
                 background={'background-contrast'} align={'center'} justify={'center'} direction={'row'}
                 gap={'between'} margin={'xsmall'}>
                <Box flex={true} justify='center'><Text size={'small'}>{pm.email}</Text></Box>
                <Box justify='center' align={'end'} round={true} hoverIndicator={'red'} focusIndicator={false}
                     onClick={() => {
                         removeMember(index)
                     }}><FormClose size={'medium'} color={'text'}/></Box>
            </Box>
        ));

        renderOut = (
            <Box direction={'row'} gap={'medium'} fill={'horizontal'}>
                <Box flex={true}>
                    <Box>
                        <FormField
                            label="Project Name"
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
                        </FormField>
                        <FormField
                            label="Project Status"
                            htmlFor={`status`}
                            name="status"
                            required
                        >
                            <Select
                                id={'status'}
                                name={'status'}
                                options={['planned', 'active', 'suspended', 'complete', 'archived']}
                                value={formValues.status}
                            />
                        </FormField>
                    </Box>
                    <Box pad={{top: 'small'}}><Text size={'medium'} weight={'bold'}>Project Members:</Text></Box>
                    <Box pad={{vertical: 'none'}} direction={'row'} wrap={true} gap={'small'}>
                        {projectMembersOut}
                        <Box flex={false} round={true} pad='xsmall' margin={'xsmall'} background={'green'}
                             hoverIndicator={'orange'}
                             onClick={addUser} focusIndicator={false}>
                            <AddCircle size={'medium'} color={'white'}/>
                        </Box>
                    </Box>
                    <Box pad={{vertical: 'small'}} direction={'row'} gap={'small'}>
                        <Button size='medium' type={'submit'} primary={true} label={"Save"} fill={false}/>
                    </Box>
                </Box>
            </Box>
        )

    }

    return (
        <Box pad={"medium"}>
            {showUserFinder &&
                <UserFinderLayer hideFunc={hideUserFinder} addUserFunc={addUserToMembers} members={formValues.members}/>
            }
            <Form
                validate="blur"
                value={formValues}
                onChange={setFormValues}
                onSubmit={({value, touched}) => handleSave({value, touched})}
            >
                {renderOut}
            </Form>
        </Box>
    )
}
