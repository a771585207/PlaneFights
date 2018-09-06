window.GLB = {
    RANDOM_MATCH: 1,  // 随机匹配
    PROPERTY_MATCH: 2,  // 属性匹配
    MAX_PLAYER_COUNT: 2,
    PLAYER_COUNTS: [2, 4],
    COOPERATION: 1,
    COMPETITION: 2,
    GAME_START_EVENT: "gameStart",
    NEW_ITEM_EVENT: "newItem",
    PLAYER_FLY_EVENT: "playerFly",
    PLAYER_FIRE_EVENT: "playerFire",
    PLAYER_POSITION_EVENT: "playerPosition",
    PLAYER_GET_ITEM_EVENT: "playerGetItem",
    PLAYER_REMOVE_ITEM_EVENT: "playerRemoveItem",
    PLAYER_HURT_EVENT: "playerHurt",
    READY: "ready",
    ROUND_START: "roundStart",
    ROUND_OVER: "roundOver",
    TIME_OVER: "timeOver",
    IP: "wxrank.matchvs.com",
    PORT: "3010",

    channel: 'MatchVS',
    platform: 'alpha',

    gameId: 201846,
    gameVersion: 1,
    appKey: 'aab45e8861ac4c6096da565f5d89883e',
    secret: '2857e0bea72f423ba6d56801a01153f2',

    gameType: 2,
    matchType: 1,
    tagsInfo: {"title": "A"},
    userInfo: null,
    playerUserIds: [],
    playerSet: new Set(),
    isRoomOwner: false,
    events: {},

    syncFrame: true,
    FRAME_RATE: 5,
    roomId: 0,
    isGameOver: false,
};
//module.exports = obj;