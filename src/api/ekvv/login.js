import InvalidCredentials from 'app/exceptions/InvalidCredentials';
import LoginFailed from 'app/exceptions/LoginFailed';
import { requestDoc } from 'app/utils/ekvv';
import { buildFormData } from 'app/utils/form';


const LOGIN_URL = '/api/idp/login';
const EKVV_LOGIN_URL = '/api/kvv_publ/publ/benvw_Login_MatrikelAct';

const LOGGED_IN_MESSAGE_BIS = 'Sie haben sich erfolgreich angemeldet!';
const INVALID_CREDENTIALS_MESSAGE_BIS = 'Diese Kombination aus Benutzername und Passwort ist unbekannt.';
const LOGGED_IN_MESSAGE_EKVV = 'Sie sind am eKVV angemeldet!';

/**
 * Check if the given page shows the BIS login message.
 *
 * @param loginPage
 * @returns {boolean}
 */
function isLoggedIntoBis(loginPage) {
  const $container = loginPage.querySelector('#contenthauptspalte');

  return $container
    ? $container.innerText.includes(LOGGED_IN_MESSAGE_BIS)
    : false;
}

/**
 * Check if the bis login page shows the invalid credentials message.
 *
 * @param bisLoginPage
 * @returns {boolean}
 */
function bisLoginPageShowsFailedLogin(bisLoginPage) {
  const $container = bisLoginPage.querySelector('#contenthauptspalte > p.error');

  return $container
    ? $container.innerText.includes(INVALID_CREDENTIALS_MESSAGE_BIS)
    : false;
}

/**
 * Check if the given page shows the eKVV login message.
 *
 * @param ekvvLoginPage
 * @returns {boolean}
 */
function isLoggedIntoEkvv(ekvvLoginPage) {
  const $container = ekvvLoginPage.querySelector('#inhalt_mit_rechtem_kasten');

  return $container
    ? $container.innerText.includes(LOGGED_IN_MESSAGE_EKVV)
    : false;
}

/**
 * Logs the user into the BIS.
 *
 * @param username
 * @param password
 * @returns {Promise<boolean>}
 */
async function loginBis(username, password) {
  const loginPage = await requestDoc(LOGIN_URL);

  if (isLoggedIntoBis(loginPage)) {
    return true;
  }

  const data = buildFormData({
    username,
    password,
    sso: 'on',
    nnc: loginPage.getElementById('nnc').value,
  });
  const loginPageResult = await requestDoc(LOGIN_URL, 'post', data);

  if (bisLoginPageShowsFailedLogin(loginPageResult)) {
    throw new InvalidCredentials();
  }

  if (!isLoggedIntoBis(loginPageResult)) {
    throw new LoginFailed();
  }

  return true;
}

/**
 * Logs the user into the eKVV.
 *
 * @returns {Promise<boolean>}
 */
async function loginEkvv() {
  const ekvvLoginPage = await requestDoc(EKVV_LOGIN_URL);

  if (isLoggedIntoEkvv(ekvvLoginPage)) {
    return true;
  }

  const $loginForm = ekvvLoginPage.querySelector('#signinresponseform');
  const formUrl = $loginForm.action.replace('ekvv.uni-bielefeld.de', 'localhost:3000/api');
  const data = buildFormData({
    wa: $loginForm.querySelector('input[name=wa]').value,
    wresult: $loginForm.querySelector('input[name=wresult]').value,
    wctx: $loginForm.querySelector('input[name=wctx]').value,
    wtrealm: $loginForm.querySelector('input[name=wtrealm]').value,
  });
  const ekvvTrustPage = await requestDoc(formUrl, 'post', data);

  if (!isLoggedIntoEkvv(ekvvTrustPage)) {
    throw new LoginFailed();
  }

  return true;
}

/**
 * Try to log into BIS and eKVV.
 *
 * @param username
 * @param password
 * @returns {Promise<boolean>}
 */
export default async function login(username, password) {
  const loggedIntoBis = await loginBis(username, password);

  if (!loggedIntoBis) {
    return false;
  }

  return loginEkvv();
}
