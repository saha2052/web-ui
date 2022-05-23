import React, {useState} from "react";
import {Button, Box, Text} from "grommet";
import {AddCircle, FormClose, FormNextLink, FormPreviousLink} from "grommet-icons";

export const Wizard = ({title, pages, formValues}) => {

    const [pageNum, setPageNum] = useState(0);

    let nextButton = pages.length > 1 && pageNum + 1 < pages.length ?
        (<Button primary label={'Next'} reverse icon={<FormNextLink size={'medium'}/>} onClick={() => {
            nextPage();
        }}/>) :
        (<Button primary label={'Create Project'} reverse icon={<AddCircle size={'medium'}/>}/>);

    const generatePage = () => {
        const page = pages[pageNum]
        const columnOut = [];
        const boxWidth = page.controls.length > 1 ? `1/${page.controls.length}` : (page.columns.length > 1 ? `1/${page.columns.length}` : 'full');
        if (page.hasOwnProperty("pageAction")) {
            nextButton = <Button label={page.pageAction.label} onClick={page.pageAction.callback} primary/>
        }
        page.columns.forEach((column, index) => {
            switch (column) {
                case 'fields':
                    page.controls.forEach((c) => {
                        columnOut.push(
                            <Box key={`col_${index}`} basis={boxWidth} flex={false}>
                                {c}
                            </Box>
                        )
                    });
                    break;
                case 'help':
                    columnOut.push(
                        <Box key={`col_${index}`} basis={boxWidth} background={'background-contrast'} round={'medium'} pad={'small'}
                             flex={false}>
                            <Box>{page.helpContent}</Box>
                        </Box>
                    )
                    break;
                default:
                    break;
            }
        })

        return (
            <Box pad='small' align={'center'}>
                <Box align={'start'} fill={'horizontal'} pad={{horizontal: 'medium'}}>
                    {pages.length > 1 ? <Text size={'xsmall'}>Step {pageNum + 1} of {pages.length}</Text> : ""}
                    <Text size={'large'} weight={'bold'}>{page.pageTitle}</Text>
                    <Text size={'small'}>{page.description}</Text>
                </Box>
                <Box pad={'medium'} direction={'row'} fill={'horizontal'} gap={'small'}>
                    {columnOut}
                </Box>
            </Box>
        )
    }

    const pageOut = generatePage();

    const nextPage = () => {
        if ((pageNum + 1) < pages.length) {
            setPageNum(pageNum + 1);
        }
    }

    const prevPage = () => {
        if ((pageNum) > 0) {
            setPageNum(pageNum - 1);
        }
    }

    const prevButton = pageNum > 0 ?
        (<Button primary label={'Previous'} icon={<FormPreviousLink size={'medium'}/>} onClick={() => {
            prevPage();
        }}/>) :
        ("");

    return (
        <Box fill={'horizontal'} align={'center'}>
            <Box width={'large'} background={'background'}>
                <Box elevation={'medium'} pad={'none'}>
                    <Box background={'background-back'} pad={'small'} justify='between' direction={'row'}>
                        <Box align={'center'} flex={true}><Text weight={'bold'}>{title}</Text></Box>
                        <Box gap={'none'} direction={'row'}>
                            <Text weight={'bold'}>Cancel</Text>
                            <FormClose size={'medium'}/>
                        </Box>
                    </Box>
                    {pageOut}
                    <Box border={{color: 'background-back', size: 'small', side: 'top'}} align={'end'} margin={'medium'}
                         pad={'small'} direction={'row'} justify={'between'}>
                        <Box>{prevButton}</Box>
                        <Box>{nextButton}</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}