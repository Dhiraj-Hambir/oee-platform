import React from "react";
import Chart from "react-apexcharts";

const PowerQualityPdfDownload = ({
    isPrinting,
    theme,
    selectedMeter,
    timeRange,
    stats,
    kwData,
    kwhSeriesData,
    consumptionData,
    consumptionLabels
}) => {
    if (!isPrinting) return null;

    const commonColor = theme === "dark" ? "#f9fafb" : "#333";
    const bgColor = theme === "dark" ? "#020617" : "#f9fafb";
    const cardBg = theme === "dark" ? "#1e293b" : "#ffffff";
    const borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "#e5e7eb";

    // Dummy data generation for Voltage and Current to match dashboard look
    const generateVoltageData = (baseVoltage, noise) => {
        const data = [];
        let curr = new Date("2023-01-01 07:30").getTime();
        for (let i = 0; i < 23; i++) {
            data.push([curr, parseFloat((baseVoltage + (Math.random() - 0.5) * noise).toFixed(1))]);
            curr += 15 * 60 * 1000;
        }
        return data;
    };

    const voltageSeries = [
        { name: "Phase 1", data: generateVoltageData(238, 4) },
        { name: "Phase 2", data: generateVoltageData(233, 4) },
        { name: "Phase 3", data: generateVoltageData(230, 4) },
    ];

    const currentSeries = [
        { name: "Phase 1", data: generateVoltageData(145, 10) },
        { name: "Phase 2", data: generateVoltageData(140, 10) },
        { name: "Phase 3", data: generateVoltageData(135, 10) }
    ];

    return (
        <div className="emd-print-wrapper" id="pdf-report-content" style={{
            position: 'fixed',
            left: '-5000px',
            top: 0,
            width: '1400px',
            background: bgColor,
            padding: '40px',
            zIndex: -9999,
            fontFamily: "Arial, sans-serif"
        }}>
            <style>{`
                .pdf-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                .pdf-card {
                    background: ${cardBg};
                    border: 1px solid ${borderColor};
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                }
                .pdf-kwh-card {
                    text-align: center;
                    padding: 30px;
                    height: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .pdf-kwh-title {
                    font-size: 18px;
                    color: ${commonColor};
                    margin-bottom: 10px;
                }
                .pdf-kwh-value {
                    font-size: 32px;
                    font-weight: bold;
                    color: #d32f2f;
                }
                .pdf-chart-title {
                    text-align: center;
                    font-size: 18px;
                    font-weight: 600;
                    color: ${commonColor};
                    margin: 0 0 20px 0;
                }
                .pdf-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid ${borderColor};
                    padding-bottom: 15px;
                }
                .pdf-header h1 {
                    font-size: 26px;
                    margin: 0;
                    color: ${commonColor};
                }
                .pdf-meta {
                    text-align: right;
                    font-size: 14px;
                    color: #64748b;
                }
            `}</style>

            <div className="pdf-header">
                <h1>Power Quality Monitoring: {selectedMeter.toUpperCase()}</h1>
                <div className="pdf-meta">
                    <div>Range: Last {timeRange}</div>
                    <div>Generated: {new Date().toLocaleString()}</div>
                </div>
            </div>

            <div className="pdf-container">
                {/* Left Column */}
                <div className="column">
                    <div className="pdf-card pdf-kwh-card">
                        <div className="pdf-kwh-title">KWH</div>
                        <div className="pdf-kwh-value">{stats.currentKWH} kWh</div>
                    </div>

                    <div className="pdf-card" style={{ height: '550px' }}>
                        <h3 className="pdf-chart-title">KW</h3>
                        <Chart
                            type="line"
                            height="450"
                            series={[
                                { name: "KW", data: kwData },
                                { name: "KWH", data: kwhSeriesData }
                            ]}
                            options={{
                                chart: { toolbar: { show: false }, animations: { enabled: false }, foreColor: commonColor },
                                stroke: { curve: 'smooth', width: 3 },
                                colors: ["#5cb85c", "#ff4081"],
                                xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
                                yaxis: [
                                    { title: { text: "KW" }, labels: { style: { colors: commonColor } } },
                                    { opposite: true, title: { text: "KWH" }, labels: { style: { colors: commonColor } } }
                                ],
                                grid: { borderColor: borderColor }
                            }}
                        />
                    </div>

                    <div className="pdf-card" style={{ height: '550px' }}>
                        <h3 className="pdf-chart-title">Voltage Imbalance</h3>
                        <Chart
                            type="line"
                            height="450"
                            series={voltageSeries}
                            options={{
                                chart: { toolbar: { show: false }, animations: { enabled: false }, foreColor: commonColor },
                                stroke: { curve: 'smooth', width: 2 },
                                colors: ["#7e8ce0", "#e0c87e", "#7eb3a8"],
                                xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
                                yaxis: { min: 220, max: 250, labels: { style: { colors: commonColor } } },
                                grid: { borderColor: borderColor }
                            }}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="column">
                    <div className="pdf-card pdf-kwh-card">
                        <div className="pdf-kwh-title">KWH</div>
                        <div className="pdf-kwh-value">{stats.currentKWH} kWh</div>
                    </div>

                    <div className="pdf-card" style={{ height: '550px' }}>
                        <h3 className="pdf-chart-title">Hourly Energy Consumption</h3>
                        <Chart
                            type="bar"
                            height="450"
                            series={[{ name: "Consumption", data: consumptionData }]}
                            options={{
                                chart: { toolbar: { show: false }, animations: { enabled: false }, foreColor: commonColor },
                                plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
                                colors: ["#5cb85c"],
                                xaxis: { categories: consumptionLabels },
                                yaxis: { min: 0, labels: { style: { colors: commonColor } } },
                                grid: { borderColor: borderColor }
                            }}
                        />
                    </div>

                    <div className="pdf-card" style={{ height: '550px' }}>
                        <h3 className="pdf-chart-title">Phase Wise Current</h3>
                        <Chart
                            type="line"
                            height="450"
                            series={currentSeries}
                            options={{
                                chart: { toolbar: { show: false }, animations: { enabled: false }, foreColor: commonColor },
                                stroke: { curve: 'smooth', width: 2 },
                                colors: ["#7e8ce0", "#e0c87e", "#7eb3a8"],
                                xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
                                yaxis: { min: 0, max: 200, labels: { style: { colors: commonColor } } },
                                grid: { borderColor: borderColor }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerQualityPdfDownload;
