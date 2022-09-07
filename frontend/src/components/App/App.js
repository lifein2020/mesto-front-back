import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import kusto from '../../images/kusto.jpg';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth.js';
import success from '../../images/success.svg';
import fail from '../../images/fail.svg';


function App() {

  // For component Main:
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarOpen(true);
  }

  const [selectedCard, setIsSelectedCard] = useState({});
  const [isPreviewPopupOpened, setIsPreviewPopupOpened] = useState(false);
  function onCardClick(card) {
    setIsSelectedCard(card);
    setIsPreviewPopupOpened(true);
  }

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({image: "", text: ""});

  // For component of models
  const handleAllPopupsClose = () => {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarOpen(false);
    setIsSelectedCard({});
    setIsPreviewPopupOpened(false);
    setIsInfoTooltipOpen(false);
  }

  // For the Main component, in order to then transfer it to the Card via props:
  //1.
  const [currentUser, setCurrentUser] = useState({name: 'Jacques-Yves Cousteau', about: 'Ocean explorer', avatar: kusto});
  const [cards, setCards] = useState([]);
  

  //3.
  const handleCardLike = (card) => {
    // check again if there is already a like on this card
     const isLiked = card.likes.some(i => i === currentUser._id); 
    // send a request to the API and get the updated card data
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        //setCards((state) => state.map((c) => c === card._id ? newCard : c));
        // or
        const newCards = cards.map((c) => (c._id === card._id ? newCard.card : c));
        setCards(newCards);
  
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  //4.
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) =>  state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // For component EditProfilePopup
  const handleUpdateUser = ({userName, userDescription}) => {
    // send input values (what you entered)
    api.patchUserInfo({userName, userDescription}) 
    .then((dataProfile) => {
      setCurrentUser({
        name: dataProfile.data.name, 
        about: dataProfile.data.about,
        avatar: dataProfile.data.avatar, // in order to the avatar is also displayed
        likes: dataProfile.data.likes,
        _id: dataProfile.data._id, // in order to likes are put down after updating the profile
      });
    })
    .then(() => {
      handleAllPopupsClose();
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  // For component EditAvatarPopup
  const handleUpdateAvatar = ({ avatarUrl }) => {
    // send what was entered into the input
    api.patchAvatarUser({ avatarUrl })
    .then((dataProfile) => {
      setCurrentUser({
        avatar: dataProfile.data.avatar,
        // in order to profile data is also displayed
        name: dataProfile.data.name, 
        about: dataProfile.data.about,
        _id: dataProfile.data._id,
      });
    })
    .then(() => {
      handleAllPopupsClose();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // For component AddPlacePopup
  function handleAddPlaceSubmit({ card_name, card_image_link }) {
    api.postAddCard({ card_name, card_image_link })
    .then(newCard => {
      setCards([newCard.data, ...cards]);
    })
    .then(() => {
      handleAllPopupsClose();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handleAllPopupsClose();
      }
  }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  useEffect(() => {
    const closeByOverlay = (e) => {
      if(e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
        handleAllPopupsClose();
      }
    }
    document.addEventListener('click', closeByOverlay)
    return () => document.removeEventListener('click', closeByOverlay)

  }, [])

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('email');
  const history = useHistory();
  

  const authUser = (jwt) => {
    return auth.getContent(jwt)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
      }
    })
    .catch(err => console.log(err));
  };

  // If the user has a token in localStorage, check if the token is valid
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authUser(jwt);
    }
  }, [loggedIn]);

  // If the user is authorized, passes into the system
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
      Promise.all([api.getUserInfo(), api.getCardsList()]) // get data from server
      .then(([userData, cardsArray]) => { // we pass this data for rendering on the page, see the format in which they arrive in the console. If it was passed correctly, then it will be transferred to Main through props
          setCurrentUser({
            name: userData.data.name, 
            about: userData.data.about, 
            avatar: userData.data.avatar,
            _id: userData.data._id,
          });
          setCards(cardsArray.data);
          setUserEmail(userData.data.email);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn, history]);

  const handleRegister = ({ password, email }) => {
    return auth.register(password, email)
    .then(dataReg => {
       console.log(dataReg);
      if (dataReg.data._id || dataReg.statusCode !== 400) {
        history.push('/sign-in');
        setIsInfoTooltipOpen(true);
        setMessage({ image: success, text: 'You have successfully registered!' });
      } else {
        return
      }
    })
    .catch( err => {
      setIsInfoTooltipOpen(true);
      setMessage({ image: fail, text: 'Something went wrong! Try again.' });
      }
    )
  };

  const handleLogin = ({ password, email }) => {
    return auth.authorize(password, email)
    .then(dataLog => {
      if (dataLog.token) { 
        setLoggedIn(true);                          // in order to make ProtectedRoute display the route /
        localStorage.setItem('jwt', dataLog.token);
        history.push('/');                          // clear the state and redirect the user to the page /
      } else {
          return
      }
    })
    .catch( err => {
      setIsInfoTooltipOpen(true);
      setMessage({ image: fail, text: 'Something went wrong! Try again.' });
      }
    )
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  const [isBurgermenuActive, setIsBurgermenuActive] = useState(false);

  const handleBurgermenuOpen = () => {
    setIsBurgermenuActive(true);
  }

  const handleBurgermenuClose = () => {
    setIsBurgermenuActive(false);
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
              onSignOut={onSignOut}
              email={userEmail}
              isBurgerActive={isBurgermenuActive}
              onBurgermenuOpen= {handleBurgermenuOpen}
              onBurgermenuClose={handleBurgermenuClose}
          />
          <Switch>
            <ProtectedRoute 
              exact 
              path="/" 
              loggedIn={loggedIn} 
              component={Main} 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={onCardClick}
              onLikeClick={handleCardLike}
              onDeleteClick={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
            {loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>

          <Footer />
          
          <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={handleAllPopupsClose}
          onUpdateUser={handleUpdateUser}
          >
          </EditProfilePopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleAllPopupsClose}
            onAddPlace={handleAddPlaceSubmit}
          >
          </AddPlacePopup>

          <PopupWithForm
            name="confirm"
            id="formConfirm"
            title="Вы уверены?"
            button="button_confirm popup__save"
            titleButton="Да"
            onClose={handleAllPopupsClose}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarOpen}
            onClose={handleAllPopupsClose}
            onUpdateAvatar={handleUpdateAvatar}
          >
          </EditAvatarPopup>

          <ImagePopup card={selectedCard}
            onClose={handleAllPopupsClose}
            active={isPreviewPopupOpened}
          />

          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            onClose={handleAllPopupsClose}
            message={message}
          />
        </CurrentUserContext.Provider>
      </div>
    </>
  )
}

export default App;
