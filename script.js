* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --light-brown: #A0826D;
    --royal-green: #2D5016;
    --light-bg: #F5F3F0;
    --dark-text: #1A1A1A;
    --white: #FFFFFF;
    --accent: #D4A574;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--white);
    color: var(--dark-text);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: sticky;
    top: 0;
    background: var(--white);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 20px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--royal-green);
    text-decoration: none;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: scale(1.05);
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 6px;
    z-index: 1001;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background: var(--royal-green);
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: var(--dark-text);
    font-weight: 500;
    position: relative;
    transition: color 0.3s ease;
    font-size: 1rem;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--royal-green);
    transition: width 0.3s ease;
}

.nav-links a:hover {
    color: var(--royal-green);
}

.nav-links a:hover::after {
    width: 100%;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--light-bg) 0%, #FFFBF7 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 60px 20px;
}

.hero-content {
    max-width: 700px;
    text-align: center;
    z-index: 2;
    animation: fadeInUp 1s ease-out;
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

.hero-title {
    font-size: clamp(1.8rem, 6vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: 'Merriweather', serif;
    line-height: 1.2;
}

.gradient-text {
    background: linear-gradient(135deg, var(--royal-green), var(--light-brown));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: clamp(1rem, 3vw, 1.2rem);
    color: #666;
    margin-bottom: 2rem;
    font-weight: 300;
}

.cta-button {
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    border: none;
    padding: 12px 35px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(45, 80, 22, 0.2);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(45, 80, 22, 0.3);
}

.cta-button:active {
    transform: translateY(-1px);
}

/* Floating Shapes */
.hero-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}

.floating-shape {
    position: absolute;
    opacity: 0.1;
}

.shape-1 {
    width: 300px;
    height: 300px;
    background: var(--royal-green);
    border-radius: 50%;
    top: 10%;
    right: 10%;
    animation: float 6s ease-in-out infinite;
}

.shape-2 {
    width: 200px;
    height: 200px;
    background: var(--light-brown);
    border-radius: 30%;
    bottom: 20%;
    left: 10%;
    animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
    width: 150px;
    height: 150px;
    background: var(--accent);
    border-radius: 50%;
    top: 50%;
    right: 5%;
    animation: float 7s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-30px);
    }
}

/* Features Section */
.features {
    padding: 60px 20px;
    background: var(--white);
}

.section-title {
    font-size: clamp(1.8rem, 5vw, 3rem);
    text-align: center;
    margin-bottom: 3rem;
    font-family: 'Merriweather', serif;
    color: var(--dark-text);
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--royal-green), var(--light-brown));
    margin: 1rem auto 0;
    border-radius: 2px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.feature-card {
    background: linear-gradient(135deg, #FAFAFA, #F5F3F0);
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid #EEE;
    animation: slideUp 0.6s ease-out backwards;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(45, 80, 22, 0.1);
    background: var(--white);
}

.feature-icon {
    margin-bottom: 1rem;
    display: inline-block;
    transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
    transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--royal-green);
}

.feature-card p {
    color: #666;
    font-size: 0.9rem;
}

/* Services Section */
.services {
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--light-bg) 0%, #FFFBF7 100%);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.service-item {
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    animation: slideUp 0.6s ease-out backwards;
}

.service-item:nth-child(1) { animation-delay: 0.1s; }
.service-item:nth-child(2) { animation-delay: 0.2s; }
.service-item:nth-child(3) { animation-delay: 0.3s; }
.service-item:nth-child(4) { animation-delay: 0.4s; }
.service-item:nth-child(5) { animation-delay: 0.5s; }
.service-item:nth-child(6) { animation-delay: 0.6s; }

.service-image {
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, var(--royal-green), var(--light-brown));
    position: relative;
    overflow: hidden;
}

.service-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent);
}

.service-item:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(45, 80, 22, 0.15);
}

.service-item h3 {
    font-size: 1.1rem;
    color: var(--royal-green);
    padding: 1rem 1rem 0.5rem;
}

.service-item p {
    color: #666;
    padding: 0 1rem 1rem;
    font-size: 0.9rem;
}

/* Gallery Section */
.gallery {
    padding: 60px 20px;
    background: var(--white);
}

.admin-section {
    margin-bottom: 3rem;
}

.admin-toggle-btn {
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 300px;
}

.admin-toggle-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(45, 80, 22, 0.2);
}

.admin-panel {
    display: none;
    background: linear-gradient(135deg, #F5F3F0, #FFFBF7);
    border: 2px solid var(--royal-green);
    border-radius: 12px;
    padding: 2rem;
    margin-top: 1.5rem;
    animation: slideDown 0.3s ease-out;
}

.admin-panel.show {
    display: block;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--light-brown);
}

.admin-header h3 {
    color: var(--royal-green);
    font-size: 1.3rem;
}

.close-admin-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--royal-green);
    transition: transform 0.3s ease;
}

.close-admin-btn:hover {
    transform: rotate(90deg);
}

.upload-form {
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--dark-text);
    font-weight: 600;
    font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #EEE;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: var(--white);
    color: var(--dark-text);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--royal-green);
    box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
}

.file-upload-area {
    border: 3px dashed var(--royal-green);
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.05), rgba(160, 130, 109, 0.05));
}

.file-upload-area:hover {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(160, 130, 109, 0.1));
    border-color: var(--light-brown);
}

.file-upload-area svg {
    color: var(--royal-green);
    margin-bottom: 1rem;
}

.file-upload-area p {
    color: var(--dark-text);
    margin: 0.5rem 0;
    font-weight: 500;
}

.file-hint {
    color: #999 !important;
    font-size: 0.85rem !important;
    font-weight: 400 !important;
}

.file-upload-area input {
    display: none;
}

.image-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.preview-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 1;
    cursor: pointer;
}

.preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.preview-remove {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 0, 0, 0.8);
    color: var(--white);
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    opacity: 0;
}

.preview-item:hover .preview-remove {
    opacity: 1;
}

.preview-remove:hover {
    background: rgba(255, 0, 0, 1);
}

.upload-btn {
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    border: none;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    width: 100%;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.upload-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(45, 80, 22, 0.2);
}

.upload-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.uploaded-stats {
    background: var(--white);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 1.5rem;
}

.uploaded-stats p {
    color: var(--dark-text);
    margin-bottom: 1rem;
    font-weight: 500;
}

.clear-storage-btn {
    background: #FF6B6B;
    color: var(--white);
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.clear-storage-btn:hover {
    background: #FF5252;
    transform: translateY(-2px);
}

/* Gallery Filters */
.gallery-filters {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: linear-gradient(135deg, #F5F3F0, #FAFAFA);
    color: var(--dark-text);
    border: 2px solid #EEE;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 0.9rem;
}

.filter-btn:hover {
    border-color: var(--royal-green);
    color: var(--royal-green);
    transform: translateY(-2px);
}

.filter-btn.active {
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    border-color: var(--royal-green);
    box-shadow: 0 10px 25px rgba(45, 80, 22, 0.2);
}

/* Gallery Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.gallery-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeIn 0.6s ease-out;
    aspect-ratio: 1;
    background: #EEE;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.gallery-item.hidden {
    display: none;
}

.gallery-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--light-brown), var(--royal-green));
    position: relative;
    overflow: hidden;
}

.gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gallery-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent);
}

.gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    padding: 1.5rem 1rem 1rem;
    color: var(--white);
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
    transform: translateY(0);
    opacity: 1;
}

.gallery-overlay h4 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    font-family: 'Merriweather', serif;
}

.gallery-overlay p {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.9);
}

.gallery-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(45, 80, 22, 0.2);
}

.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: #999;
}

/* About Section */
.about {
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--light-bg) 0%, #FFFBF7 100%);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
}

.about-text h2 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-family: 'Merriweather', serif;
    margin-bottom: 1.5rem;
    color: var(--royal-green);
}

.about-text p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 0.95rem;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
}

.stat {
    text-align: center;
    padding: 1rem;
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat h4 {
    font-size: 1.8rem;
    color: var(--royal-green);
    margin-bottom: 0.5rem;
}

.stat p {
    color: #999;
    font-size: 0.85rem;
}

.about-image {
    height: 300px;
    background: linear-gradient(135deg, var(--royal-green), var(--light-brown));
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    animation: slideInRight 1s ease-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.about-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent);
}

/* Contact Section */
.contact {
    padding: 60px 20px;
    background: var(--white);
}

.contact-wrapper {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2rem;
    align-items: start;
}

.contact-form form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: fadeInUp 0.8s ease-out;
}

.contact-form .form-group {
    margin-bottom: 0;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #EEE;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: var(--white);
    color: var(--dark-text);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #999;
}

.form-group select {
    cursor: pointer;
}

.form-group select option {
    background: var(--white);
    color: var(--dark-text);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--royal-green);
    box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
}

.submit-button {
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    border: none;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(45, 80, 22, 0.2);
}

.submit-button:active {
    transform: translateY(-1px);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.info-item {
    padding: 1.5rem;
    background: var(--light-bg);
    border-radius: 12px;
    border-left: 4px solid var(--royal-green);
    transition: all 0.3s ease;
}

.info-item:hover {
    background: linear-gradient(135deg, var(--light-bg), #FFFBF7);
    transform: translateX(5px);
}

.info-item h4 {
    color: var(--royal-green);
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.info-item p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0.3rem 0;
}

.whatsapp-note {
    color: #25D366 !important;
    font-weight: 600;
    font-size: 0.8rem !important;
    margin-top: 0.5rem !important;
}

.whatsapp-direct {
    background: linear-gradient(135deg, #25D366, #128C7E);
    border-left: 4px solid #25D366;
    padding: 0 !important;
}

.whatsapp-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: var(--white);
    padding: 1.5rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.whatsapp-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(37, 211, 102, 0.3);
}

/* Footer */
.footer {
    background: var(--dark-text);
    color: var(--white);
    padding: 2rem 20px;
    text-align: center;
}

.footer .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.social-links {
    display: flex;
    gap: 1.5rem;
}

.social-link {
    color: var(--light-brown);
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.9rem;
}

.social-link:hover {
    color: var(--accent);
    transform: translateY(-3px);
}

/* Toast Notification */
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--royal-green), #1F3A0B);
    color: var(--white);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(45, 80, 22, 0.2);
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 2000;
    max-width: 300px;
    word-wrap: break-word;
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

/* Mobile Responsive Design */
@media (max-width: 768px) {
    .hamburger {
        display: flex;
    }

    .nav-links {
        position: fixed;
        top: 60px;
        right: -100%;
        flex-direction: column;
        background: var(--white);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        gap: 0;
        padding: 20px 0;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    }

    .nav-links.active {
        right: 0;
    }

    .nav-links a {
        padding: 1rem;
        display: block;
        font-size: 0.95rem;
    }

    .hero {
        min-height: 70vh;
        padding: 40px 20px;
    }

    .hero-title {
        font-size: 1.8rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .features-grid,
    .services-grid,
    .gallery-grid {
        grid-template-columns: 1fr;
    }

    .about-content,
    .contact-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .about-image {
        height: 250px;
    }

    .stats {
        grid-template-columns: 1fr;
    }

    .gallery-item {
        aspect-ratio: auto;
        min-height: 200px;
    }

    .floating-shape {
        opacity: 0.05;
    }

    .admin-panel {
        padding: 1.5rem;
    }

    .admin-toggle-btn {
        max-width: 100%;
    }

    .file-upload-area {
        padding: 1.5rem;
    }

    .image-preview {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }

    .gallery-filters {
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 8px 15px;
        font-size: 0.85rem;
    }

    .section-title {
        margin-bottom: 2rem;
    }

    .contact-info {
        gap: 1rem;
    }

    .info-item {
        padding: 1rem;
    }

    .footer .container {
        flex-direction: column;
    }

    .toast {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}

@media (max-width: 480px) {
    .logo {
        font-size: 1.4rem;
    }

    .hero-title {
        font-size: 1.5rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .container {
        padding: 0 15px;
    }

    .cta-button {
        padding: 10px 25px;
        font-size: 0.95rem;
    }

    .feature-card {
        padding: 1rem;
    }

    .feature-card h3 {
        font-size: 1.1rem;
    }

    .service-item h3 {
        font-size: 1rem;
    }

    .service-item p {
        font-size: 0.85rem;
    }

    .gallery-item {
        min-height: 180px;
    }

    .stat h4 {
        font-size: 1.5rem;
    }

    .stat p {
        font-size: 0.8rem;
    }

    .submit-button {
        padding: 0.8rem;
        font-size: 0.95rem;
    }

    .whatsapp-button {
        padding: 1rem;
        font-size: 0.95rem;
    }

    .whatsapp-button svg {
        width: 18px;
        height: 18px;
    }

    .navbar .container {
        padding: 0.8rem 20px;
    }

    .gallery-filters {
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    .filter-btn {
        padding: 7px 12px;
        font-size: 0.8rem;
    }
}
