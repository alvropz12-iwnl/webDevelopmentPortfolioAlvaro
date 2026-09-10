// ==========================================
// 1. SELECTORS & CORE STATE
// ==========================================
const actionForm = document.getElementById('action-form');
const actionInput = document.getElementById('action-input');
const prioritySelect = document.getElementById('priority-select');
const actionList = document.getElementById('action-list');
const cardCounter = document.getElementById('card-counter');

// ==========================================
// 2. TODO: PROGRAMMATIC NODE CREATION
// ==========================================
const createActionCard = (text, priority) => {
    // 2a. Create the parent 'li' item
    const li = document.createElement('li');
    
    // 2b. Add basic utility classes: 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'impact-card'
    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "impact-card"
    );

    // 2c. Add appropriate priority class ('priority-high', 'priority-medium', 'priority-low')
    li.classList.add(`priority-${priority}`);
    let badgeColor = 'bg-secondary';

    switch (priority){
        case 'high':
            badgeColor = 'bg-danger';
            break;
        case 'medium':
            badgeColor = 'bg-warning';
            break;
        case 'low':
            badgeColor = 'bg-success';
            break;
    }

    // 2d. Construct interior HTML with text nodes, priority badges, action button icons
    // Make sure the action buttons have explicit data-action tags:
    // - Complete button: data-action="toggle"
    // - Move Up button: data-action="up"
    // - Move Down button: data-action="down"
    // - Delete button: data-action="delete"
    li.innerHTML = `
    <div class="d-flex align-items-center">
        <span class="card-title fw-semibold">${text}</span>
        <span class="badge ms-2 ${badgeColor} text-capitalize">
            ${priority}
        </span>
    </div>

    <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-success" data-action="toggle">
            ✓
        </button>
        <button class="btn btn-outline-secondary" data-action="up">
            ▲
        </button>
        <button class="btn btn-outline-secondary" data-action="down">
            ▼
        </button>
        <button class="btn btn-outline-danger" data-action="delete">
            🗑
        </button>
    </div>
`;

return li;
};

// ==========================================
// 3. TODO: STATE COUNTER MANAGER
// ==========================================
const updateCounter = () => {
    // Calculate total children nodes inside actionList and update cardCounter display.
    const total = actionList.children.length;

    const completed = actionList.querySelectorAll('.completed').length;

    cardCounter.textContent = `Total: ${total} Items | Completed: ${completed}`;
};

// ==========================================
// 4. TODO: FORM SUBMIT LISTENERS
// ==========================================
actionForm.addEventListener('submit', (e) => {
    // Prevent browser reload
    e.preventDefault();

    // Extract input text, instantiate a card, append to target list, reset forms, update counts
        const text = actionInput.value.trim(); //remove empty spaces on the beginning and the end
        const priority = prioritySelect.value;
        if(text === "") return;

        const newCard = createActionCard(text, priority);
        actionList.appendChild(newCard);
        actionInput.value = '';
        prioritySelect.value = "medium";
        
        updateCounter();
});

// ==========================================
// 5. TODO: EVENT DELEGATION & TRAVERSAL ENGINE
// ==========================================
actionList.addEventListener('click', (e) => {
    // 5a. Identify if a button or an icon with "data-action" was clicked
    const button = e.target.closest('[data-action]');
    if (!button) return; // Exit if user clicked whitespace
    const action = button.dataset.action

    // 5b. Find the closest target parent card element (.impact-card)
    const currentCard = button.closest('.impact-card');
    if (!currentCard) return;

    // 5c. Implement dynamic operations based on selected action types:
    if (action === 'toggle') {
        // Toggle complete class on currentCard
        currentCard.classList.toggle('completed');
        updateCounter();
    } 
    else if (action === 'delete') {
        // Fade out/remove currentCard from DOM, update totals
        currentCard.style.transition = 'all 0.3s ease';
        currentCard.style.opacity = '0';
        currentCard.style.transform = 'scale(0.9';
        setTimeout(() => {
            currentCard.remove();
            updateCounter();
        }, 300);
        
    } 
    else if (action === 'up') {
        // Find sibling element directly above currentCard
        const previousCard = currentCard.previousElementSibling;
        // If it exists, use parentNode.insertBefore() to swap positions
        if(previousCard) {
            actionList.insertBefore(currentCard, previousCard);
        }
    } 
    else if (action === 'down') {
        // Find sibling element directly below currentCard
        const nextCard = currentCard.nextElementSibling;
        // If it exists, use sibling.nextElementSibling to swap or insertBefore
        if(nextCard) {
            actionList.insertBefore(nextCard, currentCard);
        }
    }
});