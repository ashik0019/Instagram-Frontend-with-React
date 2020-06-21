import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
import ActivityIndicator from '../ActivityIndicator'

const UserProfile = () => {
    const [userProfile, setProfiles] = useState(null)
    const[preloader, setPreloader] = useState(false)
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
                console.log(result.user.name)
                setProfiles(result)
                setPreloader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])




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
                            <h6>50 Followers &nbsp;</h6>
                            <h6>50 Following</h6>
                        </div>
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
