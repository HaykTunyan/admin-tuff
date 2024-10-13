import {
    AutocompleteArrayInput,
    Edit,
    ReferenceArrayInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import React from "react";
import {PostTitle} from "../../helpers/component/post-title";



export const SubCategoryEdit = () => {
    return (
        <Edit title={<PostTitle name={`Категория`} />}>
            <SimpleForm>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} />
                <ReferenceArrayInput
                    label="Подкатегория"
                    source="mainCategoryIds"
                    reference="admin/category/main"
                >
                    <AutocompleteArrayInput fullWidth={true} label="Подкатегория" optionText="name"/>
                </ReferenceArrayInput>
            </SimpleForm>
        </Edit>
    )
}
