import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    background-color: transparent;
`

function Logout() {
    const onButtonClick = () => {
        window.sessionStorage.clear()
        window.location.reload(false);
    }
    return (
        <Button onClick={onButtonClick}>Logout</Button>
    )
}

export default Logout