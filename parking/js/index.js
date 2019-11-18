let posArr = {
    "北京": [116.46, 39.92],
    "天津": [117.2, 39.13],
    "上海": [121.48, 31.22],
    "重庆": [106.54, 29.59],
    "太原": [112.53, 37.87],
    "黑龙江": [126.63, 45.75],
    "沈阳": [123.38, 41.8],
    "长春": [125.35, 43.88],
    "石家庄": [114.48, 38.03],
    "呼和浩特": [111.65, 40.82],
    "济南": [117, 36.65],
    "郑州": [113.65, 34.76],
    "西安": [108.95, 34.27],
    "兰州": [103.73, 36.03],
    "乌鲁木齐": [87.68, 43.77],
    "拉萨": [91.11, 29.97],
    "西宁": [101.74, 36.56],
    "银川": [106.27, 38.47],
    "成都": [104.06, 30.67],
    "贵阳": [106.71, 26.57],
    "长沙": [113, 28.21],
    "武汉": [114.31, 30.52],
    "合肥": [117.27, 31.86],
    "南京": [118.78, 32.04],
    '南昌': [115.89, 28.68],
    '杭州': [120.19, 30.26],
    '南宁': [108.33, 22.84],
    '海口': [110.35, 20.02],
    '昆明': [102.73, 25.04]
}

let saleNum = {
    "北京": 2000,
    "天津": 1800,
    "上海": 3000,
    "重庆": 1000,
    "太原": 2500,
    "黑龙江": 1700,
    "沈阳": 1300,
    "长春": 1700,
    "石家庄": 2200,
    "呼和浩特": 2300,
    "济南": 1600,
    "郑州": 2000,
    "西安": 2100,
    "兰州": 1700,
    "乌鲁木齐": 1100,
    "拉萨": 900,
    "西宁": 1000,
    "银川": 1000,
    "成都": 2600,
    "贵阳": 2200,
    "长沙": 1700,
    "武汉": 1100,
    "合肥": 400,
    "南京": 5000,
    '南昌': 3000,
    '杭州': 7000,
    '南宁': 1700,
    '海口': 3400,
    '昆明': 2000
}

// 右上角时间
var timer = document.querySelector(".time");
var tdata = document.querySelector(".data");
setInterval(() => {
    var date = new Date;
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    M = M < 10 ? "0" + M : M;
    D = D < 10 ? "0" + D : D;
    timer.innerHTML = h + ":" + m + ":" + s;
    tdata.innerHTML = Y + "年" + M + "月" + D + "日";
}, 1000)

// 获取左上角收入对比
function getMoneyCompare() {
    $.ajax({
        url: config.mon_number,
        type: "GET",
        dataType: "json",
        success: (res) => {
            console.log(res);
        }
    });
}
leftCenter();
rightlCenter();
rightrCenter();
centerMap();



// 地图 停车数据处理 


let res = dataUpdata(posArr, saleNum);

function dataUpdata(posArr, saleNum) {
    let arr = [];
    // 对对象进行遍历
    for (let i in posArr) {
        let obj = {};
        obj.name = i;
        obj.value = [...posArr[i], saleNum[i]];
        arr.push(obj);
    }
    return arr;
}

// 左边状图
function leftCenter() {
    // 初始化echarts
    let mychart = echarts.init(document.getElementById("left-center"));
    // 初始化以后需要给这个图标设置配置项，包括图例，提示框，显示的数据等内容
    let options = {
            tooltip: {
                formatter: "时长:{b}<br>总计:{c}<br>占比:{d}%"
            },
            series: [{
                color: ['#fbff86', '#ff6f6f', '#ab6eff', '#1dd7ff', '#7dff89'],
                name: "停车时长",
                type: "pie",
                radius: ["45%", "65%"],
                data: [{
                    name: "30分钟以内",
                    value: 150
                }, {
                    name: "30分钟~60分钟",
                    value: 400
                }, {
                    name: "1~2小时",
                    value: 800
                }, {
                    name: "3~4小时",
                    value: 300
                }, {
                    name: "4小时以上",
                    value: 300
                }]
            }]
        }
        // 配置项完成后将配置项应用于我们echarts
    mychart.setOption(options);
}

// 右边饼图
function rightlCenter() {
    let mychart = echarts.init(document.getElementById("right-piel"));
    let options = {
        tooltip: {
            formatter: "缴费类型:<br>{b}:{c}({d}%)"
        },
        legend: {
            data: [
                "电子缴费", "现金缴费",
            ],
            bottom: 0,
            textStyle: {
                color: "#839bb0"
            },
            itemWidth: 6,
        },
        series: [{
            color: ['#fffbbe', '#ffbd3d'],
            type: "pie",
            radius: ["50%", "70%"],
            label: {
                normal: {
                    show: false,
                    position: "center"
                },

                emphasis: {
                    show: true,
                }
            },

            data: [
                { name: "现金缴费", value: 35, selected: true }, { name: "电子缴费", value: 310 }
            ]
        }]
    }
    mychart.setOption(options);
}


function rightrCenter() {
    let mychart = echarts.init(document.getElementById("right-pier"));
    let options = {
        tooltip: {
            formatter: "缴费情况:<br>{b}:{c}({d}%)"
        },
        legend: {
            data: [
                "出口缴费", "提前缴费"
            ],
            bottom: 0,
            textStyle: {
                color: "#839bb0"
            },
            itemWidth: 6,
        },
        series: [{
            color: ['#B8E3FF', '#009CFF'],
            type: "pie",
            radius: ["50%", "70%"],
            label: {
                normal: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    show: true,
                }
            },

            data: [
                { name: "提前缴费", value: 120, selected: true }, { name: "出口缴费", value: 310, },
            ]
        }]
    }
    mychart.setOption(options);
}

// 中间地图
function centerMap() {
    let mychart = echarts.init(document.querySelector(".map"));
    let options = {
        tooltip: {
            trigger: 'item',
            borderColor: "rgb(74, 223, 255)",
            alwaysShowContent: true,
            borderWidth: 1,
            padding: 20,
            position: 'left',
            formatter: function(params) {
                // return params.name + ' : ' + params.value[2];
                return `<div class="maptool">
                            <h2>${params.data.name}停车场</h2>
                            <div class="mt-text">今日收入</div>
                            <div class="mt-money">${params.data.value[2]}</div>
                            <div class="mt-car">
                                <div class="mt-left">
                                    <span>总车位</span>
                                    <span>114</span>
                                </div>
                                <div class="mt-right">
                                    <span>空余</span>
                                    <span>114</span>
                                </div>
                            </div>
                            <div class="mt-bottom">
                                <div>本日进场 11983</div>
                                <div>本日出场 11323</div>
                            </div>
                        </div>`
            }
        },
        geo: {
            map: "china",
            // zoom: 5,
            layoutCenter: ["50%", "50%"],
            // layoutSize: 100,
            itemStyle: {
                normal: {
                    areaColor: "#194e7c",
                    borderColor: "#111",

                },
                emphasis: {
                    areaColor: "#52a8eb"
                }
            },
            label: {
                normal: {
                    show: false,
                    /* position: "center",
                    align: "center" */
                },
                emphasis: {
                    show: true,
                    // fontSize: 50,

                }
            },
        },
        series: [{
            type: "scatter",
            symbolSize: 10,
            coordinateSystem: "geo",
            data: dataUpdata(posArr, saleNum),
            itemStyle: {
                color: "#ff0000",
            },

        }, {
            type: "effectScatter",
            symbolSize: 20,
            coordinateSystem: "geo",
            data: dataUpdata(posArr, saleNum).slice(0, 6),
            itemStyle: {
                color: "#4AFFD2",
            },
            rippleEffect: {
                brushType: "stroke"
            }

        }, {
            type: "scatter",
            symbolSize: 15,
            coordinateSystem: "geo",
            data: dataUpdata(posArr, saleNum).slice(6, 15),
            itemStyle: {
                color: "#ff0000",
            },


        }]
    }
    mychart.setOption(options);
}


// let arr = {
//     {
//         name: "北京",
//         value: [经度, 纬度, 销量]
//     }

// }