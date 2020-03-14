import Exception from 'app/exceptions/Exception';


export default class InvalidCredentials extends Exception {
  constructor() {
    super('Sorry, aber die Login-Daten sind ungültig.');
  }
}
