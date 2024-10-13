import {DeleteButton, SaveButton, SaveButtonProps, useNotify, useRedirect} from "react-admin";
import {SanitizedBox} from "./sanitized-box";

export const PostSaveButton = (props: JSX.IntrinsicAttributes & Pick<SaveButtonProps<any>, any>) => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (response: any) => {
        notify(`Post "${response.data.title}" saved!`);
        redirect('/posts');
    };
    return <SanitizedBox
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        fullWidth
    >
        <SaveButton alwaysEnable={true} {...props} />
        <DeleteButton/>
    </SanitizedBox>;
};
