const weddingDate = new Date("Oct 3, 2026 18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;

}, 1000);

/* ANIMACIÓN SCROLL */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* RSVP */

function confirmarAsistencia(){
    const btn = document.getElementById("rsvp-btn");
    const msg = document.getElementById("confirmation-msg");

    btn.innerText = "Confirmado";
    btn.disabled = true;
    msg.style.display = "block";
}