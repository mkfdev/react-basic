import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./maker.module.css";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({FileInput, authService}) => {
  const [cards, setCards] = useState({
    '1': {
      id: '1', 
      name: 'Ellie: Dream Coding', 
      company:'Samsung', 
      theme: 'dark', 
      title:"Software Engineer", 
      email:'ellie@gmail.com', 
      message:'go for it', 
      fileName:'ellie', 
      fileURL: null 
    },
    '2': {
      id: '2', 
      name: 'Bob: Dream Coding', 
      company:'Samsung', 
      theme: 'light', 
      title:"Software Engineer", 
      email:'ellie@gmail.com', 
      message:'go for it', 
      fileName:'ellie', 
      fileURL: null 
    },
    '3': {
      id: '3', 
      name: 'Chris: Dream Coding',
      company:'Samsung', 
      theme: 'colorful', 
      title:"Software Engineer", 
      email:'ellie@gmail.com', 
      message:'go for it', 
      fileName:'ellie', 
      fileURL: null 
    }
  });
  //key는 card의 id

  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  const createOrUpdateCard = card => {
    // const updated = {...cards};
    // updated[card.id] = card;
    // setCards(updated);
     //prevState를 받아서 새로운 값으로 수정하기
     setCards(prevCards => {
      const updated = {...prevCards};
      updated[card.id] = card;
      return updated;
    })
  };

  const deleteCard = card => {
    setCards(prevCards => {
      const updated = {...prevCards};
      delete updated[card.id];
      return updated;
    })
  };

  //로그아웃 후 user가 없으면 home으로 이동
  useEffect(() => {
    authService.onAuthChange(user => {
      if(!user) {
        history.push('/');
      }
    })
  });
  
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout}/>
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards} 
          addCard={createOrUpdateCard} 
          updateCard={createOrUpdateCard} 
          deleteCard={deleteCard}
        />
        <Preview cards={cards}/>
      </div>
      <Footer/>
    </section>
  )
};

export default Maker;