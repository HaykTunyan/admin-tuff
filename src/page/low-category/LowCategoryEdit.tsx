import {
    AutocompleteArrayInput,
    Edit,
    ReferenceArrayInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import React from "react";
import {PostTitle} from "../../helpers/component/post-title";



export const LowCategoryEdit = () => {
    return (
        <Edit title={<PostTitle name={`Категория`} />}>
            <SimpleForm>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} />
                <ReferenceArrayInput
                    label="Вид"
                    source="subCategoryIds"
                    reference="admin/category/sub"
                >
                    <AutocompleteArrayInput fullWidth={true} label="Вид" optionText="name"/>
                </ReferenceArrayInput>
            </SimpleForm>
        </Edit>
    )
}
