import {Datagrid, List, TextField, EditButton, TextInput, FunctionField} from "react-admin";
import React from "react";

const postFilters = [
    <TextInput source="q" label="Поиск" fullWidth={true} alwaysOn />,
];

export const LowCategoryList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" label={`Название`} />
            <FunctionField
                source="Вид"
                render={(record: any) => {
                    const { subCategory } = record;
                    const names = subCategory.map((item: { name: any; }) => item.name)
                    return  <span>{names.join(', ')}</span>
                }}
            />
            <TextField source="sorting" label={`Сортироква`} />
            <EditButton />
        </Datagrid>
    </List>
);
