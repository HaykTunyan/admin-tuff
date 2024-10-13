import { fetchUtils } from "react-admin";
import decodeJwt from 'jwt-decode';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_APP_API_URL;
const httpClient = fetchUtils.fetchJson;

export const authProvider = {
    login: async (data: any) => {
       try {
           const {username, password} = data;
           const res = await httpClient(`${apiUrl}/admin/auth/verification`, {
               method: 'POST',
               body: JSON.stringify({email: username, password}),
           });

           if(res.status === 200 || res.status === 201) {
               const { json: { accessToken, refreshToken } } = res;
               localStorage.setItem("accessToken", `Bearer ${accessToken}`);
               localStorage.setItem("refreshToken", `Bearer ${refreshToken}`);
               localStorage.setItem("username", username);
               return Promise.resolve();
           } else {
               return Promise.reject('Wrong email or password');
           }
       } catch (e) {
           return Promise.reject('Something went wrong');
       }
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: (params: any) => {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
    getIdentity: () => {
        try {
            const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.split(' ')[1] as string : '';
            const { f_name, l_name } = decodeJwt(token) as {f_name: string; l_name: string};
            return Promise.resolve({ id: 1, fullName: `${f_name} ${l_name}` });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};
