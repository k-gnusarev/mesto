export class Card {
  constructor ({ cardData, handleCardClick, handleCardDelete, userId }, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likeCount = cardData.likes.length;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = templateSelector;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardItem;
  }

  _setCardData() {
    // записать атрибуты и заголовок в новую карточку
    this._cardImage.setAttribute('alt', 'На фото: ' + this._name);
    this._cardImage.setAttribute('src', this._link);
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__like-counter').textContent = this._likeCount;
  }

  _handleLikeButton() {    
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => { this._handleLikeButton() });
    this._deleteButton.addEventListener('click', () => { this._handleCardDelete() });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._cardElement) });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._setCardData();
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();

    return this._cardElement;
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._cardElement.remove();
  }
}