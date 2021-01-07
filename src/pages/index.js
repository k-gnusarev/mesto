import './index.css';

import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import {
  config,
  editButton,
  editPopup,
  editForm,
  titleField,
  subtitleField,
  addButton,
  addPopup,
  addForm,
  newPlaceField,
  newLinkField,
  viewerPopup,
  currentProfileTitle,
  currentProfileSubtitle,
  contentSection,
  currentAvatar,
  deletePopup,
  currentUserId
} from '../utils/constants.js';
import { PopupConfirm } from '../components/PopupConfirm';

// ИНИЦИАЛИЗАЦИЯ API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: 'deb0aa6f-32ec-48b3-9746-6ea746dde45e',
    'Content-Type': 'application/json'
  }
});

// ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ С СЕРВЕРА

api.getUserData()
  .then(userData => {
    currentAvatar.src = userData.avatar;
    currentProfileTitle.textContent = userData.name;
    currentProfileSubtitle.textContent = userData.about;  
  });

// создание экземпляра информации о пользователе

const userInfo = new UserInfo({
  titleElement: currentProfileTitle,
  subtitleElement: currentProfileSubtitle
});

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ МОДАЛЬНЫХ ОКОН
// 1. Окно просмотра фото

const imagePopup = new PopupWithImage(viewerPopup);

// 2. Окно формы обновления профиля
// обработчик отправки формы обновления профиля

const handleProfileEditSubmit = () => {
  const updatedInfo = {
    name: titleField.value,
    about: subtitleField.value
  }

  api.updateUserInfo(updatedInfo.name, updatedInfo.about)
    .then(updatedInfo => {
      userInfo.setUserInfo(updatedInfo);
    });

  newEditPopup.close();
}

// создание экземпляра формы обновления профиля

const newEditPopup = new PopupWithForm({
  popupElement: editPopup,
  submitHandler: handleProfileEditSubmit
});

// вызов окна редактирования профиля
const toggleEditPopup = () => {
  const currentUserInfo = userInfo.getUserInfo();

  titleField.value = currentUserInfo.name;
  subtitleField.value = currentUserInfo.about;

  editPopupValidator.resetAllErrors();
  
  newEditPopup.open();
}

// 3. Окно добавления новой карточки
// обработчик отправки формы добавления карточки

const handleCardAddSubmit = () => {
  const cardObj = {
    name: newPlaceField.value,
    link: newLinkField.value,
    likes: []
  }


  api.sendNewCard(cardObj.link, cardObj.name)
    .then(() => {    
      const card = new Card({
        cardData: cardObj,
        handleCardClick: () => {
          imagePopup.open(cardObj.link, cardObj.name);
        },
        handleCardDelete: () => {
          deletePopup.open(card);
        },
        userId: currentUserId
      },
      '.card-template');

      contentSection.prepend(card.generateCard());
    });

  newAddPopup.close();
}

// создание экземпляра формы добавления карточки

const newAddPopup = new PopupWithForm({
  popupElement: addPopup,
  submitHandler: handleCardAddSubmit
});


// вызов окна добавления карточки
const toggleAddPopup = () => {
  addForm.reset();
  addPopupValidator.resetAllErrors();
  newAddPopup.open();
}

// 4. Подтверждение удаления карточки
// обработчик нажатия кнопки подтверждения

const handleDeleteConfirmation = (evt, cardElement) => {
  evt.preventDefault();

  api.deleteCard(cardElement.getCardId())
    .then(() => {
      cardElement.deleteCard();
      newDeletePopup.close();
    })
}

// создание экземпляра подтверждения удаления

const newDeletePopup = new PopupConfirm({
  popupElement: deletePopup,
  submitHandler: handleDeleteConfirmation
});

// ПРОГРУЗИТЬ НАЧАЛЬНЫЕ КАРТОЧКИ
// 1. получаем карточки с сервера
api.getInitialCards()
  .then(serverCards => {
    renderInitialCards(serverCards);    
  });

// 2. отрисовываем их

const renderInitialCards = serverCards => {
  const section = new Section(
    {
      items: serverCards,
      renderer: item => {
        const card = new Card({
          cardData: item,
          handleCardClick: () => {
            imagePopup.open(item.link, item.name);
          },
          handleCardDelete: () => {
            newDeletePopup.open(card);
          },
          userId: currentUserId
        },
        '.card-template');
        section.addItem(card.generateCard());
      }
    },
    '.content');
    section.renderItems();
}

// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ СОБЫТИЙ

// вызов формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// вызов формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

// модальные окна
newEditPopup.setEventListeners();
newAddPopup.setEventListeners();
imagePopup.setEventListeners();
newDeletePopup.setEventListeners();

// ВАЛИДАЦИЯ

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();

export { addForm, editForm }