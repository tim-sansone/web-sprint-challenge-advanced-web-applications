import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

import axios from "axios";
import axiosWithAuth from "../axios";

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate("/") }
  const redirectToArticles = () => { navigate("articles") }

  const logout = () => {
    localStorage.getItem("token") && localStorage.removeItem("token");
    setMessage("GoodBye!");
    redirectToLogin();
  }

  const login = ({ username, password }) => {
    setSpinnerOn(true);
    axios.post(loginUrl, { username, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setMessage(res.data.message);
        redirectToArticles();
        setSpinnerOn(false);
      })
      .catch(err => console.log(err))
  }

  const getArticles = () => {

    setMessage("");
    setSpinnerOn(true);
    axiosWithAuth().get("/articles")
      .then(res => {
        setArticles(res.data.articles);
        setMessage(res.data.message);
        setSpinnerOn(false);
      })
      .catch(err => {
        if(err.response.status === 401){
          redirectToLogin();
          setSpinnerOn(false);
        }
      })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage("");
    setSpinnerOn(true);
    axiosWithAuth().post("/articles", article)
      .then(res => {
        console.log(res)
        setSpinnerOn(false);
      })
      .catch(err => console.log(err))

  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm currentArticleId={currentArticleId}/>
              <Articles articles={articles} getArticles={getArticles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
