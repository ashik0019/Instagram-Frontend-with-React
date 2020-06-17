import React from 'react'
import loading from '../assets/loader.svg'
export default function ActivityIndicator() {
    return (
        <div style={{textAlign: 'center', margin:'20%'}}>
                <img className="loader-animation" src={loading} alt="loader image"/>
        </div>
    )
}
