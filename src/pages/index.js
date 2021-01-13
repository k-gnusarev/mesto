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
  currentAvatar,
  deletePopup,
  currentUserId,
  avatarPopup,
  updateAvatarButton,
  avatarForm,
  avatarUrlField,
  waitCaption,
  submitCaption
} from '../utils/constants.js';
import { PopupConfirm } from '../components/PopupConfirm';

// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

// переменная будет принимать экземпляр класса Section
let section = {};

// переключатель раскладки карточек
// используется в классе Section для выбор метода добавления карточек в секцию
// при true карточки раскладываются методом .append(), для правильной расстановки массива карточек с сервера
// при false новые карточки добавляются в начало секции
let renderSwitch = true;

// ИНИЦИАЛИЗАЦИЯ API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: 'deb0aa6f-32ec-48b3-9746-6ea746dde45e',
    'Content-Type': 'application/json'
  }
});

// создание экземпляра информации о пользователе

const userInfo = new UserInfo({
  titleElement: currentProfileTitle,
  subtitleElement: currentProfileSubtitle,
  avatarElement: currentAvatar
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

  newEditPopup.renderLoading(waitCaption);

  api.updateUserInfo(updatedInfo.name, updatedInfo.about)
    .then(updatedInfo => {
      userInfo.setUserInfo(updatedInfo);
      newEditPopup.close();
    })
    .catch(err => api.handleError(err));
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

  newEditPopup.renderLoading(submitCaption);
  editPopupValidator.resetAllErrors();
  
  newEditPopup.open();
}

// 3. Окно добавления новой карточки
// обработчик отправки формы добавления карточки

const handleCardAddSubmit = () => {
  const cardObj = {
    name: newPlaceField.value,
    link: newLinkField.value,
  }

  newAddPopup.renderLoading(waitCaption);

  api.sendNewCard(cardObj.link, cardObj.name)
    .then(item => {
      cardRenderer(item);
      newAddPopup.close();
    })
    .catch(err => api.handleError(err));
}

// создание экземпляра формы добавления карточки

const newAddPopup = new PopupWithForm({
  popupElement: addPopup,
  submitHandler: handleCardAddSubmit
});


// вызов окна добавления карточки
const toggleAddPopup = () => {
  addForm.reset();
  newAddPopup.renderLoading(submitCaption);
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
    .catch(err => api.handleError(err))
}

// 5. Окно обновления аватара
// обработчик отправки формы обновления аватара
const handleAvatarUpdate = () => {
  // взять введенное значение
  const newAvatarUrl = avatarUrlField.value;
  // установить надпись ожидания на кнопке
  newAvatarPopup.renderLoading(waitCaption);
  // отправить данные на сервер
  api.updateAvatar(newAvatarUrl)
    .then(userData => {
      currentAvatar.src = userData.avatar;
      newAvatarPopup.close();
    })
    .catch(err => api.handleError(err))
}

// создание экземпляра окна обновления аватара
const newAvatarPopup = new PopupWithForm({
  popupElement: avatarPopup,
  submitHandler: handleAvatarUpdate
});

// вызов окна редактирования аватара

const toggleEditAvatarPopup = () => {
  avatarForm.reset();
  newAvatarPopup.renderLoading(submitCaption);
  avatarPopupValidator.resetAllErrors();  
  newAvatarPopup.open();
}

// создание экземпляра подтверждения удаления

const newDeletePopup = new PopupConfirm({
  popupElement: deletePopup,
  submitHandler: handleDeleteConfirmation
});

// функция отрисовки карточки

const cardRenderer = item => {
  {
    const card = new Card({
      cardData: item,
      handleCardClick: () => {
        imagePopup.open(item.link, item.name);
      },
      handleCardDelete: () => {
        newDeletePopup.open(card);
      },
      handleCardLike: () => {
        const cardId = item._id;
        const toggleLike = card.likedByUser() ? api.removeLike(cardId) : api.setLike(cardId);

        toggleLike.then(item => {
          card.updateLikeCount(item.likes);
        })
        .catch(err => api.handleError(err))
      },
      userId: currentUserId
    },
    '.card-template');

    section.addItem(card.generateCard(), renderSwitch);
  }
}

// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ СОБЫТИЙ

// вызов формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// вызов формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

// вызов формы обновления аватара
updateAvatarButton.addEventListener('click', toggleEditAvatarPopup);

// модальные окна
newEditPopup.setEventListeners();
newAddPopup.setEventListeners();
imagePopup.setEventListeners();
newDeletePopup.setEventListeners();
newAvatarPopup.setEventListeners();

// ВАЛИДАЦИЯ

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();

const avatarPopupValidator = new FormValidator(config, avatarForm);
avatarPopupValidator.enableValidation();

// ЗАГРУЗКА ДАННЫХ СТРАНИЦЫ

Promise.all([
  api.getUserData(),
  api.getInitialCards()
])    
.then(values => {
  const [userData, initialCards] = values;
  // обработка ответа getUserData
  userInfo.setUserInfo(userData);

  // обработка ответа getInitialCards
  section = new Section(
    {
      items: initialCards,
      renderer: cardRenderer
    },
    '.content');
    section.renderItems();

    // переключить переключатель, т.к. в дальнейшем будут добавляться только новые карточки
    renderSwitch = false;
})
.catch(err => {
  api.handleError(err);
})

export { addForm, editForm }