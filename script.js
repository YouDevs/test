document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("practice-form");
    const dayInput = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");
    const countInput = document.getElementById("count");
    const lastEntryBox = document.getElementById("last-entry");
    const chartCanvas = document.getElementById("practice-chart");

    let selectedMonth, selectedYear, myChart;

    const defaultTopics = {
        Arrays: 0,
        Strings: 0,
        Recursion: 0,
        OOP: 0,
        Other: 0,
    };

    const practice = {};

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

    // Populate year dropdown
    for (let y = 2020; y <= 2040; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Load from LocalStorage
    function load(month, year) {
        const key = `practice-${month}-${year}`;
        return JSON.parse(localStorage.getItem(key)) || { ...defaultTopics };
    }

    // Save to LocalStorage
    function save(month, year, data) {
        const key = `practice-${month}-${year}`;
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Update chart
    function updateChart() {
        selectedMonth = monthSelect.value;
        selectedYear = yearSelect.value;

        const data = load(selectedMonth, selectedYear);

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
                            "#3b82f6",
                            "#22c55e",
                            "#ef4444",
                            "#eab308",
                            "#a855f7",
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

    // Handle submit
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

        const currentData = load(month, year);
        currentData[topic] += count;

        save(month, year, currentData);
        updateChart();

        lastEntryBox.textContent = `Last entry: ${day} ${month} ${year} — ${topic} (${count} exercises)`;

        countInput.value = "";
    });

    // Default month/year
    const now = new Date();
    monthSelect.value = months[now.getMonth()];
    yearSelect.value = now.getFullYear();
    dayInput.value = now.getDate();

    updateChart();
});
