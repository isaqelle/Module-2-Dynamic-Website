
    // Dynamically display posts fetched from the API.
    // Include for each post:
    //     Title
    //     Body
    //     Username (Link the post's userId to the username via the users API).
    //     Tags
    //     Reaction Count
    // Include comments attached to each post (fetched via the comments API).
    // Add pagination or infinite scrolling for posts.
    // Use asynchronous functions (async/await) for all API requests to ensure smooth data fetching.
    // Organize the fetched data into JavaScript objects for efficient manipulation and reusability.


    

    // User Profiles:

    //     Clicking on a username in a post opens a modal displaying the user's profile:
    //         Name
    //         Email
    //         Address
    //         Additional profile details from the users API.
    //     Store user data as JavaScript objects after fetching.

    // Error Handling and Feedback:
    //     Display error messages for failed network requests.
    //     Show a message for empty states (e.g., "No comments available.").


    // Fetch data dynamically using the following endpoints (don't forget about limit=:
    //     Posts: https://dummyjson.com/posts
    //     Comments: https://dummyjson.com/comments
    //     Users: https://dummyjson.com/users
    // Use async/await for all API requests to handle asynchronous operations.
    // Organize fetched data into JavaScript objects or classes.
    // Validate the contact form as specified.


document.addEventListener("DOMContentLoaded", async () => {
  const postsPerPage = 5;
  const postsContainer = document.getElementById("postsContainer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pageNbrs = document.getElementById("page-numbers");
  const pageLinks = document.querySelectorAll(".page-link");

  let posts = [];
  let currentPage = 1;
  let totalPages = 1;
  
  async function getPosts() {
    const API = "https://dummyjson.com/posts";
    const postContainer = document.getElementById("postsContainer");
    

    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      totalPages = Math.ceil(posts.lenght / postsPerPage);
      // call functions here
      renderPosts();
      displayPosts(currentPage);
      updatePagination();
    
    } catch (err) {
      console.error("Error loading posts: ", err);
    }
  
  }

  function renderPosts() {
    postsContainer.innerHTML = posts.map(
      (post) => `<div class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          </div>`
    )

      .join("");
  }

  // display posts of current page:
  function displayPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postElements = postsContainer.querySelectorAll(".post");

    postElements.forEach((post, index) => {
      post.style.display = index >= startIndex && index < endIndex ? "block" : "none";
    })
  }

  // update pagination:
  function updatePagination() {
    pageNbrs.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageLinks.forEach((link) => {
      const page = parseInt(link.getAttribute("data-page"));
      link.classList.toggle("active", page === currentPage);
    });
  }

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      updatePagination();
    }
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      updatePagination();
    }
  });

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(link.getAttribute("data-page"));
      if (page !== currentPage) {
        currentPage = page;
        displayPage(currentPage);
        updatePagination();
      }
    });
  });

  await displayPosts();

})