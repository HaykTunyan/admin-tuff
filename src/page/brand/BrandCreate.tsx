import {
    SimpleForm,
    TextInput,
    Create,
    ImageInput,
    ImageField,
} from "react-admin";
import React from "react";

export const BrandCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
            <TextInput source="sorting" label={`Сортироква`} type={`number`} />
            <ImageInput source="image" label="Картинка">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
