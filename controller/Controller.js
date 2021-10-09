module.exports = class controller {
    constructor() {
    }
    checkNumber(varable){
        let num = 0;
        switch (varable) {
            case "1":
                num = 1;
                break;
            case "2":
                num = 2;
                break;
            case "3":
                num = 3;
                break;
            case "4":
                num = 4;
                break;
            case "5":
                num = 5;
                break;
            case "6":
                num = 6;
                break;
            case "7":
                num = 7;
                break;
            case "8":
                num = 8;
                break;
            case "9":
                num = 9;
                break;
            case "A":
                num = 12;
                break;
            case "B":
                num = 14;
                break;
            case "C":
                num = 3;
                break;
            case "D":
                num = 7;
                break;
            case "E":
                num = 8;
                break;
            case "F":
                num = 2;
                break;
            case "G":
                num = 1;
                break;
            case "H":
                num = 11;
                break;
            case "I":
                num = 10;
                break;
            case "J":
                num = 13;
                break;
            case "K":
                num = 5;
                break;
            case "L":
                num = 6;
                break;
            case "M":
                num = 18;
                break;
            case "N":
                num = 30;
                break;
            case "O":
                num = 17;
                break;
            case "P":
                num = 26;
                break;
            case "Q":
                num = 25;
                break;
            case "R":
                num = 24;
                break;
            case "S":
                num = 20;
                break;
            case "T":
                num = 19;
                break;
            case "U":
                num = 15;
                break;
            case "V":
                num = 16;
                break;
            case "W":
                num = 21;
                break;
            case "X":
                num = 23;
                break;
            case "Y":
                num = 4;
                break;
            case "Z":
                num = 9;
                break;
            default:
                num = 0;
        }
        return num;
    }
    generateCode(code)  {
        if (code == null) {
            return "not_valid";
        }
        let count = 0;
        let code_2 = code.trim().toUpperCase();
        for (let i = 0; i < code_2.length; i++) {
            count += this.checkNumber(code_2[i]);
        }
        return Buffer.from(count.toString()).toString("base64");
    }
    Base64encode(val){
        return Buffer.from(val.toString()).toString('base64');
    }
    Base64decode(val){
        return Buffer.from(val.toString(), 'base64').toString('ascii');
    }
    randomString(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}