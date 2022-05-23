import React, {useEffect} from "react";
import {useState} from "react";
import {Box, CheckBox, Text} from "grommet";
import {FormClose} from "grommet-icons";

export const GetStarted = ({dismissed = false, task1Complete = false, task2Complete = false, task3Complete = false}) => {
    const [showGetStarted, setShowGetStarted] = useState((!dismissed && !(task1Complete && task2Complete && task3Complete)));
    const [checkTask1, setCheckTask1] = useState(task1Complete);
    const [checkTask2, setCheckTask2] = useState(task2Complete);
    const [checkTask3, setCheckTask3] = useState(task3Complete);

    useEffect(() => {
        setShowGetStarted((!dismissed && !(task1Complete && task2Complete && task3Complete)));
    }, [dismissed, task3Complete, task2Complete, task1Complete])

    const out = showGetStarted ? (
        <Box fill={'horizontal'} background={'background-contrast'} round={'small'}>
            <Box direction={'row'} justify={'between'} pad={{ top: 'small', horizontal: 'medium'}} gap={'small'} round={'small'}>
                <Box>
                    <Text size={'medium'} weight={'bold'}>Welcome to DataSpaces!</Text>
                    <Text size={'small'}>Get Started</Text>
                </Box>
                <Box direction={'row'} gap={'xsmall'} onClick={() => setShowGetStarted(false)}>
                    <FormClose size={'medium'} color={'brand'}/>
                    <Text size={'small'} color={'brand'}>dismiss</Text>
                </Box>
            </Box>
            <Box pad={{ horizontal: 'medium'}} gap={'small'}>
                <Box pad={{vertical: 'small'}} animation={['slideDown', 'slideUp']} direction={'row'} justify={'between'}
                     align={'center'} border={{side: 'bottom', style: 'dotted', color: 'text-weak'}}>
                    <Box justify={'center'}>
                        <Text color={'brand'} weight={'bold'} size={'medium'}>Take a product tour</Text>
                        <Text size={'small'}>
                            Take a quick tour of the DataSpaces interface and find out the key principles of the
                            platform.
                        </Text>
                    </Box>
                    <Box>
                        <CheckBox checked={checkTask1} onClick={() => setCheckTask1(!checkTask1)}/>
                    </Box>
                </Box>
                <Box pad={{ bottom: 'small'}} animation={['slideDown', 'slideUp']} direction={'row'} justify={'between'}
                     align={'center'} border={{side: 'bottom', style: 'dotted', color: 'text-weak'}}>
                    <Box justify={'center'}>
                        <Text color={'brand'} weight={'bold'} size={'medium'}>Setup your first Data Source</Text>
                        <Text size={'small'}>
                            Connect to and inspect your first data source..
                        </Text>
                    </Box>
                    <Box>
                        <CheckBox checked={checkTask2} onClick={() => setCheckTask2(!checkTask2)}/>
                    </Box>
                </Box>
                <Box pad={{bottom: 'small'}} animation={['slideDown', 'slideUp']} direction={'row'} justify={'between'}
                     align={'center'}>
                    <Box justify={'center'}>
                        <Text color={'brand'} weight={'bold'} size={'medium'}>Start your first project</Text>
                        <Text size={'small'}>
                            Create a project, find the data to drive your outcome, and start developing.
                        </Text>
                    </Box>
                    <Box>
                        <CheckBox checked={checkTask3} onClick={() => setCheckTask3(!checkTask3)}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    ) : "";
    return (
        <>{out}</>
    )
}