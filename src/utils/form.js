/**
 * Build a form data object from the given data.
 *
 * @param data
 * @returns {URLSearchParams}
 */
export function buildFormData(data) {
  const formData = new URLSearchParams();

  Object.keys(data).forEach((key) => {
    formData.set(key, data[key]);
  });

  return formData;
}
