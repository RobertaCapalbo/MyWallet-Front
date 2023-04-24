import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import UserContext from '../context/usCtx.js';
import { useState, useContext } from "react"


export default function SignInPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [isDisabled, setIsDisabled] = useState(false)
  const { token, setToken, name, setName } = useContext(UserContext)
  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  function signIn(e) {
    e.preventDefault()
    const promise = axios.post("http://localhost:5000/sign-in", form)
    setIsDisabled(true)
    promise.then((a) => {
      setIsDisabled(false)
      setToken(a.data.token)
      setName(a.data.name)
      localStorage.setItem("token", a.data.token)
      console.log("name", a.data.name)
      console.log("localstorage", localStorage.getItem("token"))
      navigate("/home")
    })
    promise.catch((a) => {
      alert(a.message)
      console.log(a)
      setIsDisabled(false)
    })
    
  }
  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required onChange={handleForm} value={form.email} name={"email"}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name={"password"} required onChange={handleForm} value={form.password}/>
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
