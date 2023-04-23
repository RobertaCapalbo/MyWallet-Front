import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext} from "react"
import axios from "axios"
import usDt from "../context/usDt"
import usCtx from '../context/usCtx';


export default function SignInPage() {

  const navigate = useNavigate();
  const loginInfos = {
    email,
    password
  }
  const {setToken} = useContext(usDt)
  let {email, setEmail, password, setPassword, setUsername} = useContext(usCtx);
  
  function handleForm(retorno){
    retorno.preventDefault();
    const promise = axios.post('http://localhost:5000/sign-in', loginInfos)
    promise.then(res => {setToken(res.data); navigate("/home"); setEmail('');
    setPassword('');setUsername(res.data.username);})
    promise.catch(err => {console.log(err)})}
  

  return (
    <SingInContainer>
      <form onSubmit={{handleForm}}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required onChange={(retorno) => setEmail(retorno.target.value)} value={email}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name='password' required onChange={(retorno) => setPassword(retorno.target.value)} value={password}/>
        <button>Entrar</button>
      </form>

      <Link>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
