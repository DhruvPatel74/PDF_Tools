// JavaScript to load the navbar HTML into the page
document.addEventListener("DOMContentLoaded", function () {
  fetch("/includes/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/includes/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

document.getElementById("exploreBtn").onclick = function () {
  window.location.href = "/pages/alltools.html";
};

// Select the review form and the review list container
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

// Function to render reviews from localStorage
function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviewList.innerHTML = ""; // Clear existing reviews

  reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("col-md-6", "col-lg-4");

    reviewCard.innerHTML = `
                <div class="card review-card">
                    <div class="card-body text-center">
                        <!-- Avatar Circle -->
                        <div class="avatar-circle mx-auto mb-3">
                            <span>${review.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <h5 class="card-title">${review.name}</h5>
                        <p class="card-text">"${review.text}"</p>
                        <div class="stars">
                            <span>${"★".repeat(review.rating)}${"☆".repeat(
      5 - review.rating
    )}</span>
                        </div>
                    </div>
                </div>
            `;
    reviewList.appendChild(reviewCard);
  });
}

// Function to save a new review to localStorage
function saveReviewToLocalStorage(name, text, rating) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ name, text, rating });
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Handle form submission
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  // Get user input values
  const name = document.getElementById("name").value.trim();
  const reviewText = document.getElementById("review").value.trim();
  const rating = parseInt(document.getElementById("rating").value, 10);

  // Validate input
  if (!name || !reviewText || !rating) {
    alert("Please fill in all fields.");
    return;
  }

  // Save the new review to localStorage
  saveReviewToLocalStorage(name, reviewText, rating);

  // Render updated reviews
  renderReviews();

  // Reset the form fields
  reviewForm.reset();

  // Optional: Show success message
  alert("Your review has been added!");
});

// Load reviews from localStorage when the page loads
document.addEventListener("DOMContentLoaded", renderReviews);
