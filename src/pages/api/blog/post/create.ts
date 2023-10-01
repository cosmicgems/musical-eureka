import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import { stripHtml } from "string-strip-html";
import User from "../../../../../lib/models/user";
import Category from "../../../../../lib/models/category";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to db");
    connectDB();
    console.log("Connected to db");

    try {
        const { body, title, photo, selected, checkedSubcategory, user, excerpt, tags} = req.body;
        let arrayOfSubcategories = checkedSubcategory && checkedSubcategory.toString().split(",");
        let arrayOfTags = tags && tags.toString().split(",");
        console.log({selected, checkedSubcategory,  arrayOfSubcategories});
        const category = await Category.findById(selected);
        const postedBy = await User.findById(user);

        let blog = new Blog();

        blog.title = title;
        blog.photo = photo;
        blog.body = body;
        blog.categories = category;
        blog.sub_categories = arrayOfSubcategories;
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title} | Pearl Box`
        blog.mdesc = stripHtml(excerpt.substring(0,160)).result;
        blog.excerpt = excerpt;
        blog.postedBy = postedBy;
        blog.tags = arrayOfTags;
        console.log(blog);
        
        blog.save()

        

        res.status(200).json({message: `${title} was successfully submitted!` , blogPost:blog});

    } catch (error) {
        console.error(error.response.data)
        res.status(500).json({message: 'There was an error when saving the post to the DB.', error: error})
    }
}