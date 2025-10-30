// Export this function to posts.js
export async function loadComments(posts) {
    try {
        // all posts gets liked to their comment by their id
        const comPromises = posts.map(async(post) => {
        const response = await fetch(`https://dummyjson.com/comments/post/${post.id}`)
        // if comments wont load:
        if (!response.ok) throw new Error("Error: " + response.status)
        
        // turn into js object:
        const data = await response.json();
        return data.comments || [];    
        })
        
        // wait for all comments
        const commentsArrays = await Promise.all(comPromises)
        return commentsArrays.flat();
        
    } catch (error) {
        console.error("Error loading comments: ", error);
        return [];
    }
}

// Export this function to posts.js
export function renderComments(postId, commentsContainer, comments) {
    const postComments = comments.filter((com) => com.postId === postId);

    // if no comments:
    if (postComments.length === 0) {
        commentsContainer.innerHTML = "<p> No comments. </p>";
        return;
    }

    commentsContainer.innerHTML = postComments.map((com) =>
        `<div class= "comment">
    <p>${com.user.username}:${com.body}</p></div>`).join("");
}


