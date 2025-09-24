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

        