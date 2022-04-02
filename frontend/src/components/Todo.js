import axios from 'axios';
import React from 'react';

function TodoItem(props) {
    const deleteTodoHandler = (title) => {
        axios.delete(`http://localhost:8000/api/todo/${title}`)
        .then(res => console.log(res.data))}
    return (
        <div>

        <table style={{"width":"100%"}}>
            <tr>
                <td style={{"width":"25%", "textAlign": "left", "fontWeight": "bold"}}>
                    {props.todo.title}
                </td>
                <td style={{"width":"50%", "textAlign": "left"}}>
                    {props.todo.description}
                </td>
                <td style={{"width":"10%"}}>
                    <button onClick={() => deleteTodoHandler(props.todo.title)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>Delete
                    </button>
                </td>
            </tr>
        </table>
        <hr></hr>

        </div>
    )
}

export default TodoItem;