import React, { Fragment, useCallback, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Table = ({ columns, tableStyle, data, isExpandable = false }) => {
  const [expandedRows, setexpandedRows] = useState(new Set());

  const getTableHeader = useCallback(() => {
    const tableColumns = columns.map(({ width, name, accessor }) => {
      const actualWidth = isExpandable ? `calc(${width}*0.95)` : width;
      const colWidth = width ? `w-[${actualWidth}]` : "";
      return (
        <th className={`${colWidth} px-4 py-3`} key={accessor}>
          {name}
        </th>
      );
    });

    return (
      <thead className="text-sm  uppercase border-b border-slate-700 font-bold">
        <tr>
          {isExpandable ? <th className="w-[5%] px-4 py-3"></th> : null}
          {tableColumns}
        </tr>
      </thead>
    );
  }, [columns, isExpandable]);

  const getDataCells = useCallback(
    (dataRow, rowIndex) => {
      return columns.map(({ width, accessor }, i) => {
        const actualWidth = isExpandable ? `calc(${width}*0.95)` : width;
        const colWidth = width ? `w-[${actualWidth}]` : "";
        return (
          <td
            className={`${colWidth} px-4 py-3 whitespace-nowrap`}
            key={`data-cell-${rowIndex}-${i}`}
          >
            {dataRow[accessor]}
          </td>
        );
      });
    },
    [columns, isExpandable]
  );

  const getSubTable = useCallback(
    (subRowData, rowIndex) => {
      const subRows = subRowData.map((row, i) => {
        return (
          <tr
            key={`data-subrow-${rowIndex}-${i}`}
            className={`border-b border-slate-700 bg-[#8288ed] transition-all ${
              expandedRows.has(rowIndex)
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
            colSpan={columns.length + 1}
          >
            <td className="w-[5%] px-4 py-3"></td>
            {getDataCells(row, i)}
          </tr>
        );
      });

      return subRows;
    },
    [columns, expandedRows, getDataCells]
  );

  const expandSubRowsHandler = (_, rowIndex) => {
    setexpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  const getTableBody = useCallback(() => {
    const dataRows = data.map((row, i) => {
      const expandIcond = expandedRows.has(i) ? (
        <MdExpandLess
          className="hover:cursor-pointer"
          onClick={(e) => expandSubRowsHandler(e, i)}
        />
      ) : (
        <MdExpandMore
          className="hover:cursor-pointer"
          onClick={(e) => expandSubRowsHandler(e, i)}
        />
      );

      return (
        <Fragment key={`data-row-${i}`}>
          <tr>
            {isExpandable ? (
              <td className="w-[5%] px-4 py-3">
                {row.subRows ? expandIcond : null}
              </td>
            ) : null}
            {getDataCells(row, i)}
          </tr>

          {isExpandable && row.subRows && expandedRows.has(i)
            ? getSubTable(row.subRows, i)
            : null}
        </Fragment>
      );
    });

    return <tbody>{dataRows}</tbody>;
  }, [data, expandedRows, isExpandable, getDataCells, getSubTable]);

  return (
    <div className={`relative overflow-x-auto ${tableStyle}`}>
      <table className="w-full text-sm text-left text-[#d0d2d6] table-fixed">
        {getTableHeader()}
        {getTableBody()}
      </table>
    </div>
  );
};

export default Table;
