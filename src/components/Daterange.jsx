// CustomDateRangePicker.js
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import { FiCalendar } from "react-icons/fi";

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

    const formatDate = (date) => {
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div className='w-auto'>
            <div style={{ position: 'relative', display: 'inline-block',width:'100%' }}>
                <div className="custom-input form-group" onClick={togglePicker}>
                    <input
                        type="text"
                        className='form-control'
                        value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
                        readOnly
                    />
                    <FiCalendar className="calendar-icon" />
                </div>
                {showPicker && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomDateRangePicker;
