import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import UserContext from "../context/usCtx"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

export default function HomePage() {
const navigate = useNavigate()
  const url = process.env.REACT_APP_BASE_URL
  const { token, setToken, recordsList, setRecordsList, setType, name } = useContext(UserContext)
  const [balance, setBalance] = useState(0)
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    setToken(localStorage.getItem("token"))
    if(!localStorage.getItem("token")){
      navigate("/")
    }
    const promise = axios.get(`${url}/records`, config)
    promise.then((a) => {
      const array = a.data
      const reverseArray = array.reverse()
      setRecordsList(reverseArray)
    })
    promise.catch(err => {console.log(err)})}, [])

    useEffect(() => {
      const totalIncome = recordsList
        .filter((t) => t.tipo === "entrada")
        .reduce((acc, t) => acc + t.value, 0);
      const totalExpense = recordsList
        .filter((t) => t.tipo === "saida")
        .reduce((acc, t) => acc + t.value, 0);
      setBalance(totalIncome - totalExpense);
    }, [recordsList]);

  function In() {
    setType("in")
    navigate("/newTransaction/in")
  }
  function Out() {
    setType("out")
    navigate("/newTransaction/out")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${name}`}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
        {recordsList.map(item => <Item key={item._id}
            value={item.valor}
            description={item.descricao}
            type={item.tipo}>
          </Item>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance() >= 0 }>{balance()}</Value>
        </article>
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

function Item(props) {
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
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
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