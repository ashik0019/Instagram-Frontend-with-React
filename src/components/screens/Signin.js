import React, { useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
import ActivityIndicator from '../ActivityIndicator'
const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[preloader, setPreloader] = useState(false)
    const URL = "/signin"
    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: 'Invalid email', classes: 'rounded #c62828 red darken-3' });
            return
        }
        setPreloader(true)
        fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    setPreloader(false)
                    M.toast({ html: data.error, classes: 'rounded #c62828 red darken-3' });
                    history.push('/signin')
                } else {
                    setPreloader(false)
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    dispatch({type:"USER",payload: data.user})
                    M.toast({ html: "Successfully Signed-In &#128512;", classes: 'rounded #43a0447 green darken-1' });
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    if(preloader) {
        return(<ActivityIndicator />)
    }


    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>SignIn</h2>
                <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => postData()} >SignIn</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin
