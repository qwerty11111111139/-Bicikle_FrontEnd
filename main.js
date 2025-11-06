document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        // Focus search on Ctrl+K or Cmd+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchBox.focus();
            }
        });

        // Search functionality
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Recipe card interactions
    const recipeCards = document.querySelectorAll('.card');
    recipeCards.forEach(card => {
        const viewButton = card.querySelector('.pill');
        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeName = card.querySelector('h3').textContent;
                alert(`Скоро тут буде рецепт: ${recipeName}`);
            });
        }
    });

    // Category tag filtering
    const tagCards = document.querySelectorAll('.tag-card');
    tagCards.forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.querySelector('span:last-child').textContent;
            const cards = document.querySelectorAll('.card');
            
            // Remove active class from all tags
            tagCards.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');
            
            // Show all cards if clicking already active tag
            if (tag.classList.contains('active')) {
                cards.forEach(card => card.style.display = '');
                return;
            }

            // Filter cards based on category
            cards.forEach(card => {
                const cardCategory = determineCardCategory(card);
                if (cardCategory === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Login button interaction
    const loginBtn = document.querySelector('.login');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Форма входу з\'явиться тут');
        });
    }

    // Helper function to determine card category
    function determineCardCategory(card) {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes('салат') || description.includes('веган')) return 'Вегетаріанські';
        if (title.includes('паста')) return 'Паста';
        if (title.includes('торт') || title.includes('чізкейк') || title.includes('тірамісу')) return 'Десерти';
        if (description.includes('морепродукти') || title.includes('креветк')) return 'Морепродукти';
        
        return '';
    }
});