export interface Recipe {
    _id?: string,
    name?: string,
    description?: string,
    categories?: [{ description: string }],
    preparationTime?: number,
    level?: number,
    dateAdded?: Date,
    layersCake?: [{ description: string, ingredients: [string] }],
    instructions?: string,
    img?: string,
    isPrivate?: boolean,
    user?: { id: string, nameUser: string },
}
