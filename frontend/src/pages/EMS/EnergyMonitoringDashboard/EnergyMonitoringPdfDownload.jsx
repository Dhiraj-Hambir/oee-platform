import React from "react";
import Chart from "react-apexcharts";

const EnergyMonitoringPdfDownload = ({
    isPrinting,
    theme,
    energyMetrics,
    lineSeries,
    pieSeries,
    barData
}) => {
    if (!isPrinting) return null;

    return (
        <div className="emd-print-wrapper" style={{
            position: 'fixed',
            left: '-5000px',
            top: 0,
            width: '1400px',
            background: theme === "dark" ? "#020617" : "#f9fafb",
            zIndex: -9999
        }}>
            <div className="emd-root is-printing">
                <div className="emd-top-row">
                    <div className="emd-kpi-grid">
                        <div className="emd-card kpi"><p>Last 24 Hrs Energy Consumption</p><h2>{energyMetrics.totalConsumption.toFixed(1)} kWh</h2></div>
                        <div className="emd-card kpi"><p>Last 24 Hrs Energy Cost</p><h2>₹{energyMetrics.totalCost.toFixed(0)}</h2></div>
                        <div className="emd-card kpi"><p>Energy from Generator</p><h2 className="red">444 kWh</h2></div>
                        <div className="emd-card kpi"><p>Max Demand (24h)</p><h2>{energyMetrics.maxDemand.toFixed(2)} MW</h2></div>
                        <div className="emd-card kpi"><p>Max Demand Time</p><h2>2022-05-24<br />20:29:07</h2></div>
                        <div className="emd-card kpi"><p>Power Outage</p><h2>56 min</h2></div>
                    </div>
                </div>

                <div className="emd-middle-row">
                    <div className="emd-card power-card">
                        <h3>Power Consumption (WBSEDCL Line vs Generator)</h3>
                        <div style={{ height: '500px', width: '100%' }}>
                            <Chart
                                type="line"
                                height="100%"
                                width="100%"
                                series={lineSeries}
                                options={{
                                    chart: {
                                        toolbar: { show: false },
                                        foreColor: theme === "dark" ? "#e5e7eb" : "#374151",
                                        animations: { enabled: false }
                                    },
                                    xaxis: {
                                        type: 'datetime',
                                        labels: {
                                            show: true,
                                            datetimeUTC: false,
                                            style: { colors: theme === "dark" ? "#e5e7eb" : "#374151", fontSize: '13px', fontWeight: 600 }
                                        },
                                        axisBorder: { show: true, color: '#e5e7eb' },
                                        axisTicks: { show: true, color: '#e5e7eb' }
                                    },
                                    yaxis: {
                                        labels: { style: { colors: theme === "dark" ? "#e5e7eb" : "#374151", fontSize: '12px' } },
                                        title: { text: "KWH", style: { color: theme === "dark" ? "#e5e7eb" : "#374151" } }
                                    },
                                    stroke: { curve: 'smooth', width: 4 },
                                    grid: {
                                        padding: { bottom: 30, right: 15, left: 15 },
                                        borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "#e5e7eb"
                                    },
                                    markers: { size: 6, strokeWidth: 0 },
                                    dataLabels: { enabled: true, style: { fontSize: '11px' } },
                                    colors: ["#6aa84f", "#cc0000", "#00bfff"],
                                    legend: { show: true, position: 'top', horizontalAlign: 'right', offsetY: 0, markers: { width: 14, height: 14, radius: 12 } }
                                }}
                            />
                        </div>
                    </div>
                    <div className="emd-card segment-card">
                        <h3>Segment Wise Energy Consumption</h3>
                        <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {pieSeries.some(v => v > 0) ? (
                                <Chart
                                    type="pie"
                                    height="100%"
                                    width="100%"
                                    series={pieSeries}
                                    options={{
                                        labels: ["Meter 1", "Meter 2", "Meter 3"],
                                        colors: ["#6aa84f", "#cc0000", "#00bfff"],
                                        legend: { position: 'right', show: true, markers: { width: 14, height: 14 } },
                                        dataLabels: { enabled: true, style: { fontSize: '11px' } },
                                        chart: { animations: { enabled: false } }
                                    }}
                                />
                            ) : (
                                <div style={{ color: theme === "dark" ? "#e5e7eb" : "#374151", fontSize: '18px', fontWeight: '500' }}>
                                    No Data Available
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="emd-bottom-row">
                    <div className="emd-card hourly-card" style={{ flex: 1 }}>
                        <h3>Hourly Segment Wise Energy Consumption</h3>
                        <div style={{ height: '500px', width: '100%' }}>
                            <Chart
                                type="bar"
                                height="100%"
                                width="100%"
                                series={barData.series}
                                options={{
                                    chart: {
                                        stacked: true,
                                        toolbar: { show: false },
                                        foreColor: theme === "dark" ? "#e5e7eb" : "#374151",
                                        animations: { enabled: false }
                                    },
                                    xaxis: {
                                        categories: barData.labels,
                                        labels: {
                                            show: true,
                                            style: { colors: theme === "dark" ? "#e5e7eb" : "#374151", fontSize: '13px', fontWeight: 600 }
                                        },
                                        axisBorder: { show: true, color: '#e5e7eb' },
                                        axisTicks: { show: true, color: '#e5e7eb' }
                                    },
                                    yaxis: {
                                        labels: { style: { colors: theme === "dark" ? "#e5e7eb" : "#374151", fontSize: '12px' } }
                                    },
                                    stroke: { show: false, width: 0 },
                                    grid: {
                                        padding: { bottom: 30, right: 15, left: 15 },
                                        borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "#e5e7eb"
                                    },
                                    plotOptions: {
                                        bar: { borderRadius: 0, columnWidth: '70%' }
                                    },
                                    dataLabels: { enabled: true, style: { fontSize: '11px', colors: ['#fff'] } },
                                    colors: ["#6aa84f", "#cc0000", "#00bfff"],
                                    legend: { show: true, position: 'top', horizontalAlign: 'right', offsetY: 0, markers: { width: 14, height: 14, radius: 12 } }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyMonitoringPdfDownload;
