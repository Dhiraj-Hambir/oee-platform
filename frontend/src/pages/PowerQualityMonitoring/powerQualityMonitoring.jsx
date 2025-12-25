import React, { useState } from "react";
import Power_Quality_Header from "./Power_Quality_Header";
import rawData from "../../../services/Data.json";
import KiloWatt from "./KiloWatt";
import VoltageImbalance from "./VoltageImbalance";
import HourlyEnergyConsumption from "./HourlyEnergyConsumption";
import PhaseWiseCurrent from "./PhaseWiseCurrent";
import "../EnergyMonitoringDashboard/EnergyMonitoringDashboard.css";
import "./powerQualityMonitoring.css";

export default function PowerQualityMonitoring() {
    const [theme, setTheme] = useState("light");
    const [selectedMeter, setSelectedMeter] = useState("meter1");
    const [timeRange, setTimeRange] = useState("6h");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const getFilteredData = () => {
        const sortedData = [...rawData].sort((a, b) => new Date(a.ts) - new Date(b.ts));


        const lastTimestamp = sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1].ts).getTime() : Date.now();

        let rangeMs = 6 * 60 * 60 * 1000;
        if (timeRange === "24h") rangeMs = 24 * 60 * 60 * 1000;
        if (timeRange === "7d") rangeMs = 7 * 24 * 60 * 60 * 1000;

        const cutOffTime = lastTimestamp - rangeMs;


        let kwKey, kwhKey;
        if (selectedMeter === "meter1") {
            kwKey = "Meter:KW";
            kwhKey = "Meter:KWH";
        } else if (selectedMeter === "meter2") {
            kwKey = "meter2:KW";
            kwhKey = "meter2:KWH";
        } else {
            kwKey = "meter3:KW";
            kwhKey = "meter3:KWH";
        }

        const kwData = [];
        const kwhData = [];

        let minKW = Infinity;
        let maxKW = -Infinity;
        let lastKW = 0;
        let currentKWH = 0;

        sortedData.forEach(item => {
            const time = new Date(item.ts).getTime();

            if (time < cutOffTime) return;

            let valKW = 0;
            if (selectedMeter === 'meter1') {
                valKW = item["Meter:KW"] !== undefined ? item["Meter:KW"] : (item["Meter1:KW"] || 0);
            } else {
                valKW = item[kwKey] || 0;
            }

            if (valKW > maxKW) maxKW = valKW;
            if (valKW < minKW) minKW = valKW;
            lastKW = valKW;

            if (valKW !== undefined) {
                kwData.push([time, valKW]);
            }

            // KWH Data
            let valKWH = 0;
            if (selectedMeter === 'meter1') {
                valKWH = item["Meter:KWH"] !== undefined ? item["Meter:KWH"] : (item["Meter1:KWH"] || 0);
            } else {
                valKWH = item[kwhKey] || 0;
            }
            currentKWH = valKWH;

            if (valKWH !== undefined) {
                kwhData.push(valKWH);
            }
        });

        if (minKW === Infinity) minKW = 0;
        if (maxKW === -Infinity) maxKW = 0;

        console.log("=== PowerQualityMonitoring Debug ===");
        console.log("Selected Meter:", selectedMeter);
        console.log("Time Range:", timeRange);
        console.log("Cutoff Time:", new Date(cutOffTime).toLocaleString());
        console.log("KW key used:", selectedMeter === 'meter1' ? "Meter:KW / Meter1:KW" : kwKey);
        console.log("Generated KW Data Points:", kwData.length);
        if (kwData.length > 0) {
            console.log("Sample Data Point:", kwData[kwData.length - 1]);
        }
        console.log("====================================");

        return {
            kwData,
            kwhData: kwhData.slice(-6),
            stats: {
                lastKW,
                minKW,
                maxKW,
                currentKWH
            }

        };
    };

    const { kwData, kwhData, stats } = getFilteredData();

    return (
        <section
            className="emd-root"
            style={
                theme === "dark"
                    ? {
                        "--bg-main": "#020617",
                        "--text-main": "#f9fafb",
                        "--card-bg": "#0f172a",
                        "--border-color": "rgba(255,255,255,0.15)",
                        "--btn-bg": "#0f172a",
                        "--btn-text": "#ffffff",
                        "--shadow": "0 4px 12px rgba(0,0,0,0.4)",
                        "--muted-text": "#94a3b8",
                    }
                    : {}
            }
        >
            <Power_Quality_Header
                theme={theme}
                toggleTheme={toggleTheme}
                selectedRange={timeRange}
                onRangeChange={setTimeRange}
            />
            <div className="main-block" style={{ gap: '2.7vh' }}>
                <div className="first-block">

                    <div className="meter-row">
                        <select
                            className="meter-dropdown"
                            value={selectedMeter}
                            onChange={(e) => setSelectedMeter(e.target.value)}
                        >
                            <option value="meter1">Meter 1</option>
                            <option value="meter2">Meter 2</option>
                            <option value="meter3">Meter 3</option>
                        </select>
                        <div className="meter-dropdown">
                            Compressor <span style={{ fontSize: '1.1vh', opacity: 0.7 }}>▼</span>
                        </div>
                    </div>

                    <div className="kwh-card">
                        <h2 className="kwh-title">KWH</h2>
                        <span className="kwh-value">{stats.currentKWH} kWh</span>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                KW <span style={{ fontSize: '1.3vh', opacity: 0.7 }}>▼</span>
                            </h3>
                        </div>
                        <KiloWatt
                            theme={theme}
                            data={kwData}
                            stats={{
                                last: stats.lastKW,
                                min: stats.minKW,
                                max: stats.maxKW
                            }}
                        />
                    </div>


                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                Voltage Imbalance
                            </h3>
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
                            <h3 className="chart-title">
                                Hourly Energy Consumption
                            </h3>
                        </div>
                        <HourlyEnergyConsumption theme={theme} data={kwhData} />
                    </div>


                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                Phase Wise Current
                            </h3>
                        </div>
                        <PhaseWiseCurrent theme={theme} />
                    </div>
                </div>



            </div>
        </section>
    );
}
