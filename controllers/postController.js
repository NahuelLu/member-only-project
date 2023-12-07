const post_create_GET = (req,res) => {
    res.send("This route/url/endpoint still in development, used to create post with GET method")
}
const post_create_POST = (req,res) => {
    res.send("This route/url/endpoint still in development, used to create post with POST method")
}
const post_details_GET = (req,res) => {
    res.send("This route/url/endpoint still in development, used to obtain details of one post with GET method")
}


const postController = {
    post_create_GET,
    post_create_POST,
    post_details_GET
}

module.exports = postController