import { useRef, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const urlInput = useRef();

    // set the default link in the input field when opening the popup
    useEffect(() => {
        const currentUrlInput = urlInput.current;
        currentUrlInput.value = '';
    }, [isOpen]) 

    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar({
          avatarUrl: urlInput.current.value /* the value of the input received using the ref */
        });
        // clear the input after successfully adding information
        urlInput.current.value = '';
      } 

    return (
        <PopupWithForm
            name="avatar"
            id="formAvatar"
            title="Update avatar"
            button="save"
            titleButton="Save"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
            type="url"
            className="popup__input popup__input_avatar_link"
            id="avatar-link-input"
            name="avatar_link"
            autoComplete="on"
            required
            placeholder="Link to the avatar"
            //value="https://somewebsite.com/someimage.jpg"
            ref={urlInput}
            />
            <span
            className="popup__error avatar-link-input-error"
            >
            </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;

