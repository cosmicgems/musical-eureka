import {DiscussionEmbed} from "disqus-react"



const DisqusComments = ({ post }) => {
    // console.log(post);
    const disqusShortname = "pearlbox-1"
    const disqusConfig = {
        url: `https://pearlbox.co/articles/post/${post.slug}`,
        identifier: post.id, // Single post id
        title: post.title // Single post title
    }
    return (
        <div>
        <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
        />
        </div>
    )
}
export default DisqusComments;