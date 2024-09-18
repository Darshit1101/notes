import React from 'react'
import SignupCard from './SignupCard';
import SigninCard from './SigninCard';

function AuthCard({ props }) {
    const { state } = props;

    return (
        <div>
            {state.isConfiguration === 'signUp' && <SignupCard props={props} />}
            {state.isConfiguration === 'signIn' && <SigninCard props={props} />}
        </div>
    )
}

export default AuthCard;