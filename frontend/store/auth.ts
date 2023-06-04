import { defineStore } from 'pinia';
import { api } from '../api';


interface Auth {
    isAuthenticated: boolean,
    token: String,
    nome: String,
    email: String,
    id: Number
}

interface FormDataCreate {
    nome: string,
    email: string,
    senha: string
}

interface LoginInterface {
    access_token: string,
    token_type: string,
    expires_in: Number
}

export const useAuthStore = defineStore('auth', {
    state: ():Auth => ({
        isAuthenticated: false,
        token: '',
        nome: '',
        email: '',
        id: 0
    }),
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
        getNome: (state) => state.nome,
        getEmail: (state) => state.email,
        getId: (state) => state.id
    },
    actions: {
        
        async login(email:string, password:string): Promise<any> {
            return api<LoginInterface>(`user/login?email=${email}&password=${password}`, 'POST')
            .then(response => {
                if (response.status != 200) {
                    throw new Error();
                }
                return response.text();
            }).then(responseData => {
                const data = JSON.parse(responseData);
                this.isAuthenticated = true;
                this.token = "bearer " + data.access_token;
                return {
                    expires: data.expires_in,
                    valid: true
                };
            })
            .catch(error => {
                return {
                    valid: false
                };
            });
        },

        async create(formData: FormDataCreate) {
                console.log(formData.nome)
                return await api(
                    `user/create?
                    email=${formData.email}
                    &nome=${formData.nome}
                    &password=${formData.senha}`,
                    'POST'
                )
                .then(response => {
                    if (response.status != 200) {
                        throw new Error();
                    }
                    return response.text();
                })
                .then(responseData => {
                    const data = JSON.parse(responseData);
                    this.isAuthenticated = true;
                    this.id = data.id;
                    this.nome = data.nome;
                    this.email = data.email;
                    this.token = "bearer " + data.access_token;
                    return {
                        expires: data.expires_in,
                        valid: true
                    };
                })
                .catch(error => {
                    return {
                        valid: false
                    }
                })
        },

        authenticated(token: string) {
            this.isAuthenticated = true;
            this.token = token;
        }

    }
})

