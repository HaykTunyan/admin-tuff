import {
    SimpleForm,
    TextInput,
    Create, ReferenceInput, AutocompleteInput,
} from "react-admin";
import React from "react";

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput multiline fullWidth={true} required={true} source="name" />
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
    </Create>
);
