import { useEffect, useState } from 'react';
import style from './App.module.scss';

function App() {

    const [notes, setNotes] = useState(null)
    const [body, setBody] = useState('')


    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setNotes(data)
            })
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (body) {                // to ignore empty field save
            const note = { body }

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
        }
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
                <label>Note</label>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <p>{body}</p>
                <button>Save</button>
            </form>
            <div className={style.notes}>
                <h2>Notes</h2>
                {notes && notes.map(note => {
                    return (
                        <p key={note.id}>
                            {note.body}
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </p>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default App;
