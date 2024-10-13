import {Datagrid, List, TextField, EditButton, TextInput, FunctionField} from "react-admin";
import React from "react";
import {ReferenceBridgeEdit} from "./component/ReferenceBridgeEdit";

const postFilters = [
    <TextInput source="q" label="Поиск" fullWidth={true} alwaysOn />,
];

export const MainCategoryList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" label={`Название`} />
            <FunctionField
                source="Категории"
                render={(record: any) => {
                    const { topCategory } = record;
                    const names = topCategory.map((item: { name: any; }) => item.name)
                    return  <span>{names.join(', ')}</span>
                }}
            />
            <TextField source="sorting" label={`Сортироква`} />
            <EditButton />
        </Datagrid>
    </List>
);
