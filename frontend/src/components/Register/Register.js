import {useState} from 'react';
import { Route, Link } from 'react-router-dom';

function Register({onRegister}) {

    const [userEmail, setUserEmail] = useState('');
    function handleChangeUserEmail(e) {
        setUserEmail(e.target.value);
    }

    const [userPassword, setUserPassword] = useState('');
    function handleChangeUserPassword(e) {
        setUserPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onRegister(
            {
                password: userPassword, 
                email: userEmail
            }
        );
        setUserEmail('');
        setUserPassword('');
    }

    return(
        <div className="form">
        <h2 className="form__title">Sign up</h2>
        <form 
            onSubmit={handleSubmit}
        >
            <input 
                type="email"
                className="form__input"
                id="email-input"
                name="email"
                autoComplete="on"
                required
                placeholder="Email"
                value={userEmail || ''}
                onChange={handleChangeUserEmail}
            />
            <input 
                type="password"
                className="form__input"
                id="password-input"
                name="password"
                autoComplete="off"
                required
                placeholder="Password"
                value={userPassword || ''}
                onChange={handleChangeUserPassword}
            ></input>
            <button type="submit" className="form__button">Continue</button>
        </form>
        <Route path="/sign-up">
            <div className="form__link">
                <Link className="form__link_sign" to="sign-in">Already registered? Login</Link>
            </div>
        </Route>
    </div>
        
    )
}

export default Register;

/*<button className="form__login">Уже зарегистрированы? Войти</button> */
