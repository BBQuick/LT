const fs = require("fs");
// 读取并解析JSON文件
const s_pItemDatas = JSON.parse(fs.readFileSync('./p_Items.json'));

// 初始化物品ID
const initItemId = function (t, e, i, a, n, s, m) {
    return r_create(e, t, m, n, s);
};

// 创建物品数据
const r_create = function (t, e, i, a, n) {
    return getItemData(t, e, i, n);
};

// 获取物品核心数据
function getItemData(a, r, n, i = -1) {
    if (s_pItemDatas) {
        if (a >= s_pItemDatas.length) {
            return null;
        }
        const u = s_pItemDatas[a];
        for (let j = 0; j < u.length; j++) {
            const l = u[j];
            if (i !== -1) {
                if (l.itemID === r && l.starID === n && l.levelMax >= i && l.levelMin <= i) {
                    return l;
                }
            } else if (l.itemID === r && l.starID === n) {
                return l;
            }
        }
    }
    return null;
}

// 物品分类常量
const m = {
    "kItemSortEngine": 0,
    "kItemSortArmor": 1,
    "kItemSortWeapon": 2,
    "kItemSortWingman": 3,
    "kItemSortProp": 4,
    "kItemSortGift": 5,
    "kItemSortExtra": 6,
    "kItemSortWheelEffect": 7,
    "kItemSortDrug": 8,
    "kItemSortExpand": 9,
    "kItemSortLoot": 10,
    "kItemSortReady": 11,
    "kItemSortBox": 12,
    "kItemSortMoney": 13,
    "kItemSortKey": 14,
    "kItemSortMaterial": 15,
    "kItemSortPilot": 16,
    "kItemSortEngineSkin": 17
};

// 单个物品解析
function gain2json(e, n) {
    const f = e.split("x");
    const g = f[0];
    if ("M1" === g)
        return {
            "name": "金币",
            "color": "#ff9002",
            "num": parseInt(f[1])
        };
    else if ("M2" === g)
        return {
            "name": "钻石",
            "color": "#409eff",
            "num": parseInt(f[1])
        };
    else if ("ENERGY" === g)
        return {
            "name": "体力",
            "color": "#ff9002",
            "num": parseInt(f[1])
        };
    else if ("PACK" === g)
        return {
            "name": "PACK",
            "color": "",
            "num": parseInt(f[1])
        };
    else if ("FP" === g)
        return {
            "name": "FP",
            "color": "",
            "num": parseInt(f[1])
        };
    else if ("PVP" === g)
        return {
            "name": "PVP",
            "color": "",
            "num": parseInt(f[1])
        };
    else if ("STARCOIN" === g)
        return {
            "name": "星辉",
            "color": "#ff9002",
            "num": parseInt(f[1])
        };
    else if ("GUILDCOIN" === g)
        return {
            "name": "战队币",
            "color": "#ff9002",
            "num": parseInt(f[1])
        };
    let c = 0, B = 0, h = 0, y = 0, k = 0, S = 1, C = 0;
    B = parseInt(f[n ? 1 : 0]);
    if (n) c = parseInt(f[0]);
    h = parseInt(f[n ? 2 : 1]);
    y = parseInt(f[n ? 3 : 2]);
    k = parseInt(f[n ? 4 : 3]);
    const D = B === m.kItemSortEngine || B === m.kItemSortArmor || B === m.kItemSortWeapon || B === m.kItemSortWingman;
    S = D ? 1 : parseInt(f[n ? 5 : 4]);
    if (n) C = D ? parseInt(f[6]) : 0;

    const item = initItemId(h, B, S, c, C, k, y);
    const itemName = item.name;
    const color = item.star === 1 ? '' : item.star === 2 ? 'green' : item.star === 3 ? '#409eff' : item.star === 4 ? 'purple' : '';

    return {
        "name": itemName,
        "color": color,
        "num": S,
        "level": k + 1,
        "type": B,
    };
}

// 物品字符串转JSON数组
function gain2jsonarray(data) {
    let gain_json_array = [];
    data = data.replace(/#/g, ',');
    let gain_str = data.split(',');
    gain_str.forEach(function (e) {
        if (!e) return;
        try {
            gain_json_array.push(gain2json(e, true));
        } catch {
            gain_json_array.push({"name": `未知物品(${e})`, "color": "black", "num": 0});
        }
    });
    return gain_json_array;
}

// 装备JSON解析为物品JSON数组
function json_parse4equips(json) {
    let result = '';
    for (let i = 0; i < json.length; i++) {
        result += json[i].id + 'x' + json[i].type + 'x' + json[i].sd_id + 'x' + json[i].quality + 'x' + json[i].level + 'x' + json[i].count + ',';
    }
    return gain2jsonarray(result);
}

const Gain = {
    gain2jsonarray,
    json_parse4equips
};
module.exports = {Gain}