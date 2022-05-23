import React from "react";
import {Box, Diagram, Stack, Text} from "grommet";
import {Configure, DocumentStore, Info, Storage} from "grommet-icons";

export const LineageGraph = () => {
    return (
        <Stack guidingChild={1}>
            <Diagram
                animation={true}
                connections={[
                    {
                        fromTarget: '1',
                        toTarget: '2',
                        thickness: 'xxsmall',
                        color: 'blue',
                        anchor: 'horizontal',
                    },
                    {
                        fromTarget: '2',
                        toTarget: '4',
                        thickness: 'xxsmall',
                        color: 'green',
                        anchor: 'vertical',
                        type: 'rectilinear',
                    },
                    {
                        fromTarget: '4',
                        toTarget: '6',
                        thickness: 'xxsmall',
                        color: 'green',
                        anchor: 'vertical',
                        type: 'rectilinear',
                    },
                    {
                        fromTarget: '6',
                        toTarget: '8',
                        thickness: 'xxsmall',
                        color: 'green',
                        anchor: 'vertical',
                        type: 'rectilinear',
                    },
                ]}
            />
            <Box gap={'medium'}>
                <Box direction="row" gap={'medium'}>
                    <Box round='small' id="1" border={{size: '1px', side: 'all'}} pad="xsmall" direction={'row'} gap={'xsmall'}
                         width={'small'} align={'center'} justify={'between'}><DocumentStore size={'medium'}/><Text>Datasource
                        1</Text></Box>
                    <Box round='small' id="2" border={{size: '1px', side: 'all'}} pad="xsmall" direction={'row'} gap={'xsmall'}
                         width={'small'} align={'center'} justify={'between'}><Storage size={'medium'}/><Text>Dataset
                        1</Text></Box>
                </Box>
                <Box direction="row" gap={'medium'}>
                    <Box round='small' id="3" pad="xsmall" direction={'row'} gap={'xsmall'} width={'small'} align={'center'}
                         justify={'center'}/>
                    <Box round='small' id="4" border={{size: '1px', side: 'all'}} pad="xsmall" direction={'row'} gap={'xsmall'}
                         width={'small'} align={'center'} justify={'between'}><Configure size={'medium'}/><Text>Transformation
                        1</Text></Box>
                </Box>
                <Box direction="row" gap={'medium'}>
                    <Box round='small' id="5" pad="xsmall" direction={'row'} gap={'xsmall'} width={'small'} align={'center'}
                         justify={'center'}/>
                    <Box round='small' id="6" border={{size: '1px', side: 'all'}} pad="xsmall" direction={'row'} gap={'xsmall'}
                         width={'small'} align={'center'} justify={'between'}><Storage size={'medium'}/><Text>Dataset
                        2</Text></Box>
                </Box>
                <Box direction="row" gap={'medium'}>
                    <Box round='small' id="7" pad="xsmall" direction={'row'} gap={'xsmall'} width={'small'} align={'center'}
                         justify={'center'}/>
                    <Box round='small' id="8" border={{size: '1px', side: 'all'}} pad="xsmall" direction={'row'} gap={'xsmall'}
                         width={'small'} align={'center'} justify={'between'}><Info size={'medium'}/><Text>Model
                        1</Text></Box>
                </Box>
            </Box>
        </Stack>
    )
}