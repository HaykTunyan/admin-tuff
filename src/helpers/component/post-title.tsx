import {useRecordContext} from "react-admin";
import React from "react";

export const PostTitle = ({name}: {name?: string}) => {
    const record = useRecordContext();
    return <span>{name ? name : ''} {record ? `"${record.name}"` : ''}</span>;
};
