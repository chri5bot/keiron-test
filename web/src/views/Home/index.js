import React, { useState } from 'react'
import Admin from './Admin'
import User from './User'

function Home() {
    const [user] = useState(JSON.parse(window.sessionStorage.getItem("token")) || null);

    if (user.user_type_id === 2) {
        return (
            <Admin user={user} />
        )
    } else if (user.user_type_id === 3) {
        return (
            <User user={user} />
        )
    } else {
        return null
    }

}

export default Home