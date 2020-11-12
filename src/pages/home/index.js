import React, {useState, useEffect} from 'react';
import './styles.css';
import {FiArrowLeft, FiArrowRight, FiPlusCircle} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

function Home() {
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    function alteraTodo(id){
        const to_do = 0;
        const doing = 1;
        const done = 0;
        const data = {
            to_do,
            doing,
            done
        }
        try{
            console.log(data)
            const res = api.patch(`/api/v1/task/task/${id}/`, data, {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                },
            });
            window.location.reload(); 
        }catch(err){
            alert('Erro ao alterar');
        }
    }
    function alteraDoing(id){
        const to_do = 0;
        const doing = 0;
        const done = 1;
        const data = {
            to_do,
            doing,
            done
        }
        try{
            console.log(data)
            const res = api.patch(`/api/v1/task/task/${id}/`, data, {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                },
            });
            window.location.reload(); 
        }catch(err){
            alert('Erro ao alterar');
        }
    }
    useEffect(() => {
            api.get('/api/v1/task/task/', {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                },
            }).then(response => {
                setTasks(response.data);
            });
    }, []);
  return (
    <div className="home-container">
        <div className="header-home">
            <h1>Lista de Tarefas</h1>
            <Link to="/create">
                <FiPlusCircle />
                Adicionar nova tarefa
            </Link>
        </div>
        <div className="home-content">
            <table>
                <td>
                    <th>A Fazer</th>
                    {tasks.filter(filterTask => filterTask.to_do == 1).map(task => (
                        
                        <tr key = {task.id}>
                            <div className="header-task">
                                <p className="title">{task.title}</p>
                                <span>{task.created_at}</span>
                            </div>
                            <div className="footer-task">
                                <Link to={`/profile/${task.id}`}>Detalhes</Link>
                                <Link to={`/edit/${task.id}`}>Editar</Link>
                                <Link onClick={() => alteraTodo(task.id)} refresh="true">
                                    Fazendo
                                    <FiArrowRight size={16} />
                                </Link>
                            </div>
                        </tr>
                    ) )}
                </td>
                
                <td>
                    <th>Sendo Feitos</th>
                    {tasks.filter(filterTask => filterTask.doing == 1).map(task => (
                        <tr key = {task.id}>
                            <div className="header-task">
                                <p className="title">{task.title}</p>
                                <span>{task.created_at}</span>
                            </div>
                            <div className="footer-task">
                                <Link to={`/profile/${task.id}`}>Detalhes</Link>
                                <Link to={`/edit/${task.id}`}>Editar</Link>
                                <Link onClick={() => alteraDoing(task.id)} refresh="true">
                                    Feito
                                    <FiArrowRight size={16} />
                                </Link>
                            </div>
                        </tr>
                    ) )}
                </td>

                <td>
                    <th>Feitos</th>
                    {tasks.filter(filterTask => filterTask.done == 1).map(task => (
                        <tr key = {task.id}>
                            <div className="header-task">
                                <p className="title">{task.title}</p>
                                <span>{task.created_at}</span>
                            </div>
                            <div className="footer-task">
                                <Link to={`/profile/${task.id}`}>Detalhes</Link>
                                <Link to={`/edit/${task.id}`}>Editar</Link>
                                <Link onClick={() => alteraTodo(task.id)} refresh="true">
                                    <FiArrowLeft size={16} />
                                    Fazendo
                                </Link>
                            </div>
                        </tr>
                    ) )}
                </td>
            </table>
        </div>
    </div>
    
  );
}

export default Home;
