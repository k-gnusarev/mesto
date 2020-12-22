import { addForm, editForm } from './utils/constants.js';
import { FormValidator } from './components/FormValidator.js'
import { config } from './utils/constants.js'

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();

export { editPopupValidator, addPopupValidator }