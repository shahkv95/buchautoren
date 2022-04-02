import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './components/TodoListView';

function App() {

  const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  // Read all todos 
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
    .then(res => {
      setTodoList(res.data)
    })
  });

  // Post a todo
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo/', { 'title': title, 'description': desc})
    .then(res => console.log(res))
  };

  // reseting the value of description placeholder when reset button is clicked
  const descInput = React.useRef();
  const clearInput = () => (descInput.current.value = "");

  return (
      <div className= "App list-group-item justify-content-center align-items-center mx-auto" style={{"width": "400px", "backgroundColor": "white", "marginTop": "15px"}}>

        <h1 className= "card text-white bg-primary mb-1" styleName="max-width: 20rem;">Task Manager</h1>

        <h6 className= "card text-white bg-primary mb-3">FARM Stack</h6>

        <div className= "card-body">

          <h5 className= "card text-white bg-dark mb-3">Add your task</h5>

          <form className= "card-text">

            <input className= "mb-2 form-control titleIn" placeholder='Title' onChange={event => setTitle(event.target.value)} value={title} required/>

            <input className= "mb-2 form-control descIn" placeholder='Description' onChange={event => setDesc(event.target.value)} ref={descInput}/>
            
            <button className= "btn btn-outline-primary mx-2 mb-3" style={{"font-weight": "bold"}} onClick={addTodoHandler} disabled={title === ""}>Add Task</button>

            <button className= "btn btn-outline-primary mx-2 mb-3" style={{"font-weight": "bold"}} onClick={clearInput}>Reset Description</button>

          </form>

          <h5 className= "card text-white bg-dark mb-3">Your Tasks</h5>

          <div>
            <TodoView todoList={todoList}/>
          </div>

        </div>

        <h6 className= "card text-dark bg-warning mb-0 py-1">Copyright 2022, All rights reserved &copy;</h6> 

      </div>
  );
}

export default App;
