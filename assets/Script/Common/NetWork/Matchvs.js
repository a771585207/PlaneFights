var engine;
var response = {};
var MsMatchInfo;
var MsCreateRoomInfo;
try {
    var jsMatchvs = require('matchvs.all');
    engine = new jsMatchvs.MatchvsEngine();
    response = new jsMatchvs.MatchvsResponse();
    MsMatchInfo = jsMatchvs.MsMatchInfo;
    MsCreateRoomInfo = jsMatchvs.MsCreateRoomInfo;
} catch (e) {
    console.log("load matchvs fail," + e.message);
}
module.exports = {
    engine: engine,
    response: response,
    MatchInfo: MsMatchInfo,
    CreateRoomInfo: MsCreateRoomInfo,
};