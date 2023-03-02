import React from 'react'
import Modal from './Modal'

const Todo = () => {

    const [thing, setThing] = React.useState('')

    function reducer(state,action){
        const newThing = [...state.value, action.payload]
        if(action.type === 'ADD_ITEM'){
            return{
                ...state,
                value:newThing,
                isModal:true,
                modalContent:"ITEM ADDED TO THE LIST"
            }
        }
        if(action.type === 'NO_ITEM'){
            return{
                value:newThing,
                isModal:true,
                modalContent:"No new item added to the list"
            }
        }
    }

    const defaultState ={
        value: [],
        isModal:false,
        modalContent:" "
    }

    const[state, dispatch] = React.useReducer(reducer,defaultState)

    function handleSubmit(e){
        e.preventDefault()
        const newThing = [thing]
        if(thing){
            dispatch({type:"ADD_ITEM" , payload:newThing})
            setThing('')
        }
        else{
            dispatch({type:"NO_ITEM", payload:newThing})
        }
    }

    const ele = state.value.map(function(item){
        return(
            <div>
                <ol>
                    <p>{item}</p>
                </ol>
            </div>
        )
    })
  return (
    <div className='todo-app'>
        <h3>
            TODO App with useReducer()
        </h3>

        <form onSubmit={handleSubmit}>
            {state.isModal && <Modal modal = {state.modalContent} />}
            <input type='name'  value={thing} onChange={(e) => setThing([e.target.value])} />
            <button>Add item</button>
        </form>
        {ele}
    </div>
  )
}

export default Todo