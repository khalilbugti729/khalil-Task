const emailString =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_REGIX = emailString;

const passwordString =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_REGIX = passwordString;

const englishCharactor = /^[a-zA-Z_ ]*$/;
export const ENGLISH_WORD_REGIX = englishCharactor;

export const BASE_URL = 'https://apptest.deliveryzone.ae/api';
