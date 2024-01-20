import React from 'react'
import Todo from './Todo'

export default function TodoList({todos,dispatch}) {
 return (
    todos.map(t => < Todo key={t.id} todo={t} dispatch={dispatch}/>
        
    
    )
  )
}
