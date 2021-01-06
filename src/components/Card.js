export class Card {
  constructor ({ cardData, handleCardClick }, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likeCount = cardData.likes.length;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    
    this._likeButton.addEventListener('click', () => { this._handleLikeButton() });
    this._deleteButton.addEventListener('click', () => { this._handleDeleteButton() });

    // задать переход в окно просмотра
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._cardElement) });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._setCardData();
    this._setEventListeners();

    return this._cardElement;
  }
}