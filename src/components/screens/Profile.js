import React, { useEffect, useState, useContext } from 'react'
import ActivityIndicator from '../ActivityIndicator'
import {UserContext} from '../../App'
const Profile = () => {
    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState([])
    const [preloader, setPreloader] = useState(false)
    useEffect(() => {
        setPreloader(true)
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.mypost)
                setPreloader(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    //view return priloarder
    if(preloader) {
        return(<ActivityIndicator />)
    }

    return (
        <div style={{ maxWidth: "550px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid gray" }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/photo-1441486374104-36abe5ed9b69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state? state.name : 'Loading..'}</h4>
                    {/* <h6>{state.email}</h6> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <h6>{data.length} Posts &nbsp;</h6>
                        <h6>{state ? state.followers.length : ''} Followers &nbsp;</h6>
                        <h6>{state ? state.following.length : ''} Following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                   data.map(item => {
                       
                       return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                       )
                   })
                }
                
            </div>
        </div>
    )
}

export default Profile
