import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import ActivityIndicator from '../ActivityIndicator'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[preloader, setPreloader] = useState(false)
    const URL = "/signup"
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
                name,
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: 'rounded #c62828 red darken-3' });
                } else {
                    setPreloader(false)
                    M.toast({ html: data.message, classes: 'rounded #43a0447 green darken-1' });
                    history.push('/signin')
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
                <h2>Signup</h2>
                <input type="text" placeholder="Enter your fullname" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => postData()} >SignUP</button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signup
