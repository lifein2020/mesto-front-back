import logo from '../../images/logo.png';
import { Route, Link } from 'react-router-dom';

function Header({ onSignOut, email, isBurgerActive, onBurgermenuOpen, onBurgermenuClose }) {

    function handleSignOut() {
        onSignOut();
    }

    function handleBurgermenuOpen() {
        onBurgermenuOpen();
    }

    function handleBurgermenuClose() {
        onBurgermenuClose();
    }

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Project logo Mesto" />
            <Route path="/sign-up">
                <Link className="header__sign-link" to="sign-in">Login</Link>
            </Route>
            <Route path="/sign-in">
                <Link className="header__sign-link" to="sign-up">Sign up</Link>
            </Route>
            <Route exact path="/">
                <div className="header__container">                
                    <nav isBurgerActive={isBurgerActive} className={isBurgerActive ? `header__menu header__menu_active` : `header__menu`} onClick={isBurgerActive ? handleBurgermenuClose : handleBurgermenuOpen}>
                        <p className="header__user-email" onClick={e => e.stopPropagation()}>{ email }</p>
                        <p className="header__button">
                            <button className="header__logout" onClick={handleSignOut}>Log out</button>
                        </p>
                    </nav>
                    <div isBurgerActive={isBurgerActive} className={!isBurgerActive ? `burgermenu` :`burgermenu burgermenu_active`} onClick={isBurgerActive ? handleBurgermenuClose : handleBurgermenuOpen}>
                        <span className="burgermenu__bar"></span>
                        <span className="burgermenu__bar"></span>
                        <span className="burgermenu__bar"></span>
                    </div>
                </div>
            </Route>
        </header>
    );
}
    
export default Header;

