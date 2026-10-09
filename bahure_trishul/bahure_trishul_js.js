// document.addEventListener("DOMContentLoaded", () => {
//   const nav = document.querySelector(".site-nav");
//   const topBtn = document.getElementById("topBtn");

//   const handleScroll = () => {
//     if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
//     if (topBtn) topBtn.style.display = window.scrollY > 450 ? "flex" : "none";
//   };
//   window.addEventListener("scroll", handleScroll, { passive: true });
//   handleScroll();

//   if (topBtn) {
//     topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
//   }

//   document.querySelectorAll("#mainNav .nav-link").forEach(link => {
//     link.addEventListener("click", () => {
//       const menu = document.querySelector("#mainNav");
//       if (menu && menu.classList.contains("show") && window.bootstrap) {
//         bootstrap.Collapse.getOrCreateInstance(menu).hide();
//       }
//     });
//   });

//   const revealItems = document.querySelectorAll(".reveal");
//   if ("IntersectionObserver" in window) {
//     const revealObserver = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
//     revealItems.forEach(item => revealObserver.observe(item));
//   } else {
//     revealItems.forEach(item => item.classList.add("show"));
//   }

//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener("click", function (event) {
//       const selector = this.getAttribute("href");
//       if (!selector || selector === "#") return;
//       const target = document.querySelector(selector);
//       if (!target) return;
//       event.preventDefault();
//       target.scrollIntoView({ behavior: "smooth", block: "start" });
//     });
//   });
// });