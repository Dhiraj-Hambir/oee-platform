import React, { useState } from "react";
import Power_Quality_Header from "./Power_Quality_Header";
import rawData from "../../../services/Data.json";
import KiloWatt from "./KiloWatt";
import VoltageImbalance from "./VoltageImbalance";
import HourlyEnergyConsumption from "./HourlyEnergyConsumption";
import PhaseWiseCurrent from "./PhaseWiseCurrent";
import "../EnergyMonitoringDashboard/EnergyMonitoringDashboard.css";
import "./powerQualityMonitoring.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PowerQualityPdfDownload from "./PowerQualityPdfDownload";

export default function PowerQualityMonitoring() {
    const [theme, setTheme] = useState("light");
    const [selectedMeter, setSelectedMeter] = useState("meter1");
    const [timeRange, setTimeRange] = useState("6h");
    const [isPrinting, setIsPrinting] = useState(false);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const downloadPDF = () => {
        setIsPrinting(true);

        // Wait for component to render
        setTimeout(() => {
            const input = document.getElementById("pdf-report-content");
            if (!input) {
                console.error("❌ PDF content not found");
                setIsPrinting(false);
                return;
            }

            html2canvas(input, {
                scale: 2,
                useCORS: true,
                backgroundColor: theme === "dark" ? "#020617" : "#f9fafb",
                width: 1400,
                height: input.offsetHeight,
                logging: false,
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                const fileName = `PowerQuality_Report_${selectedMeter.toUpperCase()}_${timeRange}_${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(fileName);
                setIsPrinting(false);
            }).catch(err => {
                console.error("PDF generation failed:", err);
                setIsPrinting(false);
            });
        }, 500);
    };

    const getFilteredData = () => {
        const sortedData = [...rawData].sort(
            (a, b) => new Date(a.ts) - new Date(b.ts)
        );

        const lastTimestamp =
            sortedData.length > 0
                ? new Date(sortedData[sortedData.length - 1].ts).getTime()
                : Date.now();

        let rangeMs = 6 * 60 * 60 * 1000;
        if (timeRange === "24h") rangeMs = 24 * 60 * 60 * 1000;
        if (timeRange === "7d") rangeMs = 7 * 24 * 60 * 60 * 1000;

        const cutOffTime = lastTimestamp - rangeMs;

        const consumptionMap = new Map();
        const kwData = [];
        const kwhSeriesData = [];

        let minKW = Infinity;
        let maxKW = -Infinity;
        let lastKW = 0;
        let currentKWH = 0;

        let prevKWH = null;

        sortedData.forEach((item) => {
            const time = new Date(item.ts).getTime();
            if (time < cutOffTime) return;

            let valKW = 0;
            let valKWH = 0;
            if (selectedMeter === "meter1") {
                valKW = item["Meter:KW"] || item["Meter1:KW"] || 0;
                valKWH = item["Meter:KWH"] || item["Meter1:KWH"] || 0;
            } else if (selectedMeter === "meter2") {
                valKW = item["meter2:KW"] || item["Meter2:KW"] || 0;
                valKWH = item["meter2:KWH"] || item["Meter2:KWH"] || 0;
            } else {
                valKW = item["meter3:KW"] || item["Meter3:KW"] || 0;
                valKWH = item["meter3:KWH"] || item["Meter3:KWH"] || 0;
            }

            minKW = Math.min(minKW, valKW);
            maxKW = Math.max(maxKW, valKW);
            lastKW = valKW;

            kwData.push([time, valKW]);
            currentKWH = valKWH;
            kwhSeriesData.push([time, valKWH]);

            if (prevKWH !== null) {
                const delta = Math.max(0, valKWH - prevKWH);

                const dt = new Date(item.ts);
                let key;
                if (timeRange === "7d") {
                    key = dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                } else {
                    key = dt.getHours().toString().padStart(2, '0') + ":00";
                }

                if (!consumptionMap.has(key)) {
                    consumptionMap.set(key, 0);
                }
                consumptionMap.set(key, consumptionMap.get(key) + delta);
            }
            prevKWH = valKWH;
        });

        if (minKW === Infinity) minKW = 0;
        if (maxKW === -Infinity) maxKW = 0;

        const consumptionLabels = Array.from(consumptionMap.keys());
        const consumptionValues = Array.from(consumptionMap.values()).map(v => parseFloat(v.toFixed(2)));

        return {
            kwData,
            kwhSeriesData,
            consumptionData: consumptionValues,
            consumptionLabels,
            stats: {
                lastKW,
                minKW,
                maxKW,
                currentKWH
            }
        };
    };

    const { kwData, kwhSeriesData, consumptionData, consumptionLabels, stats } = getFilteredData();

    return (
        <section className="emd-root">
            <Power_Quality_Header
                toggleTheme={toggleTheme}
                selectedRange={timeRange}
                onRangeChange={setTimeRange}
                selectedMeter={selectedMeter}
                onMeterChange={setSelectedMeter}
                onDownloadReport={downloadPDF}
            />

            <div className="main-block" style={{ gap: "2.7vh" }}>
                <div className="first-block">
                    <div className="spacer-block"></div>
                    <div className="kwh-card">
                        <h2 className="kwh-title">KWH</h2>
                        <span className="kwh-value">{stats.currentKWH} kWh</span>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                KW
                            </h3>
                        </div>
                        <KiloWatt
                            theme={theme}
                            data={kwData}
                            kwhData={kwhSeriesData}
                            stats={{
                                last: stats.lastKW,
                                min: stats.minKW,
                                max: stats.maxKW
                            }}
                        />
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">Voltage Imbalance</h3>
                        </div>
                        <VoltageImbalance theme={theme} />
                    </div>
                </div>

                <div className="second-block">
                    <div className="spacer-block"></div>

                    <div className="kwh-card">
                        <h2 className="kwh-title">KWH</h2>
                        <span className="kwh-value">{stats.currentKWH} kWh</span>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">Hourly Energy Consumption</h3>
                        </div>
                        <HourlyEnergyConsumption
                            theme={theme}
                            data={consumptionData}
                            labels={consumptionLabels}
                        />
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">Phase Wise Current</h3>
                        </div>
                        <PhaseWiseCurrent theme={theme} />
                    </div>
                </div>
            </div>
            <PowerQualityPdfDownload
                isPrinting={isPrinting}
                theme={theme}
                selectedMeter={selectedMeter}
                timeRange={timeRange}
                stats={stats}
                kwData={kwData}
                kwhSeriesData={kwhSeriesData}
                consumptionData={consumptionData}
                consumptionLabels={consumptionLabels}
            />
        </section>
    );
}
