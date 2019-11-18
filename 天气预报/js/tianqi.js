// 请求天气相关数据
// 1.声明变量url保存请求的地址
// 2.声明变量city保存请求的城市
// 3.声明变量data保存请求回来的数据
// 4.使用ajax发送请求
// 5.在ajax的success回调函数中去执行获取数据之后
// 的渲染操作。
let url = "https://www.tianqiapi.com/api/";
let city = "太原";
let data = null;
let appid = 64865818;
let secret = "vdJMS4tF";
let box = document.querySelector(".bao-box")
    // 获取显示国家的元素
let country = document.querySelector(".titlediqu");
console.log(country)
    // 获取显示城市的元素
let cityEle = document.querySelector(".wenduzi");
// 获取显示当天温度的元素
let todayEle = document.querySelector(".wendu");
let todayBox = document.querySelector(".today")
ajax({
    url: url,
    data: {
        city: city,
        appid: 64865818,
        appsecret: "vdJMS4tF",
    },
    type: "get",
    dataType: "json",
    success: (res) => {
        data = res;
        let today = data.data[0]
        console.log(data)
        let str = ``;
        // country.innerHTML = data.country; // 显示国家
        str = `
        <div class="titlediqu">
        ${data.country}
    </div>
    <div class="wenduzi">
        ${data.city}
    </div>
    <div class="wendu">
        ${today.tem.slice(0,-1)}°
    </div>
    <div class="wenduzi2">
    ${today.tem1.slice(0,-1)}°~${today.tem2.slice(0,-1)}°
        <img src="img/${today.wea_img}.png" alt="">
    </div>
        `
        box.innerHTML = str;
    }
});
// 实时天气函数
function nowWea(data) {

}
// 逐小时的天气预报函数
function hours(data) {
    let hour = data.data[0].hours;
    // 对逐小时天气预报进行循环遍历，渲染到页面中
    let str = "";
    foreach
}