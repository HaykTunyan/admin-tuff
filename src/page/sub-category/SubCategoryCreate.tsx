import {
    SimpleForm,
    TextInput,
    Create,
    ReferenceArrayInput,
    AutocompleteArrayInput,
} from "react-admin";
import React from "react";

export const SubCategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
            <TextInput source="sorting" label={`Сортироква`} type={`number`} />
            <ReferenceArrayInput
                label="Подкатегория"
                source="mainCategory"
                reference="admin/category/main"
            >
                <AutocompleteArrayInput fullWidth={true} source="id" label="Подкатегория" optionText="name"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
