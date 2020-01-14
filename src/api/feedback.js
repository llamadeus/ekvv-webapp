import { post } from 'app/utils/api';


/**
 * Submit a feedback.
 *
 * @param title
 * @param description
 * @param name
 * @param email
 * @returns {Promise<Response>}
 */
export function postFeedback(title, description, name, email) {
  return post('/feedback', {
    title,
    description,
    name,
    email,
  });
}
