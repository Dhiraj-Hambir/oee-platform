import React from 'react'

const Power_Quality_Header = ({
    theme,
    toggleTheme,
    selectedRange,
    onRangeChange,
    selectedMeter,
    onMeterChange,
    onDownloadReport
}) => {
    return (
        <div className="emd-topbar">
            <div className="emd-breadcrumb">Energy management / Power Quality Monitoring</div>
            <div className="emd-actions pdf-exclude">
                <select
                    className="emd-select"
                    value={selectedMeter}
                    onChange={(e) => onMeterChange(e.target.value)}
                >
                    <option value="meter1">Meter 1</option>
                    <option value="meter2">Meter 2</option>
                    <option value="meter3">Meter 3</option>
                </select>

                <select
                    className="emd-select"
                    value={selectedRange}
                    onChange={(e) => onRangeChange(e.target.value)}
                >
                    <option value="6h">Last 6 hours</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                </select>
                <button className="emd-btn" onClick={onDownloadReport}>Download Daily Report</button>

            </div>
        </div>
    )
}

export default Power_Quality_Header