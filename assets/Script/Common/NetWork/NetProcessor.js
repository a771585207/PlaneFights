// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// import GLB from './Glb';
// import MSV from './Matchvs';
//var GLB = require('Glb');
var mvs = require('Matchvs');

window.Net = {
    //初始化
    init: function()
    {
        this.matchVsInit();
    },

    //MatchVS初始化
    matchVsInit: function() {
        mvs.response.initResponse = this.initResponse.bind(this);
        mvs.response.loginResponse = this.loginResponse.bind(this); // 用户登录之后的回调
        mvs.response.logoutResponse = this.logoutResponse.bind(this); // 用户登录之后的回调
        mvs.response.errorResponse = this.errorResponse.bind(this);
        mvs.response.joinRoomResponse = this.joinRoomResponse.bind(this);
        mvs.response.joinRoomNotify = this.joinRoomNotify.bind(this);
        mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
        mvs.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
        mvs.response.joinOverResponse = this.joinOverResponse.bind(this);
        mvs.response.createRoomResponse = this.createRoomResponse.bind(this);
        mvs.response.getRoomListResponse = this.getRoomListResponse.bind(this);
        mvs.response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
        mvs.response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
        mvs.response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
        mvs.response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
        mvs.response.registerUserResponse = this.registerUserResponse.bind(this);
        mvs.response.sendEventNotify = this.sendEventNotify.bind(this);
        mvs.response.networkStateNotify = this.networkStateNotify.bind(this);

        var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, GLB.gameId);
        if (result !== 0) {
            console.log('初始化失败,错误码:' + result);
        }
    },
    //初始化msv回调
    initResponse: function() {
        console.log('初始化成功');
        var userInfo = cc.sys.localStorage.getItem('regUserInfoMatchVSalpha');
        if (userInfo)
        {
            userInfo = JSON.parse(userInfo);
            userInfo = userInfo.data;
            this.login(userInfo);
            Tools.tips.show('登录中，请稍后。', true);
        }
        else
        {
            //this.registerUser();
        }
    },
    //注册
    registerUser: function() {
        console.log('开始注册');
        var result = mvs.engine.registerUser();
        if (result !== 0) {
            console.log('注册用户失败，错误码:' + result);
        } else {
            console.log('注册用户成功');
        }
    },
    //注册回调
    registerUserResponse: function(userInfo) {
        this.login(userInfo);
    },
    //登录
    login: function(userInfo) {
        var deviceId = 'TestDevice';
        var gatewayId = 0;
        GLB.userInfo = userInfo;

        console.log('开始登录,用户Id:' + userInfo.userid)

        var result = mvs.engine.login(
            userInfo.userid, userInfo.token,
            GLB.gameId, GLB.gameVersion,
            GLB.appKey, GLB.secret,
            deviceId, gatewayId
        );
        if (result !== 0) {
            console.log('登录失败,错误码:' + result);
        }
    },
    //登录回调
    loginResponse: function(info) {
        if (info.status !== 200) {
            console.log('登录失败,异步回调错误码:' + info.status);
            switch(info.status)
            {
            case 402:
                {
                    console.log('应用校验失败，确认是否在未上线时用了release环境，并检查gameID、appkey 和 secret');
                }
            break;
            case 403:
                {
                    console.log('检测到该账号已在其他设备登录');
                }
            break;
            case 404:
                {
                    console.log('无效用户');
                }
            break;
            case 500:
                {
                    console.log('服务器内部错误');
                }
            break;
            default:
                {
                    console.log('未知错误');
                }
            }
        } else {
            console.log('登录成功');
            this.lobbyShow();
        }
    },
    //
    lobbyShow: function() {
        cc.director.preloadScene('LobbyScene', function () {
            cc.director.loadScene('LobbyScene');
        });
    },
    //
    networkStateNotify: function(netNotify) {
        clientEvent.dispatch(clientEvent.eventType.leaveRoomMedNotify, netNotify);
    },
    //
    kickPlayerNotify: function(kickPlayerNotify) {
        var data = {
            kickPlayerNotify: kickPlayerNotify
        }
        clientEvent.dispatch(clientEvent.eventType.kickPlayerNotify, data);
    },
    //
    kickPlayerResponse: function(kickPlayerRsp) {
        if (kickPlayerRsp.status !== 200) {
            console.log('失败kickPlayerRsp:' + kickPlayerRsp);
            return;
        }
        var data = {
            kickPlayerRsp: kickPlayerRsp
        }
        clientEvent.dispatch(clientEvent.eventType.kickPlayerResponse, data);
    },
    //
    getRoomListExResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log('失败 rsp:' + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomListExResponse, data);
    },
    //
    getRoomDetailResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log('失败 rsp:' + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomDetailResponse, data);
    },
    //
    getRoomListResponse: function(status, roomInfos) {
        if (status !== 200) {
            console.log('失败 status:' + status);
            return;
        }
        var data = {
            status: status,
            roomInfos: roomInfos
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomListResponse, data);
    },
    //
    createRoomResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log('失败 createRoomResponse:' + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.createRoomResponse, data);
    },
    //
    joinOverResponse: function(joinOverRsp) {
        if (joinOverRsp.status !== 200) {
            console.log('失败 joinOverRsp:' + joinOverRsp);
            return;
        }
        var data = {
            joinOverRsp: joinOverRsp
        }
        clientEvent.dispatch(clientEvent.eventType.joinOverResponse, data);
    },
    //
    joinRoomResponse: function(status, roomUserInfoList, roomInfo) {
        if (status !== 200) {
            console.log('失败 joinRoomResponse:' + status);
            return;
        }
        var data = {
            status: status,
            roomUserInfoList: roomUserInfoList,
            roomInfo: roomInfo
        }
        clientEvent.dispatch(clientEvent.eventType.joinRoomResponse, data);
    },
    //
    joinRoomNotify: function(roomUserInfo) {
        var data = {
            roomUserInfo: roomUserInfo
        }
        clientEvent.dispatch(clientEvent.eventType.joinRoomNotify, data);
    },
    //
    leaveRoomResponse: function(leaveRoomRsp) {
        if (leaveRoomRsp.status !== 200) {
            console.log('失败 leaveRoomRsp:' + leaveRoomRsp);
            return;
        }
        var data = {
            leaveRoomRsp: leaveRoomRsp
        }
        clientEvent.dispatch(clientEvent.eventType.leaveRoomResponse, data);
    },
    //
    leaveRoomNotify: function(leaveRoomInfo) {
        var data = {
            leaveRoomInfo: leaveRoomInfo
        }
        clientEvent.dispatch(clientEvent.eventType.leaveRoomNotify, data);
    },
    //
    logoutResponse: function(status) {
        cc.director.loadScene('lobby');
    },
    //
    errorResponse: function(error, msg) {
        if (error === 1001) {
            uiFunc.openUI('uiTip', function(obj) {
                var uiTip = obj.getComponent('uiTip');
                if (uiTip) {
                    uiTip.setData('网络断开连接');
                }
            });
            setTimeout(function() {
                mvs.engine.logout('');
                cc.game.removePersistRootNode(this.node);
                cc.director.loadScene('lobby');
            }.bind(this), 2500);
        }
        console.log('错误信息：' + error);
        console.log('错误信息：' + msg);
    },

    // 玩家行为通知--
    sendEventNotify: function(info) {
        var cpProto = JSON.parse(info.cpProto);

        if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
            var remoteUserIds = JSON.parse(info.cpProto).userIds;
            // 分队--
            if (remoteUserIds.length % 2 !== 0) {
                return console.log('人数不为偶数, 无法开战！');
            }
            var selfCamp = 0;
            var index;
            for (index = 0; index < remoteUserIds.length; index++) {
                if (GLB.userInfo.id === remoteUserIds[index]) {
                    if (index < remoteUserIds.length / 2) {
                        selfCamp = 0;
                    } else {
                        selfCamp = 1;
                    }
                    break;
                }
            }
            this.enemyIds = [];
            this.friendIds = [GLB.userInfo.id];
            for (index = 0; index < remoteUserIds.length; index++) {
                var camp = 0;
                if (index < remoteUserIds.length / 2) {
                    camp = 0;
                } else {
                    camp = 1;
                }
                if (camp === selfCamp) {
                    if (remoteUserIds[index] !== GLB.userInfo.id) {
                        this.friendIds.push(remoteUserIds[index]);
                    }
                } else {
                    this.enemyIds.push(remoteUserIds[index]);
                }
            }
            GLB.playerUserIds = this.friendIds.concat(this.enemyIds);
            console.log('remoteUserIds:' + remoteUserIds);
            console.log('GLB.playerUserIds:' + GLB.playerUserIds);

            this.startGame();
        }

        var player = null;
        if (info.cpProto.indexOf(GLB.PLAYER_FLY_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(info.srcUserId);
            if (player) {
                player.flyNotify();
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_FIRE_EVENT) >= 0) {
            for (var i = 0; i < GLB.playerUserIds.length; i++) {
                player = Game.PlayerManager.getPlayerByUserId(GLB.playerUserIds[i]);
                if (player) {
                    for (var j = 0; j < cpProto.data.length; j++) {
                        if (cpProto.data[j].playerId === player.userId) {
                            player.fireNotify(cpProto.data[j].bulletPointY);
                        }
                    }
                }
            }
        }

        if (info.cpProto.indexOf(GLB.NEW_ITEM_EVENT) >= 0) {
            Game.ItemManager.spawnItemNotify(cpProto);
        }

        if (info.cpProto.indexOf(GLB.PLAYER_GET_ITEM_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(cpProto.playerId);
            if (player) {
                player.getItemNotify(cpProto);
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_REMOVE_ITEM_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(info.srcUserId);
            if (player) {
                player.removeItemNotify(cpProto);
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_HURT_EVENT) >= 0) {
            if (Game.GameManager.gameState !== GameState.Over) {
                player = Game.PlayerManager.getPlayerByUserId(cpProto.playerId);
                if (player) {
                    player.hurtNotify(cpProto.murderId);
                }
                // 检查回合结束--
                var loseCamp = Game.PlayerManager.getLoseCamp();
                if (loseCamp != null) {
                    Game.GameManager.gameState = GameState.Over
                    if (GLB.isRoomOwner) {
                        this.sendRoundOverMsg(loseCamp);
                    }
                }
            }
        }

        if (info.cpProto.indexOf(GLB.ROUND_OVER) >= 0) {
            Game.GameManager.gameState = GameState.Over;
            // 如果发送方为敌方--
            var loseCamp1 = cpProto.loseCamp;
            if (this.friendIds.indexOf(info.srcUserId) < 0) {
                if (loseCamp1 === Camp.Friend) {
                    loseCamp1 = Camp.Enemy;
                } else if (loseCamp1 === Camp.Enemy) {
                    loseCamp1 = Camp.Friend;
                }
            }
            clientEvent.dispatch(clientEvent.eventType.roundOver, {loseCamp: loseCamp1});
        }

        if (info.cpProto.indexOf(GLB.ROUND_START) >= 0) {
            Game.GameManager.gameState = GameState.Play;
            clientEvent.dispatch(clientEvent.eventType.roundStart);
        }

        if (info.cpProto.indexOf(GLB.READY) >= 0) {
            this.readyCnt++;
            if (GLB.isRoomOwner && this.readyCnt >= GLB.playerUserIds.length) {
                this.sendRoundStartMsg();
            }
        }

        if (info.cpProto.indexOf(GLB.TIME_OVER) >= 0) {
            Game.GameManager.gameState = GameState.Over;
            for (var m = 0; m < GLB.playerUserIds.length; m++) {
                player = Game.PlayerManager.getPlayerByUserId(GLB.playerUserIds[m]);
                if (player) {
                    player.dead();
                }
            }
            clientEvent.dispatch(clientEvent.eventType.roundOver, {loseCamp: Camp.None});
        }
    },
    //
    sendEventEx: function(msg) {
        var result = mvs.engine.sendEventEx(0, JSON.stringify(msg), 0, GLB.playerUserIds);
        if (result.result !== 0) {
            console.log(msg.action, result.result);
        }
    },
    //
    getRankDataListener: function() {
        this.network.on('connector.rankHandler.getRankData', function(recvMsg) {
            uiFunc.openUI('uiRankPanelVer', function(obj) {
                var uiRankPanel = obj.getComponent('uiRankPanel');
                uiRankPanel.setData(recvMsg.rankArray);
            });
        }.bind(this));
    },
    //
    findPlayerByAccountListener: function() {
        this.network.on('connector.entryHandler.findPlayerByAccount', function(recvMsg) {
            clientEvent.dispatch(clientEvent.eventType.playerAccountGet, recvMsg);
        });
    },
    //
    loginServer: function() {
        if (!this.network.isConnected()) {
            this.network.connect(GLB.IP, GLB.PORT, function() {
                    this.network.send('connector.entryHandler.login', {
                        'account': GLB.userInfo.id + '',
                        'channel': '0',
                        'userName': Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + '',
                        'headIcon': Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : '-'
                    });
                    setTimeout(function() {
                        this.network.send('connector.rankHandler.updateScore', {
                            'account': GLB.userInfo.id + '',
                            'game': 'game0'
                        });
                    }.bind(this), 500);

                }.bind(this)
            );
        } else {
            this.network.send('connector.rankHandler.updateScore', {
                'account': GLB.userInfo.id + '',
                'game': 'game0'
            });
        }
    },
    //
    userInfoReq: function(userId) {
        if (!Game.GameManager.network.isConnected()) {
            Game.GameManager.network.connect(GLB.IP, GLB.PORT, function() {
                    Game.GameManager.network.send('connector.entryHandler.login', {
                        'account': GLB.userInfo.id + '',
                        'channel': '0',
                        'userName': Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + '',
                        'headIcon': Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : '-'
                    });
                    setTimeout(function() {
                        Game.GameManager.network.send('connector.entryHandler.findPlayerByAccount', {
                            'account': userId + '',
                        });
                    }, 200);
                }
            );
        } else {
            Game.GameManager.network.send('connector.entryHandler.findPlayerByAccount', {
                'account': userId + '',
            });
        }
    },

    logout: function()
    {
        msv.engine.logout();
    }
};

//module.exports = Net;