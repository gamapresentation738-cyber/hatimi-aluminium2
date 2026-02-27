// WhatsApp Configuration
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number

// Storage Keys
const STORAGE_KEY = 'galleryImages';

// DOM Elements
const adminToggleBtn = document.getElementById('adminToggleBtn');
const adminPanel = document.getElementById('adminPanel');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const galleryGrid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const imageInput = document.getElementById('imageInput');
const fileUploadArea = document.getElementById('fileUploadArea');
const imagePreview = document.getElementById('imagePreview');
const uploadBtn = document.getElementById('uploadBtn');
const categorySelect = document.getElementById('categorySelect');
const imageTitle = document.getElementById('imageTitle');
const imageDescription = document.getElementById('imageDescription');
const totalImagesSpan = document.getElementById('totalImages');
const clearStorageBtn = document.getElementById('clearStorageBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

let selectedFiles = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
    updateImageCount();
});

// Admin Panel Toggle
adminToggleBtn.addEventListener('click', () => {
    adminPanel.classList.toggle('show');
});

closeAdminBtn.addEventListener('click', () => {
    adminPanel.classList.remove('show');
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// File Upload Handling
fileUploadArea.addEventListener('click', () => {
    imageInput.click();
});

fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
});

fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.style.backgroundColor = '';
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.style.backgroundColor = '';
    handleFiles(e.dataTransfer.files);
});

imageInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (newFiles.length === 0) {
        showToast('Please select valid image files', 'error');
        return;
    }

    if (newFiles.length + selectedFiles.length > 100) {
        showToast('Maximum 100 images per upload session', 'error');
        return;
    }

    selectedFiles = [...selectedFiles, ...newFiles];
    displayPreview();
}

function displayPreview() {
    imagePreview.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="preview-remove" data-index="${index}">×</button>
            `;
            imagePreview.appendChild(previewItem);

            previewItem.querySelector('.preview-remove').addEventListener('click', () => {
                selectedFiles.splice(index, 1);
                displayPreview();
            });
        };
        reader.readAsDataURL(file);
    });
}

// Upload Images
uploadBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        showToast('Please select at least one image', 'error');
        return;
    }

    if (!categorySelect.value) {
        showToast('Please select a category', 'error');
        return;
    }

    if (!imageTitle.value.trim()) {
        showToast('Please enter image title', 'error');
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';

    const uploadPromises = selectedFiles.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                    id: Date.now() + Math.random(),
                    title: imageTitle.value,
                    description: imageDescription.value,
                    category: categorySelect.value,
                    image: e.target.result,
                    timestamp: new Date().toISOString()
                };
                resolve(imageData);
            };
            reader.readAsDataURL(file);
        });
    });

    try {
        const newImages = await Promise.all(uploadPromises);
        const existingImages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const allImages = [...existingImages, ...newImages];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allImages));

        showToast(`Successfully uploaded ${newImages.length} images!`, 'success');
        resetUploadForm();
        loadGalleryImages();
        updateImageCount();
    } catch (error) {
        showToast('Error uploading images', 'error');
    }

    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload Images';
});

function resetUploadForm() {
    selectedFiles = [];
    imageInput.value = '';
    categorySelect.value = '';
    imageTitle.value = '';
    imageDescription.value = '';
    imagePreview.innerHTML = '';
}

// Load and Display Gallery Images
function loadGalleryImages() {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    if (images.length === 0) {
        galleryGrid.innerHTML = '<div class="empty-state">No images uploaded yet. Visit the admin panel to add images.</div>';
        return;
    }

    displayImages(images, 'all');
}

function displayImages(images, filter) {
    galleryGrid.innerHTML = '';

    const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);

    if (filtered.length === 0) {
        galleryGrid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;">No images in this category</div>';
        return;
    }

    filtered.forEach(img => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = img.category;
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${img.image
