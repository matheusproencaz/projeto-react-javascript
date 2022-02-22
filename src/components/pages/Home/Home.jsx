import styles from "./Home.module.css";
import Savings from '../../../imgs/savings.svg'
import LinkButton from "../../layouts/LinkButton/LinkButton";


function Home(){

    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newProject" text="Criar Projeto"></LinkButton>
            <img src={Savings} alt="Costs" />
        </section>
        );
}
export default Home;