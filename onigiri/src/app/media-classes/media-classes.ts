export class ImageSize {
    constructor(
        public large: string
    ) { }
}
export class Title {
    constructor(
        public english: string,
        public romaji: string
    ) { }
}

export class Media {
    constructor(
        public type: string,
        public id: number,
        public title: Title,
        public coverImage: ImageSize,
        public description: string,
        public bannerImage: string,
    ) {

    }
}