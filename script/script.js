const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const trendingContainer = document.getElementById("trending-container");
document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu
  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    // Toggle between bars and times icon
    if (hamburgerIcon.classList.contains("fa-bars")) {
      hamburgerIcon.classList.remove("fa-bars");
      hamburgerIcon.classList.add("fa-times");
    } else {
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnButton = menuBtn.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnButton &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      // md breakpoint
      mobileMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    }
  });
});

const loadTrendingCards = async () => {
  const url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  const data = await res.json();
  const trending = data.slice(0, 3);
  console.log(trending);

  trending.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("p-3");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
            <figure>
              <img 
              class='h-48 w-full object-contain bg-[#E5E7EB] py-5'
                src='${item.image}'
                alt="items image"
              />
            </figure>
            <div class="card-body">
              <div class="flex items-center justify-between">
                <div class="badge text-[#140ace] bg-[#e5e6fa]">
                 ${item.category}
                </div>
                <div class="flex items-center justify-center gap-1">
                  <!-- xs -->
                  <div class="rating rating-xs">
                    <input
                      type="radio"
                      name="rating-5"
                      class="mask mask-star-2 bg-orange-300"
                      aria-label="1 star"
                      checked="checked"
                    />
                  </div>
                  <div>
                    <p>${item.rating.rate} (${item.rating.count})</p>
                  </div>
                </div>
              </div>
              <h2 class="card-title truncate pt-2">${item.title}</h2>
              <h4 class="font-bold text-lg">${item.price}</h4>
              <div class="flex items-center justify-between gap-5 pt-2">
                <button class="btn btn-outline flex-1">
                  <i class="fa-solid fa-eye"></i>
                  Details
                </button>
                <button class="btn btn-primary flex-1">
                  <i class="fa-solid fa-cart-shopping"></i>
                  Add
                </button>
              </div>
            </div>
          </div>`;
    trendingContainer.appendChild(div);
  });
};
loadTrendingCards();
