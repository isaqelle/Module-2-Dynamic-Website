document.addEventListener("DOMContentLoaded", () => {
  async function getPosts() {
    const API = "https://dummyjson.com/posts";
    const postContainer = document.getElementById("postsContainer");
    

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json();

      data.posts.forEach(post => {
        const postDiv = document.createElement("div");
        // creates the class 'post'
        postDiv.classList.add("post")

        postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>Views: ${post.views} | Likes: ${post.reactions.likes} | UserID: ${post.userId}</p>`

        postContainer.append(postDiv);
      });
      



      
      
    } catch (error) {
      console.error("Error fetching data: " + error)
    }
  
  }
  getPosts();
})