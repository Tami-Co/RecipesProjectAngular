export interface Recipe {
    id?: number,
    name?: string,
    description?: string,
    categories?: {id:number,description:string},
    preparationTime?: number,
    level?: number,
    dateAdded?: Date,
    layersCake?: {description:string,ingredients:[string]},
    instructions?: string,
    img?: string,
    isPrivate?: boolean,
    user?: {id:number,nameUser:string},
}
