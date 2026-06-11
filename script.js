const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const appointmentForm = document.querySelector(".appointment-form");
const formNote = document.querySelector(".form-note");
const mapCurrentButton = document.querySelector(".map-current-button");
const mapStatus = document.querySelector(".map-status");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const name = formData.get("name")?.toString().trim() || "Patient";
  formNote.textContent = `Thank you, ${name}. Your appointment request has been recorded for clinic confirmation.`;
  appointmentForm.reset();
});

mapCurrentButton?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    mapStatus.textContent = "Current location is not supported in this browser.";
    return;
  }

  mapStatus.textContent = "Finding your current location...";
  mapCurrentButton.disabled = true;

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const mapsUrl = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
      window.open(mapsUrl, "_blank", "noopener");
      mapStatus.textContent = "Opening your current location in Google Maps.";
      mapCurrentButton.disabled = false;
    },
    () => {
      mapStatus.textContent = "Location permission was denied or unavailable.";
      mapCurrentButton.disabled = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
});
