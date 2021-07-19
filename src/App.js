import { useEffect, useState } from 'react';
import style from './App.module.scss';

function App() {

    const [notes, setNotes] = useState(null)
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    // const [previewImages, setPreviewImages] = useState(null)
    // const [selectedFiles, setSelectedFiles] = useState(null)

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

    // const handleSelectedFiles = (e) => {
    //     let images = []

    //     for(let i=0; i<e.target.files.length; i++) {
    //         images.push(URL.createObjectURL(e.target.files[i]))
    //     }

    //     setSelectedFiles(e.target.files)
    //     setPreviewImages(images)
    // }

    return (
        <div className={style.app}>
            <form onSubmit={handleSubmitForm}>
                <label>Issue</label>
                <input id="focus-req" required type="text" value={body} onChange={(e) => setBody(e.target.value)}></input>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <button>Save</button>
            </form>

            {/* <form>
                <input type="file" multiple accept="image/*" onChange={handleSelectedFiles}></input>
            </form>
            { previewImages && previewImages.map((img, i) => {
                return <img className={style.preview} src={img} key={i} />
            })} */}

            <div>
                <h2>Notes</h2>
                {notes && notes.map(note => {
                    return (
                        <div className={style.notes} key={note.id}>
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
