import { loadComments, renderComments } from "./commentsScript.js";


document.addEventListener("DOMContentLoaded", async () => {
  const postsPerPage = 4; //set posts per page
  const postsContainer = document.getElementById("postsContainer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pageLinks = document.querySelectorAll(".page-link");

  let posts = [];
  let comments = [];
  let currentPage = 1;
  let totalPages = 1;

  // LOADS THE USERS
  async function getUsers() {
    try{
    const response = await fetch("https://dummyjson.com/users?limit=100");
    if (!response.ok) throw new Error("Error: " + response.status);

    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error loading users: ", error);
    return [];
  }}

  // LOADS POSTS FROM DUMMYJSON
  async function getPosts() {
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=12`);
      if (!response.ok) throw new Error("Error: " + response.status); //error if API not fetching
      const data = await response.json(); //turn into js object
      return data.posts || [];
      // totalPages = Math.ceil(posts.length / postsPerPage); //counts total pages (3)
      // renderPage(currentPage);
      // updatePagination();
    } catch (err) {
      console.error("Error loading posts: ", err);
      return [];
    }
  }

  // CREATES POSTS
  function renderPage(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const pagePosts = posts.slice(startIndex, endIndex);
    

    postsContainer.innerHTML = pagePosts
      .map(
        (post) => {
          // rendering username, if undefined, "Unknown":
          const username = userMap[post.userId] || "Unknown";
         return`
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <small>Username: ${username} | Likes: ${post.reactions.likes} | Dislikes: ${post.reactions.dislikes} | Tags: ${post.tags}</small>
        
        
        <div id="comments-${post.id}" class="comments"></div>
        </div>`
      })
      .join("");
    
    // ATTATCH COMMENTS TO POSTS:
    pagePosts.forEach((post) => {
      const commentsContainer = document.getElementById(`comments-${post.id}`);
      if (commentsContainer) {
        renderComments(post.id, commentsContainer, comments)
      }
    })

  }

  // PAGINATION
  function updatePagination() {
    prevBtn.style.pointerEvents = currentPage === 1 ? "none" : "auto";
    nextBtn.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
    pageLinks.forEach((link) => {
      const page = parseInt(link.dataset.page);
      link.classList.toggle("activePage", page === currentPage);
    });
  }

  // EVENT LISTENERS:
  prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      updatePagination();
    }
  });

  nextBtn.addEventListener("click", () => {

    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      updatePagination();
    }
  });

  pageLinks.forEach((link) => {
    link.addEventListener("click", () => {

      const page = parseInt(link.dataset.page);
      if (page && page !== currentPage) {
        currentPage = page;
        renderPage(currentPage);
        updatePagination();
      }
    });
  });

  // load posts+comments:
  const [loadedPosts, loadedComments, users] = await Promise.all([getPosts(), loadComments(), getUsers()])
  // await getPosts();
  posts = loadedPosts;
  comments = loadedComments;

  const userMap = {};
  users.forEach(user => userMap[user.id] = user.username)

  // count totalpages:
  totalPages = Math.ceil(posts.length / postsPerPage);

  renderPage(currentPage);
  updatePagination();
});
