import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import ActivityIndicator from '../ActivityIndicator'
const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const [preloader, setPreloader] = useState(false)
    const URL = "/createpost"

    useEffect(() => {
        if (url) {
            // data store
            fetch(URL, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        setPreloader(false)
                        M.toast({ html: data.error, classes: 'rounded #c62828 red darken-3' });
                        history.push('/create')
                    } else {
                        setPreloader(false)
                        M.toast({ html: "Post Successfully Created!", classes: 'rounded #43a0447 green darken-1' });
                        history.push('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }, [url])

    const postData = () => {
        setPreloader(true)
        //image store
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'Instagram')
        data.append("cloud_name", "ashiq0019")
        fetch("https://api.cloudinary.com/v1_1/ashiq0019/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.url)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })


    }



    if (preloader) {
        return (<ActivityIndicator />)
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Create Post</h2>
                <input type="text" placeholder="Enter your post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Enter your post body" value={body} onChange={(e) => setBody(e.target.value)} />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => postData()}>Save</button>

            </div>
        </div>
    )
}

export default CreatePost
