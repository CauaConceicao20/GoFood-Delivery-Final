class Token {
  constructor(secret, expiresIn) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

    getSecret() {
        return this.secret;
    }

    getExpiresIn() {
        return this.expiresIn;
    }

    setSecret(secret) {
        this.secret = secret;
    }

    setExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
    }
}

export default Token;