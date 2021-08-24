import React, { memo, useRef, useState } from "react";
import Button from "../button/button";
import styles from "./card_add_form.module.css";

const CardAddForm = memo(({ FileInput, onAdd }) => {
  const formRef = useRef();
  const inputNameRef = useRef();
  const inputCompanyRef = useRef();
  const inputThemeRef = useRef();
  const inputTitleRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();

  const [file, setFile] = useState({fileName: null, fileURL: null});

  const onFileChange = file => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  };

  const onSubmit = event => {
    event.preventDefault();

    const card = {
      id: Date.now(),
      name: inputNameRef.current.value || '',
      company: inputCompanyRef.current.value || '',
      theme: inputThemeRef.current.value,
      title: inputTitleRef.current.value || '',
      email: inputEmailRef.current.value || '',
      message: inputMessageRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    };
    formRef.current.reset();
    setFile({fileName: null, fileURL: null});
    onAdd(card);
  };

  return (
    <form ref={formRef} className={styles.form}>
      <input ref={inputNameRef} className={styles.input} type="text" name="name" placeholder="Name"/>
      <input ref={inputCompanyRef} className={styles.input} type="text" name="company" placeholder="Company"/>
      <select ref={inputThemeRef} className={styles.select} name="theme">
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </select>
      <input ref={inputTitleRef} className={styles.input} type="text" name="title" placeholder="Title"/>
      <input ref={inputEmailRef} className={styles.input} type="text" name="email" placeholder="Email"/>
      <textarea ref={inputMessageRef} className={styles.textarea} name="message" placeholder="Message" />
      <div className={styles.fileInput}>
        <FileInput name={file.fileName} onFileChange={onFileChange}/>
      </div>
      <Button name="Add" onClick={onSubmit}/>
    </form>
  );

});

export default CardAddForm;