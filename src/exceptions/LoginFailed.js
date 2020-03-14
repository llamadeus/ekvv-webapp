import Exception from 'app/exceptions/Exception';


export default class LoginFailed extends Exception {
  constructor() {
    super('Login fehlgeschlagen.');
  }
}
