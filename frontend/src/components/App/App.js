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

  //Для компонента Main:
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

  //Для компонентов папапов
  const handleAllPopupsClose = () => {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarOpen(false);
    setIsSelectedCard({});
    setIsPreviewPopupOpened(false);
    setIsInfoTooltipOpen(false);
  }

  //Для компонента Main, чтобы потом перебросить в Card через props:
  //1.
  const [currentUser, setCurrentUser] = useState({name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: kusto});
  const [cards, setCards] = useState([]);
  

  //3.
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
   
     const isLiked = card.likes.some(i => i === currentUser._id); 
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        //setCards((state) => state.map((c) => c === card._id ? newCard : c));
        // либо
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

  //Для компонента EditProfilePopup
  const handleUpdateUser = ({userName, userDescription}) => {
    // отправляем значения инпутов(то, что ввели)
    api.patchUserInfo({userName, userDescription}) 
    .then((dataProfile) => {
      //console.log(dataProfile)
      setCurrentUser({
        name: dataProfile.data.name, 
        about: dataProfile.data.about,
        avatar: dataProfile.data.avatar, // чтобы аватар тоже отображался 
        likes: dataProfile.data.likes,
        _id: dataProfile.data._id, //чтобы лайки проставлялись после обновления профиля
      });
      //handleAllPopupsClose();
    })
    .then(() => {
      handleAllPopupsClose();
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  //Для компонента EditAvatarPopup
  const handleUpdateAvatar = ({ avatarUrl }) => {
    //отправляем то, что ввели в инпут
    api.patchAvatarUser({ avatarUrl })
    .then((dataProfile) => {
      setCurrentUser({
        avatar: dataProfile.data.avatar,
        //чтобы данные профиля тоже отображались 
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

  //Для компонента AddPlacePopup
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

  // если у пользователя есть токен в localStorage, проверит валидность токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authUser(jwt);
    }
  }, [loggedIn]);

  //если пользователь авторизован, проходит в систему
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
      Promise.all([api.getUserInfo(), api.getCardsList()]) //получаем данные с сервера
      .then(([userData, cardsArray]) => { // передаем эти данные для отрисовки на странице, см в консоли формат в котором приходят. Если правильно передали, то в Main передадуться чнрез props
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
        setMessage({ image: success, text: 'Вы успешно зарегистрировались!' });
      } else {
        return
      }
    })
    .catch( err => {
      setIsInfoTooltipOpen(true);
      setMessage({ image: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
      }
    )
  };

  const handleLogin = ({ password, email }) => {
    return auth.authorize(password, email)
    .then(dataLog => {
      if (dataLog.token) { 
        setLoggedIn(true);                          //чтобы ProtectedRoute отображал маршрут /
        localStorage.setItem('jwt', dataLog.token);
        history.push('/');                          //очищаем стейт и перенаправляем пользователя на страницу /
      } else {
          return
      }
    })
    .catch( err => {
      setIsInfoTooltipOpen(true);
      setMessage({ image: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
      }
    )
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
              onSignOut={onSignOut}
              email={userEmail}
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
          //currentUser={currentUser}
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
