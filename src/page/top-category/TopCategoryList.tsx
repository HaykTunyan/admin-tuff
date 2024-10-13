import {Datagrid, List, TextField, EditButton, TextInput} from "react-admin";
import React from "react";

const postFilters = [
    <TextInput source="q" label="Поиск" fullWidth={true} alwaysOn />,
];

export const TopCategoryList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" label={`Название`} />
            <TextField source="sorting" label={`Сортироква`} />
            <EditButton />
        </Datagrid>
    </List>
);
