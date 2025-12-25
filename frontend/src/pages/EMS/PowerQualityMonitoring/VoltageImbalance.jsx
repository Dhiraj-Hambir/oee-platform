import React from "react";
import Chart from "react-apexcharts";

const VoltageImbalance = ({ theme }) => {
    // Generate data for 3 phases that look like the screenshot
    const generateData = (baseVoltage, noise) => {
        const data = [];
        let currentTime = new Date("2023-01-01 07:30").getTime();
        const endTime = new Date("2023-01-01 13:00").getTime();

        while (currentTime <= endTime) {
            // Oscillating pattern
            const angle = (currentTime / 1000000);
            let value = baseVoltage + Math.sin(angle) * 3 + (Math.random() - 0.5) * noise;

            // Add some random dips/spikes to mimic the 'imbalance' look
            if (Math.random() > 0.8) {
                value += (Math.random() - 0.5) * 5;
            }

            data.push([currentTime, parseFloat(value.toFixed(1))]);
            currentTime += 10 * 60 * 1000; // 10 min intervals
        }
        return data;
    };

    const series = [
        {
            name: "Phase 1",
            data: generateData(238, 2), // Top line (Purple/Blue) - Reduced to fit < 243
        },
        {
            name: "Phase 2",
            data: generateData(233, 2), // Middle line (Yellow)
        },
        {
            name: "Phase 3",
            data: generateData(230, 2), // Bottom line (Green) - Increased to fit > 225
        },
    ];

    const commonColor = theme === 'dark' ? '#f9fafb' : '#333';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e0e0e0';

    const options = {
        chart: {
            type: "line",
            height: 450,
            fontFamily: "Arial, sans-serif",
            zoom: { enabled: false },
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: false }
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        colors: ["#7e8ce0", "#e0c87e", "#7eb3a8"], // Purple, Yellow, Greenish
        fill: {
            type: 'solid',
            opacity: 1
        },
        dataLabels: { enabled: false },
        xaxis: {
            type: "datetime",
            min: new Date("2023-01-01 07:30").getTime(),
            max: new Date("2023-01-01 13:10").getTime(),
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
            min: 225,
            max: 243,
            tickAmount: 6,
            labels: {
                formatter: (val) => `${Math.round(val)} V`,
                style: { colors: commonColor },
                align: 'left'
            },
        },
        grid: {
            borderColor: gridColor,
            strokeDashArray: 0,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
        },
        legend: { show: false },
        tooltip: {
            enabled: true,
            theme: theme === 'dark' ? 'dark' : 'light',
            x: { format: "HH:mm" },
            y: { formatter: (val) => `${val} V` },
        },
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Chart options={options} series={series} type="line" height="100%" />
        </div>
    );
};

export default VoltageImbalance;
