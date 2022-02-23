import { useState, useEffect } from "react";
import Input from "../../form/Input/Input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm( { btnText }){

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setCategories(data)
          })
          //.catch(err => console.log(err))
    }, [])
   
    return(
        <form className={styles.form}>
            <div>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto"/>
            </div>
            <div>
                <Input type="number" placeholder="Insira o orçamento total" name="budget" text="Orçamento do Projeto"/>
            </div>
            <div>
                <Select name="category_id" text="Selecione a categoria" options={categories}/>
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    );

}

export default ProjectForm;