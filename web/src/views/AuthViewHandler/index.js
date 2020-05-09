import React from 'react'

export default class AuthViewHandler extends React.Component {
    render() {
        const { children } = this.props

        const token = window.sessionStorage.getItem('token')

        if (token) {
            return children(true)
        }

        return children(false)
    }
}