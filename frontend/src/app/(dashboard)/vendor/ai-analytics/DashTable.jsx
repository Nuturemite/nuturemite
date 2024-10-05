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

  const DashTable = ({ columns, data, isLoading,  caption }) => {
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
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={columns.length + 1} />
          ) : (
            <TableBody>
  
              {data.map((item,index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  {columns.map(column => (
                    <TableCell className={column.className} key={column.key}>
                      {column.render ? column.render(item) : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    );
  };
  
export default DashTable;