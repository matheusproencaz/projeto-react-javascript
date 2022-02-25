import { useState } from 'react';

import Input from '../form/Input/Input';
import SubmitButton from '../form/SubmitButton/SubmitButton';

import styles from '../projects/ProjectForm/ProjectForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }){

    const [service, setService] = useState({});

    const submit = (e) => {
        e.preventDefault();
        //Um projeto pode ter mais de um serviço, dessa forma é necessário criar um objeto que irá receber todos os serviços, assim, o
        // objeto services recebe todos os services.
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    //Os 3 pontos, são um spread operator, ele pega o objeto atual e "espalha" os elementos do objeto e assim qunado ele vai ser usado no input
    // ele pega o nome do serviço que chegou e atribui aos inputs, assim como os outros valores, isso acontece quando se altera o handleChange.

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ServiceForm;