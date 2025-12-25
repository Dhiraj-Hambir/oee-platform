import React from "react";
import Chart from "react-apexcharts";

const HourlyEnergyConsumption = ({ theme, data = [], labels = [] }) => {
    const commonColor = theme === 'dark' ? '#f9fafb' : '#333';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e0e0e0';

    const series = [
        {
            name: "Consumption",
            data: data
        }
    ];

    const options = {
        chart: {
            type: "bar",
            height: 350,
            fontFamily: "Arial, sans-serif",
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: false }
        },
        colors: ["#5cb85c"], // Green color
        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 2,
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: labels,
            labels: {
                style: { colors: commonColor }
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: 0,
            labels: {
                formatter: (val) => `${val.toFixed(1)} kWh`,
                style: { colors: commonColor }
            },
            title: {
                text: "Consumption (kWh)",
                style: { color: commonColor, fontWeight: 400 }
            },
        },
        grid: {
            borderColor: gridColor,
            strokeDashArray: 0,
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            theme: theme === 'dark' ? 'dark' : 'light',
        }
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <Chart options={options} series={series} type="bar" height="100%" />
            </div>
        </div>
    );
};

export default HourlyEnergyConsumption;
