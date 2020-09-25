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

// удалить слушатель для Esc

// const removeEscListener = (evt) => {
//   console.log(evt.key);
//   if ()
// }

// добавить слушатель для Esc

// const addEscListener = (target) => {
//   document.addEventListener('keydown', function (evt) {
//     if (evt.key === 'Escape') {
//       closePopup(target);
//       removeEscListener(evt);
//     }
//   }, true);
// }

// выключатели попапа

const closePopup = (target) => {
  target.classList.remove('popup_active');
}

const openPopup = (target) => {
  target.classList.add('popup_active');
  // добавить открытому попапу обработчик для закрытия
  target.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(target);
    }
  });  
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
const submitEditForm = (evt) => {
  evt.preventDefault();
  currentProfileTitle.textContent = titleField.value;
  currentProfileSubtitle.textContent = subtitleField.value;
  closePopup(editPopup);
}

// вызвать окно редактирования профиля
const toggleEditPopup = () => {
  // вписать в поля текущие значения имени и описания
  titleField.value = currentProfileTitle.textContent;
  subtitleField.value = currentProfileSubtitle.textContent;
  
  // добавить обработчики закрытия и отправки формы
  editForm.addEventListener('submit', submitEditForm);

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

  contentSection.prepend(cardItem);
}

// добавить новую карточку
const submitAddForm = (evt) => {
  evt.preventDefault();

  // передать значения полей в функцию для построения карточки
  const newPlace = newPlaceField.value;
  const newLink = newLinkField.value;
  renderCard(newPlace, newLink);

  closePopup(addPopup);
  
  newPlaceField.value = '';
  newLinkField.value = '';
}

// вызвать окно добавления места
const toggleAddPopup = () => {
  // добавить обработчик отправки формы
  addForm.addEventListener('submit', submitAddForm);
  openPopup(addPopup);
}

// обработчики формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// обработчики формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

// обработчик клавиши Esc

document.addEventListener('keydown', popupCloseByEsc);

// прогрузить начальные карточки
initialCards.forEach(defaultCard => renderCard(defaultCard.name, defaultCard.link));