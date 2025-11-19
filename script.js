document.addEventListener("DOMContentLoaded", () => {

    // 1. Rellenar el select de meses
    monthSelect = document.getElementById("month");

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
});