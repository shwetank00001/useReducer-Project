import React from 'react'

const Todo = () => {

  const [data, setData] = React.useState('')

  function reducer(state,action){
    if(action.type === "ADD"){
      const newData = [...state.value, action.payload]
      return({
        ...state,
        value:newData
      })
    }

    if(action.type === "REMOVE"){
      const newData = state.value.filter((item) => item.id !== action.payload)
      return({
        state,
        value:newData
      })
    }
  }

  const defaultState = {
    value:[]
  }

  const [state, dispatch] = React.useReducer(reducer,defaultState)

  function handleSubmit(e){
    e.preventDefault()
    if(data){
      const newData = {id: new Date().getTime(), data}
      dispatch({type:"ADD",payload:newData })
    }
  }

  const ele = state.value.map(function(item){
    return(
      <div key={item.id}>
        <h3>{item.data}</h3>
        <button onClick={() => handleRemove(item)}>Remove</button>
      </div>
    )
  })

  function handleRemove(item){
    dispatch({type:"REMOVE",payload:item.id})
  }
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>TODO LIST PRACTISE</h3>
        <input type='text' value={data} onChange={(e) => setData(e.target.value)} />
        <button>Add item</button>
      </form>
      {ele}
    </div>
  )
}


export default Todo