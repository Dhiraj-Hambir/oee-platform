import React from "react";
import Chart from "react-apexcharts";

const PhaseWiseCurrent = ({ theme }) => {
    const generateData = (offset) => {
        const data = [];
        const baseDate = "2023-01-01";
        const timestamps = [
            "07:30", "07:45", "08:00", "08:15", "08:30", "08:45",
            "09:00", "09:15", "09:30", "09:45", "10:00", "10:15",
            "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
            "12:00", "12:15", "12:30", "12:45", "13:00"
        ];

        timestamps.forEach((t, i) => {
            let val = 140 + Math.random() * 5 + offset;
            // Introduce dips
            if (i === 10 || i === 11 || i === 16 || i === 20) {
                val = 20 + Math.random() * 10;
            }
            // slight curve
            if (i < 5) val = 110 + offset;
            if (i > 6 && i < 10) val = 145 + offset;

            const timeVal = new Date(`${baseDate} ${t}`).getTime();
            data.push([timeVal, parseFloat(val.toFixed(1))]);
        });
        return data;
    };

    const series = [
        { name: "Phase 1", data: generateData(0) },
        { name: "Phase 2", data: generateData(-2) },
        { name: "Phase 3", data: generateData(-5) }
    ];

    const commonColor = theme === 'dark' ? '#f9fafb' : '#333';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e0e0e0';

    const options = {
        chart: {
            type: "line",
            height: 350,
            zoom: { enabled: false },
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: false }
        },
        stroke: {
            curve: "smooth",
            width: 1.5,
        },
        colors: ["#7e8ce0", "#e0c87e", "#7eb3a8"],
        dataLabels: { enabled: false },
        xaxis: {
            type: "datetime",
            min: new Date("2023-01-01 07:15").getTime(),
            max: new Date("2023-01-01 13:15").getTime(),
            tickAmount: 6,
            labels: {
                datetimeUTC: false,
                format: "HH:mm",
                style: { colors: commonColor }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false }
        },
        yaxis: {
            min: 0,
            max: 160,
            labels: {
                formatter: (val) => `${val} A`,
                style: { colors: commonColor }
            },
        },
        grid: {
            borderColor: gridColor,
            strokeDashArray: 0,
            padding: {
                left: 30,
                right: 10
            }
        },
        legend: { show: false },
        tooltip: {
            theme: theme === 'dark' ? 'dark' : 'light',
            x: { format: "HH:mm" },
        }
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Chart options={options} series={series} type="line" height="100%" />
        </div>
    );
};

export default PhaseWiseCurrent;
