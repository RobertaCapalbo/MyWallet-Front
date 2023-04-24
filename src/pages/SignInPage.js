import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext} from "react"
import axios from "axios"
import UserContext from '../context/usCtx.js';


export default function SignInPage() {
  let {email, setEmail, password, setPassword, setUsername, setToken} = useContext(UserContext);
  const navigate = useNavigate();
  const loginInfos = {
    email,
    password
  }
  
  function handleForm(retorno){
    retorno.preventDefault();
    const promise = axios.post('http://localhost:5000/sign-in', loginInfos)
    promise.then(res => {setToken(res.data); navigate("/home"); setEmail('');
    setPassword('');setUsername(res.data.username);})
    promise.catch(err => {console.log(err)})}
  

  return (
    <SingInContainer>
      <form onSubmit={handleForm}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required onChange={handleForm} value={email}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name='password' required onChange={handleForm} value={password}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
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
