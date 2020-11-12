import React, {useState} from 'react';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import './styles.css';
function Create({match}){
    const [title,setTitlte] = useState();
    const [description,setDescription] = useState();
    const history = useHistory();
    async function handleCreate(e){
        e.preventDefault();
        const data = {
            title,
            description
        }
        try {
            const response = await api.post('/api/v1/task/task/', data, {
                headers: {
                    "Authorization": localStorage.getItem('access_token'),
                }
            });
            history.push('/home');
        } catch (error) {
            alert('Erro ao cadastrar!')
        }
    }
    return(
        <div className="container">
            <div className="content">
                <form onSubmit={handleCreate}>
                <h1>Adicionar nova tarefa</h1>
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
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
        
    );
}
export default Create;