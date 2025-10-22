// Importing "loadComments()" and "renderComments()" functions from comments.js. 
// Importing "setupPagination()" function from pagination.js
import { loadComments, renderComments } from "./comments.js";
import { setupPagination } from "./pagination.js";

  const postsPerPage = 4; //set posts per page
  const postsContainer = document.getElementById("postsContainer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pageLinks = document.querySelectorAll(".page-link");

  let posts = [];
  let comments = [];
  let users = [];
  let currentPage = 1;
  let totalPages = 1;
    
  function getCurrentPage() { return currentPage; }
  function setCurrentPage(p) { currentPage = p; }
  function getTotalPages() { return totalPages; }

  // LOADS USERS FROM DUMMYJSON
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
    } catch (error) {
      console.error("Error loading posts: ", error);
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
        return `
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        
          <small>
            Username: <span class="username" data-userid="${post.userId}">${username}</span>
            | Likes: ${post.reactions.likes}
            | Dislikes: ${post.reactions.dislikes}
            | Tags: ${post.tags}
          </small>
          <h4>Comments:</h4>
          <div id="comments-${post.id}" class="comments"></div>
        </div>`;

      })
      .join("");
    
    // ATTATCH COMMENTS TO POSTS (imported):
    pagePosts.forEach((post) => {
      const commentsContainer = document.getElementById(`comments-${post.id}`);
      if (commentsContainer) {
        renderComments(post.id, commentsContainer, comments)
      }
    })

  }

// PAGINATION:
const { updatePagination } = setupPagination({
  prevBtn,
  nextBtn,
  pageLinks,
  renderPage,
  getCurrentPage,
  setCurrentPage,
  getTotalPages
});
    // load posts+comments+users:

  const [loadedPosts, loadedComments, loadedUsers] = await Promise.all([getPosts(), loadComments(), getUsers()])
    // Store the functions in memory:
  posts = loadedPosts;
  comments = loadedComments;
  users = loadedUsers;

  // gets the usernames by ther user id
  const userMap = {};
  users.forEach(user => userMap[user.id] = user.username)

  // count totalpages:
  totalPages = Math.ceil(posts.length / postsPerPage);

  renderPage(currentPage);
  updatePagination();

// OPEN MODAL WITH USER INFO:
  postsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("username")) {
      const userId = e.target.dataset.userid;
      const user = users.find(use => use.id == userId);
      if (!user) return;
      // fill in the modal window:
      document.getElementById("modalUsername").textContent = user.username;
      document.getElementById("modalName").textContent = `Name: ${user.firstName} ${user.lastName}`;
      document.getElementById("modalAge").textContent = "Age: " + user.age;
      document.getElementById("modalEmail").textContent = "Email: " + user.email;
      document.getElementById("modalPhone").textContent = "Phone: " + user.phone;

      document.getElementById("userModal").style.display = "block";
    }
  });
  // close the window:
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("userModal").style.display = "none";

    
  });


    


