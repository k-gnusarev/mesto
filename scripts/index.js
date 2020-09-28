// ссылки на элементы формы редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('form[name="edit-profile"]');
const titleField = editPopup.querySelector('input[name="title"]');
const subtitleField = editPopup.querySelector('input[name="subtitle"]');

// ссылки на элементы формы добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('form[name="add-place"]');
const newPlaceField = addPopup.querySelector('input[name="placeName"]');
const newLinkField = addPopup.querySelector('input[name="placeLink"]');

// ссылки на элементы просмотрщика фото 
const viewerPopup = document.querySelector('.popup_type_viewer');
const popupPhoto = viewerPopup.querySelector('.popup__photo');

// ссылки для текущих имени и описания профиля
const currentProfileTitle = document.querySelector('.profile__title');
const currentProfileSubtitle = document.querySelector('.profile__subtitle');

// ссылки на элементы карточки
const likeButton = document.querySelector('.card__like-button');

// прочие глобальные ссылки
const contentSection = document.querySelector('.content');

// изначальные карточки

const initialCards = [
  {
    name: 'Семук-Чампей',
    link: 'https://images.unsplash.com/photo-1525454240972-e37288888ff0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
  },
  {
    name: 'Антигуа-Гватемала',
    link: 'https://images.unsplash.com/photo-1563442744-3e17a3bf4932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0MjB9&auto=format&fit=crop&w=1950&q=80',
  },
  {
    name: 'Вулкан Фуэго',
    link: 'https://images.unsplash.com/photo-1506467493604-25d7861a6703?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
  },
  {
    name: 'Тикаль',
    link: 'https://images.unsplash.com/photo-1508035460735-91088c495500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  },
  {
    name: 'Озеро Атитлан',
    link: 'https://images.unsplash.com/photo-1528543010705-e7e75169b717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
  },
  {
    name: 'Остров Флорес',
    link: 'https://images.unsplash.com/photo-1544527232-c8738c8cb2cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
  }
];

// добавить обработчики закрытия попапов

const addPopupCloseHandlers = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach(popupElement => {
    popupElement.addEventListener('click', (evt) => {
      const eventTarget = evt.target;

      if (eventTarget.classList.contains('popup') || eventTarget.classList.contains('popup__close-button')) {
        closePopup(popupElement);
      }
    });
    document.addEventListener('keydown', popupCloseByEsc);
  });
}

// сброс сообщений об ошибках

const resetAllErrors = (form) => {
  const errorInputList = Array.from(form.querySelectorAll('.popup__input_state_error'));
  const errorMessageList = Array.from(form.querySelectorAll('.popup__form-error_active'));

  if (errorInputList.length > 0) {
    errorInputList.forEach(errorInputItem => {
      errorInputItem.classList.remove('popup__input_state_error');
    });
  };

  if (errorMessageList.length > 0) {
    errorMessageList.forEach(errorMessageItem => {
      errorMessageItem.classList.remove('popup__form-error_active');
    });
  };
}

// выключатели попапа

const closePopup = (target) => {
  target.classList.remove('popup_active');
  target.removeEventListener('keydown', popupCloseByEsc);
}

const openPopup = (target) => {
  target.classList.add('popup_active');
}

const popupCloseByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
} 

// вызвать попап просмотра фото

const togglePhotoViewer = (link, title, alt) => {
  // передать атрибуты фотографий и заголовок фото
  popupPhoto.setAttribute('src', link);
  popupPhoto.setAttribute('alt', alt);
  viewerPopup.querySelector('.popup__photo-title').textContent = title;

  // сделать попап просмотра фото видимым 
  openPopup(viewerPopup);
}

// сохранить изменения профиля и закрыть попап
const submitEditForm = () => {
  currentProfileTitle.textContent = titleField.value;
  currentProfileSubtitle.textContent = subtitleField.value;
  closePopup(editPopup);
}

// вызвать окно редактирования профиля
const toggleEditPopup = () => {
  resetAllErrors(editForm);
  // вписать в поля текущие значения имени и описания
  titleField.value = currentProfileTitle.textContent;
  subtitleField.value = currentProfileSubtitle.textContent;
  
  openPopup(editPopup);
}

// разместить новую карточку

const renderCard = (place, link) => {
  // склонировать шаблон новой карточки
  const cardTemplate = document.querySelector('.card-template').content;
  const cardItem = cardTemplate.cloneNode(true);
  const cardPhoto = cardItem.querySelector('.card__photo');

  // записать атрибуты и заголовок в новую карточку
  cardPhoto.setAttribute('alt', 'На фото: ' + place);
  cardPhoto.setAttribute('src', link);
  cardItem.querySelector('.card__title').textContent = place;

  // установить кнопку лайка
  cardItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  // установить кнопку удаления
  cardItem.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  
  // задать переход в окно просмотра
  cardPhoto.addEventListener('click', function (evt) {
    const currentPhotoLink = evt.target.getAttribute('src');
    const currentPhotoTitle = place;
    const currentPhotoAlt = evt.target.getAttribute('alt');

    togglePhotoViewer(currentPhotoLink, currentPhotoTitle, currentPhotoAlt);
  });

  return cardItem;
}

const postNewCard = (cardItem) => {
  contentSection.append(cardItem);
}

const loadDefaultCards = (initialCardsList) => {
  initialCardsList.forEach((initialCardObj) => {
    postNewCard(renderCard(initialCardObj.name, initialCardObj.link));
  });
}


// добавить новую карточку
const submitAddForm = () => {
  // передать значения полей в функцию для построения карточки
  const newPlace = newPlaceField.value;
  const newLink = newLinkField.value;

  postNewCard(renderCard(newPlace, newLink));
  closePopup(addPopup);
}

// вызвать окно добавления места
const toggleAddPopup = () => {
  resetAllErrors(addForm);

  newPlaceField.value = '';
  newLinkField.value = '';

  openPopup(addPopup);
}

// обработчик закрытия и отправки формы
editForm.addEventListener('submit', submitEditForm);

// обработчик отправки формы
addForm.addEventListener('submit', submitAddForm);

// обработчики формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// обработчики формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

// прогрузить начальные карточки
loadDefaultCards(initialCards);

// добавить обработчики закрытия попапов
addPopupCloseHandlers();