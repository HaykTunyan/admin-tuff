import {
    Edit, FunctionField,
    SimpleForm,
    TextInput, Toolbar,
} from "react-admin";
import React, {useEffect} from "react";
import {PostTitle} from "../../helpers/component/post-title";
import {useMutation} from "react-query";
import {dataProvider} from "../../dataProvider";
import {GetListParams} from "ra-core/dist/cjs/types";
import { IReferenceManyReturn } from "../../helpers/interface";
import {ReferenceBridgeEdit} from "./component/ReferenceBridgeEdit";
import {PostSaveButton} from "../../helpers/component/save-button";

const PostEditToolbar = () => (
    <Toolbar>
        <PostSaveButton />
    </Toolbar>
)

let updateTopCategory: IReferenceManyReturn[] = [];
export const MainCategoryEdit = () => {

    const getTopCategory = (topCategoryData: IReferenceManyReturn) => {
        console.log('topCategoryData', topCategoryData);
        if(topCategoryData.name) {
            const itemIndex = updateTopCategory.findIndex((i) => i.name === topCategoryData.name);
            console.log('itemIndex', itemIndex);
            if(itemIndex >= 0){
                updateTopCategory[itemIndex] = topCategoryData;
            } else {
                updateTopCategory.push(topCategoryData);
            }
        }
        console.log('updateTopCategory', updateTopCategory);
    }

    const removeTopCategory = (id: string) => {
        updateTopCategory = updateTopCategory.filter((i) => i.name !== `topCat_${id}`);
        console.log('updateTopCategory', updateTopCategory);
    }

    const params: GetListParams = {
        pagination: {page: 1, perPage: 1000},
        sort: {field: 'id', order: 'ASC'},
        filter: {},
    }

    const { mutate, isLoading, data: dataCategory } = useMutation(
        () => dataProvider.getList('admin/category/top', params)
    );

    useEffect(() => {
        updateTopCategory = [];
        mutate()
    }, []);



    const transform = (data: any) => {
        console.log('transform', data)
        return  {
            ...data,
            topCategory: updateTopCategory,
        }
    }

    return (
        <Edit transform={transform} title={<PostTitle name={`Категория`} />}>
            <SimpleForm toolbar={<PostEditToolbar />}>
                <TextInput fullWidth={true} required={true} source="name" label={`Название`} />
                <TextInput source="sorting" label={`Сортироква`} />
                {dataCategory &&  <FunctionField
                    render={(record: any) => {
                        return  <ReferenceBridgeEdit
                            key={`FunctionFields_1`}
                            currentRecords={record.topCategory}
                            record={dataCategory}
                            getTopCategory={getTopCategory}
                            removeTopCategory={removeTopCategory} />
                    }}
                />}
            </SimpleForm>
        </Edit>
    )
}
