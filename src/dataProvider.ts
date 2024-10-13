import { fetchUtils } from "react-admin";
import { stringify } from "query-string";


// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_APP_API_URL;
const httpClient = fetchUtils.fetchJson;

export const dataProvider= {
    getList: (resource: any, params: any) => {
        console.log('getList', params)
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        // if(resource === 'category') {
        //     field = 'sort';
        //     order = 'DESC';
        // } else {
        //     if(field === 'id') {
        //         field = 'createdAt';
        //         order = 'DESC';
        //     }
        // }
        const query = {
            sort: JSON.stringify([field === 'id' ? 'sorting' : field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            }
        }).then(({ headers, json }) => {
            console.log('json', json)
            return {
                data: json.rows,
                total:json.count,
            }
        });

        // return httpClient(url).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    },

    getOne: (resource: any, params: any) => {
        if(resource === 'works') {
            resource = 'works/ra';
        }
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            }
        }).then(({ json }) => ({
            data: json,
        }));
    },

    getMany: (resource: any, params: any) => {
        // console.log('getMany', resource)
        // const query = {
        //     filter: JSON.stringify({ id: params.ids }),
        // };
        const url = `${apiUrl}/${resource}/many/?ids=${params.ids.join()}`;
        return httpClient(url, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            }
        }).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: any, params: any) => {
        console.log('getManyReference', resource)
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            }
        }).then(({ headers, json }) => ({
            data: json,
            total: 1, //parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    create: (resource: any, params: any) => {
        let body: FormData | string = JSON.stringify(params.data);
        console.log('params', params);

        if(resource === 'admin/category/main') {
            const formData = new FormData();
            const { data } = params;

            for (const key in data) {
                if(key === 'topCategory' ) {
                    console.log('topCategory params', data['topCategory']);
                    for (const index in data[key]) {
                        formData.append('images', data[key][index]['file']);
                        formData.append(`topCategory[${index}][id]`, data[key][index]['value'])
                        formData.append(`topCategory[${index}][fileName]`,  data[key][index].file?.name || '')
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            body = formData;
        }

        if(resource === 'admin/brand') {
            const formData = new FormData();
            const { data } = params;

            for (const key in data) {
                if(key === 'image' ) {
                    formData.append(key, data[key]['rawFile']);
                } else {
                    formData.append(key, data[key]);
                }
            }

            body = formData;
        }

        return httpClient(`${apiUrl}/${resource}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            },
            method: 'POST',
            body: body,
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

    update: (resource: any, params: any) => {
        let body: FormData | string = JSON.stringify(params.data);
        console.log('params', params);

        if(resource === 'admin/category/main') {
            const formData = new FormData();
            const { data } = params;

            for (const key in data) {
                if(key === 'topCategory' ) {
                    console.log('topCategory params', data['topCategory']);
                    for (const index in data[key]) {
                        if(data[key][index]['file'] && !data[key][index]['file']['id']) {
                            formData.append('images', data[key][index]['file']);
                            formData.append(`topCategory[${index}][fileName]`,  data[key][index].file?.name || '')
                        }
                        const from = data[key][index]['name'].split('_')[1]
                        formData.append(`topCategory[${index}][id]`, from)
                        formData.append(`topCategory[${index}][to]`, data[key][index]['value'])

                    }
                } else {
                    formData.append(key, data[key]);
                }
            }

            body = formData;
        }

        if(resource === 'admin/brand') {
            const formData = new FormData();
            const { data } = params;

            for (const key in data) {
                if(key === 'file' ) {
                    formData.append('image', data[key]['rawFile']);
                } else {
                    formData.append(key, data[key]);
                }
            }

            body = formData;
        }

        if(resource === 'admin/category/sub') {
            if(params.data.mainCategory && params.data.mainCategory.length > 0) {
                params.data.mainCategory = params.data.mainCategory.map((i: {id: string}) => i.id);
                body = JSON.stringify(params.data);
            }
        }

        if(resource === 'admin/category/low') {
            if(params.data.subCategory && params.data.subCategory.length > 0) {
                params.data.subCategory = params.data.subCategory.map((i: {id: string}) => i.id);
                body = JSON.stringify(params.data);
            }
        }

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            },
            method: 'PUT',
            body: body,
        }).then(({ json }) => {
            console.log(json)
            return { data: json }
        })
    },

    updateMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            },
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/delete/${params.id}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            },
            method: 'Delete',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: any, params: any) => {
        return httpClient(`${apiUrl}/${resource}/deletes/?ids=${params.ids.join()}`, {
            user: {
                authenticated: true,
                token: localStorage.getItem('accessToken') || undefined
            },
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};
