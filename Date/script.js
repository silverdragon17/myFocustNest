document.addEventListener("DOMContentLoaded", () => {
    const dateDisplayElement = document.getElementById('date-display');
    //const dateLabelElement = document.getElementById('date-label');

    if (dateDisplayElement) {
        function formatDate(date) {
            const days = [`Ahad`, `Isnin`, `Selasa`, `Rabu`, `Khamis`, `Jumaat`, `Sabtu`];
            const dayName = days[date.getDay()];
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            return `${dayName}<br>${day}/${month}/${year}`;
        }

        function updateDateDisplay() {
            const today = new Date();
            dateDisplayElement.innerHTML = formatDate(today);
        }

        updateDateDisplay();
    } else {
        console.error(`Element with id "date-display" or "date-label" not found.`);
    }
});
