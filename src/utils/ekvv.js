/**
 * DOMParser instance.
 *
 * @type {DOMParser}
 */
const parser = new DOMParser();

const PROXY_URL = 'localhost:3000/api';

/**
 * Ensure that the given url contains my proxy server url.
 *
 * @param path
 * @returns {*}
 */
export function ensureProxyUrl(path) {
  const url = new URL(path);
  const pathname = url.pathname.replace(/^\/api/, '');

  return `https://${PROXY_URL}${pathname}${url.search}`;
}

/**
 * Send a request to the given url.
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise<Response>}
 */
export async function request(url, method = 'get', data = undefined) {
  const response = await fetch(url, {
    method,
    body: data,
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response;
}

/**
 * Send a request to the given url and return the html as a document.
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise<Document>}
 */
export async function requestDoc(url, method = 'get', data = undefined) {
  const response = await request(url, method, data);
  const text = await response.text();

  return parser.parseFromString(text, 'text/html');
}
