export interface State{
    code: number;
    name: string;
}

export const IS_INACTIVE:State = {
    code: 0,
    name: "TODO(着手前)"
}


export const IS_ACTIVE:State = {
    code: 1,
    name: "進行中"
}

export const ACTIVE:State = {
    code: 2,
    name: "完了",
}

export const toState = (code:number):State => {
    switch(code){
        case 0:
            return IS_INACTIVE
        case 1:
            return IS_ACTIVE
        case 2:
            return ACTIVE
        default:
            return IS_INACTIVE
    }
}
