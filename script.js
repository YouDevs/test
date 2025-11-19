document.addEventListener("DOMContentLoaded", () => {

    monthSelect = document.getElementById("month");
    yearSelect = document.getElementById("year")


    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ]

    months.forEach( m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        monthSelect.appendChild(opt);
    } )

    for (let y = 2024; y <= 2040; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }
});