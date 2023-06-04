import { useAuthStore } from "../store/auth";
import cookieparser from 'cookieparser';

export default async function ({ req, redirect, route }){
    const auth = useAuthStore();
    let token;

    if(req) {
        const cookie = cookieparser.parse(req.headers.cookie);
        token = cookie.token || false;
        auth.authenticated(token);
    } else {
        token = auth.getToken;
    }
    
    if (!token && (route.path !== '/login' && route.path !== '/cadastrar')) {
        console.log('entrou aki')
        return redirect('/login');
    } 

    if(token && (route.path == '/login' || route.path == '/cadastrar')) {
        return redirect('/perfil');
    }
}
