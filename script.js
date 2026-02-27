// ==================== CONFIGURATION ====================
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

let uploadedFiles = [];

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== GALLERY FILTER ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.6s ease-out';
                }, 0);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.6s ease-out';
                    }, 0);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// ==================== IMAGE UPLOAD SYSTEM ====================

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const progressContainer = document.getElementById('progressContainer');
const progressTemplate = document.getElementById('progressTemplate');
const clearBtn = document.getElementById('clearBtn');
const submitBtn = document.getElementById('submitBtn');

// Click to upload
uploadZone.addEventListener('click', () => fileInput.click());

// Drag and drop
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// File input change
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

/**
 * Handle file upload and validation
 */
function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        // Check if file is image
        if (!ALLOWED_FORMATS.includes(file.type)) {
            showNotification(`${file.name} - Invalid format. Only JPG, PNG, WebP allowed.`, 'error');
            return false;
        }
        
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            showNotification(`${file.name} - File size exceeds 5MB limit.`, 'error');
            return false;
        }
        
        return true;
    });

    // Check total files limit
    if (uploadedFiles.length + validFiles.length > MAX_FILES) {
        showNotification(`Maximum ${MAX_FILES} files allowed.`, 'error');
        return;
    }

    // Add files to upload queue
    validFiles.forEach(file => {
        const fileObj = {
            file: file,
            id: Date.now() + Math.random(),
            progress: 0
        };
        uploadedFiles.push(fileObj);
        addPreview(fileObj);
    });

    // Update UI
    updateUploadButtons();
    fileInput.value = ''; // Reset input
}

/**
 * Add image preview
 */
function addPreview(fileObj) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.id = `preview-${fileObj.id}`;
        
        const img = document.createElement('img');
        img.src = e.target.result;
        fileObj.dataUrl = e.target.result; // Store for later use
        
        const info = document.createElement('div');
        info.className = 'preview-item-info';
        info.innerHTML = `
            <div>${fileObj.file.name.substring(0, 15)}</div>
            <span class="preview-item-size">${formatFileSize(fileObj.file.size)}</span>
        `;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'preview-item-remove';
        removeBtn.innerHTML = '×';
        removeBtn.type = 'button';
        removeBtn.addEventListener('click', () => removePreview(fileObj.id));
        
        previewItem.appendChild(img);
        previewItem.appendChild(info);
        previewItem.appendChild(removeBtn);
        
        previewContainer.appendChild(previewItem);
    };
    
    reader.readAsDataURL(fileObj.file);
}

/**
 * Remove preview item
 */
function removePreview(fileId) {
    // Remove from upload queue
    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
    
    // Remove preview element
    const previewElement = document.getElementById(`preview-${fileId}`);
    if (previewElement) {
        previewElement.style.animation = 'fadeIn 0.4s ease-out reverse';
        setTimeout(() => {
            previewElement.remove();
        }, 200);
    }
    
    // Update UI
    updateUploadButtons();
}

/**
 * Update upload buttons visibility
 */
function updateUploadButtons() {
    if (uploadedFiles.length > 0) {
        clearBtn.style.display = 'block';
        submitBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
        submitBtn.style.display = 'none';
        progressContainer.style.display = 'none';
    }
}

/**
 * Clear all uploads
 */
clearBtn.addEventListener('click', () => {
    uploadedFiles.forEach(fileObj => {
        const previewElement = document.getElementById(`preview-${fileObj.id}`);
        if (previewElement) {
            previewElement.remove();
        }
    });
    uploadedFiles = [];
    previewContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    progressContainer.style.display = 'none';
    updateUploadButtons();
});

/**
 * Simulate file upload with progress
 */
function simulateUpload(fileObj) {
    return new Promise((resolve) => {
        const progressItem = document.createElement('div');
        progressItem.className = 'upload-progress-item';
        progressItem.id = `progress-${fileObj.id}`;
        progressItem.style.display = 'block';
        
        progressItem.innerHTML = `
            <div class="progress-info">
                <span class="progress-filename">${fileObj.file.name}</span>
                <span class="progress-percent">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;
        
        progressContainer.appendChild(progressItem);
        
        const progressFill = progressItem.querySelector('.progress-fill');
        const progressPercent = progressItem.querySelector('.progress-percent');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.round(progress) + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    resolve();
                }, 500);
            }
        }, 300);
    });
}

/**
 * Submit files via WhatsApp
 */
submitBtn.addEventListener('click', async () => {
    if (uploadedFiles.length === 0) {
        showNotification('No files to upload', 'error');
        return;
    }
    
    progressContainer.style.display = 'block';
    submitBtn.disabled = true;
    clearBtn.disabled = true;
    
    try {
        // Simulate upload for each file
        for (const fileObj of uploadedFiles) {
            await simulateUpload(fileObj);
        }
        
        // Prepare WhatsApp message with image links
        const imageCount = uploadedFiles.length;
        const whatsappMessage = encodeURIComponent(
            `Hello AlumiFab,\n\n` +
            `I have uploaded ${imageCount} project image(s) for review.\n\n` +
            `*Images Details:*\n` +
            uploadedFiles.map((f, i) => `${i + 1}. ${f.file.name} (${formatFileSize(f.file.size)})`).join('\n') +
            `\n\nPlease review and provide feedback.\n\n` +
            `Looking forward to your response.`
        );
        
        // Create WhatsApp link
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        
        // Show success message
        submitBtn.innerHTML = '✓ Opening WhatsApp...';
        submitBtn.style.background = 'linear-gradient(135deg, #3A7D2D, #1F3A0B)';
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            // Reset after completion
            setTimeout(() => {
                resetUploadForm();
            }, 1000);
        }, 500);
        
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Error during upload. Please try again.', 'error');
        resetUploadForm();
    }
});

/**
 * Reset upload form
 */
function resetUploadForm() {
    uploadedFiles = [];
    previewContainer.innerHTML = '';
    progressContainer.innerHTML = '';
    progressContainer.style.display = 'none';
    fileInput.value = '';
    
    const btn = submitBtn;
    btn.disabled = false;
    btn.innerHTML = 'Upload to WhatsApp';
    btn.style.background = '';
    
    clearBtn.disabled = false;
    updateUploadButtons();
    showNotification('Upload completed! Check WhatsApp for your message.', 'success');
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = encodeURIComponent(
        `Hello AlumiFab,\n\n` +
        `I would like to inquire about your services.\n\n` +
        `*Customer Details:*\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Project Type: ${projectType}\n\n` +
        `*Project Details:*\n` +
        `${message}\n\n` +
        `Looking forward to your response.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '✓ Redirecting to WhatsApp...';
    submitButton.style.background = 'linear-gradient(135deg, #3A7D2D, #1F3A0B)';

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
        }, 1000);
    }, 500);
});

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-item, .feature-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==================== ACTIVE NAV HIGHLIGHTING ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--royal-green)';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== FLOATING SHAPES ====================
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const moveX = (x - 0.5) * (index + 1) * 20;
        const moveY = (y - 0.5) * (index + 1) * 20;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ==================== CTA BUTTON ====================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('upload').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideUp 0.4s ease-out;
        font-weight: 500;
        max-width: 90%;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeIn 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Initialize
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    console.log('✨ AlumiFab website loaded successfully with dynamic image upload system!');
});
