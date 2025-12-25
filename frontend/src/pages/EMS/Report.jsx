import "./Report.css";
import { useState } from "react";
function Report() {
  const [theme, setTheme] = useState("light");
  return (
    <div
      className="alert-setup-container"
      style={
        theme === "dark"
          ? {
            "--bg-main": "#020617",
            "--text-main": "#f9fafb",
            "--card-bg": "#0f172a",
            "--border-color": "rgba(255,255,255,0.15)",
            "--input-bg": "#1e293b",
            "--shadow": "0 4px 12px rgba(0,0,0,0.4)",
          }
          : {}
      }
    >

      <div className="eemd-toggle">
        <span className="sun-symbol">☀</span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <span className="slider"></span>
        </label>
        <span>🌙</span>
      </div>


      <div className="live-header">
        <div className="breadcrumb">
          Live <span>›</span> Instantaneous Data
        </div>

        <div className="header-actions">
          <select className="cluster-select">
            <option>cluster2</option>
            <option>cluster1</option>
          </select>

          <button className="export-btn">Export</button>
        </div>
      </div>


      <div className="live-table-wrapper">
        <table className="live-table">
          <thead>
            <tr>
              <th>Meter No</th>
              <th>Meter Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>MFM Status</th>
              <th>Comm Status</th>
              <th>Vr</th>
              <th>Vy</th>
              <th>Vb</th>
              <th>Ir</th>
              <th>Iy</th>
              <th>Ib</th>
              <th>PF</th>
              <th>kW</th>
              <th>kVA</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>MAGOT_201</td>
              <td>HT Furnace A</td>
              <td>27 Feb 25</td>
              <td>16:48:21</td>
              <td><span className="badge off">E1</span></td>
              <td><span className="badge critical">Critical</span></td>
              <td>244.41</td>
              <td>245.23</td>
              <td>243.53</td>
              <td>0.00</td>
              <td>23.42</td>
              <td>19.89</td>
              <td>0.997</td>
              <td>2.17</td>
              <td>2.18</td>
            </tr>

            <tr>
              <td>MAGOT_202</td>
              <td>Main Power</td>
              <td>01 Mar 25</td>
              <td>15:04:56</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>239.17</td>
              <td>239.77</td>
              <td>239.25</td>
              <td>37.82</td>
              <td>36.03</td>
              <td>36.35</td>
              <td>-0.668</td>
              <td>17.55</td>
              <td>26.28</td>
            </tr>

            <tr>
              <td>MAGOT_203</td>
              <td>HT Furnace B</td>
              <td>01 Mar 25</td>
              <td>15:04:58</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>241.39</td>
              <td>240.32</td>
              <td>241.89</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>1.000</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>

            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge off">E1</span></td>
              <td><span className="badge critical">Critical</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge off">E1</span></td>
              <td><span className="badge critical">Critical</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge off">E1</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge on">ON</span></td>
              <td><span className="badge critical">Critical</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
            <tr>
              <td>MAGOT_204</td>
              <td>Compressor</td>
              <td>01 Mar 25</td>
              <td>15:05:21</td>
              <td><span className="badge off">E1</span></td>
              <td><span className="badge normal">Normal</span></td>
              <td>240.27</td>
              <td>237.82</td>
              <td>237.50</td>
              <td>134.78</td>
              <td>133.43</td>
              <td>129.77</td>
              <td>-0.996</td>
              <td>84.76</td>
              <td>85.07</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-per-page">
          <span>Items per page:</span>
          <select>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>150</option>
          </select>
        </div>

        <div className="pagination-data">
          1 - 15 of 15
        </div>

        <div className="pagination-controls">
          <button className="pg-btn first" title="First Page">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.41 16.59L13.82 12L18.41 7.41L17 6L11 12L17 18L18.41 16.59ZM6 6H8V18H6V6Z" fill="currentColor" />
            </svg>
          </button>
          <button className="pg-btn prev" title="Previous Page">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor" />
            </svg>
          </button>
          <button className="pg-btn next" title="Next Page">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="currentColor" />
            </svg>
          </button>
          <button className="pg-btn last" title="Last Page">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Report;

