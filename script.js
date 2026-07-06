document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todos los elementos que tienen la clase 'fade'
    const faders = document.querySelectorAll('.fade');

    const appearOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Le agregamos la clase 'show' que le da opacity: 1 en tu CSS
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Forzamos a que la primera sección (Hero) aparezca de inmediato sin tener que hacer scroll
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('show');
    }
});

// ================= CONTEO REGRESIVO =================
// Configuramos la fecha exacta del evento
const weddingDate = new Date("October 3, 2026 00:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Si la fecha ya pasó (el día de la boda), mantenemos el reloj en cero
    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        return;
    }

    // Cálculos matemáticos para días, horas y minutos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Formateamos los números para que siempre tengan dos dígitos (ej. "09" en lugar de "9")
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
};

// Ejecutamos la función inmediatamente para que no salgan los "00" al cargar la página
updateCountdown();
// Actualizamos el reloj cada 60,000 milisegundos (1 minuto)
setInterval(updateCountdown, 60000); 

// ================= BOTÓN RSVP (WHATSAPP) =================
function confirmarAsistencia() {
    // 1. Pon aquí el número real donde quieres recibir los mensajes. 
    // Asegúrate de dejar el '52' al principio (código de México) y no usar espacios ni guiones.
    const telefono = "522381470993"; // <-- CAMBIA ESTE NÚMERO
    
    // 2. El mensaje predeterminado que te llegará
    const mensaje = "¡Hola! Qué emoción. Confirmo mi asistencia a la boda de Naydelin y Jared el 3 de octubre. Mi nombre es: ";
    
    // 3. Creamos el link especial de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // 4. Abrimos WhatsApp en una nueva pestaña (o en la app si están en celular)
    window.open(url, '_blank');

    // 5. Efectos visuales en tu página para que sepan que funcionó
    const msg = document.getElementById("confirmation-msg");
    const btn = document.getElementById("rsvp-btn");
    
    // Cambiamos el texto del mensaje oculto
    msg.innerText = "¡Te estamos redirigiendo a WhatsApp! 🤍";
    msg.style.display = "block";
    msg.style.color = "#c6a96d"; // Tu tono dorado
    
    // Cambiamos el estilo del botón
    btn.innerText = "Abriendo WhatsApp...";
    btn.style.backgroundColor = "#25D366"; /* Verde oficial de WhatsApp */
    btn.style.boxShadow = "0 4px 15px rgba(37, 211, 102, 0.4)";
    
    // Desactivamos el botón unos segundos para evitar clics dobles
    btn.disabled = true;
    btn.style.cursor = "default";
    
    // Opcional: Volver a activar el botón después de 5 segundos por si falló la redirección
    setTimeout(() => {
        btn.innerText = "Confirmar asistencia";
        btn.style.backgroundColor = "var(--gold)";
        btn.style.boxShadow = "0 4px 15px rgba(198, 169, 109, 0.3)";
        btn.disabled = false;
        btn.style.cursor = "pointer";
        msg.style.display = "none";
    }, 5000);
}