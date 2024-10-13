import {
    Edit,
    SimpleForm,
    TextInput,
} from "react-admin";
import React from "react";
import {PostTitle} from "../../helpers/component/post-title";



export const TopCategoryEdit = () => {
    return (
        <Edit title={<PostTitle name={`Категория`} />}>
            <SimpleForm>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} />
            </SimpleForm>
        </Edit>
    )
}
