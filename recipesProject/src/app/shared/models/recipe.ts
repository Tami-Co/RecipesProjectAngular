export class Recipe {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        //לשנות למינימל סכמה
        public categories?: string,
        public preparationTime?: number,
        public level?: number,
        public dateAdded?: Date,
        //לשנות למינימל סכמה
        public layersCake?: string,
        public instructions?: string,
        public img?: string,
        public isPrivate?: boolean,
        //לשנות למינימל סכמה
        public user?: string,
    ) { }
}
