module.exports = new class RegisterUser {
    constructor() {
    }
    register(req,res)
    {

    }
    test1(req,res)
    {
        return res.json('test1');
    }
    generate_code (code) {
    if (code == null) {
        return "not_valid2";
    }
    let count = 0;
    let code_2 = code.trim().toUpperCase();
    for (let i = 0; i < code_2.length; i++) {
        count += check_number(code_2[i]);
    }

    return Buffer.from(count.toString()).toString("base64");

    }
}
