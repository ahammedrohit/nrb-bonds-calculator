export function getMenu(): boolean {
    if(localStorage.getItem("showMenu") === "true"){
        return true
    } else return false
}

export function setMenu(value: boolean){
    localStorage.setItem("showMenu", value.toString())
}