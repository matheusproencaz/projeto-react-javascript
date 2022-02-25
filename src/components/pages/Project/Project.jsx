import { parse, v4 as uuidv4 } from 'uuid';
import styles from './Project.module.css';
import Loading from '../../layouts/Loading/Loading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../../layouts/Container/Container';
import ProjectForm from '../../projects/ProjectForm/ProjectForm';
import ServiceForm from '../../service/ServiceForm';
import ServiceCard from '../../service/ServiceCard';
import Message from '../../layouts/Message/Message';

function Project(){

    const { id } = useParams();
    const[project, setProject] = useState([]);
    const[services, setServices] = useState([]);

    const[showProjectForm, setShowProjectForm] = useState(false);
    const[showServiceForm, setShowServiceForm] = useState(false);
    
    const[message, setMessage] = useState();
    const[typeMessage, setTypeMessage] = useState();

    useEffect(() => {
        setTimeout(() => { 
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((er) => console.log(er))
    }, 300)
    }, [id]);

    function editPost(project){
        setMessage('');
        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setTypeMessage('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage('Projeto atualizado com Sucesso!');
            setTypeMessage('success');
        })
        .catch((e) => console.log(e));
    }

    function createService(project){
        setMessage('');
        //Last service
        //Dessa forma você pega o último serviço adicionado, ou seja, o atual.
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost;
        
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        //Maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento Ultrapassado, verifique o valor do serviço.');
            setTypeMessage('error');
            //Método .pop() retira o serviço que acabou de ser adicionado. Em uma array, ele retira o último valor do array.
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        //Update Project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setServices(data.services);
            setMessage('Serviço adicionado com sucesso');
            setTypeMessage('success');
            setShowServiceForm(false);            
        })
        .catch(err => console.log(err));
    }

    function removeService() {

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={typeMessage} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))}
                        {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>
    );
}

export default Project;