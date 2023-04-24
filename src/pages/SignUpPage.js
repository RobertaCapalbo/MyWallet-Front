import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { Link, useNavigate } from "react-router-dom"
import { useContext} from "react"
import axios from "axios"
import UserContext from '../context/usCtx.js';

export default function SignUpPage() {

  const navigate = useNavigate();
  const {email, setEmail, password, setPassword, name, setName, confirmPassword, setconfirmPassword} = useContext(UserContext);
  const signupInfos = {
      name,
      email,
      password,
      confirmPassword
  }

  function handleForm(retorno){
    retorno.preventDefault();
    const promise = axios.post('http://localhost:5000/sign-up', signupInfos)
    promise.then(res => {setName(''); navigate('/'); setEmail(''); setPassword(''); setconfirmPassword('');})
    promise.catch(err => {console.log(err)});
}

  

  return (
    <SingUpContainer>
      <form onSubmit={handleForm}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name='name' required value={name} onChange={handleForm}/>
        <input placeholder="E-mail" type="email" name='email' required value={email} onChange={handleForm}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name='password' required value={password} onChange={handleForm}/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" name='password' required  value={confirmPassword} onChange={handleForm}/>
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
