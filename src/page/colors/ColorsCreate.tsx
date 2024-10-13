import {
    SimpleForm,
    TextInput,
    Create,
    FormDataConsumer
} from "react-admin";
import { Stack, Box } from '@mui/material'

export const ColorsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
            <Stack direction="row" spacing={2} alignItems={'baseline'}>
                <TextInput source="color" required={true} label={`Цвет`}/>
                <FormDataConsumer<{color: string}>>
                    {({ formData }) => (
                        <Box bgcolor={formData.color || '#fff'} width={24} height={24} marginLeft={2} border="1px solid #ccc"/>
                    )}
                </FormDataConsumer>
            </Stack>
            <TextInput source="sorting" label={`Сортировка`} type={`number`} />
        </SimpleForm>
    </Create>
);
