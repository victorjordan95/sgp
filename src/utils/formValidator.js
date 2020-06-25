/**
 * Return if the email
 * is a valid one
 * @param {String} email The user's email
 */
export const validateEmail = email => /\S+@\S+\.\S+/.test(email);

/**
 * Returns if the lenght of the
 * fullname is more than 8 characters
 * @param {String} fullname The user's Fullname
 */
export const validateFullname = fullname => fullname.length >= 8;

/**
 * Check if password contains 7 to 15 characters
 * which contain only characters, numeric digits,
 * underscore and first character must be a letter
 * @param {String} password The user's password
 */
export const validatePassword = password => /^[A-Za-z]\w{7,14}$/.test(password);
