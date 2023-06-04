<template>
    <div class="formLogin">
        <div class="texto-superior">
            <slot name="texto"></slot>
        </div>
        <form @submit.prevent="submitForm">
            <slot name="formulario"/>
        </form>
    </div>
</template>

<script lang="ts">
    export default {
        name: "FormUser",
        props: {
            submitForm: Function
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }

    .formLogin{
        align-items: center;
        background: #DAEDF7;
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: center;
    }

    .texto-superior {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
    }

    form {
        display: flex;
        gap: 16px;
        flex-direction: column;
    }

    form > div {
        position: relative;
    }

    input {
        border: 2px solid #DCDCDC;
        border-radius: 8px;
        height: 50px;
        padding-left: 64px;
        margin-bottom: 16px;
        width: 436px;
    }

    input:focus{
        border: 2px solid #ce9898;
        outline: none;
    }

    input::placeholder {
        color: #DCDCDC;
        display: flex;
        justify-content: center;
        font-size: 20px;
    }

    .svg-inputs {
        border-right: 1px solid #DCDCDC;
        bottom: 46%;
        color: #dcdcdc;
        font-size: 18px;
        height: 24px;
        padding-right: 16px;
        left: 16px;
        position: absolute;
    }

    .svg-eye {
        color: #dcdcdc;
        cursor: pointer;
        bottom: 50%;
        left: 92%;
        position: absolute;
    }

    button {
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 20px;
        height: 50px;
        width: 508px;
    }

    .envio {
        background: #00C957;
        color: white;
    }

    .error {
        align-items: center;
        background: #F7C7CE;
        border-radius: 8px;
        color: #AD4B5C;
        display: flex;
        margin-bottom: 8px;
        padding: 16px 0;
    }

    .error svg {
        padding-left: 18px;
    }

    .error p {
        margin-left: 16px;
    }

    .textError {
        color: #AD4B5C;
        margin-top: -24px;
    }

    @media(max-width: 524px) {
        h1 {
            font-size: 24px;
        }

        form {
            align-items: center;
        }

        input {
            width: 270px;
        }

        input::placeholder {
            font-size: 16px;
        }

        .svg-inputs {
            border-right: 1px solid #DCDCDC;
            font-size: 14px;
        }

        button {
            width: 340px;
        }
    }
</style>