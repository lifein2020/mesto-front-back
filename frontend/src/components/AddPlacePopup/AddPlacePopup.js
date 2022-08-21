import {useState} from 'react';
import React from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    // managed components (input)
    const [cardName, setCardName] = useState('');
    function handleChangeCardName(e) {
        setCardName(e.target.value);
    }

    const [cardImage, setCardImage] = useState('');
    function handleChangeCardImage(e) {
        setCardImage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            card_name: cardName, 
            card_image_link : cardImage,
        });
        // clearing the inputs after successfully adding information
        setCardName('');
        setCardImage('');
    }

    return (
        <PopupWithForm
            name="add-card"
            id="formAdd"
            title="New place"
            button="button_disabled"
            titleButton="Create"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_card_name"
                id="card-name-input"
                name="card_name"
                autoComplete="off"
                required
                placeholder="Title"
                minLength="2"
                maxLength="30"
                value={cardName}
                onChange={handleChangeCardName}
            />
            <span
                className="popup__error card-name-input-error"
            >
            </span>
            <input
                type="url"
                className="popup__input popup__input_card_image-link"
                id="card-image-link-input"
                name="card_image_link"
                autoComplete="on"
                required
                placeholder="Link to the picture"
                value={cardImage}
                onChange={handleChangeCardImage}
            />
            <span
                className="popup__error card-image-link-input-error"
            >
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

