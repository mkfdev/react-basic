import React, { useRef } from "react";
import Button from "../button/button";
import ImageFileInput from "../image_file_input/image_file_input";
import styles from "./card_edit_form.module.css";

const CardEditForm = ({ card, updateCard, deleteCard }) => {
  const formRef = useRef();
  const inputNameRef = useRef();
  const inputCompanyRef = useRef();
  const inputThemeRef = useRef();
  const inputTitleRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();

  const {name, company, title, email, message, theme, fileName, fileURL} = card;
  const onSubmit = () => {
    deleteCard(card);
  };

  const onChange = event => {
    if(event.currentTarget == null) {
      return;
    }

    event.preventDefault();
    updateCard({
      ...card,
      [event.currentTarget.name] : event.currentTarget.value,
    })
  };

  return (
    <form ref={formRef} className={styles.form}>
      <input ref={inputNameRef} onChange={onChange} className={styles.input} type="text" name="name" value={name}/>
      <input ref={inputCompanyRef} onChange={onChange} className={styles.input} type="text" name="company" value={company}/>
      <select ref={inputThemeRef} onChange={onChange} className={styles.select} name="theme" value={theme}>
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </select>
      <input ref={inputTitleRef} onChange={onChange} className={styles.input} type="text" name="title" value={title}/>
      <input ref={inputEmailRef} onChange={onChange} className={styles.input} type="text" name="email" value={email}/>
      <textarea ref={inputMessageRef} onChange={onChange} className={styles.textarea} name="message" value={message}/>
      <div className={styles.fileInput}>
        <ImageFileInput />
      </div>
      <Button name="Delete" onClick={onSubmit}/>
    </form>
  );
}

export default CardEditForm;