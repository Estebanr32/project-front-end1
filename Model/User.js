export class User {
    constructor(nick_name, score, country_code) {
        this.nick_name = nick_name;
        this.score = score;
        this.country_code = country_code;
    }

    // Getter and Setter for nick_name
    getNick_name() {
        return this.nick_name;
    }

    setNick_name(value) {
        this.nick_name = value;
    }

    // Getter and Setter for score
    getScore() {
        return this.score;
    }

    setScore(value) {
        this.score = value;
    }

    // Getter and Setter for country_code
    getCountry_code() {
        return this.country_code;
    }

    setCountry_code(value) {
        this.country_code = value;
    }
}