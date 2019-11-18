//声明变量board保存游戏的数据
let board = new Array;
//定义newGame函数，用于开始游戏
//在页面加载完成以后执行newGame函数
/*
1.在newGame函数中需要执行页面的初始化以及页面中默认显示的内容
  页面初始化定义函数init，默认显示内容定义函数getOneNum
2.在init函数中调用updateBoard函数进行页面的初始化，在init函数
  中使用for循环进行数据的初始化
3.定义getLeft和getTop方法，用于获取定位属性left和top，设置数
字显示的位置*/
$(function() {
        newGame();
    })
    //定义newGame
function newGame() {
    // 游戏开始的时候添加手指的触摸事件，调用touchFun函数

    //页面的初始化 调用init函数
    init();
    // 在页面生成以后需要插入两个随机数字
    getOneNum();
    getOneNum();
    // 游戏开始的时候添加手指的触摸事件，调用touchFun函数
    touchFun();
}
//在页面声称以后需要插入两个随机生成的数字


function init() {
    //数据初始化
    //页面的初始化
    for (let i = 0; i < 4; i++) {
        let arr = [];
        for (let j = 0; j < 4; j++) {
            arr[j] = 0;
        }
        board.push(arr);
    }
    //进行页面初始化
    updateBoard();
}

//定义函数getLeft，getTop用来出来元素距离顶部句左侧的间距
function getLeft(i, j) {
    return 0.45 + 1.46 * j;
}

function getTop(i, j) {
    return 0.38 + 1.46 * i;
}

// 定义updateBoard函数
function updateBoard() {
    $(".smbox").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $(".list-box").append(`
            <div class="smbox" id="pos-${i}-${j}">
            </div>
            `);
            // console.log(smbox)
            //页面中的小块需要设置宽、高、背景等属性如果当前小块对应的数据为0
            //那么宽高为0
            //否则宽高为1.22rem，小块内的数字是对应的数据，背景图片为对应的背景图片
            if (board[i][j] == 0) {
                $(`#pos-${i}-${j}`).css({
                    width: 0,
                    height: 0,
                    left: getLeft(i, j) + 0.64 + "rem",
                    top: getTop(i, j) + 0.64 + "rem",
                })
            } else {
                $(`#pos-${i}-${j}`).css({
                    width: 1.28 + 'rem',
                    height: 1.28 + 'rem',
                    left: getLeft(i, j) + 'rem',
                    top: getTop(i, j) + 'rem',
                    backgroundImage: "url(" + getBGimg(board[i][j]) + ")",
                    fontSize: getFontSize(board[i][j]) + 'rem',
                }).html(board[i][j]);
            }
        }
    }
}


// 页面中的小块需要设置宽高背景等的属性，如果当前
// 小块对应的数据为0，那么宽高为0
// 否则，小块宽高为1.22rem，小块内的数字是对应的数据
// 背景图片为对应的背景图片

// 定义getBGimg根据传入的数值不同返回不同的图片路径
function getBGimg(num) {
    switch (num) {
        case 2:
            return "images/绿色_底.png";
            break;
        case 4:
            return "images/浅蓝色_底.png";
            break;
        case 8:
            return "images/红色_底.png";
            break;
        case 16:
            return "images/黄色_底.png";
            break;
        case 32:
            return "images/紫色_底.png";
            break;
        case 64:
            return "images/深蓝色_底.png";
            break;
        case 128:
            return "images/绿色_底.png";
            break;
        case 256:
            return "images/橙色_底.png";
            break;
        case 512:
            return "images/紫色_底.png";
            break;
        case 1024:
            return "images/浅黄色_底.png";
            break;
        case 2048:
            return "images/桃红色_底.png";
            break;
        default:
            return "images浅蓝色_底.png";
            break;
    }
}

// 创建getFontSize函数，根据传入的数值不同返回不同的
// 字体大小
function getFontSize(num) {
    switch (num) {
        case 2:
            return 0.8;
            break;
        case 4:
            return 0.8;
            break;
        case 8:
            return 0.8;
            break;
        case 16:
            return 0.65;
            break;
        case 32:
            return 0.65;
            break;
        case 64:
            return 0.65;
            break;
        case 128:
            return 0.55;
            break;
        case 256:
            return 0.55;
            break;
        case 512:
            return 0.55;
            break;
        case 1024:
            return 0.45;
            break;
        case 2048:
            return 0.45;
            break;
        default:
            return 0.35;
            break;
    }
}
// 定义getOneNum函数，用来在页面中的随机位置添加随机的数字（2或4）
function getOneNum() {
    // 判断页面中能否生成随机数字（如果页面中位置上的数据为0就可以生成数字）
    if (!canCreate(board)) {
        return;
    }
    // 数字的生成
    // 随机位置的生成，通过随机数获取到随机的行和列
    let randI = parseInt(Math.floor(Math.random() * 4));
    let randJ = parseInt(Math.floor(Math.random() * 4));
    // 使用while循环来确定生成的随机位置能否生成数字
    while (board[randI][randJ] !== 0) {
        randI = parseInt(Math.floor(Math.random() * 4));
        randj = parseInt(Math.floor(Math.random() * 4));
    }
    // 在位置随机生成以后需要生成随机的数据，并且对数据进行更新
    let newNum = Math.random() < 0.5 ? 2 : 4;
    // 对board进行更新
    board[randI][randJ] = newNum;
    // 进行页面的更新
    updateBoard();
}

// 定义canCreate函数，用于判断页面中是否能够生成随机数
function canCreate(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return true;
            }
        }
    }
    return false;
}

// 添加人机交互效果
// 根据手指的触摸开始和结束的位置进行判断，进行移动方向的判断
// 在移动过程中，需要判断这个元素能否移动（前面一个数据为0，或者前面的数据与
// 当前数据相同），如果元素想要抵达目标位置，在他们中间不能存在阻碍，如果有
// 阻碍就不能抵达目标位置。
function touchFun() {
    let startX, startY;
    $(".list-box").on("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    })
    $(".list-box").on("touchend", function(e) {
        let moveX = e.changedTouches[0].clientX - startX;
        let moveY = e.changedTouches[0].clientY - startY;
        // 根据差值moveX，moveY来确定移动的方向
        if (Math.abs(moveX) > Math.abs(moveY) && moveX < 0) {
            // 向左移动
            if (moveLeft()) {
                getOneNum();
            };
            // moveLeft();

        }
        if (Math.abs(moveX) > Math.abs(moveY) && moveX > 0) {
            // 向右移动
            moveRight();
        }
        if (Math.abs(moveX) < Math.abs(moveY) && moveY < 0) {
            // 向上移动
            moveUp();
        }
        if (Math.abs(moveX) < Math.abs(moveY) && moveY > 0) {
            // 向下移动
            moveDown();
        }
    })
}
// 向左移动
function moveLeft() {
    // 判断能否向左移动
    if (!canMoveLeft(board)) {
        return false;
    }

    // 向左移动
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && !isBlock(i, k, j, board)) {
                        // 给当前数字到目标数字之间添加动画，使用
                        // jq的animate函数
                        playAnimation(i, j, i, k);

                        // 更新数据
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        // 当前元素动画成功后需要跳出当前循环，执行下一次循环


                    } else if (board[i][k] == board[i][j] && !isBlock(i, k, j, board)) {
                        playAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoard, 200);
    return true;
};
// 判断能否向左移动
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                return true;
            }
        }
    }
    return false;
};

// 判断在当前位置与目标位置之间是否右阻碍，如果有返回true，
// 否则返回false
function isBlock(row, col1, col2, board) {
    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return true;
        }
    }
    return false;
}

// 添加动画函数
function playAnimation(fromI, fromJ, toI, toJ) {
    // 获取动画的元素
    let ele = $(`#pos-${fromI}-${fromJ}`);
    ele.animate({
        left: getLeft(toI, toJ) + "rem",
        top: getTop(toI, toJ) + "rem"
    }, 200);
} 