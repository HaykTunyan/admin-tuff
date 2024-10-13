import { SelectInput } from "react-admin";
import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef, useState} from "react";
import { SanitizedBox } from "../../../helpers/component/sanitized-box";
import {
    IReferenceManyInputComponent,
    IReferenceManyReturn,
    ITopCategory,
} from "../../../helpers/interface";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 *
 * item: current value
 * record: all values
 */
//
export const ReferenceManyInput = (props: IReferenceManyInputComponent<ITopCategory, IReferenceManyReturn>) => {
    const {record: { data }, item: { id }, getTopCategory, removeTopCategory} = props;

    const inputElement = useRef<HTMLInputElement>(null);
    const [current, setSelectedImage] = useState<IReferenceManyReturn>({
        name: null,
        value: null,
        file: null,
    });

    useEffect(() => {
        getTopCategory(current)
    }, [current]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage({...current, file: event.target.files[0]});
        }
    };

    const handleChooseImage = () => {
        inputElement.current?.click();
    };

    const handleSelect = (e: { target: IReferenceManyReturn; }) => {
        const { name, value} = e.target;
        setSelectedImage({...current, name, value});
    };

    return (
        <SanitizedBox
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            border={`1px solid #6c5f5f`}
            borderRadius={`5px`}
            marginBottom={`20px`}
        >
            <SanitizedBox
                display="flex"
                flexDirection="column"
                width="200px"
                justifyContent="space-between"
                marginRight={`20px`}
            >
                <SelectInput
                    source={`topCat_${id}`}
                    onChange={(e) => handleSelect(e)}
                    // optionValue="id"
                    // defaultValue={data[3]['id']}
                    label={`Категория`}
                    choices={data}
                />
            </SanitizedBox>
            <SanitizedBox
                display="flex"
                flexDirection="row"
            >
                <input
                    // id='fileInput'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                    ref={inputElement}
                />
               <div className={`mainCategoryBlock`} onClick={() => handleChooseImage()}>
                   <img
                       src={current && current.file ? URL.createObjectURL(current.file) : ''}
                       className={`mainCategoryImage`}
                   />
               </div>
            </SanitizedBox>
            <IconButton
                aria-label="delete"
                color={`primary`}
                size="medium"
                onClick={(e) => removeTopCategory(id)}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </SanitizedBox>
    )
}
