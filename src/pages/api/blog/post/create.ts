import connectDB from "../../../../../lib/connectDB";
import Blog from "../../../../../lib/models/blog";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from 'next';
import { stripHtml } from "string-strip-html";
import User from "../../../../../lib/models/user";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Connecting to db");
    connectDB();
    console.log("Connected to db");

    try {
        const { body, title, photo, checked, checkedSubcategory, user, excerpt} = req.body;
        let arrayOfCategories = checked && checked.toString().split(",");
        let arrayOfSubcategories = checkedSubcategory && checkedSubcategory.toString().split(",");
        console.log({checked, checkedSubcategory, arrayOfCategories, arrayOfSubcategories});
        
        const postedBy = await User.findById(user);

        let blog = new Blog();

        blog.title = title;
        blog.photo = photo;
        blog.body = body;
        blog.categories = arrayOfCategories;
        blog.sub_categories = arrayOfSubcategories;
        blog.slug = slugify(title).toLowerCase();
        blog.mtitle = `${title} | Pearl Box`
        blog.mdesc = stripHtml(body.substring(0,160)).result;
        blog.excerpt = excerpt;
        blog.postedBy = postedBy;
        blog.save()

        

        res.status(200).json({message: `${title} was successfully submitted!` , blogPost:{title, body, photo, checked, checkedSubcategory}});

    } catch (error) {
        res.status(500).json({message: 'There was an error when saving the post to the DB.'})
    }
}