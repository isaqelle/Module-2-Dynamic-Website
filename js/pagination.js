export function setupPagination({ prevBtn, nextBtn, pageLinks, renderPage, getCurrentPage, setCurrentPage, getTotalPages }) {
    function updatePagination() {
        const currentPage = getCurrentPage();
        const totalPages = getTotalPages();

        prevBtn.style.pointerEvents = currentPage === 1 ? "none" : "auto";
        nextBtn.style.pointerEvents = currentPage === totalPages ? "none" : "auto";

        pageLinks.forEach(link => {
            const page = parseInt(link.dataset.page);
            link.classList.toggle("activePage", page === currentPage);
        })
    }

    // EVENT LISTENERS:
    prevBtn.addEventListener("click", () => {
        if (getCurrentPage() > 1) {
            setCurrentPage(getCurrentPage() - 1);
            renderPage(getCurrentPage());
            updatePagination();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (getCurrentPage() < getTotalPages()) {
            setCurrentPage(getCurrentPage() + 1);
            renderPage(getCurrentPage());
            updatePagination();
        }
    })
    
    pageLinks.forEach(link => {
        link.addEventListener("click", () => {
            const page = parseInt(link.dataset.page);
            if (page && page !== getCurrentPage()) {
                setCurrentPage(page);
                renderPage(getCurrentPage());
                updatePagination();
            }
        })
    })

    return { updatePagination };
}