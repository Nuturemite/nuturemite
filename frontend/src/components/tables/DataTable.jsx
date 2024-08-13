// components/shared/DataTable.js

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";

const DataTable = ({ columns, data, isLoading, actions, caption, pending }) => {
  return (
    <div className={`bg-white px-4 ${pending ? "opacity-50 pointer-events-none" : ""}`}>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={columns.length + 1} />
        ) : (
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                {columns.map(column => (
                  <TableCell className={column.className} key={column.key}>
                    {column.render ? column.render(item) : item[column.key]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <div className="flex gap-2">{actions(item)}</div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DataTable;
