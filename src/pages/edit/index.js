import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import './styles.css';
function Edit({match}){
    const [title,setTitlte] = useState();
    const [description,setDescription] = useState();
    const history = useHistory();
    const task_id = match.params.id;

    async function loadTask(){
        await api.get(`/api/v1/task/task/${task_id}`, {
            headers: {
                "Authorization": localStorage.getItem('access_token'),
            }, 
        }).then(response => {
            setTitlte(response.data.title);
            setDescription(response.data.description);
        })
    }
    function updateTask(){
        const data = {
            title,
            description
        }
        try{
            const res = api.patch(`/api/v1/task/task/${task_id}/`, data, {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                },
            });
            history.push('/home');
            console.log('cert')
        }catch(err){
            alert('Erro ao alterar');
        }
    }
    useEffect(() => {
        loadTask()
    }, [])
    return(
        <div className="container">
            <div className="content">
                <form onSubmit={updateTask}>
                <h1>Editar tarefa</h1>
                    <input 
                        placeholder="Título"
                        value={title}
                        onChange={e => setTitlte(e.target.value)}
                    />
                    <textarea
                        rows="3" 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="button" type="submit">Alterar</button>
                </form>
            </div>
        </div>
        
    );
}
export default Edit;