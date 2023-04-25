import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import UserContext from '../context/usCtx.js';

export default function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: ""})
  const [isDisabled, setIsDisabled] = useState(false)
  let repeatPassword = ""
  function handleForm(event) {
    if(event.target.name === "repeatPassword"){
      repeatPassword = event.target.value
      console.log(repeatPassword)
      console.log(process.env.REACT_APP_BASE_URL)
    }
    else{
      setForm({ ...form, [event.target.name]: event.target.value })
      console.log(form)
    }
    
  }
  function signUp(e) {
    e.preventDefault()
    if(form.password !== repeatPassword){
     return alert("Senhas diferentes")
    }
    
    const promise = axios.post("http://localhost:5000/sign-up", form)
    setIsDisabled(true)
    promise.then((a) => {
      navigate("/")
      setIsDisabled(false)
    })
    promise.catch((a) => {
      alert(a)
      setIsDisabled(false)
    })
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name='name' required onChange={handleForm}/>
        <input placeholder="E-mail" type="email" name='email' required onChange={handleForm}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name='password' required onChange={handleForm}/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required  name={"repeatPassword"} onChange={handleForm}/>
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
