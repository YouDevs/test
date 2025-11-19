document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("practice-form");
    const dayInput = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");
    const countInput = document.getElementById("count");
    const chartCanvas = document.getElementById("practice-chart");

    let selectedMonth, selectedYear, myChart;

    // Default topics for each month
    const defaultTopics = {
        Arrays: 0,
        Strings: 0,
        Recursion: 0,
        OOP: 0,
        Other: 0,
    };

    // Object storing practice data in memory (no persistence)
    const practice = {
        January:   { ...defaultTopics },
        February:  { ...defaultTopics },
        March:     { ...defaultTopics },
        April:     { ...defaultTopics },
        May:       { ...defaultTopics },
        June:      { ...defaultTopics },
        July:      { ...defaultTopics },
        August:    { ...defaultTopics },
        September: { ...defaultTopics },
        October:   { ...defaultTopics },
        November:  { ...defaultTopics },
        December:  { ...defaultTopics },
    };

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    // Populate month dropdown
    months.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        monthSelect.appendChild(opt);
    });

    // Populate year dropdown (still used even without persistence)
    for (let y = 2020; y <= 2040; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Update chart using only memory data
    function updateChart() {
        selectedMonth = monthSelect.value;
        selectedYear = yearSelect.value;

        const data = practice[selectedMonth];

        const ctx = chartCanvas.getContext("2d");

        if (myChart) myChart.destroy();

        myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: [
                            "#3b82f6", // Arrays
                            "#22c55e", // Strings
                            "#ef4444", // Recursion
                            "#eab308", // OOP
                            "#a855f7", // Other
                        ],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: "top",
                        labels: { color: "#e2e8f0" },
                    },
                },
            },
        });
    }

    // Handle form submission (no persistence)
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const day = dayInput.value;
        const month = monthSelect.value;
        const year = yearSelect.value;
        const topic = document.getElementById("topic").value;
        const count = parseInt(countInput.value);

        if (count <= 0) {
            alert("Enter a valid number of exercises.");
            return;
        }

        // Update in-memory practice data
        practice[month][topic] += count;

        // Update the chart
        updateChart();

        // Reset input
        countInput.value = "";
    });

    // Set default month/year/day to current date
    // const now = new Date();
    // monthSelect.value = months[now.getMonth()];
    // yearSelect.value = now.getFullYear();
    // dayInput.value = now.getDate();

    // Initial chart
    updateChart();
});
