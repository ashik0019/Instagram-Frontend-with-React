import React, { useState, useEffect, useContext } from 'react'
import ActivityIndicator from '../ActivityIndicator'
import { UserContext } from '../../App'
import M from 'materialize-css'
const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [preloader, setPreloader] = useState(false)
    useEffect(() => {
        setPreloader(true)
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setData(result.posts)
                setPreloader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //like post
    const likePost = (id) => {
        console.log('click id', id)
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })

        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                M.toast({ html: "Successfully liked this post &#128077;", classes: 'rounded #43a0447 green darken-1' });
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //dislike post
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                M.toast({ html: "Successfully disliked &#128078;", classes: 'rounded #43a0447 green darken-1' });
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //make comments functionality 
    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })

        })
            .then(res => res.json())
            .then(result => {
                //console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                M.toast({ html: "Successfully Commented this Post &#128525;", classes: 'rounded #43a0447 green darken-1' });
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //delete post functionality
    const deletePost = (postId) => {
        setPreloader(true)
        fetch(`/delete/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                M.toast({ html: "Successfully Signed-In &#128512;", classes: 'rounded #43a0447 green darken-1' });
                // console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
                setPreloader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //view return priloarder
    if (preloader) {
        return (<ActivityIndicator />)
    }

    return (

        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>
                                {item.postedBy.name}
                                {
                                    item.postedBy._id == state._id &&
                                    <i className="material-icons icon-color"
                                        style={{ cursor: 'pointer', float: 'right' }}
                                        onClick={() => { deletePost(item._id) }}>delete_sweep
                                    </i>
                                }

                            </h5>
                            <div className="card-image">
                                <img src={item.photo} alt={item.title} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons icon-color">favorite</i>
                                {
                                    item.likes.includes(state._id) ?
                                        <i className="material-icons"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { unlikePost(item._id) }}>thumb_down
                                        </i> :
                                        <i className="material-icons"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { likePost(item._id) }} >thumb_up
                                        </i>
                                }


                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    console.log(e.target[0].value, item._id)
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
