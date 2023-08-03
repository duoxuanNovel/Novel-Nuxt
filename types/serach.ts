export interface Total {
    value: number;
}

export interface _source {
    author: string;
    cover: string;
    id: number;
    intro: string;
    name: string;
}

export interface Hit {
    _source: _source;
}

export interface SerachData {
    total: Total;
    hits: Hit[];
}

export interface RootObject {
    code: number;
    message: string;
    data: SerachData;
}