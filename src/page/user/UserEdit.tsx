import {
    AutocompleteInput,
    Edit, ReferenceInput,
    SimpleForm,
    TextInput,
} from "react-admin";
import React from "react";

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput multiline fullWidth={true} source="name" />
            <TextInput multiline fullWidth={true} source="quote" />
            <ReferenceInput
                label="Commentaries"
                source="commentariesId"
                reference="commentaries"
            >
                <AutocompleteInput
                    fullWidth={true}
                    optionText="name"
                />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
