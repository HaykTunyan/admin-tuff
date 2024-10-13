import {
    SimpleForm,
    TextInput,
    Create,
} from "react-admin";
import React from "react";

export const MaterialsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
            <TextInput source="sorting" label={`Сортироква`} type={`number`} />
        </SimpleForm>
    </Create>
);
