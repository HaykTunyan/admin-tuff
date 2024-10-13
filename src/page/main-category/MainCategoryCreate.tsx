import {
    SimpleForm,
    TextInput,
    Create,
    useDataProvider,
} from "react-admin";
import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import { ReferenceManyInput } from "./component/ReferenceManyInput";
import {SanitizedBox} from "../../helpers/component/sanitized-box";
import { useMutation } from 'react-query';
import {GetListParams} from "ra-core/dist/cjs/types";
import {IReferenceManyInput, IReferenceManyReturn} from "../../helpers/interface";


let topCategory: IReferenceManyReturn[] = [];
export const MainCategoryCreate = () => {
    const [referenceMany, setReferenceMany] = useState<IReferenceManyInput[]>([])

    const getTopCategory = (topCategoryData: IReferenceManyReturn) => {
        if(topCategoryData.value && topCategoryData.name) {
            const itemIndex = topCategory.findIndex((i) => i.value === topCategoryData.value);
            if(itemIndex >= 0){
                topCategory[itemIndex] = topCategoryData;
            } else {
                topCategory.push(topCategoryData);
            }
        }
    }

    const removeTopCategory = (id: string) => {
        topCategory = topCategory.filter((i) => i.name !== `topCat_${id}`);
        const rm = referenceMany.filter((i) => i.id !== id);
        setReferenceMany(rm)
    }

    const dataProvider = useDataProvider();

    const params: GetListParams = {
        pagination: {page: 1, perPage: 1000},
        sort: {field: 'id', order: 'ASC'},
        filter: {},
    }

    const { mutate, isLoading, data: dataCategory } = useMutation<any>(
        () => dataProvider.getList('admin/category/top', params)
    );

    useEffect(() => {
        topCategory = [];
        mutate()
    }, []);


    const addNewRef = () => {
        const rowMany = referenceMany.concat([{id: Math.floor(Math.random() * 99999).toString(), category: '1', file: '1'}])
        setReferenceMany(rowMany)
    }

    const transform = (data: any) => {
        return {
            ...data,
            topCategory,
        }
    }

    return (
        <Create transform={transform}>
            <SimpleForm>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} type={`number`} />
                <SanitizedBox
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    justifyContent="space-between"
                >
                    {referenceMany.map((item) =>
                        <ReferenceManyInput
                            key={item.id}
                            item={item}
                            record={dataCategory}
                            getTopCategory={getTopCategory}
                            removeTopCategory={removeTopCategory} />
                    )}
                </SanitizedBox>
                <Button  name={`Add`} onClick={() => addNewRef()}>Добавить категорию</Button>
            </SimpleForm>
        </Create>
    )
}
