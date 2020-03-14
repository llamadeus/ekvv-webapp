import Exception from 'app/exceptions/Exception';


export default class NotLoggedInException extends Exception {
  constructor() {
    super('Für diese Aktion musst du eingeloggt sein.');
  }
}
