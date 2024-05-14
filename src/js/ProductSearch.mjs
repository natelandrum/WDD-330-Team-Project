export function searchForProduct() {
    document.querySelector("#search").addEventListener("keyup", e => {
        if (e.key === "Enter") {
            if (e.target.value) {
                window.location.href = `/product-listing/index.html?category=all&query=${e.target.value}`;
            }
        }
    })
    document.querySelector("#search-icon").addEventListener("click", () => {
        let input = document.querySelector("#search");
        if (input.value) {
            window.location.href = `/product-listing/index.html?category=all&query=${input.value}`;
        }
    })
}