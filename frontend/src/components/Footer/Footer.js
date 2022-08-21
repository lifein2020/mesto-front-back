function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">&copy; 2022 Mesto Russia</h3>
        </footer>
       
        
    );
}
    
export default Footer;


/* Case for show only on homepage
import { Route } from 'react-router-dom';

function Footer() {
    return (
        <Route path="/">
            <footer className="footer">
                <h3 className="footer__title">&copy; 2022 Mesto Russia</h3>
            </footer>
        </Route>
        
    );
}

In App.js in this case:
{loggedIn && <Footer />} 
 */