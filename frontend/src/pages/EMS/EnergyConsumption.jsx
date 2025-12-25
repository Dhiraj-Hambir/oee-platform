// EnergyConsumption.jsx
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import "./EnergyConsumption.css";

const CHART_COUNT = 16;
const CATEGORIES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"];

function makeInitialSeries() {
  const a = [];
  const b = [];
  let pa = 40 + Math.round(Math.random() * 40);
  let pb = 30 + Math.round(Math.random() * 30);
  for (let i = 0; i < CATEGORIES.length; i++) {
    pa = Math.max(1, Math.round(pa * (0.9 + Math.random() * 0.3)));
    pb = Math.max(1, Math.round(pb * (0.9 + Math.random() * 0.3)));
    a.push(pa);
    b.push(pb);
  }
  return [a, b];
}

export default function EnergyConsumption() {
  const nodes = useRef([]);       // DOM nodes for charts
  const instances = useRef([]);   // store chart instances and opts

  useEffect(() => {
    // init charts
    for (let i = 0; i < CHART_COUNT; i++) {
      const el = nodes.current[i];
      if (!el) continue;

      const [sA, sB] = makeInitialSeries();

      const opts = {
        series: [
          { name: "Energy A", data: sA },
          { name: "Energy B", data: sB }
        ],
        chart: {
          type: "line",
          height: "100%",
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        stroke: { curve: "straight", width: 2.5 },
        markers: { size: 4, strokeWidth: 1.5, hover: { size: 6 } },
        tooltip: { enabled: true, theme: "dark", y: { formatter: (v) => `${v} kWh` } },
        xaxis: { categories: CATEGORIES, labels: { style: { colors: "#9ca3af" } }, crosshairs: { show: true } },
        yaxis: { labels: { style: { colors: "#9ca3af" } } },
        grid: { borderColor: "rgba(255,255,255,0.02)" },
        colors: ["#6366f1", "#06b6d4"],
        legend: { position: "top", horizontalAlign: "right", labels: { colors: "#9ca3af" } }
      };

      try {
        const chart = new ApexCharts(el, opts);
        chart.render();
        instances.current[i] = { chart, opts };
      } catch {
        // ignore single-chart init error
      }
    }

    // update all charts periodically (simulated live)
    const intervalId = setInterval(() => {
      instances.current.forEach((inst) => {
        if (!inst) return;
        try {
          const opts = inst.opts;
          let s0 = opts.series[0].data.slice();
          let s1 = opts.series[1].data.slice();
          const lastA = s0[s0.length - 1] || 10;
          const lastB = s1[s1.length - 1] || 8;
          const newA = Math.max(0, Math.round(lastA * (0.85 + Math.random() * 0.3)));
          const newB = Math.max(0, Math.round(lastB * (0.85 + Math.random() * 0.3)));
          s0.push(newA); s1.push(newB);
          if (s0.length > CATEGORIES.length) s0.shift();
          if (s1.length > CATEGORIES.length) s1.shift();
          opts.series[0].data = s0;
          opts.series[1].data = s1;
          inst.chart.updateSeries([
            { name: "Energy A", data: s0 },
            { name: "Energy B", data: s1 }
          ], true);
        } catch {
          // ignore per-chart update error
        }
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
      instances.current.forEach((inst) => {
        if (inst && inst.chart) {
          try { inst.chart.destroy(); } catch { /* ignore */ }
        }
      });
      instances.current = [];
      nodes.current = [];
    };
  }, []);

  return (
    <section className="energy-page-wrapper" aria-label="Energy Consumption">
      <div className="energy-inner">
        <div className="energy-title-row">
          <h2 className="energy-title">Energy Consumption</h2>
          <div className="energy-sub">Live — per machine</div>
        </div>

        <div className="energy-grid">
          {Array.from({ length: CHART_COUNT }).map((_, i) => (
            <div className="energy-card" key={i}>
              <div className="card-head">
                <div className="card-title">Machine {i + 1}</div>
                <div className="card-badge">Live</div>
              </div>
              <div
                className="energy-chart"
                id={`energy-chart-${i}`}
                ref={(el) => { nodes.current[i] = el; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
