import {
    SimpleForm,
    TextInput,
    Create,
    ReferenceArrayInput,
    AutocompleteArrayInput,
} from "react-admin";
import React from "react";

export const LowCategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
            <TextInput source="sorting" label={`Сортироква`} type={`number`} />
            <ReferenceArrayInput
                label="Вид"
                source="subCategory"
                reference="admin/category/sub"
            >
                <AutocompleteArrayInput fullWidth={true} source="id" label="Вид" optionText="name"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
