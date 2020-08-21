import Mock from 'mockjs'
Mock.mock('/api/pro', {
    "status": 0,
    "data": {
        "goodsSelect": [{
                "goodsNuber": "1910025052634",
                "color": "灰色",
                "remainInventory": "1372",
                "minOrder": "0",
                "maxOrder": "2000"
            },
            {
                "goodsNuber": "1910025052636",
                "color": "蓝色",
                "remainInventory": "1372",
                "minOrder": "0",
                "maxOrder": "2000"
            }, {
                "goodsNuber": "1910025052638",
                "color": "杏色",
                "remainInventory": "1372",
                "minOrder": "0",
                "maxOrder": "2000"
            }
        ],
        "goodsName": "哺乳文胸",
        "cupType": "C",
        "cupthickness": "薄杯",
        "smallClassification": "哺乳内衣C杯",
        "sizeArr": ["75(34)", "80(36)", "85(38)", "90(40)"],
        "partNum": 191002505,
        "ptkPartnumber": "-1",
        "underwearpartnumber": "-1",
        "numofpackage": "1",
        "unitname": "件",
        "ProdMinQty": null
    }
})