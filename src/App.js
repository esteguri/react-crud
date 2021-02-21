import { isEmpty } from 'lodash';
import React, {useState} from 'react'
import shortid from 'shortid';


function App () {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const addTask = (e) => {
    e.preventDefault();
    if(isEmpty(task)){
      console.log("Task empty")
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task,
    }

    setTasks([...tasks, newTask]);
    setTask('');
  }

  return (
    
    <div className="container">
      <h1 className="display-4">Tareas</h1>
      <hr/>
      <div className="row">
      <div className="col-sm-12 col-md-4 mb-5">
          <h2 className="text-center">Formulario</h2>
          <form onSubmit={addTask}>
            <input className="form-control mb-2" placeholder="Ingrese la tarea..." type="text" onChange={(text) => setTask(text.target.value)} value={task}></input>
            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
          </form>
        </div>
        <div className="col-sm-12 col-md-8">
          <h2 className="text-center">Lista de Tareas</h2>
          <ul className="list-group">
            {
              tasks.map(task => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                  <button className="btn btn-info btn-sm float-right">Editar</button>
                </li>
              ))
              
            }
          </ul>
        </div>
       
      </div>
    </div>
  );
}

export default App;
