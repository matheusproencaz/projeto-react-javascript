import Input from "../../form/Input/Input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm( { btnText }){

    return(
        <form className={styles.form}>
            <div>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto"/>
            </div>
            <div>
                <Input type="number" placeholder="Insira o orçamento total" name="budget" text="Orçamento do Projeto"/>
            </div>
            <div>
                <Select name="category_id" text="Selecione a categoria"/>
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    );

}

export default ProjectForm;