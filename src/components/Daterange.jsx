// CustomDateRangePicker.js
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function CustomDateRangePicker({ onChange }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateSelectionState, setDateSelectionState] = useState('start');

    const handleSelect = (ranges) => {
        if (dateSelectionState === 'start') {
            setStartDate(ranges.selection.startDate);
            setEndDate(ranges.selection.endDate);
            setDateSelectionState('end');
        } else {
            setEndDate(ranges.selection.endDate);
            setShowPicker(false);
            setDateSelectionState('start');
            onChange(ranges.selection); // Pass selected range to parent component
        }
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
        if (!showPicker) {
            setDateSelectionState('start');
        }
    };

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={`${startDate.toDateString()} - ${endDate.toDateString()}`}
                    onClick={togglePicker}
                    readOnly
                />
                {showPicker && (
                    <DateRangePicker
                        ranges={[
                            {
                                startDate: startDate,
                                endDate: endDate,
                                key: 'selection',
                            },
                        ]}
                        onChange={handleSelect}
                    />
                )}
            </div>
        </div>
    );
}

export default CustomDateRangePicker;
