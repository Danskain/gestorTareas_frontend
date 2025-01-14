import { useState, useEffect } from 'react';
import { getHistoryTask } from '../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';



export const HistoryTask = () => {

  const { id, title } = useParams();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  }


  const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const data = await getHistoryTask(id);
          console.log("🚀 ~ getHistoryTask ~ data:", data)
          setTasks(data);
        } catch (error) {
          setError('Failed to fetch tasks:' + error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTasks();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
  return (
    
      <div className="container mt-4">
    <h2 className="mb-3">{`Task History ${title}`}</h2>
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
      <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Estatus</th>
          <th>fecha de creacion</th>
          <th>fecha de cambio de estado</th>
        </tr>
      </thead>
      <tbody>
        {tasks.task.users.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.email}</td>
            <td>{task.pivot.status}</td>
            <td>{task.created_at}</td>            
            <td>{task.pivot.updated_at}</td>            
          </tr>
        ))}
      </tbody>
    </table>
        <button 
          className="btn btn-outline-primary"
          onClick={ onNavigateBack }
        >
          Regresar
        </button>
  </div>


      

    
  )
}