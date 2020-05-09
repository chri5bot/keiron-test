import React from 'react'
import AuthViewHandler from '../views/AuthViewHandler'

function Switch({ Component, FallbackComponent, ...rest }) {
    return (
        <AuthViewHandler>
            {authed => {
                if (!authed) {
                    return <FallbackComponent {...rest} />
                }
                return <Component {...rest} />
            }}
        </AuthViewHandler>
    )
}

export default function SignedOutFallback(Component, FallbackComponent) {
    return props => (
        <Switch
            {...props}
            Component={Component}
            FallbackComponent={FallbackComponent}
        />
    )
}