import { useState, useEffect, useContext } from 'react';
import { getTasks, updateTaskStatus, createTask, getSelectOptions, modifyteTask, deleteTaskService } from '../services/taskService';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

const TaskTable = () => {
  const { user } = useContext( AuthContext );
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectOptions1, setSelectOptions1] = useState([]);
  //const [selectOptions2, setSelectOptions2] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', user_id: user.id, });
  //const [editTask, setEditTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
    fetchSelectOptions();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError('Failed to fetch tasks:' + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectOptions = async () => {
    try {
      const options = await getSelectOptions();
      console.log("🚀 ~ fetchSelectOptions ~ options:", options)
      setSelectOptions1(options.users);
      //setSelectOptions2(options.select2);
    } catch (error) {
      console.error('Error fetching select options:', error);
    }
  };

  const handleChangeStatus = (task) => {
    setCurrentTask(task);
    setSelectedOption1('');
    setSelectedOption2('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTaskStatus(currentTask.task.id, {
        user_id: selectedOption1,
        status: selectedOption2,
      });
      setShowModal(false);
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    if (newTask.title !== '') {
      try {
        await modifyteTask(newTask);
        setShowCreateModal(false);
        setNewTask({ title: '', description: '', user_id: user.id, });
        await fetchTasks();
      } catch (error) {
        console.error('Error creating task:', error);
      }
      return;
    }
    
    try {
      await createTask(newTask);
      setShowCreateModal(false);
      setNewTask({ title: '', description: '', user_id: user.id, });
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const editTaskFunction = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      id: task.id,
    })
    setShowCreateModal(true)
  }

  const closeModalshowCreateModal = () => {
    setShowCreateModal(false)
    setNewTask({ title: '', description: '', user_id: user.id, });
  }

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskService(taskId);
      
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
       <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Task
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>user last status</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task.id}>
              <td>{task.task.id}</td>
              <td>{task.task.title}</td>
              <td>{task.task.description}</td>
              <td>{task.task.users[0].name}</td>
              <td>{task.last_status}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Link to={`/history-task/${task.task.id}/${task.task.title}`}>
                    <button className="btn btn-primary btn-sm" title="View history">
                      <i className="fas fa-eye"></i>
                    </button>
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    title="Edit"
                    onClick={() => editTaskFunction(task.task)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Delete"
                    onClick={() => deleteTask(task.task.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleChangeStatus(task)}
                    title="Change Status"
                  >
                    <i className="fas fa-toggle-on"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Task Status</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Users</label>
                    <select
                      className="form-select"
                      value={selectedOption1}
                      onChange={(e) => setSelectedOption1(e.target.value)}
                    >
                      <option value="">Select</option>
                      {selectOptions1.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={selectedOption2}
                        onChange={(e) => setSelectedOption2(e.target.value)}
                        required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Modify Estatus
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

{showCreateModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModalshowCreateModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateTask}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, description: e.target.value }))
                      }
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                  {newTask.title === '' ? 'Save' : 'Modify'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
