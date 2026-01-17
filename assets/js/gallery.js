// Energy Field - Gallery JavaScript

// Gallery data - These images will be dynamically loaded
const galleryImages = [
    {
        src: './assets/images/atom.png',
        alt: 'Energy Atom Card',
        title: 'Energy Atom',
        description: 'The fundamental energy source in Energy Field'
    },
    {
        src: './assets/images/electron-nucleus.png',
        alt: 'Electron Energy Card',
        title: 'Electron Energy',
        description: 'Advanced energy manipulation card'
    },
    {
        src: './assets/images/invention1.png',
        alt: 'Imaginative Artifacts',
        title: 'Ancient Artifacts',
        description: 'Mystical artifacts that enhance your energy network'
    },
    {
        src: './assets/images/invention2.png',
        alt: 'Radio Artifacts',
        title: 'Communication Device',
        description: 'Advanced communication technology'
    },
    {
        src: './assets/images/scientist1.png',
        alt: 'Young Inventor',
        title: 'Young Inventor',
        description: 'The next generation of scientific minds'
    },
    {
        src: './assets/images/scientist2.webp',
        alt: 'BioSphere Inventor',
        title: 'BioSphere Scientist',
        description: 'Leading researcher in biological energy systems'
    },
    {
        src: './assets/images/character1.png',
        alt: 'Energy Field Character',
        title: 'Strategic Player',
        description: 'Master of energy manipulation and circuit building'
    }
];

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

// Initialize gallery functionality
function initializeGallery() {
    loadGalleryImages();
    setupGalleryModal();
    setupGalleryFilters();

    console.log('🎨 Gallery initialized with', galleryImages.length, 'images');
}

// Load gallery images dynamically
function loadGalleryImages() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Create gallery items
    galleryImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });

    // Add stagger animation to gallery items
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('reveal-scale');
    });
}

// Create individual gallery item
function createGalleryItem(imageData, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-aos', 'zoom-in');
    galleryItem.setAttribute('data-aos-delay', `${index * 100}`);

    galleryItem.innerHTML = `
        <img src="${imageData.src}" alt="${imageData.alt}" loading="lazy" onerror="this.style.display='none'">
        <div class="gallery-overlay">
            <div class="gallery-info">
                <h3 class="gallery-title">${imageData.title}</h3>
                <p class="gallery-description">${imageData.description}</p>
                <button class="gallery-view-btn">
                    <i class="fas fa-expand"></i>
                    View Full Size
                </button>
            </div>
        </div>
    `;

    // Add click event to open modal
    galleryItem.addEventListener('click', () => {
        openGalleryModal(index);
    });

    // Add hover effects
    galleryItem.addEventListener('mouseenter', () => {
        const img = galleryItem.querySelector('img');
        img.style.transform = 'scale(1.1)';
    });

    galleryItem.addEventListener('mouseleave', () => {
        const img = galleryItem.querySelector('img');
        img.style.transform = 'scale(1)';
    });

    return galleryItem;
}

// Setup gallery modal functionality
function setupGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (!modal) return;

    let currentImageIndex = 0;

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeGalleryModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeGalleryModal);
    }

    // Navigation events
    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            navigateGallery(-1);
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', () => {
            navigateGallery(1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
            }
        }
    });

    // Navigation function
    function navigateGallery(direction) {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        updateModalImage(currentImageIndex);
    }

    // Update modal image
    function updateModalImage(index) {
        const imageData = galleryImages[index];
        if (modalImage && imageData) {
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;

            // Add loading animation
            modalImage.style.opacity = '0';
            modalImage.onload = () => {
                modalImage.style.opacity = '1';
            };
        }
    }

    // Open modal function
    window.openGalleryModal = function(index) {
        currentImageIndex = index;
        updateModalImage(index);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Add entrance animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    };

    // Close modal function
    window.closeGalleryModal = function() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };
}

// Setup gallery filters (if you want to categorize images)
function setupGalleryFilters() {
    // Create filter buttons
    const gallerySection = document.querySelector('.gallery');
    if (!gallerySection) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="energy">Energy Cards</button>
        <button class="filter-btn" data-filter="scientists">Scientists</button>
        <button class="filter-btn" data-filter="inventions">Inventions</button>
        <button class="filter-btn" data-filter="artifacts">Artifacts</button>
    `;

    // Insert filters before gallery grid
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        gallerySection.insertBefore(filterContainer, galleryGrid);
    }

    // Add filter functionality
    const filterBtns = filterContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter gallery items
            const filter = btn.dataset.filter;
            filterGalleryItems(filter);
        });
    });
}

// Filter gallery items
function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        const shouldShow = filter === 'all' || shouldShowItem(index, filter);

        if (shouldShow) {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        } else {
            item.style.display = 'none';
        }
    });
}

// Determine if item should be shown based on filter
function shouldShowItem(index, filter) {
    const imageData = galleryImages[index];

    switch(filter) {
        case 'energy':
            return imageData.title.toLowerCase().includes('energy') ||
                   imageData.title.toLowerCase().includes('atom') ||
                   imageData.title.toLowerCase().includes('electron');
        case 'scientists':
            return imageData.title.toLowerCase().includes('inventor') ||
                   imageData.title.toLowerCase().includes('scientist');
        case 'inventions':
            return imageData.title.toLowerCase().includes('tool') ||
                   imageData.title.toLowerCase().includes('device') ||
                   imageData.title.toLowerCase().includes('communication');
        case 'artifacts':
            return imageData.title.toLowerCase().includes('artifact') ||
                   imageData.title.toLowerCase().includes('tree') ||
                   imageData.title.toLowerCase().includes('vale');
        default:
            return true;
    }
}

// Image lazy loading with intersection observer
function setupLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);

                // Add load animation
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                });
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        imageObserver.observe(img);
    });
}

// Add gallery CSS styles
const galleryStyles = `
    .gallery-filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .filter-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(100, 135, 201, 0.3);
        color: var(--text-primary);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-family: var(--font-primary);
        font-weight: 600;
        letter-spacing: 1px;
        transition: all var(--transition-medium);
        position: relative;
        overflow: hidden;
    }

    .filter-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
        transition: left var(--transition-slow);
    }

    .filter-btn:hover::before {
        left: 100%;
    }

    .filter-btn:hover,
    .filter-btn.active {
        border-color: var(--neon-blue);
        background: rgba(0, 212, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        transform: translateY(-2px);
    }

    .filter-btn.active {
        color: var(--neon-blue);
        text-shadow: 0 0 10px var(--neon-blue);
    }

    .gallery-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: all var(--transition-medium);
        background: var(--bg-tertiary);
        aspect-ratio: 16/9;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 212, 255, 0.3);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-medium);
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.7) 70%,
            rgba(0, 0, 0, 0.9) 100%
        );
        display: flex;
        align-items: flex-end;
        padding: 1.5rem;
        opacity: 0;
        transition: opacity var(--transition-medium);
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }

    .gallery-info {
        width: 100%;
    }

    .gallery-title {
        font-family: var(--font-primary);
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    .gallery-description {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.4;
        margin-bottom: 1rem;
    }

    .gallery-view-btn {
        background: rgba(0, 212, 255, 0.2);
        border: 1px solid var(--neon-blue);
        color: var(--neon-blue);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all var(--transition-fast);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .gallery-view-btn:hover {
        background: rgba(0, 212, 255, 0.3);
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
    }

    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 2000;
        display: none;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
    }

    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.3);
        transition: opacity 0.3s ease;
    }

    .modal-close,
    .modal-prev,
    .modal-next {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(0, 212, 255, 0.5);
        color: var(--text-primary);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        backdrop-filter: blur(10px);
    }

    .modal-close {
        top: 2rem;
        right: 2rem;
    }

    .modal-prev {
        left: 2rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .modal-next {
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .modal-close:hover,
    .modal-prev:hover,
    .modal-next:hover {
        background: rgba(0, 212, 255, 0.2);
        border-color: var(--neon-blue);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        transform: translateY(-50%) scale(1.1);
    }

    .modal-close:hover {
        transform: scale(1.1);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .gallery-filters {
            gap: 0.5rem;
        }

        .filter-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }

        .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .modal-prev,
        .modal-next,
        .modal-close {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }

        .modal-close {
            top: 1rem;
            right: 1rem;
        }

        .modal-prev {
            left: 1rem;
        }

        .modal-next {
            right: 1rem;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);

// Export functions for external use
window.EnergyFieldGallery = {
    initializeGallery,
    openGalleryModal,
    closeGalleryModal,
    filterGalleryItems
};