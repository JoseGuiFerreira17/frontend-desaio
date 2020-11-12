import React, {useState, useEffect} from 'react';
import {FiXCircle, FiCheckCircle} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api'

function Profile({match}){
    const [title,setTitlte] = useState();
    const [description,setDescription] = useState();
    const [todo, setTodo] = useState();
    const [doing, setDoing] = useState();
    const [done, setDone] = useState();
    const history = useHistory();

    async function loadTask(){
        await api.get(`/api/v1/task/task/${match.params.id}`, {
            headers: {
                "Authorization": localStorage.getItem('access_token'),
            }, 
        }).then(response => {
            setTitlte(response.data.title);
            setDescription(response.data.description);
            setTodo(response.data.to_do);
            setDoing(response.data.doing);
            setDone(response.data.done);
        })
    }

    async function deleteTask() {
        try{
            await api.delete(`/api/v1/task/task/${match.params.id}`, {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                },
            });
            history.push('/home');
        }catch(err){
            alert('Erro ao deletar');
        }
    }
    useEffect(() => {
        loadTask()
    }, [])
    return(
        <div className="profile-container">
            <div className="profile-content">
                <h1>{title}</h1>
                <p>
                    {description} 
                </p>
                <div className="done">
                    {todo == 1
                    ?
                        <a href="">
                            A fazer
                            <FiCheckCircle size="18" color="green"/>
                        </a>
                    :
                        <a href="">
                            A fazer
                            <FiXCircle size="18" color="#e02041"/>
                        </a>
                    }

                    {doing==1
                    ?
                        <a href="">
                            Sendo feita
                            <FiCheckCircle size="18" color="green"/>
                        </a>
                    :
                        <a href="">
                            Sendo feita
                            <FiXCircle size="18" color="#e02041"/>
                        </a>
                    }

                    {done==1
                    ?     
                        <a href="">
                            Feita
                            <FiCheckCircle size="18" color="green"/>
                        </a>
                    :
                        <a href="">
                            Feita
                            <FiXCircle size="18" color="#e02041"/>
                        </a>
                    }
                </div>
                <div className="footer-profile">
                    <a onClick={deleteTask}>Apagar tarefa</a>
                    <Link to={'/home'}>Voltar</Link>
                </div>
            </div>
        </div>
    );
}
export default Profile;