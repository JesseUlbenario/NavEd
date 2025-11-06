const calendarButton = document.getElementById("calendar-button");
const addPanel = document.getElementById("add-panel");
const closeAdd = document.getElementById("close-add");

calendarButton.addEventListener("click", () => {
    addPanel.classList.add("open");
});

closeAdd.addEventListener("click", () => {
    addPanel.classList.remove("open");
});

const addButton = document.getElementById('add-button');
const addPanel = document.getElementById('add-panel');
const closeAddBtn = document.getElementById('close-add');

if (addButton) {
    addButton.addEventListener('click', () => {
        addPanel.classList.add('open');
        document.body.style.overflow = 'hidden'; // optional
    });
}

if (closeAddBtn) {
    closeAddBtn.addEventListener('click', () => {
        addPanel.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
}
