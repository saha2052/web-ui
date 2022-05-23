import {Box, Text, TextInput, FormField, Select, Form} from "grommet";
import React, {useState} from "react";
import {Wizard} from "../../components/boilerplate/Wizard";
import MDEditor from '@uiw/react-md-editor';
import {UserFinder} from "../../components/utilities/UserFinder";
import {UserList} from "../../components/utilities/UserList";
import {projectDefaults} from "../../services/project/objectDefs";
import {saveProject} from "../../services/project/project";
import {PROJECT_SAVE_FAILED, PROJECT_SAVE_SUCCESS} from "../../reducers/project";
import store from "../../configuration/store";
import {Save, StatusWarning} from "grommet-icons";
import {navigate} from "hookrouter";

export const ProjectWizard = () => {

    const [formValues, setFormValues] = useState(projectDefaults);
    const [tmpDescription, setTmpDescription] = useState('');

    const handleSave = () => {
        const saveObject = {...formValues};
        delete saveObject["volume_info"];
        delete saveObject["error"];
        delete saveObject["datasets"];
        saveObject['description'] = tmpDescription;
        saveProject(saveObject)
            .then((obj) => {
                if (obj.type === PROJECT_SAVE_FAILED) {
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
                            message: (<Text>{saveObject.name} updated successfully</Text>),
                            color: 'status-ok',
                            timer: 3000,
                            show: true,
                        }
                    });
                    navigate(`/projects/`);
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

    const projectWizardPages = [
        {
            pageTitle: "Project Details",
            description: "Please provide the core details of the project including a description (in markdown) of the purpose of the project",
            columns: ['fields'],
            controls: [[
                (<FormField
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
                </FormField>),
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
                </FormField>,
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
            ]]
        },
        {
            pageTitle: "Project Details",
            description: "Please provide the core details of the project including a description (in markdown) of the purpose of the project",
            columns: ['fields'],
            pageAction: { callback: handleSave, label: "Create Project"},
            controls: [
                [
                    (<UserList members={formValues.members} removeMemberFunc={removeMember}/>)
                ], [
                    (<UserFinder addUserFunc={addUserToMembers} members={formValues.members}/>)
                ]
            ]
        }
    ]

    return (
        <Box pad={{horizontal: 'medium'}}>
            <Box pad={{vertical: 'medium', horizontal: 'none'}} direction={'row'} gap={'small'} align={'center'}>
                <Text size={'xlarge'} weight={'bold'}>Start a new project</Text>
            </Box>
            <Box>
                <Form
                    validate="blur"
                    value={formValues}
                    onChange={setFormValues}
                    onSubmit={({value, touched}) => handleSave({value, touched})}
                >
                    <Wizard title={"New Project Wizard"} pages={projectWizardPages}/>
                </Form>
            </Box>
        </Box>
    )
}