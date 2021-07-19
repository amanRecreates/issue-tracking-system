import { useEffect, useState } from 'react';
import style from './App.module.scss';

function App() {

    const [notes, setNotes] = useState(null)
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')

    const autofocus = () => {
        document.getElementById('focus-req').focus()
    }

    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            autofocus()
        }
    }

    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setNotes(data)
            })
        document.getElementById('focus-req').focus()
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const note = { title, body }

        // POST request, to update the displayed list
        fetch('http://localhost:8000/notes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }).then(() => {
            // Get request, to update the displayed list
            fetch('http://localhost:8000/notes')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setNotes(data)
                })
        })
        setBody('')
        setTitle('')
        autofocus() 
    }

    const handleDelete = (id) => {
        fetch('http://localhost:8000/notes/' + id, {
            method: 'DELETE'
        }).then(() => {
            // Get request, to update the displayed list
            fetch('http://localhost:8000/notes')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setNotes(data)
                })
        })
    }

    return (
        <div className={style.app}>
            <form onSubmit={handleSubmitForm}>
                <label>Description</label>
                <input id="focus-req" required type="text" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <button>Save</button>
            </form>
            <div className={style.notes}>
                <h2>Notes</h2>
                {notes && notes.map(note => {
                    return (
                        <div key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.body}</p>
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default App;
