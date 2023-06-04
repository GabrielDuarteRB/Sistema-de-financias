interface formDataInterface {
    nome: String,
    email: String,
    senha: String,
    confirmarSenha: String,
}

export const validarCadastro = (
    formData: formDataInterface
) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let error = {
        mensagem: '',
        nome: '',
        email: '',
        senha: ''
    }    

    if(formData.nome.length < 2) {
        error.nome = "Nome tem que possui no minimo 2 caracteres";
    }

    console.log(emailRegex.test(formData.email))

    if(formData.email == '' || !emailRegex.test(formData.email)) {
        error.email = "Email inválido";
    }

    if(formData.senha != formData.confirmarSenha) {
        error.senha = "As senhas precisam ser iguais";
    }

    if(formData.senha.length < 6) {
        error.senha = "A senha precisa ter mais de 6 digitos";
    }

    const notValid = Object.values(error).some(values =>{
        return values !== '';
    });

    if(notValid) {
        error.mensagem = "Preencha corretamente o formulario";
    }

    return {
        isValid: !notValid,
        error
    }
}