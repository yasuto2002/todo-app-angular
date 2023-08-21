export interface Color{
    code: number;
    name: string;
    rgb: string;
}

export const RED:Color = {
    code: 0,
    name: "赤",
    rgb: "#ff0000"
}


export const BLUE:Color = {
    code: 1,
    name: "青",
    rgb: "#0000ff"
}

export const GREEN:Color = {
    code: 2,
    name: "緑",
    rgb: "#00ff00"
}

export const toColor = (code:number):Color => {
    switch(code){
        case 0:
            return RED
        case 1:
            return BLUE
        case 2:
            return GREEN
        default:
            throw new ReferenceError
    }
}