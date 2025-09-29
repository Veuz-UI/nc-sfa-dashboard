// ======================= COMMON.JS =======================

// ===== SIDEBAR FUNCTIONALITY =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const topbar = document.getElementById('topbar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth <= 991) {
        // Mobile behavior
        sidebar?.classList.toggle('show');
        overlay?.classList.toggle('show');
    } else {
        // Desktop behavior
        sidebar?.classList.toggle('collapsed');
        mainContent?.classList.toggle('expanded');
        topbar?.classList.toggle('expanded');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar?.classList.remove('show');
    overlay?.classList.remove('show');
}

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const topbar = document.getElementById('topbar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth > 991) {
        // Desktop mode - remove mobile classes
        sidebar?.classList.remove('show');
        overlay?.classList.remove('show');
    } else {
        // Mobile mode - reset desktop classes
        sidebar?.classList.remove('collapsed');
        mainContent?.classList.remove('expanded');
        topbar?.classList.remove('expanded');
    }
});


// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Navigation link functionality
    document.querySelectorAll('.sidebar .nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update breadcrumb
            const pageName = this.querySelector('span')?.textContent || 'Page';
            const currentPageElement = document.getElementById('currentPage');
            if (currentPageElement) {
                currentPageElement.textContent = pageName;
            }
            
            // Update content area (if function exists)
            if (typeof updateContent === 'function') {
                updateContent(this.getAttribute('data-page'), pageName);
            }
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 991) {
                closeSidebar();
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            // Implement search logic here
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            const sidebar = document.getElementById('sidebar');
            const hamburger = document.querySelector('.hamburger');
            
            if (sidebar && hamburger && 
                !sidebar.contains(e.target) && 
                !hamburger.contains(e.target) && 
                sidebar.classList.contains('show')) {
                closeSidebar();
            }
        }
    });

    // Prevent sidebar from closing when clicking inside it
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});


// ===== DROPDOWN FUNCTIONALITY =====
function updateDropdownText(element) {
    const dropdown = element.closest('.dropdown');
    const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');
    
    if (dropdownToggle) {
        dropdownToggle.textContent = element.textContent;
    }
}

// Reports dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle-nav');
    const navItem = document.querySelector('.nav-item');
    
    if (dropdownToggle && navItem) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navItem.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navItem.contains(e.target)) {
                navItem.classList.remove('open');
            }
        });
    }
});


// ===== CAMERA FUNCTIONALITY =====
function initializeCameraFeatures() {
    const cameraBtn = document.getElementById('cameraBtn');
    const uploadPopup = document.getElementById('uploadPopup');
    const popcloseBtn = document.getElementById('popcloseBtn');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const scanBtn = document.getElementById('scanBtn');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const cameraView = document.getElementById('cameraView');
    const cameraVideo = document.getElementById('cameraVideo');
    const captureBtn = document.getElementById('captureBtn');
    const stopBtn = document.getElementById('stopBtn');

    if (!cameraBtn || !uploadPopup) return; // Exit if elements don't exist

    let currentStream = null;
    let isPopupOpen = false;

    // Toggle popup when camera icon is clicked
    cameraBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPopupOpen) {
            closePopup();
        } else {
            openPopup();
        }
    });

    function openPopup() {
        uploadPopup.classList.add('show');
        isPopupOpen = true;
    }

    function closePopup() {
        uploadPopup.classList.remove('show');
        isPopupOpen = false;
        stopCamera();
        resetUploadArea();
    }

    // Close popup
    if (popcloseBtn) {
        popcloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closePopup();
        });
    }

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (isPopupOpen && !uploadPopup.contains(e.target) && e.target !== cameraBtn) {
            closePopup();
        }
    });

    // Prevent popup from closing when clicking inside it
    uploadPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Upload area click to trigger file input
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            if (!cameraView || cameraView.style.display !== 'block') {
                fileInput.click();
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                displayImage(file);
            }
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                displayImage(files[0]);
            }
        });
    }

    // Display selected image
    function displayImage(file) {
        if (!previewImage || !previewContainer) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
            updateUploadAreaText(`Selected: ${file.name}`);
        };
        reader.readAsDataURL(file);
    }

    // Update upload area text
    function updateUploadAreaText(text) {
        if (uploadArea) {
            const h6 = uploadArea.querySelector('h6');
            if (h6) {
                h6.textContent = text;
            }
        }
    }

    // Reset upload area
    function resetUploadArea() {
        updateUploadAreaText('Choose Image - No image chosen');
        if (previewContainer) previewContainer.style.display = 'none';
        if (cameraView) cameraView.style.display = 'none';
        if (uploadArea) uploadArea.style.display = 'block';
        if (fileInput) fileInput.value = '';
    }

    // Camera functionality
    if (scanBtn && cameraVideo) {
        scanBtn.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' }
                });
                
                currentStream = stream;
                cameraVideo.srcObject = stream;
                if (cameraView) cameraView.style.display = 'block';
                if (uploadArea) uploadArea.style.display = 'none';
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Unable to access camera. Please check permissions and try again.');
            }
        });
    }

    // Capture image from camera
    if (captureBtn && cameraVideo) {
        captureBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.width = cameraVideo.videoWidth;
            canvas.height = cameraVideo.videoHeight;
            context.drawImage(cameraVideo, 0, 0);
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                if (previewImage) previewImage.src = url;
                if (previewContainer) previewContainer.style.display = 'block';
                updateUploadAreaText('Captured from camera');
                
                stopCamera();
                if (uploadArea) uploadArea.style.display = 'block';
            }, 'image/jpeg', 0.8);
        });
    }

    // Stop camera
    function stopCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
            if (cameraView) cameraView.style.display = 'none';
            if (uploadArea) uploadArea.style.display = 'block';
        }
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', stopCamera);
    }

    // Handle escape key to close popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPopupOpen) {
            closePopup();
        }
    });
}





// Initialize camera after DOM is ready
document.addEventListener('DOMContentLoaded', initializeCameraFeatures);
