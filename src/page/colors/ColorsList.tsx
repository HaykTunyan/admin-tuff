import {Datagrid, List, TextField, EditButton, TextInput} from "react-admin";

const postFilters = [
    <TextInput source="q" label="Поиск" fullWidth={true} alwaysOn />,
];

export const ColorsList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" label={`Название`} />
            <TextField source="sorting" label={`Сортироква`} />
            <EditButton />
        </Datagrid>
    </List>
);
