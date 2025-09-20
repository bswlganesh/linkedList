document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'linkedListSyllabusProgress';
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

    // Function to update the UI based on checkbox state
    const updateUI = (checkbox) => {
        const parentElement = checkbox.closest('li') || checkbox.closest('.problem');
        if (parentElement) {
            if (checkbox.checked) {
                parentElement.classList.add('completed');
            } else {
                parentElement.classList.remove('completed');
            }
        }
    };

    // Function to save progress to localStorage
    const saveProgress = () => {
        const progress = {};
        allCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                progress[checkbox.id] = true;
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    };

    // Function to load progress from localStorage
    const loadProgress = () => {
        const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        allCheckboxes.forEach(checkbox => {
            if (savedProgress[checkbox.id]) {
                checkbox.checked = true;
            }
            updateUI(checkbox); // Update UI for all boxes on load
        });
    };

    // Add event listener to all checkboxes
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateUI(checkbox);
            saveProgress();
        });
    });

    // Load progress when the page loads
    loadProgress();
});