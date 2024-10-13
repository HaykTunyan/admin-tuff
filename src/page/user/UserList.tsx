import {Datagrid, List, TextField, TextInput} from "react-admin";

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
];

export const UserList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField label={`Email`} source="email" />
            <TextField label={`First name`} source="f_name" />
            <TextField label={`Last Name`} source="l_name" />
        </Datagrid>
    </List>
);
