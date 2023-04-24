import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import UserContext from "./context/usCtx";
import { useState } from "react"


export default function App() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [username, setUsername]= useState([]);
  const [token, setToken]= useState([]);
  const [type, setType]= useState([]);
  const [confirmPassword, setconfirmPassword]= useState([]);
  const [name, setName]= useState([]);

const info = {setType, type, transactionList, setTransactionList, token, setToken, email, setEmail, password, setPassword, username, setUsername, confirmPassword, setconfirmPassword, name, setName}

  return (
    <UserContext.Provider value={info}>
    <PagesContainer>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
      </BrowserRouter>
    </PagesContainer>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
