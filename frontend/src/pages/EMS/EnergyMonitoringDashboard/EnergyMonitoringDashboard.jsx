import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import "./EnergyMonitoringDashboard.css";
import energyData from "../../../services/Data.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Chart from "react-apexcharts";
import EnergyMonitoringPdfDownload from "./EnergyMonitoringPdfDownload";

export default function EnergyMonitoringDashboard() {
  const [theme, setTheme] = useState("light");
  const [selectedRange, setSelectedRange] = useState("Last 24 hours"); // Track selected range

  const [energyMetrics, setEnergyMetrics] = useState({
    totalConsumption: 0,
    totalCost: 0,
    maxDemand: 0
  });

  // State for chart series
  const [lineSeries, setLineSeries] = useState([]);
  const [pieSeries, setPieSeries] = useState([0, 0, 0]);
  const [barData, setBarData] = useState({ series: [], labels: [] });
  const [hasRecords, setHasRecords] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false); // State to handle PDF generation visibility

  const lineRef = useRef(null);
  const barRef = useRef(null);
  const pieRef = useRef(null);

  // Calculate 24-Hour KPI Metrics (Fixed)
  useEffect(() => {
    const now = new Date();
    // Fixed Window: Last 24 Hours
    const kpiStartTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const kpiData = energyData.filter(item => {
      if (!item.ts) return false;
      const ts = new Date(item.ts.replace("Z", ""));
      return ts >= kpiStartTime && ts <= now;
    });

    // Sort to ensure we get the true latest record based on time, not just file order
    kpiData.sort((a, b) => new Date(a.ts.replace("Z", "")).getTime() - new Date(b.ts.replace("Z", "")).getTime());

    if (kpiData.length === 0) {
      setEnergyMetrics({ totalConsumption: 0, totalCost: 0, maxDemand: 0 });
      setHasRecords(false); // Indicates no data for the MAIN KPI 24h view 
    } else {
      setHasRecords(true);

      let totalM1 = 0;
      let totalM2 = 0;
      let totalM3 = 0;
      const kwValues = [];

      kpiData.forEach(entry => {
        const m1 = typeof entry["Meter1:KWH"] === 'number' ? entry["Meter1:KWH"] : 0;
        const m2 = typeof entry["meter2:KWH"] === 'number' ? entry["meter2:KWH"] : 0;
        const m3 = typeof entry["meter3:KWH"] === 'number' ? entry["meter3:KWH"] : 0;
        kwValues.push(m1 + m2 + m3);
      });

      // Simple sum of all three meters from the latest record as requested
      const latest = kpiData[kpiData.length - 1];
      const m1Latest = typeof latest["Meter1:KWH"] === 'number' ? latest["Meter1:KWH"] : 0;
      const m2Latest = typeof latest["meter2:KWH"] === 'number' ? latest["meter2:KWH"] : 0;
      const m3Latest = typeof latest["meter3:KWH"] === 'number' ? latest["meter3:KWH"] : 0;

      const combinedTotal = m1Latest + m2Latest + m3Latest;
      const maxKW = kwValues.length > 0 ? Math.max(...kwValues) : 0;
      const COST_PER_KWH = 7;

      setEnergyMetrics({
        totalConsumption: combinedTotal,
        totalCost: combinedTotal * COST_PER_KWH,
        maxDemand: maxKW / 1000 // Keep for the Max Demand card
      });
    }
  }, []); // Runs once on mount


  // Calculate Graph Data (Dynamic based on Filter)
  useEffect(() => {
    const now = new Date();
    let startTime;

    if (selectedRange === "Last 6 hours") {
      startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    } else if (selectedRange === "Last 7 days") {
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else {
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    let filteredData = energyData.filter(item => {
      if (!item.ts) return false;
      const ts = new Date(item.ts.replace("Z", ""));
      return ts >= startTime && ts <= now;
    });

    // Sort for graph
    filteredData.sort((a, b) => new Date(a.ts.replace("Z", "")).getTime() - new Date(b.ts.replace("Z", "")).getTime());

    // Filter for unique last entries per day if 7 days is selected
    if (selectedRange === "Last 7 days") {
      const dailyMap = {};
      filteredData.forEach(item => {
        const dateStr = new Date(item.ts.replace("Z", "")).toDateString();
        // Since it's sorted, the last encountering item for a date is the last hour entry
        dailyMap[dateStr] = item;
      });
      filteredData = Object.values(dailyMap);
    }

    if (filteredData.length === 0) {
      setLineSeries([]);
      setPieSeries([0, 0, 0]);
      setBarData({ series: [], labels: [] });
      return;
    }

    // 1. Prepare Line Series & Pie Data
    const m1Data = [];
    const m2Data = [];
    const m3Data = [];
    let totalM1 = 0;
    let totalM2 = 0;
    let totalM3 = 0;

    filteredData.forEach(entry => {
      const ts = new Date(entry.ts.replace("Z", "")).getTime();
      const val1 = typeof entry["Meter1:KWH"] === 'number' ? entry["Meter1:KWH"] : 0;
      const val2 = typeof entry["meter2:KWH"] === 'number' ? entry["meter2:KWH"] : 0;
      const val3 = typeof entry["meter3:KWH"] === 'number' ? entry["meter3:KWH"] : 0;

      m1Data.push([ts, val1]);
      m2Data.push([ts, val2]);
      m3Data.push([ts, val3]);

      totalM1 += val1;
      totalM2 += val2;
      totalM3 += val3;
    });

    // FIX: If there is only one data point, add a duplicate point at "now" 
    // to force ApexCharts to draw a line instead of a single dot.
    if (filteredData.length === 1) {
      const ts = m1Data[0][0];
      const val1 = m1Data[0][1];
      const val2 = m2Data[0][1];
      const val3 = m3Data[0][1];
      const nowTs = now.getTime();

      if (ts < nowTs) {
        m1Data.push([nowTs, val1]);
        m2Data.push([nowTs, val2]);
        m3Data.push([nowTs, val3]);
      }
    }

    // 3. Prepare Bar Chart Data (Hourly Aggregation)
    const hourlyAggregation = {};

    filteredData.forEach(entry => {
      const ts = new Date(entry.ts.replace("Z", ""));
      let bucket;
      if (selectedRange === "Last 7 days") {
        bucket = ts.toLocaleDateString([], { day: '2-digit', month: 'short' });
      } else {
        bucket = ts.getHours() + ":00";
      }

      if (!hourlyAggregation[bucket]) {
        hourlyAggregation[bucket] = { m1: 0, m2: 0, m3: 0 };
      }

      hourlyAggregation[bucket].m1 += typeof entry["Meter1:KWH"] === 'number' ? entry["Meter1:KWH"] : 0;
      hourlyAggregation[bucket].m2 += typeof entry["meter2:KWH"] === 'number' ? entry["meter2:KWH"] : 0;
      hourlyAggregation[bucket].m3 += typeof entry["meter3:KWH"] === 'number' ? entry["meter3:KWH"] : 0;
    });

    const labelsForBar = Object.keys(hourlyAggregation);
    const barM1 = labelsForBar.map(l => hourlyAggregation[l].m1);
    const barM2 = labelsForBar.map(l => hourlyAggregation[l].m2);
    const barM3 = labelsForBar.map(l => hourlyAggregation[l].m3);

    // Final State Updates
    setLineSeries([
      { name: "Meter 1", data: m1Data },
      { name: "Meter 2", data: m2Data },
      { name: "Meter 3", data: m3Data }
    ]);

    setPieSeries([totalM1, totalM2, totalM3]);

    setBarData({
      labels: labelsForBar,
      series: [
        { name: "Meter 1", data: barM1 },
        { name: "Meter 2", data: barM2 },
        { name: "Meter 3", data: barM3 }
      ]
    });

  }, [selectedRange]); // Runs whenever filter changes

  const downloadDailyReport = async () => {
    setIsPrinting(true);

    // Wait for the Shadow Dashboard to render and the charts to initialize (Crucial for high-res dots)
    await new Promise(r => setTimeout(r, 1000));

    // Capture the HIDDEN desktop version instead of the live mobile version
    const element = document.querySelector(".emd-print-wrapper");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: theme === "dark" ? "#020617" : "#f9fafb",
      width: 1400, // Explicitly capture 1400px
      onclone: (clonedDoc) => {
        const printEl = clonedDoc.querySelector(".emd-print-wrapper");
        if (printEl) {
          printEl.style.display = "block";
          printEl.style.position = "static";
        }
      }
    });


    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 20) / imgHeight);

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    // Add Professional Title Header
    pdf.setFontSize(18);
    pdf.setTextColor(theme === "dark" ? 255 : 40);
    pdf.text("Daily Energy Monitoring Report", 15, 15);

    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(`Time Range: ${selectedRange}`, 15, 22);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 15, 27);

    // Add Captured Dashboard Image
    pdf.addImage(imgData, "PNG", (pdfWidth - finalWidth) / 2, 35, finalWidth, finalHeight);

    // Add Footer
    pdf.setFontSize(8);
    pdf.text("Automated OEE Management System - Confidential Report", pdfWidth / 2, pdfHeight - 10, { align: "center" });

    const dateStr = new Date().toLocaleDateString().replace(/\//g, "-");
    const safeRange = selectedRange.replace(/\s+/g, "_");
    pdf.save(`Energy_Report_${dateStr}_${safeRange}.pdf`);
    setIsPrinting(false);
  };



  useEffect(() => {
    const isDark = theme === "dark";
    const commonLabelColor = isDark ? "#e5e7eb" : "#374151";
    const gridColor = isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb";

    // Format date on x-axis based on range
    let xFormat = "HH:mm";
    if (selectedRange === "Last 7 days") {
      xFormat = "dd MMM";
    }

    // LINE CHART
    let line;
    if (lineRef.current) {
      lineRef.current.innerHTML = "";
      line = new ApexCharts(lineRef.current, {
        chart: {
          type: "line",
          height: "100%",
          width: "100%",
          toolbar: { show: false },
          foreColor: commonLabelColor,
          zoom: { enabled: false }
        },
        theme: { mode: isDark ? "dark" : "light" },
        tooltip: {
          theme: isDark ? "dark" : "light",
          x: { format: xFormat }
        },
        series: lineSeries,
        xaxis: {
          type: 'datetime',
          labels: {
            style: { colors: commonLabelColor },
            datetimeUTC: false
          },
          tooltip: { enabled: false }
        },
        yaxis: {
          labels: { style: { colors: commonLabelColor } },
          title: { text: "KWH", style: { color: commonLabelColor } }
        },
        grid: {
          borderColor: gridColor,
          padding: { top: 5, bottom: 35, left: 15, right: 15 }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: -5,
          markers: { radius: 12 }
        },
        stroke: { width: 3, curve: 'smooth' },
        markers: { size: 4, strokeWidth: 0, hover: { size: 6 } }, // Added markers for single-point visibility
        colors: ["#6aa84f", "#cc0000", "#00bfff"], // Green, Red, Sky Blue
        dataLabels: { enabled: false }
      });
      line.render();
    }

    // BAR CHART
    let bar;
    if (barRef.current) {
      barRef.current.innerHTML = "";
      bar = new ApexCharts(barRef.current, {
        chart: {
          type: "bar",
          stacked: true,
          height: "100%",
          width: "100%",
          toolbar: { show: false },
          foreColor: commonLabelColor
        },
        theme: { mode: isDark ? "dark" : "light" },
        series: barData.series,
        xaxis: {
          categories: barData.labels,
          labels: {
            show: true,
            style: { colors: commonLabelColor }
          }
        },
        grid: {
          borderColor: gridColor,
          padding: { top: 5, bottom: 35, left: 15, right: 15 }
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: -5,
          markers: { radius: 12 }
        },
        colors: ["#6aa84f", "#cc0000", "#00bfff"] // Green, Red, Sky Blue

      });
      bar.render();
    }

    // PIE CHART
    let pie;
    const hasPieData = pieSeries.some(val => val > 0);
    if (pieRef.current) {
      pieRef.current.innerHTML = "";
      if (!hasPieData) {
        pieRef.current.innerHTML = `<div style="height: 300px; display: flex; align-items: center; justify-content: center; color: ${commonLabelColor};">No Data Available</div>`;
      } else {
        pie = new ApexCharts(pieRef.current, {
          chart: {
            type: "pie",
            height: "100%",
            width: "100%",
            foreColor: commonLabelColor
          },
          theme: { mode: isDark ? "dark" : "light" },
          series: pieSeries,
          labels: ["Meter 1", "Meter 2", "Meter 3"],
          colors: ["#6aa84f", "#cc0000", "#00bfff"], // Green, Red, Sky Blue
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -20 // Pull labels inward to prevent overflow
              }
            }
          }
        });
        pie.render();
      }
    }

    return () => {
      if (line) line.destroy();
      if (bar) bar.destroy();
      if (pie) pie.destroy();
    };
  }, [theme, lineSeries, pieSeries, barData, selectedRange]); // Re-render chart when data/range changes

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
            "--muted-text": "#94a3b8"
          }
          : {}
      }
    >
      <div className="emd-topbar">
        <div className="emd-breadcrumb">
          Energy management / Energy Monitoring Dashboard
        </div>

        <div className="emd-actions">
          <select
            className="emd-select"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option>Last 6 hours</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
          </select>

          <button
            className="emd-btn"
            onClick={downloadDailyReport}
            disabled={isPrinting}
          >
            {isPrinting ? "Generating..." : "Download Daily Report"}
          </button>

        </div>
      </div>


      <div className="emd-top-row">
        <div className="emd-kpi-grid">
          <div className="emd-card kpi">
            <p>Last 24 Hrs Energy Consumption</p>

            {hasRecords ? (
              <h2 className="green">
                {energyMetrics.totalConsumption.toFixed(1)} <span>kWh</span>
                <br />
                {/* <small style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
        ({(energyMetrics.totalConsumption / 1000).toFixed(2)} MWh)
      </small> */}
              </h2>
            ) : (
              <h2 style={{ color: "#9ca3af", fontSize: "1rem" }}>
                No records for last 24 hours
              </h2>
            )}
          </div>


          <div className="emd-card kpi">
            <p>Last 24 Hrs Energy Cost</p>

            {hasRecords ? (
              <h2 className="green">
                ₹{energyMetrics.totalCost.toFixed(0)}
              </h2>
            ) : (
              <h2 style={{ color: "#9ca3af", fontSize: "1rem" }}>
                No records for last 24 hours
              </h2>
            )}
          </div>


          <div className="emd-card kpi">
            <p>Energy from Generator</p>
            <h2 className="red">444 <span>kWh</span></h2>
          </div>




          <div className="emd-card kpi">
            <p>Max Demand (Last 24 Hrs)</p>
            {hasRecords ? (
              <h2 className="green">
                {energyMetrics.maxDemand.toFixed(2)} <span>MW</span>
              </h2>
            ) : (
              <h2 style={{ color: "#9ca3af", fontSize: "1.6vh" }}>No records for last 24 hours</h2>
            )}
          </div>

          <div className="emd-card kpi">
            <p>Max Demand Time</p>
            <h2>2022-05-24<br />20:29:07</h2>
          </div>

          <div className="emd-card kpi">
            <p>Power Outage</p>
            <h2 className="green">56 <span>min</span></h2>
          </div>
        </div>
      </div>

      <div className="emd-middle-row">
        <div className="emd-card power-card">
          <h3>Power Consumption (WBSEDCL Line vs Generator)</h3>
          <div className="chart-holder" ref={lineRef}></div>
        </div>

        <div className="emd-card segment-card">
          <h3>Segment Wise Energy Consumption</h3>
          <div className="pie-holder" ref={pieRef}></div>
        </div>
      </div>

      <div className="emd-bottom-row">
        <div className="emd-card hourly-card">
          <h3>Hourly Segment Wise Energy Consumption</h3>
          <div className="chart-holder" ref={barRef}></div>
        </div>
      </div>


      <EnergyMonitoringPdfDownload
        isPrinting={isPrinting}
        theme={theme}
        energyMetrics={energyMetrics}
        lineSeries={lineSeries}
        pieSeries={pieSeries}
        barData={barData}
      />
    </section>
  );
}
