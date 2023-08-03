export interface HotTuiJian{
    articleid: number;
    articlename: string;
    author: string;
    intro: string;
    cover: string;
}

export interface ClassicTuiJian{
    articleid: number;
    articlename: string;
    sortid: number;
    author: string;
}

export interface LinkData{
    id: number;
    url: string;
    name: string;
}