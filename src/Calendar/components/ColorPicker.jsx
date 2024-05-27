import React, { useState, useEffect, useCallback } from 'react'

const ColorPicker = ({ stateUpdation, stateValue, calenderData, apiCalenderData }) => {

    const [colorValue, setColorValue] = useState('');

    const handleColorChange = useCallback((event) => {
        stateUpdation(event.target.value);
    });

    useEffect(() => {
        if(calenderData && apiCalenderData){
            setColorValue(calenderData ? calenderData : apiCalenderData?.[0]?.calendar_color)
        }
    }, [calenderData, apiCalenderData])

    return (
        <div className="form-group bokable">
            <label className="form-label">HEX CODE</label>
            <div className="input-group">
                <input
                    value={colorValue}
                    type="text"
                    className="form-control inputV"
                    onChange={handleColorChange}
                />
                <div className="input-group-append">
                    <input
                        type="color"
                        className="inputColor"
                        value={colorValue}
                        onChange={handleColorChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ColorPicker