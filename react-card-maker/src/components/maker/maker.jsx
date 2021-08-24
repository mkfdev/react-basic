import React, { useCallback, useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./maker.module.css";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({FileInput, authService, cardRepository}) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);
  //key는 card의 id

  const history = useHistory();

  const onLogout = useCallback(() => {
    authService.logout();
  },[authService]);

  const createOrUpdateCard = card => {
    // const updated = {...cards};
    // updated[card.id] = card;
    // setCards(updated);
     //prevState를 받아서 새로운 값으로 수정하기
     setCards(prevCards => {
      const updated = {...prevCards};
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = card => {
    setCards(prevCards => {
      const updated = {...prevCards};
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  useEffect(()=>{
    if(!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    });

    //unmount -> resource memory정리
    return () => stopSync();
  }, [userId, cardRepository]);

  //로그아웃 후 user가 없으면 home으로 이동
  useEffect(() => {
    authService.onAuthChange(user => {
      if(user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    })
  }, [userId, history, authService]);
  
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