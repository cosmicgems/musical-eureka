import { Author } from "./Author";

export interface BlogType {
    _id: string;
    title: string;
    categories: any[];
    sub_categories: any[];
    photo: string;
    body: string;
    excerpt: string;
    slug: string;
    mtitle: string;
    mdesc: string;
    createdAt: Date;
    updatedAt: Date;
    postedBy: Author;
    favorite_post: any[];
}
