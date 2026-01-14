/* ==========================================================
   Campus Circle - Main JavaScript
   Version: 2.0 (App Layout Compatible)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Select the main scrollable container (since body has overflow: hidden)
    const scrollContainer = document.querySelector('.main-scroll-area') || window;
    const header = document.querySelector("header");

    // ===== 1. Smooth Scroll for Internal Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return; // Ignore empty anchors

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ===== 2. Active Navigation Link Highlight =====
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        // Remove existing active classes first
        if (linkHref === currentPage) {
            link.classList.add("active");
        } else if (currentPage === "" && linkHref === "index.html") {
            // Handle root path
            link.classList.add("active");
        }
    });

    // ===== 3. Back to Top Button Logic =====
    // Create the button dynamically
    const backToTop = document.createElement("button");
    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";
    
    // Add basic styles dynamically so it works immediately
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: '#2563eb', // Your Theme Blue
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        display: 'none',
        zIndex: '1000',
        transition: 'opacity 0.3s'
    });
    
    document.body.appendChild(backToTop);

    // Scroll to top of the CONTAINER, not window
    backToTop.addEventListener("click", () => {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ===== 4. Scroll Event Listener (Shadows & Back-to-Top) =====
    // We listen to the CONTAINER scroll, not window scroll
    scrollContainer.addEventListener("scroll", () => {
        const scrollPos = scrollContainer.scrollTop || window.scrollY;

        // Header Shadow Effect
        if (scrollPos > 10) {
            header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }

        // Show/Hide Back to Top
        if (scrollPos > 400) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // ===== 5. Contact Form Validation =====
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            // Basic Empty Check
            if (!name || !email || !message) {
                alert("⚠️ Please complete all required fields.");
                return;
            }

            // University Email Check (Updated for .edu.ng context)
            const isEdu = email.includes(".com") || email.includes(".ac.") || email.includes("university");
            
            if (!isEdu) {
                if(!confirm("⚠️ This doesn't look like an official university email. Continue anyway?")) {
                    return;
                }
            }

            // Simulate Sending Visuals
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            setTimeout(() => {
                submitBtn.textContent = "Message Sent! ✅";
                submitBtn.style.backgroundColor = "#16a34a"; // Green
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = ""; 
                }, 3000);
            }, 1500);
        });
    }
});
