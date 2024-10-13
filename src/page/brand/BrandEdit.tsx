import {
    Edit,
    ImageField,
    ImageInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import React from "react";
import {PostTitle} from "../../helpers/component/post-title";



export const BrandEdit = () => {
    return (
        <Edit title={<PostTitle name={`Категория`} />}>
            <SimpleForm>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} />
                <ImageInput source="file" label="Картинка">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Edit>
    )
}
