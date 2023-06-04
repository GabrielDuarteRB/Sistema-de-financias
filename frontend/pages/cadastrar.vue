<template>
    <FormUser :submitForm="submitForm">
        <template #texto>
            <h1>Formulário de Cadastro</h1>
        </template>

        <template #formulario>
            <div v-if="error.mensagem" class="error">
                <p>{{ error.mensagem }}</p>
            </div>
            <div>
                <font-awesome-icon class="svg-inputs" icon="user" />
                <input 
                    type="text"
                    placeholder="Nome de usuario*"
                    v-model="formData.nome"
                >
            </div>
            <p class="textError" v-if="error.nome">{{error.nome}}</p>
            <div>
                <font-awesome-icon class="svg-inputs" icon="envelope"/>
                <input 
                    type="text"
                    placeholder="Email*"
                    v-model="formData.email"
                >
            </div>
            <p class="textError" v-if="error.email">{{error.email}}</p>
            <div>
                <font-awesome-icon class="svg-inputs" icon="key"/>
                <input 
                    :type=handlePassword.type
                    placeholder="Senha*"
                    v-model="formData.senha"
                >
                <font-awesome-icon class="svg-eye" :icon=handlePassword.icon @click="passwordClick" />
            </div>
            <p class="textError" v-if="error.senha">{{error.senha}}</p>
            <div>
                <font-awesome-icon class="svg-inputs" icon="key"/>
                <input 
                    :type=handlePassword.type
                    placeholder="Confirmar senha*"
                    v-model="formData.confirmarSenha"
                >
                <font-awesome-icon class="svg-eye" :icon=handlePassword.icon @click="passwordClick" />
            </div>
            <p class="textError" v-if="error.senha">{{error.senha}}</p>

            <button class="envio" @submit="submitForm">Cadastrar</button>
        </template>
    </FormUser>
</template>

<script>
    import FormUser from '~/components/forms/FormUser.vue';
    import {validarCadastro} from '@/helpers/Form/ValidarFormulario'
    import { useAuthStore } from '~/store/auth';

    export default {
        components: { FormUser },
        data(){
            return {
                auth: useAuthStore(),
                error: {
                    mensagem: '',
                    nome: '',
                    email: '',
                    senha: ''
                },
                formData: {
                    nome: '',
                    email: '',
                    senha: '',
                    confirmarSenha: '',
                },                
                handlePassword: {
                    type: "password",
                    icon: "eye-slash"
                },
            }
        },  
        methods: {
            async submitForm() {
                const {isValid, error} = validarCadastro(this.formData)
                this.error = error;
                if(!isValid) return;                
                const {valid, expires} = await this.auth.create(this.formData);
                if(valid) {
                    this.$saveCookie("token", this.auth.getToken, expires);
                    this.$router.push("/perfil");
                }
            },

            passwordClick() {
                this.handlePassword.type = this.handlePassword.type === "password" ? "text" : "password";
                this.handlePassword.icon = this.handlePassword.type === "password" ? "eye-slash" : "eye";
            }
        }
    }
</script>