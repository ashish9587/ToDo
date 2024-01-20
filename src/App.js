import React,{useRef,useReducer} from 'react';
import './App.css';
import {Routes,Route,Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import TodoList from './TodoList';

function App() {
  const NameRef = useRef()
  const [todos,dispatch] =useReducer(reducer,[])
  const [page, pageDispatch] = useReducer(pageReducer, '')

  function pageReducer(page, action){
    console.log('in pageReducer:'+page)
    page = action
    return page
  }

  function reducer(todos,action){
    switch (action.type){
      case 'add':
        const name = NameRef.current.value
        NameRef.current.value = null
        if (name === '') return todos
       
        return[...todos,{id:uuidv4(),name:name,completed:false}]

        case 'clear':
          return todos.filter(t => !t.completed)

          case 'toggle':
            const updatedtodos = todos.map( t =>{
            if(t.id === action.payload.id)
              t.completed = !t.completed
            return t
              })
            return updatedtodos
            default:
              return todos 
    }

  }
  function pageone(){
  return (
    <>
    <TodoList todos={todos.filter(t => !t.completed)} dispatch={dispatch}/>
    <input ref={NameRef} type="text"/>
    <button onClick={e => dispatch({type:'add'})}>Add</button>
    <button onClick={e => dispatch({type:'clear'})}>Clear completed</button>
    
    </>
  )
}

function getActiveClass(selectedPage){
  //return page===selectedPage? 'active_link' : ''
  if(page===selectedPage) return 'active_link'
  else return ''
}

  return(
   <>
 <nav>
  <Link to='/'></Link>  
  <Link to="/home" className={page==='home' ? 'active_link' : ''} onClick={e => pageDispatch('home')}>HOME  </Link>
  <Link to="/compltedpage" className={getActiveClass('completedpage')} onClick={e => pageDispatch('completedpage')}>COMPLETED</Link>
  </nav>
  
   <Routes>
   <Route path='/' ></Route> 
  <Route path='/home' element = {pageone()}></Route>
  <Route path='/compltedpage' element = {< TodoList todos= {todos.filter(t => t.completed )} dispatch={dispatch}/>}> </Route> 
  </Routes>
    



  
  </>
  )
}

export default App;
