<template>
    <FormUser :submitForm="submitForm">
        <template #texto>
            <h1>Formulário de login</h1>
            <p>Seja bem vindo ao sistema financeiro</p>
        </template>

        <template #formulario>
            <div v-if="error.length > 0" class="error">
                <font-awesome-icon icon="circle-xmark" style="color: #ad4b5c;" />
                <p>{{error}}</p>
            </div>
            <div>
                <font-awesome-icon class="svg-inputs" icon="envelope"/>
                <input 
                    type="text" 
                    v-model="email"
                    placeholder="Email*" 
                    name="email"
                >
            </div>
            <div>
                <font-awesome-icon class="svg-inputs" icon="key"/>
                <input 
                    :type=handlePassword.type 
                    v-model="senha"
                    placeholder="Password*" 
                    name="password"
                >
                <font-awesome-icon class="svg-eye" :icon=handlePassword.icon @click="passwordClick" />
            </div>
            <div class="textos-de-baixo">
                <a>Esqueceu a Senha?</a>
                <p>Não tem conta? <nuxtLink to="/cadastrar">Registre-se</nuxtLink></p>
            </div>
            <button @click="submitForm" class="envio">Entrar</button>
        </template>
    </FormUser>
</template>

<script lang="ts">
    import FormUser from '@/components/forms/FormUser.vue';
    import { useAuthStore } from "../store/auth";

    interface handlePasswordInterface {
        type: string,
        icon: string
    }
    
    interface ComponentData {
        email: String,
        senha: String,
        handlePassword: handlePasswordInterface,
        error: String
    }

    export default {
    data(): ComponentData {
        return {
            email: "",
            senha: "",
            handlePassword: {
                type: "password",
                icon: "eye-slash"
            },
            error: "",
        };
    },
    components: { FormUser },
    methods: {
        async submitForm() {
            this.error = "";
            const auth = useAuthStore();
            const {valid, expires} = await auth.login(this.email, this.senha)
            if(valid) {
                this.$saveCookie("token", auth.getToken, expires);
                this.$router.push("/perfil");
            } else {
                this.error = "Email ou senha inválidos!";
            }
        },

        passwordClick() {
            this.handlePassword.type = this.handlePassword.type === "password" ? "text" : "password";
            this.handlePassword.icon = this.handlePassword.type === "password" ? "eye-slash" : "eye";
        }
    }
}
</script>

<style scoped>
    .textos-de-baixo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    
    .textos-de-baixo span {
        color: blueviolet;
        cursor: pointer;
    }

    .textos-de-baixo a {
        color: blueviolet;
        cursor: pointer;
    }

    .content > p {
        margin-bottom: 16px;
    }
</style>