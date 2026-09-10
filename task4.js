document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // 1. Smooth Navigation
    // ==============================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });


    // ==============================
    // 2. Active Navigation
    // ==============================

    const sections = document.querySelectorAll(
        "#about, #skill, #education, #portofolio"
    );

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 180) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });
    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    // ==============================
    // 3. Add Active Navigation Style
    // ==============================

    const activeStyle = document.createElement("style");

    activeStyle.textContent = `
        nav a.active {
            color: #ffbf00 !important;
        }
    `;

    document.head.appendChild(activeStyle);


    // ==============================
    // 4. Scroll Reveal Animation
    // ==============================

    const revealItems = document.querySelectorAll(
        "#about, #skill, #education, #portofolio, .projects"
    );

    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(20px)";

        item.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });


    const revealObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });


    revealItems.forEach(item => {
        revealObserver.observe(item);
    });


    // ==============================
    // 5. Project Cards
    // Click Project → Open Modal
    // ==============================

    const projectCards =
        document.querySelectorAll(".projects");


    const modal = document.createElement("div");

    modal.className = "portfolio-modal";

    modal.innerHTML = `

        <div class="portfolio-modal-content">

            <button class="modal-close">
                &times;
            </button>

            <img
                class="portfolio-modal-image"
                src=""
                alt="Project preview"
            >

            <h2 class="modal-title"></h2>

            <p class="modal-description"></p>

            <div class="modal-tags"></div>

        </div>

    `;


    document.body.appendChild(modal);


    // ==============================
    // 6. Modal Elements
    // ==============================

    const modalImage =
        modal.querySelector(".portfolio-modal-image");

    const modalTitle =
        modal.querySelector(".modal-title");

    const modalDescription =
        modal.querySelector(".modal-description");

    const modalTags =
        modal.querySelector(".modal-tags");

    const closeButton =
        modal.querySelector(".modal-close");


    // ==============================
    // 7. Open Project Modal
    // ==============================

    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            const image =
                card.querySelector("img");

            const title =
                card.querySelector("h3");

            const description =
                card.querySelector("p");

            const tags =
                card.querySelectorAll("span");


            // Project image
            if (image) {
                modalImage.src = image.src;

                modalImage.alt =
                    `${title.textContent} preview`;
            }


            // Project title
            if (title) {
                modalTitle.textContent =
                    title.textContent;
            }


            // Project description
            if (description) {
                modalDescription.textContent =
                    description.textContent;
            }


            // Project technologies
            modalTags.innerHTML = "";

            tags.forEach(tag => {

                const tagElement =
                    document.createElement("span");

                tagElement.textContent =
                    tag.textContent;

                modalTags.appendChild(tagElement);
            });


            // Show modal
            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";
        });

    });


    // ==============================
    // 8. Close Modal
    // ==============================

    const closeModal = () => {

        modal.classList.remove("show");

        document.body.style.overflow = "";
    };


    closeButton.addEventListener(
        "click",
        closeModal
    );


    // Close by clicking outside
    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }

    });


    // Close with ESC key
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {
            closeModal();
        }

    });


    // ==============================
    // 9. Back To Top Button
    // ==============================

    const topButton =
        document.createElement("button");

    topButton.className =
        "back-to-top";

    topButton.innerHTML = "↑";

    topButton.title =
        "Back to top";

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 350) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==============================
    // 10. Home Keyboard Shortcut
    // ==============================

    document.addEventListener("keydown", event => {

        if (
            event.key === "Home" &&
            !["INPUT", "TEXTAREA"]
                .includes(document.activeElement.tagName)
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

});