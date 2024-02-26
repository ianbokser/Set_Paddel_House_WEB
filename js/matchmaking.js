const timeDropdown = document.getElementById('timeDropdown');
const timeOptions = document.getElementById('timeOptions');
const dropbtn = document.querySelector('.dropbtn');

for (let hour = 8; hour <= 26; hour++) {
    let displayHour = hour % 24;
    for (let minute = 0; minute < 60; minute += 30) {
        const option = document.createElement('a');
        option.textContent = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        option.addEventListener('click', function() {
            dropbtn.textContent = this.textContent;
            timeOptions.classList.remove('show');
        });
        timeOptions.appendChild(option);
    }
}

timeDropdown.addEventListener('click', function() {
    timeOptions.classList.toggle('show');
});

window.addEventListener('click', function(event) {
    if (!event.target.closest('.time_dropdown')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});
