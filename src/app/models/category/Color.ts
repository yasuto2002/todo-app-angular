export interface Color{
    code: number;
    name: string;
    rgb: string;
}

export const RED:Color = {
    code: 1,
    name: "赤",
    rgb: "#ff0000"
}


export const BLUE:Color = {
    code: 2,
    name: "青",
    rgb: "#0000ff"
}

export const GREEN:Color = {
    code: 3,
    name: "緑",
    rgb: "#00ff00"
}

export const toColor = (code:number):Color => {
    switch(code){
        case 1:
            return RED
        case 2:
            return BLUE
        case 3:
            return GREEN
        default:
            throw new ReferenceError
    }
}