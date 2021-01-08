// TODO
// 1. Обновление счётчика лайков при постановке лайка
// 2. Окрашивание сердечка, если присутствует лайк от меня
// 3. Запрос на снятие лайка через API
// 4. Обновление счётчика лайков при снятии лайка
// 5. Окрашивание сердечка в белый при отсутствии лайка от меня

export class Card {
  constructor ({ cardData, handleCardClick, handleCardDelete, handleCardLike, userId }, templateSelector) {
    // данные карточки
    this._cardData = cardData;
    this._name = this._cardData.name;
    this._link = this._cardData.link;
    this._likeCount = this._cardData.likes.length;
    this._cardId = this._cardData._id;
    
    // колбэки
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;

    // прочие данные
    this._cardSelector = templateSelector;
    this._userId = userId;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardItem;
  }
  
  // найти лайки, оставленные пользователем

  likedByUser() {
    return this._cardData.likes.some(like => {
      return like._id === this._userId;
    })
  }

  _toggleLikeButton() {
    if (this.likedByUser(this._userId)) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  setLikeCount(likes) {
    this._cardElement.querySelector('.card__like-counter').textContent = likes;
    this._toggleLikeButton(this._userId);
  }

  _setCardData() {
    // записать атрибуты и заголовок в новую карточку
    this._cardImage.setAttribute('alt', 'На фото: ' + this._name);
    this._cardImage.setAttribute('src', this._link);
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this.setLikeCount(this._cardData.likes.length);
    //this._cardElement.querySelector('.card__like-counter').textContent = this._likeCount;
  }

  _handleLikeButton() {    
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    
    this._likeButton.addEventListener('click', () => { this._handleCardLike() });
    this._deleteButton.addEventListener('click', () => { this._handleCardDelete() });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._cardElement) });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector('.card__like-button');    
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');

    this._setCardData();    
    this._ownerId = this._cardData.owner._id;
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

  updateLikeCount(updatedLikes) {
    console.log(updatedLikes.length);
    this._cardData.likes = updatedLikes;
    this.setLikeCount(updatedLikes.length);
  }
}