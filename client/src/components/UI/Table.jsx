import { memo, useState, useMemo } from 'react';
import '../../styles/table.css';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Pagination from './Pagination';  // Adjust path

const Table = ({ data, columns, itemsPerPage = 10 }) => {
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig) return data;
        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Paginate
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'ascending' ? 'descending' : 'ascending' };
            }
            return { key, direction: 'ascending' };
        });
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                onClick={() => col.sortable !== false && handleSort(col.key)}
                                style={{ cursor: col.sortable !== false ? 'pointer' : 'default' }}
                            >
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
                    {paginatedData.map((row, idx) => (
                        <tr key={idx}>
                            <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
        </>
    );
};

export default memo(Table);
