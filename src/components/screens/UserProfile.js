import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
const UserProfile = () => {
    const [userProfile, setProfile] = useState(null)

    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)

                setProfile(result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(userProfile)
    //view return priloarder
    // if(preloader) {
    //     return(<ActivityIndicator />)
    // }

    return (
        <div style={{ maxWidth: "550px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid gray" }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/photo-1441486374104-36abe5ed9b69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{'hjj'}</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <h6>50 Posts</h6>
                        <h6>50 Followers</h6>
                        <h6>50 Following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
            {/* {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               } */}

            </div>
        </div>
    )
}

export default UserProfile
