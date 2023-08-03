export const getBookShortType = (id:number) => {
    switch (id) {
        case 1:
            return '玄幻';
        case 2:
            return '修真';
        case 3:
            return '都市';
        case 4:
            return '历史';
        case 5:
            return '网游';
        case 6:
            return '科幻';
        case 7:
            return '灵异';
        case 8:
            return '女生';
        case 9:
            return '其他';
        default:
            return '其他';
    }
}

export const getBookType = (id:number) => {
    switch (id) {
        case 1:
            return '玄幻魔法';
        case 2:
            return '武侠修真';
        case 3:
            return '都市言情';
        case 4:
            return '历史军事';
        case 5:
            return '游戏竞技';
        case 6:
            return '科幻小说';
        case 7:
            return '恐怖灵异';
        case 8:
            return '女生小说';
        case 9:
            return '综合其他';
        default:
            return '其他类型';
    }
}

//getBookFinish 根据0 1 来返回连载和完结
export const getBookFinish = (finish:number) => {
    return finish == 0 ? '连载中' : '已完结';
}

export const timestampToTime = (timestamp: number) => {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
}