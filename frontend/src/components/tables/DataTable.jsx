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
import Pagination from "../ui/pagination";
import OutLoader from "../ui/outloader";

const DataTable = ({ columns, data, isLoading, actions, caption, pending, rowPerPage = 3 }) => {
  return (
    <div className={`bg-white px-2`}>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
          <TableHead>S.No</TableHead>
            {columns.map(column => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={columns.length + 2} />
        ) : (
          <TableBody>

            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{data.indexOf(item) + 1}</TableCell>
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
      <Pagination totalPages={Math.ceil(data?.length / rowPerPage)} />
      <OutLoader loading={pending} />
    </div>
  );
};

export default DataTable;
