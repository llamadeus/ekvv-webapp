import NotLoggedInException from 'app/exceptions/NotLoggedInException';
import {
  ensureProxyUrl,
  request,
  requestDoc,
} from 'app/utils/ekvv';
import { buildFormData } from 'app/utils/form';


const NEWS_FEED_URL = '/api/kvv_publ/publ/Benvw_Newsfeed_Einstellungen.jsp';
const RSS_HOME_URL = '/api/kvv_publ/publ/RssHome.jsp';

const NEWS_FEED_PAGE_CAPTION = 'Kalenderintegration und Newsfeeds';
const NEWS_FEED_CALENDAR_INTEGRATION_ACTIVE_TEXT = 'Meine persönlichen Newsfeeds und die Kalenderintegration für meinen Stundenplan sind freigeschaltet!';


/**
 * Check if the news feed page says we're logged in.
 *
 * @param newsFeedPage
 * @returns {boolean}
 */
function checkLogin(newsFeedPage) {
  const $container = newsFeedPage.querySelector('#inhalt_mit_linkem_abstand');

  return $container
    ? $container.innerText.includes(NEWS_FEED_PAGE_CAPTION)
    : false;
}

/**
 * Check if the news feed page shows the message, that calendar integration is already active.
 *
 * @param newsFeedPage
 * @returns {boolean}
 */
function checkIfCalendarIntegrationIsActive(newsFeedPage) {
  const $container = newsFeedPage.querySelector('#inhalt_mit_linkem_abstand');

  return $container
    ? $container.innerText.includes(NEWS_FEED_CALENDAR_INTEGRATION_ACTIVE_TEXT)
    : false;
}

/**
 * Determine if the calendar integration has been enabled.
 *
 * @returns {Promise<(boolean|Document)[]>}
 */
export async function isCalendarIntegrationActive() {
  const newsFeedPage = await requestDoc(NEWS_FEED_URL);

  if (!checkLogin(newsFeedPage)) {
    throw new NotLoggedInException();
  }

  return [
    checkIfCalendarIntegrationIsActive(newsFeedPage),
    newsFeedPage,
  ];
}

/**
 * Activate the calendar integration.
 *
 * @param newsFeedPage
 * @returns {Promise<Document>}
 */
export async function activateCalendarIntegration(newsFeedPage) {
  const $activateForm = newsFeedPage.querySelector('#inhalt_mit_linkem_abstand > form');
  const formUrl = ensureProxyUrl($activateForm.action);
  const data = buildFormData({
    btNewsfeed: $activateForm.querySelector('input[name=btNewsfeed]').value,
  });

  return requestDoc(formUrl, 'post', data);
}

/**
 * Get the calendar url from the rss home page.
 *
 * @returns {Promise<*>}
 */
export async function getEkvvCalendarUrl() {
  const rssHomePage = await requestDoc(RSS_HOME_URL);
  const iCalendarLink = rssHomePage.querySelector('#kalender a[href^="https://ekvv.uni-bielefeld.de/ws/calendar?token="]');

  return iCalendarLink
    ? iCalendarLink.href
    : null;
}

/**
 * Fetch the calendar from the given url and parse the ical response.
 *
 * @param calendarUrl
 * @returns {Promise<*>}
 */
export async function getCalendarEvents(calendarUrl) {
  const response = await request(ensureProxyUrl(calendarUrl));

  return response.text();
}
