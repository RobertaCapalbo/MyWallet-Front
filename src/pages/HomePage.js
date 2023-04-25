import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import UserContext from "../context/usCtx"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

export default function HomePage() {
  const navigate = useNavigate()
  const { setToken, transactionList, setTransactionList, setType, name } = useContext(UserContext)
  const [balance, setBalance] = useState(0)
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
    }
    setToken(localStorage.getItem("token"))
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const promise = axios.get("http://localhost:5000/records", config)
    promise.then((resposta) => {
      const array = resposta.data
      const reverse = array.reverse()
      setTransactionList(reverse)
    })
    promise.catch((resposta) => {
      console.log(resposta.message)
    })
  }, [])

  useEffect(() => {
    const array = transactionList
    let finalValue = 0
    array.forEach((resposta) => {
      if (resposta.type === "in") {
        finalValue = finalValue + resposta.value
        setBalance(finalValue.toFixed(2))
      }
      else if (resposta.type === "out") {
        finalValue = finalValue - resposta.value
        setBalance(finalValue.toFixed(2))
      }
    })
  }, [transactionList])

  function In() {
    setType("in")
    navigate("/nova-transacao/in")
  }
  function Out() {
    setType("out")
    navigate("/nova-transacao/out")
  }

  function logout() {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${name}`}</h1>
        <BiExit onClick={logout} />
      </Header>
      <TransactionsContainer>
        <ListContainer>
          <ul>
            {transactionList.map((resposta) => <Transactions
              balance={balance}
              setBalance={setBalance}
              key={resposta._id}
              value={resposta.value}
              description={resposta.description}
              type={resposta.type}
              date={resposta.date} />)}
          </ul>
        </ListContainer>
        <SaldoContainer>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>{balance}</Value>
        </SaldoContainer>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={In}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={Out}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

function Transactions(props) {
  const { value, description, type, date } = props

  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{description}</strong>
      </div>
      <Value color={type === "in" ? "positivo" : "negativo"}>{value}</Value>
    </ListItemContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  position:relative;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  justify-content: space-between;
  article {
    position: absolute;
    bottom: 10px;
    left: 16px;
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const ListContainer = styled.div`
  overflow-y:scroll;
  margin-bottom:16px;
  article {
    position: absolute;
    bottom: 10px;
    left: 16px;
    display: flex;
    justify-content: space-evenly;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const SaldoContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 16px;
  display: flex;
  justify-content: space-between;   
  strong {
    font-weight: 700;
    text-transform: uppercase;
  }
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
  margin-left: 10px;
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`