import React, {useState} from "react";
import {Box, Layer, Text, TextInput} from "grommet";
import {Checkmark, User, UserAdd} from "grommet-icons";
import {findUser} from "../../services/members/member";
import store from "../../configuration/store";

export const UserFinderLayer = ({hideFunc, addUserFunc, members}) => {
    console.log("Layer: ", {members});
    return (
        <Layer onEsc={hideFunc} onClickOutside={hideFunc} position={'right'} modal={true}
               full={'vertical'}>
            <Box pad={{vertical: 'xlarge', horizontal: 'medium'}} gap={'small'}>
                <UserFinder addUserFunc={addUserFunc} members={members}/>
            </Box>
        </Layer>
    )
}

export const UserFinder = ({addUserFunc, members}) => {

    console.log({members});

    const [userList, setUserList] = useState([]);
    const [userFilter, setUserFilter] = useState('');

    const updateUserList = (ul) => {
        setUserFilter(ul);
        if (ul.length >= 3) {
            findUser(ul)
                .then((userResults) => {
                    setUserList(userResults);
                })
        } else {
            setUserList([]);
        }
    }


    const addUser = (userObj) => {
        store.dispatch({
            type: 'SHOW_MESSAGE', dialog: {
                icon: (<UserAdd color={'white'} size={'medium'}/>),
                title: `User Added`,
                message: (<Text>{userObj.first_name} {userObj.last_name} will be added</Text>),
                color: 'status-ok',
                timer: 3000,
                show: true,
            }
        });
        addUserFunc(userObj);
        setUserFilter('');
        setUserList([]);
    }

    const userListOut = userList.map((u) => {
            const alreadyAdded = members.some(m => m.email === u.email);
            return (
                <Box pad='xsmall' flex={false} key={u.id} hoverIndicator={'background-contrast'} direction={'row'}
                     gap={'small'}
                     onClick={() => {
                         if (!alreadyAdded) {
                             addUser({
                                 id: u.id,
                                 username: u.email,
                                 first_name: u.firstName,
                                 last_name: u.lastName,
                                 email: u.email
                             });
                         }
                     }}
                >
                    <Box justify={'center'}>{alreadyAdded ? <Checkmark size={'medium'}/> : <User size={'medium'}/>}</Box>
                    <Box>
                        <Box><Text size={'medium'} weight={'bold'}>{u.firstName} {u.lastName}</Text></Box>
                        <Box><Text size={'small'}>{u.email}</Text></Box>
                    </Box>
                </Box>
            )
        }
    )

    return (
        <Box gap={'small'} flex={true}>
            <Box flex={false}>
                <Box><Text size={'medium'} weight={'bold'}>Add Members to Project</Text></Box>
                <Box><Text size={'small'} weight={'normal'}>Start typing to see
                    suggestions...</Text></Box>
            </Box>
            <Box width={'medium'} direction={'row'} pad={'none'} flex={false}>
                <Box flex={'grow'}>
                    <TextInput name={'userFilter'} id={'userFilter'} value={userFilter}
                               focusIndicator={false} placeholder={'Name or email'} defaultValue={''}
                               onChange={(ul) => updateUserList(ul.target.value)
                               }/>
                </Box>
            </Box>
            <Box flex={false} width={'medium'}  overflow={'scroll'}>
                {userListOut.length > 0 ? userListOut : userFilter.length > 2 ? `No users found matching "${userFilter}"` : "Enter a name or email to search for"}
            </Box>
        </Box>
    )
}
