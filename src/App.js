import { useState } from 'react';
import style from './App.module.scss';

function App() {

    const [notes, setNotes] = useState([])
    const [body, setBody] = useState('')

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (body) {                // to ignore empty field save
            console.log(body);
            let note = {
                "body": body,
                "id": notes.length,
            }
            let tempNotes = notes
            tempNotes.push(note)
            setNotes(tempNotes)
            setBody('')
        }
    }

    return (
        <div className={style.app}>
            <form onSubmit={handleSubmitForm}>
                <label>Note</label>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <button>Save</button>
            </form>
            <div className={style.notes}>
                <h2>Notes</h2>
                {notes.map(note => <p key={note.id}>{note.body}</p>)}
            </div>
        </div>
    );
}

export default App;
