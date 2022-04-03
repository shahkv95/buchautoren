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

        <h1 className= "card text-white bg-primary mb-1" styleName="max-width: 20rem;">Buchautoren</h1>

        <h6 className= "card text-white bg-primary mb-3 pt-1 pb-1">App for creating a list of books and their authors</h6>

        <div className= "card-body">

          <h5 className= "card text-white bg-dark mb-3  pt-1 pb-1">Add your book list</h5>

          <form className= "card-text">

            <input className= "mb-2 form-control titleIn" placeholder='Book title' onChange={event => setTitle(event.target.value)} value={title} required/>

            <input className= "mb-2 form-control descIn" placeholder='Author names' onChange={event => setDesc(event.target.value)} ref={descInput} disabled={title === ""}/>

            <button className= "btn btn-outline-primary mx-2 mb-3" style={{"font-weight": "bold"}} onClick={addTodoHandler} disabled={title === ""}>Add Details</button>

            <button className= "btn btn-outline-primary mx-2 mb-3" style={{"font-weight": "bold"}} onClick={clearInput} disabled={desc === ""}>Reset Form</button>

          </form>

          <h5 className= "card text-white bg-dark mb-3 pt-1 pb-1">Your books and authors</h5>

          <div>
            <TodoView todoList={todoList}/>
          </div>
        </div>
        <h6 className= "card text-dark bg-warning mb-0 py-1">Made with FARM Stack: FastAPI - React - MongoDB</h6>
      </div>
  );
}
export default App;