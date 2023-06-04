 import { useAuthStore } from "./store/auth";

export const api = async <T> (url: string, method: string = 'GET', options:RequestInit  = {}) => {
    const auth = useAuthStore();
    const newURL: string | undefined = `${process.env.URL_API}${url}`;
    const token: any = auth.getToken;
    let headers: HeadersInit

    if(token != '') {
        headers  = {
            ...options.headers,
            Authorization: token
        }
    } else {
        headers  = {
            ...options.headers,
        }
    }
    
    const fetchOptions: RequestInit  = {
        ...options,
        headers,
        method
    };

    return fetch(newURL, fetchOptions)  
}