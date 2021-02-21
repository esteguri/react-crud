import { isEmpty } from 'lodash';
import React, {useState, useEffect} from 'react'
import { addDocument, editDocument, getCollection, deleteDocument } from './actions';


function App () {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [idEdit, setidEdit] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      const result = await getCollection('tasks');
      if(result.statusResponse){
        setTasks(result.data)
      }else{
        alert("Ocurrio un error al consultar las tareas 😒")
      }
      
    })()
  }, []);

  const validForm = () => {
    let isValid = true;
    if(isEmpty(task)){
      isValid = false;
    }
    setError(!isValid)
    return isValid
  }

  const addTask = async (e) => {
    e.preventDefault();
    
    if(!validForm()) return;

    const result = await addDocument("tasks", {
      name:task
    });

    if(result.statusResponse){
  
      setTasks([...tasks, {id:result.data.id, name: task}]);
      setTask('');
    }else{
      alert("Ocurrio un error al añadir la tarea 😒")
    }

    
  }

  const deleteTask = async (taskId) => {
    const result = await deleteDocument("tasks",taskId)
    if(result.statusResponse){
      setTasks(tasks.filter(task => task.id !== taskId))
    }else{
      alert("Ocurrio un error al eliminar la tarea 😒")
    }

  }

  const editTask = (task) => {
    
    setEditMode(true)
    setidEdit(task.id)
    setTask(task.name)
  }

  const saveEditTask = async (e) => {
    e.preventDefault();
    if(!validForm()) return;

    const result = await editDocument("tasks", idEdit, {
      name:task
    });

    if(result.statusResponse){
      const newTasks = tasks.map(t => {
        if(t.id === idEdit){
          t.name = task
        } 
        return t
      });
  
      setTasks(newTasks)
      setEditMode(false)
      setidEdit('');
      setTask('');
    }else{
      alert("Ocurrio un error al actualizar la tarea 😒")
    }

  }

  return (
    
    <div className="container">
      <h1 className="display-4">Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-sm-12 col-md-4 mb-5">
          <h2 className="text-center">{editMode ? 'Editar' : 'Agregar'} Tarea</h2>
          <form onSubmit={editMode ? saveEditTask : addTask}>
            <input className="form-control mb-2" 
             placeholder="Ingrese la tarea..." 
             type="text"
             onChange={(text) => setTask(text.target.value)} 
             value={task}
             >
              
             </input>
             {
                error && <div className="text-danger">Debes digitar el nombre de la tarea</div>
              }
            <button className={editMode ? "btn btn-info btn-block" : "btn btn-dark btn-block"} type="submit">{editMode ? 'Editar' : 'Agregar'}</button>
          </form>
        </div>
        <div className="col-sm-12 col-md-8 mb-5">
          <h2 className="text-center">Lista de Tareas</h2>
          {
            tasks.length > 0 ?
            (<ul className="list-group">
            {
              tasks.map(task => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => deleteTask(task.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-info btn-sm float-right" onClick={()=>editTask(task)}>
                    Editar
                  </button>
                </li>
              ))
              
            }
            </ul>) 
            : 
            (<h5 className="text-center">No hay tareas 😒</h5>)
          }
        </div>
       
      </div>
    </div>
  );
}

export default App;
