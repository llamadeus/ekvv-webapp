/**
 * Remove undefined, null or empty-string values from the given data.
 *
 * @param data
 * @returns {{}}
 */
function transformPostData(data) {
  return Object.keys(data).reduce((carry, key) => {
    const value = data[key];

    if (typeof value == 'undefined' || value === null || value === '') {
      return carry;
    }

    // eslint-disable-next-line no-param-reassign
    carry[key] = typeof value == 'object'
      ? transformPostData(value)
      : value;

    return carry;
  }, {});
}

/**
 * Fetch the given resource.
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise<any>}
 */
async function myFetch(url, method, data) {
  const options = {
    method,
    mode: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  if (method === 'POST' && data) {
    options.body = JSON.stringify(transformPostData(data));
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

/**
 * Send a get request.
 *
 * @param url
 * @returns {Promise<any>}
 */
export function get(url) {
  return myFetch(url, 'GET');
}

/**
 * Send a post request to the server.
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function post(url, data) {
  return myFetch(url, 'POST', data);
}
