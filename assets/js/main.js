     // Sidebar toggle functionality
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const topbar = document.getElementById('topbar');
            const overlay = document.getElementById('sidebarOverlay');
            
            if (window.innerWidth <= 991) {
                // Mobile behavior
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
            } else {
                // Desktop behavior
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
                topbar.classList.toggle('expanded');
            }
        }

        // Close sidebar on mobile
        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const topbar = document.getElementById('topbar');
            const overlay = document.getElementById('sidebarOverlay');
            
            if (window.innerWidth > 991) {
                // Desktop mode - remove mobile classes
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            } else {
                // Mobile mode - reset desktop classes
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                topbar.classList.remove('expanded');
            }
        });

        // Navigation link functionality
        document.querySelectorAll('.sidebar .nav-link[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Update breadcrumb
                const pageName = this.querySelector('span').textContent;
                document.getElementById('currentPage').textContent = pageName;
                
                // Update content area
                updateContent(this.getAttribute('data-page'), pageName);
                
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 991) {
                    closeSidebar();
                }
            });
        });

        

        // Search functionality
        document.getElementById('searchInput')?.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            // Implement search logic here
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                const sidebar = document.getElementById('sidebar');
                const hamburger = document.querySelector('.hamburger');
                
                if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains('show')) {
                    closeSidebar();
                }
            }
        });

        // Prevent sidebar from closing when clicking inside it
        document.getElementById('sidebar').addEventListener('click', function(e) {
            e.stopPropagation();
        });
 
 function updateDropdownText(element) {
            const dropdown = element.closest('.dropdown');
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            
            // Update only the dropdown text
            dropdownToggle.textContent = element.textContent;
        }

// report dropdown
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

        

        // chart1


        var options = { 
            series: [65, 35], 
            chart: { 
                type: 'donut',
                height: 300,
                width: 300
            },
            labels: ['Active', 'Inactive'],
           colors: ['var(--secondary-color)', 'var(--primary-color)'],
            legend: {
                show: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: false
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 0
            },
            responsive: [{ 
                breakpoint: 480, 
                options: { 
                    chart: { 
                        width: 250,
                        height: 250
                    }, 
                    legend: { 
                        position: 'bottom',
                        offsetY: 10
                    }
                } 
            }],
            tooltip: {
                enabled: false
            }
        }; 
 
        var chart = new ApexCharts(document.querySelector("#chart"), options); 
        chart.render();

        // progress table

         // Animate progress bars on page load
        document.addEventListener('DOMContentLoaded', function() {
            const bars = document.querySelectorAll('.progress-bar-custom');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        });



        // bar charts

        var options = {
            series: [
                {
                    name: 'Female',
                    data: [85, 45, 75, 120, 35, 40]
                },
                {
                    name: 'Male',
                    data: [65, 110, 70, 85, 80, 110]
                },
                {
                    name: 'Other',
                    data: [5, 8, 12, 15, 10, 8]
                }
            ],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%',
                    borderRadius: 4,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            colors: ['var(--primary-color)', 'var(--secondary-color)', 'var(--light-orange)'],
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['6-10', '11-12', '13-14', '15-17', '18-19', '19+'],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#a0aec0',
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                show: false
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " people"
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                show: false
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart2"), options);
        chart.render();


        // chart3

         var options = {
            series: [35, 55, 25],
            chart: {
                type: 'donut',
                width: 280,
                height: 280
            },
            labels: ['Annual', 'Monthly', 'Premium Monthly'],
            colors: ['var(--secondary-color)', 'var(--primary-color)', 'var(--light-orange)'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '20%',
                        labels: {
                            show: false
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            stroke: {
                show: false
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "%"
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                        height: 200
                    }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#chart3"), options);
        chart.render();


        // chart-4


         var options = {
            series: [44, 55, 41, 17, 15, 25, 8],
            chart: {
                type: 'donut',
                width: 280,
                height: 280
            },
            labels: [
                '1 Day - 10 SAR (All Ages)',
                '1 Month - 60 SAR (Children due from 6-15)',
                '1 Month - 60 SAR (Parents over 18)',
                '1 Month - 120 SAR (Parents & 2 kids)',
                '1 Month - 250 SAR (Parents & 3+ kids)',
                '6 Months - 270 SAR (Parents & 2+ kids)',
                'Other'
            ],
            colors: ['#48bb78', '#f56565', '#9f7aea', '#ed8936', '#a0aec0', '#4299e1', '#cbd5e0'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        labels: {
                            show: false
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            stroke: {
                show: false
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " subscriptions"
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                        height: 200
                    }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#chart4"), options);
        chart.render();


        // camera function

         // Get DOM elements
        const cameraBtn = document.getElementById('cameraBtn');
        const uploadPopup = document.getElementById('uploadPopup');
        const closeBtn = document.getElementById('closeBtn');
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const scanBtn = document.getElementById('scanBtn');
        const previewContainer = document.getElementById('previewContainer');
        const previewImage = document.getElementById('previewImage');
        const cameraView = document.getElementById('cameraView');
        const cameraVideo = document.getElementById('cameraVideo');
        const captureBtn = document.getElementById('captureBtn');
        const stopBtn = document.getElementById('stopBtn');

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
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closePopup();
        });

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
        uploadArea.addEventListener('click', () => {
            if (cameraView.style.display !== 'block') {
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

        // Display selected image
        function displayImage(file) {
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
            const h6 = uploadArea.querySelector('h6');
            h6.textContent = text;
        }

        // Reset upload area
        function resetUploadArea() {
            updateUploadAreaText('Choose Image - No image chosen');
            previewContainer.style.display = 'none';
            cameraView.style.display = 'none';
            uploadArea.style.display = 'block';
            fileInput.value = '';
        }

        // Camera functionality
        scanBtn.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' }
                });
                
                currentStream = stream;
                cameraVideo.srcObject = stream;
                cameraView.style.display = 'block';
                uploadArea.style.display = 'none';
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Unable to access camera. Please check permissions and try again.');
            }
        });

        // Capture image from camera
        captureBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.width = cameraVideo.videoWidth;
            canvas.height = cameraVideo.videoHeight;
            context.drawImage(cameraVideo, 0, 0);
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                previewImage.src = url;
                previewContainer.style.display = 'block';
                updateUploadAreaText('Captured from camera');
                
                stopCamera();
                uploadArea.style.display = 'block';
            }, 'image/jpeg', 0.8);
        });

        // Stop camera
        function stopCamera() {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
                currentStream = null;
                cameraView.style.display = 'none';
                uploadArea.style.display = 'block';
            }
        }

        stopBtn.addEventListener('click', stopCamera);

        // Handle escape key to close popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPopupOpen) {
                closePopup();
            }
        });


        // edit profile

          // Form submission handler
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
            // Validate form
            if (!fullName.trim()) {
                alert('Please enter your full name');
                document.getElementById('fullName').focus();
                return;
            }
            
            if (!email.trim()) {
                alert('Please enter your email');
                document.getElementById('email').focus();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return;
            }
            
            // Success message (you can replace this with actual form submission)
            alert('Registration updated successfully!');
            console.log('Form Data:', { fullName, email });
        });

        // Real-time email validation feedback
        document.getElementById('email').addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                this.style.backgroundColor = '#fff5f5';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = '#fafafa';
            }
        });

        // Clear validation styling on input
        document.getElementById('email').addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.backgroundColor = '#fafafa';
        });
        