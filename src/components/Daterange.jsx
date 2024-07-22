import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function CustomDateRangePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateSelectionState, setDateSelectionState] = useState('start'); // state to track whether selecting start or end date

    const handleSelect = (ranges) => {
        if (dateSelectionState === 'start') {
            setStartDate(ranges.selection.startDate);
            setEndDate(ranges.selection.endDate);
            setDateSelectionState('end'); // set state to 'end' after selecting start date
        } else {
            setEndDate(ranges.selection.endDate);
            setShowPicker(false); // hide picker after selecting end date
            setDateSelectionState('start'); // reset state to 'start' for next selection
        }
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
        if (!showPicker) {
            setDateSelectionState('start'); // reset state when opening picker
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
