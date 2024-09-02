import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import ImagePreview from "@/components/ui/image-preivew";
import LineBreak from "@/components/ui/line-break";

const ProductInfo = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">{product.name}</h2>
    <Table className="mt-4 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Attribute</TableHead>
          <TableHead className="font-medium">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Brand:</TableCell>
          <TableCell>Nuturemite</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Type:</TableCell>
          <TableCell>Supplement</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">MRP:</TableCell>
          <TableCell>₹{product.basePrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Sales Price:</TableCell>
          <TableCell>₹{product.price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Quantity:</TableCell>
          <TableCell>{product.quantity || 0}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Status:</TableCell>
          <TableCell>{product.quantity == 0 ? "Out of Stock" : "In Stock"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Description:</TableCell>
          <TableCell>{product.description}</TableCell>
        </TableRow>
        {product.details.map(detail => (
          <TableRow key={detail.name}>
            <TableCell className="font-medium whitespace-nowrap">{detail.name}:</TableCell>
            <TableCell>{<LineBreak text={detail.value} />}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-medium">Images:</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {product.images.map((url, index) => (
                <ImagePreview>
                  <img
                    key={index}
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-24 h-24 object-cover"
                  />
                </ImagePreview>
              ))}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default ProductInfo;
