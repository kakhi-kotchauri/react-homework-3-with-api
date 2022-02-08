import { useState, useRef, useEffect } from "react"

const todoitems = [
    {id: 1, text: 'sometext 1', completed: false},
    {id: 2, text: 'sometext 2', completed: true},
    {id: 3, text: 'sometext 3', completed: false},
]


export function Todo() {

    const [newtodo, setnewtodo] = useState(todoitems)
    const [value, setvalue] = useState('')
    const inputref = useRef()

    useEffect(() => {
      inputref.current.focus()
    },[])

    function addnewitem(e) {
        e.preventDefault()
      if(value) {
        let newobj = {
            id: newtodo.length >= 1 ? newtodo[newtodo.length - 1].id + 1 : 1,
            text: value,
            completed: false
          }
  
          setnewtodo([...newtodo, newobj])
          setvalue('')
      }
    }

    function changeitem(id) {
        let itemchange = newtodo.map(item => {
            if(item.id === id) {
                item.completed = !item.completed
                return(item)
            } else {
                return(item)
            }
        })
        setnewtodo(itemchange)
    }

    function remove(id) {
        let itemremove = newtodo.filter(item => item.id !== id)
        setnewtodo(itemremove)
    }

    function removeverithing(id) {
        setnewtodo([])
    }

    return (
        <div className="todo-par">

            <div className="par">
            <h2 className="h2-title">add tasks bellow</h2>

            <form className="form" onSubmit={addnewitem}>
                <input
                 ref={inputref}
                  className="input-text" 
                  value={value} onChange={(e) => setvalue(e.target.value)}
                   type="text" 
                   />
                <button className="addbutton">add</button>
            </form>

            <ul className="ul">
                {newtodo.map(item => {
                    return(
                    <li className="li" key={item.id}>
                        
                       <input className="checkbox" 
                       onChange={() => changeitem(item.id)}
                       type="checkbox" 
                       checked = {item.completed}
                       />

                       <div className={`todo-text ${item.completed ? 'checked' : ''}`}>{item.text}</div>
                       <button className="removebutton" onClick={() => remove(item.id)}>remove</button>
                    </li>
                    )
                })}
                {
                    newtodo.length >= 2 ? 
                    <button className="removeeverithing" onClick={removeverithing}>Remove everithing</button> : false
                }
            </ul>

            </div>
        </div>
    )
}