


document.addEventListener("DOMContentLoaded", async () => {
  const postsPerPage = 4; //set posts per page
  const postsContainer = document.getElementById("postsContainer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pageLinks = document.querySelectorAll(".page-link");

  let posts = [];
  let currentPage = 1;
  let totalPages = 1;


  // LOADS POSTS FROM DUMMYJSON
  async function getPosts() {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) throw new Error("Error: " + response.status); //error if API not fetching
      const data = await response.json(); //turn into js object
      posts = data.posts || [];
      totalPages = Math.ceil(posts.length / postsPerPage); //counts total pages (3)
      renderPage(currentPage);
      updatePagination();
    } catch (err) {
      console.error("Error loading posts: ", err);
      postsContainer.innerHTML = `<p style="color:red;">Failed to load posts.</p>`;
    }
  }

  // CREATES POSTS
  function renderPage(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const pagePosts = posts.slice(startIndex, endIndex);

    postsContainer.innerHTML = pagePosts
      .map(
        (post) => `
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <small>Username: ${post.userId} | Likes: ${post.reactions.likes} | Dislikes: ${post.reactions.dislikes} | Tags: ${post.tags}</small>
        </div>`
      )
      .join("");
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
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      updatePagination();
    }
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      updatePagination();
    }
  });

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(link.dataset.page);
      if (page && page !== currentPage) {
        currentPage = page;
        renderPage(currentPage);
        updatePagination();
      }
    });
  });

  await getPosts();
});
