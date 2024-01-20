import React from 'react'

export default function Todo({todo,dispatch}) {
  return (
    <div>
        <label>
            <input 
            type="checkbox"
            checked= {todo.completed}
            onChange ={e => dispatch({type:'toggle',payload:{id:todo.id}})}/>
            {todo.name}
        </label>
    </div>
  )
}
