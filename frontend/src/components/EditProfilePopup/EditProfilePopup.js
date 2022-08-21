import {useState, useEffect} from 'react';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {

    // managed components (input)
    const [userName, setUserName] = useState(''); 
    function handleChangeName(e) {
        setUserName(e.target.value);
    }
    const [userDescription, setUserDescription] = useState(''); 
    function handleChangeDescription(e) {
        setUserDescription(e.target.value);
    }

    // To substitute the current values into the form:
    // 1. subscribe to the context
    const currentUser = React.useContext(CurrentUserContext); 

    //2. after loading the current user from the API, his data will be used in managed components
    useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
    }, [currentUser, isOpen]); // we also need to monitor isOpen (the state of opening) in order to insert user data into the inputs, otherwise, if we delete information from the inputs and simply close the popup, then the next time we open the inputs will be empty (without user data)

    function handleSubmit(e) {
        // Prevent the browser from navigating to the URL of the form
        e.preventDefault();
        // Passing the values of managed beans to an external handler
        onUpdateUser({ userName, userDescription });
    }

    return (
        <PopupWithForm
            name="edit"
            id="formEdit"
            title="Edit profile"
            button="save"
            titleButton="Save"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
            type="text"
            className="popup__input popup__input_user_name"
            id="name-input"
            name="name"
            required
            placeholder="Name"
            minLength="2"
            maxLength="40"
            value={userName || ''}
            onChange={handleChangeName}
            />
            <span
            className="popup__error name-input-error"
            >
            </span>
            <input
            type="text"
            className="popup__input popup__input_user_job"
            id="job-input"
            name="job"
            required
            placeholder="Activity"
            minLength="2"
            maxLength="200"
            value={userDescription || ''}
            onChange={handleChangeDescription}
            />
            <span
            className="popup__error job-input-error"
            >
            </span>
        </PopupWithForm>  
    )
}

export default EditProfilePopup;




