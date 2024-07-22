document.addEventListener("DOMContentLoaded", () => {
    const dateDisplayElement = document.getElementById('date-display');
    const dateLabelElement = document.getElementById('date-label');

    if (dateDisplayElement && dateLabelElement) {
        function formatDate(date) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[date.getDay()];
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            return `${dayName}<br>${day}/${month}/${year}';
        }

        function updateDateDisplay() {
            const today = new Date();
            dateDisplayElement.textContent = formatDate(today);
        }

        updateDateDisplay();
    } else {
        console.error('Element with id "date-display" or "date-label" not found.');
    }
});
