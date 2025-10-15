
export async function loadComments() {
    try {
        const response = await fetch("https://dummyjson.com/comments")
        // if comments wont load:
        if (!response.ok) throw new Error("Error: " + response.status)
        
        // turn into js object:
        const data = await response.json();
        return data.comments || [];
        // amount of comments:
        // totalComments = Math.ceil(comments.length);
        



    } catch (error) {
        console.error("Error loading comments: ", error);
        return [];
    }
}

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


