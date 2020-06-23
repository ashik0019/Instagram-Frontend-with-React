import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
import ActivityIndicator from '../ActivityIndicator'

const UserProfile = () => {
    const [userProfile, setProfiles] = useState(null)
    const [showFollow, setFollow] = useState(true)
    const [preloader, setPreloader] = useState(false)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()

    useEffect(() => {
        setPreloader(true)
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setProfiles(result)
                setPreloader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //follow functionality
    const followUser = () => {
        fetch('/follow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })

        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("User", JSON.stringify(data))
                setProfiles((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setFollow(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //unfollow functionality
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })

        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("User", JSON.stringify(data))
                setProfiles((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !=data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setFollow(false)
            })
            .catch(err => {
                console.log(err)
            })
    }




    return (

        <>
            {userProfile ?
                <div style={{ maxWidth: "550px", margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid gray" }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src="https://images.unsplash.com/photo-1441486374104-36abe5ed9b69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                            />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h6>{userProfile.user.email}</h6>

                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <h6>{userProfile.posts.length} Posts &nbsp;</h6>
                                <h6>{userProfile.user.followers.length} Followers &nbsp;</h6>
                                <h6> {userProfile.user.following.length} Following</h6>
                            </div>
                            {showFollow ? 
                            <button style={{margin: '10px'}} className="btn #64b5f6 blue darken-2" onClick={() => followUser()} >Follow me</button>
                            : 
                            <button className="btn #64b5f6 blue darken-2" onClick={() => unfollowUser()} >Unfollow</button>
                            }
                        </div>
                    </div>

                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {

                                return (
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }

                    </div>
                </div>

                : <ActivityIndicator />

            }

        </>
    )
}

export default UserProfile
