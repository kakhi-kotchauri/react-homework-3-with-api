import { useState, useRef, useEffect } from "react"
import axios from "axios"



export function Todo() {


    const [newtodo, setnewtodo] = useState([])
    const [value, setvalue] = useState('')
    const inputref = useRef()


    useEffect(() => {
    
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/tasks')
        .then(response => setnewtodo(response.data.data.sort(function (a, b) {return b.create_time - a.create_time})))
        .catch(err => console.log(err))

    }, [])


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
  
         axios.post('https://us-central1-js04-b4877.cloudfunctions.net/tasks/create', {
             text : value
         })
         .then(response => console.log(response))
         .catch(err => console.log(err))

          setnewtodo([newobj, ...newtodo])
          setvalue('')
      }
    }



    function changeitem(id) {
   
        const find = newtodo.find(item => item.id === id)
        const replace = newtodo.filter(item => item.id !== id)

        if(find.completed === false) {

        console.log('check')
        find.completed = true
        axios.post(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/check/${id}`)
        setnewtodo([...replace, find].sort(function (a, b) {return b.create_time - a.create_time}))

        } else {

        console.log('uncheck')
        find.completed = false
        axios.post(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/uncheck/${id}`)
        setnewtodo([...replace, find].sort(function (a, b) {return b.create_time - a.create_time}))

        }
         
    }


    function remove(id) {
        axios.delete(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/${id}`)
        .then(response => {
            if(response.status === 200) {    
                let itemremove = newtodo.filter(item => item.id !== id)
                setnewtodo(itemremove.sort(function (a, b) {return b.create_time - a.create_time}))
            }
        })
        .catch(err => console.log(err))

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
                {
                newtodo.length >= 1 ?    
                newtodo.map(item => {
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
                }) 
                : null
                
                }
               
            </ul>

            </div>
        </div>
    )
}