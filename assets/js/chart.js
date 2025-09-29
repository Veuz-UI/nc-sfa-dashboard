// =========================
// CHARTS FUNCTIONALITY
// =========================
function initializeCharts() {

    // -----------------
    // Chart 1 - Donut
    // -----------------
    if (document.querySelector("#chart")) {
        const options1 = { 
            series: [65, 35], 
            chart: { 
                type: 'donut',
                height: 300,
                width: 300
            },
            labels: ['Active', 'Inactive'],
            colors: ['var(--secondary-color)', 'var(--primary-color)'],
            legend: { show: false },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: { show: false }
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { width: 0 },
            responsive: [{ 
                breakpoint: 480, 
                options: { 
                    chart: { width: 250, height: 250 }, 
                    legend: { position: 'bottom', offsetY: 10 }
                } 
            }],
            tooltip: { enabled: false }
        }; 
 
        const chart1 = new ApexCharts(document.querySelector("#chart"), options1); 
        chart1.render();
    }

    // -----------------
    // Chart 2 - Bar
    // -----------------
    if (document.querySelector("#chart2")) {
        const options2 = {
            series: [
                { name: 'Female', data: [85, 45, 75, 120, 35, 40] },
                { name: 'Male', data: [65, 110, 70, 85, 80, 110] },
                { name: 'Other', data: [5, 8, 12, 15, 10, 8] }
            ],
            chart: { type: 'bar', height: 350, toolbar: { show: false } },
            plotOptions: {
                bar: { horizontal: false, columnWidth: '60%', borderRadius: 4, borderRadiusApplication: 'end' }
            },
            dataLabels: { enabled: false },
            colors: ['var(--primary-color)', 'var(--secondary-color)', 'var(--light-orange)'],
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: {
                categories: ['6-10', '11-12', '13-14', '15-17', '18-19', '19+'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: '#a0aec0', fontSize: '12px' } }
            },
            yaxis: { show: false },
            fill: { opacity: 1 },
            tooltip: {
                y: { formatter: val => val + " people" }
            },
            legend: { show: false },
            grid: { show: false }
        };

        const chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
        chart2.render();
    }

    // -----------------
    // Chart 3 - Subscription Types Donut
    // -----------------
    if (document.querySelector("#chart3")) {
        const options3 = {
            series: [35, 55, 25],
            chart: { type: 'donut', width: 280, height: 280 },
            labels: ['Annual', 'Monthly', 'Premium Monthly'],
            colors: ['var(--secondary-color)', 'var(--primary-color)', 'var(--light-orange)'],
            plotOptions: {
                pie: { donut: { size: '20%', labels: { show: false } } }
            },
            dataLabels: { enabled: false },
            legend: { show: false },
            stroke: { show: false },
            tooltip: { y: { formatter: val => val + "%" } },
            responsive: [{ breakpoint: 480, options: { chart: { width: 200, height: 200 } } }]
        };

        const chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
        chart3.render();
    }

    // -----------------
    // Chart 4 - Subscription Plans Donut
    // -----------------
    if (document.querySelector("#chart4")) {
        const options4 = {
            series: [44, 55, 41, 17, 15, 25, 8],
            chart: { type: 'donut', width: 280, height: 280 },
            labels: [
                '1 Day - 10 SAR (All Ages)',
                '1 Month - 60 SAR (Children 6-15)',
                '1 Month - 60 SAR (Parents 18+)',
                '1 Month - 120 SAR (Parents & 2 kids)',
                '1 Month - 250 SAR (Parents & 3+ kids)',
                '6 Months - 270 SAR (Parents & 2+ kids)',
                'Other'
            ],
            colors: ['#14B37B', '#EF593A', '#9f7aea', '#ed8936', '#a0aec0', '#4299e1', '#3AEF7F'],
            plotOptions: {
                pie: { donut: { size: '65%', labels: { show: false } } }
            },
            dataLabels: { enabled: false },
            legend: { show: false },
            stroke: { show: false },
            tooltip: { y: { formatter: val => val + " subscriptions" } },
            responsive: [{ breakpoint: 480, options: { chart: { width: 200, height: 200 } } }]
        };

        const chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
        chart4.render();
    }
}

// =========================
// PROGRESS BARS
// =========================
function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar-custom');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        }
    });
}

// =========================
// DOMContentLoaded
// =========================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Charts
    if (typeof ApexCharts !== 'undefined') {
        initializeCharts();
    } else {
        console.error('ApexCharts library not loaded.');
    }

    // Animate Progress Bars
    animateProgressBars();
});
