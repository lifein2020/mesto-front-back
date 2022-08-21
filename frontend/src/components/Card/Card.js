import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card(props) {
    // Subscribe to contextCurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Show delete icon:
    // 1) determine if we are the owner of the current card
    const isOwn = props.card.owner === currentUser._id;
   
    // 2) create a variable, which we then set in `className` for the delete button
    const cardDeleteButtonClassName = (
     `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash'}` 
    ); 
  
    // Determine if we have already "liked" this card:
    // 1) determine if the card has a like set by the current user
    const isLiked = props.card.likes.some(i => i === currentUser._id);

    // 2) create a variable, which we will then set in `className` for the like button
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
    );    

    const likeCounter =  props.card.likes.length;

    function handleCardClick() {
        props.onCardClick(props.card);
      } 

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
            <article className="element">
                <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
                <div className="element__text">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__group">
                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                        <div className="element__count">{likeCounter}</div>
                    </div>
                </div>
            </article>
    );
}
    
export default Card;

