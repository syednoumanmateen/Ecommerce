import { memo, useState } from 'react';
import '../../styles/table.css';
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const Table = ({ data, columns }) => {
    const [sortConfig, setSortConfig] = useState(null);

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;

        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'ascending' ? 'descending' : 'ascending' };
            }
            return { key, direction: 'ascending' };
        });
    };

    return (
        <table className="custom-table">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} onClick={() => handleSort(col.key)}>
                            <span className="th-content">
                                <span>{col.header}</span>
                                {sortConfig?.key === col.key && (
                                    <span className="chevron">
                                        {sortConfig.direction === 'ascending' ? <GoChevronDown /> : <GoChevronUp />}
                                    </span>
                                )}
                            </span>
                        </th>

                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col) => (
                            <td key={col.key}>{row[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default memo(Table);
