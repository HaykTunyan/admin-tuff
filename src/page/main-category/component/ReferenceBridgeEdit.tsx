import React, { useState} from "react";
import {
    IReferenceManyBridgeInputComponent,
    IReferenceManyInput,
    IReferenceManyReturn,
    ITopCategory,
} from "../../../helpers/interface";
import {Button} from "@mui/material";
import {ReferenceManyInputEdit} from "./ReferenceManyInputEdit";
import uuid from 'react-uuid';

/**
 *
 * item: current value
 * record: all values
 */
//
export const ReferenceBridgeEdit = (props: IReferenceManyBridgeInputComponent<ITopCategory, IReferenceManyReturn>) => {
    const {record, currentRecords, getTopCategory, removeTopCategory} = props;

    const [referenceMany, setReferenceMany] = useState<IReferenceManyInput[]>(
        currentRecords.map((item) => {
            const {id, name, topMainCategory} = item;
            return {
                id,
                category: name,
                file: topMainCategory?.file || null
            }
        })
    )

    const addNewRef = () => {
        const rowMany = referenceMany.concat([{id: uuid(), category: '', file: ''}])
        setReferenceMany(rowMany)
    }

    const removeStateCategory = (id: string) => {
        const rm = referenceMany.filter((i) => i.id !== id);
        removeTopCategory(id);
        setReferenceMany(rm);
    }

    return (
        <>
            {record.data && referenceMany.map((item) => {
                return  <ReferenceManyInputEdit
                        key={item.id}
                        item={item}
                        record={record}
                        getTopCategory={getTopCategory}
                        removeTopCategory={removeStateCategory} />
                     })
            }

            <Button  name={`Add`} onClick={() => addNewRef()}>Добавить категорию</Button>
        </>
    )
}
