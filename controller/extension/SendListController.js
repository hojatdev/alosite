const geoip = require('geoip-lite');
const Alexa = require('./../../db/Alexa');
const Controller = require('../../controller/Controller')
module.exports = new class SendListController extends Controller {
    async sendList(req, res) {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1';
        if (ip === '::1')
        {
            ip = '31.7.113.43';
        }
        let country = await geoip.lookup(ip).country === 'IR' ? 'ir' : 'other';
        let list = await Alexa.getListDataBase(req,res,country,1,20);
        if (!list.length) {
            let response = this.randomString(5) + this.Base64encode('|https://clickaval.com/');
            return res.send(response);
        }
        let listId = '(';
        let listSite = '';
        list.forEach(function (arrayItem) {
            listId += arrayItem.id + ',';
            listSite += '|' + arrayItem.url;
        });
        let resultAlexa = await  Alexa.updateDataAnalyzeAlexa(req,res,listId.slice(0, -1));
        console.log(resultAlexa.affectedRows);
        let response = this.randomString(5) + this.Base64encode(listSite);
        return res.send(response);
    }


}
