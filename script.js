document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle (NEW, MORE RELIABLE METHOD) ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  mobileMenuButton.addEventListener("click", () => {
    // This adds/removes the 'menu-open' class to the <body> tag
    document.body.classList.toggle("menu-open");
  });

  // --- Active Nav Link Highlighting on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileNavLinks = document.querySelectorAll(".mobile-menu a");

  const activateLink = (links, currentId) => {
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 71) {
        current = section.getAttribute("id");
      }
    });
    activateLink(navLinks, current || "home");
    activateLink(mobileNavLinks, current || "home");
  });

  // --- Scroll to Top Button ---
  const toTopButton = document.getElementById("to-top-button");
  if (toTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        toTopButton.classList.add("show");
      } else {
        toTopButton.classList.remove("show");
      }
    });
    toTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Close mobile menu when a link is clicked ---
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // This removes the 'menu-open' class from the <body> tag
      document.body.classList.remove("menu-open");
    });
  });

  // --- Web3Forms Contact Form Logic ---
  const form = document.getElementById("contact-form");
  const formResult = document.getElementById("form-result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    formResult.innerHTML = "Sending...";
    formResult.classList.remove("success", "error");
    formResult.style.display = "block";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
          formResult.innerHTML = jsonResponse.message;
          formResult.classList.add("success");
        } else {
          console.log(response);
          formResult.innerHTML = jsonResponse.message;
          formResult.classList.add("error");
        }
      })
      .catch((error) => {
        console.log(error);
        formResult.innerHTML = "Something went wrong!";
        formResult.classList.add("error");
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          formResult.style.display = "none";
        }, 5000);
      });
  });
});
