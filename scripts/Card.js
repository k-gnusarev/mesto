export class Card {
  constructor (cardData, cardSelector, togglePhotoViewer) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._togglePhotoViewer = togglePhotoViewer;
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
    const cardPhoto = this._element.querySelector('.card__photo');

    cardPhoto.setAttribute('alt', 'На фото: ' + this._name);
    cardPhoto.setAttribute('src', this._link);
    this._element.querySelector('.card__title').textContent = this._name;
  }


  _handleLikeButton() {    
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__photo');
    
    this._likeButton.addEventListener('click', () => { this._handleLikeButton() });
    this._deleteButton.addEventListener('click', () => { this._handleDeleteButton() });

    // задать переход в окно просмотра
    this._cardImage.addEventListener('click', () => {
      const currentPhotoLink = this._cardImage.getAttribute('src');
      const currentPhotoTitle = this._name;
      const currentPhotoAlt = this._cardImage.getAttribute('alt');

      this._togglePhotoViewer(currentPhotoLink, currentPhotoTitle, currentPhotoAlt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setCardData();
    this._setEventListeners();

    return this._element;
  }
}