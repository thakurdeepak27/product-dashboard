import React from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ProductCard } from "./ProductCard";

const COLUMN_WIDTH = 280;
const ROW_HEIGHT = 360;

export const ProductsGrid = ({ products, onEdit, onDelete }) => {
  const getColumnCount = (width) =>
    Math.max(1, Math.floor(width / COLUMN_WIDTH));

  const Cell = ({ columnIndex, rowIndex, style, data }) => {
    const { items, columnCount, onEdit, onDelete } = data;

    const index = rowIndex * columnCount + columnIndex;
    const product = items[index];

    if (!product) return null;

    return (
      <div style={{ ...style, padding: "10px" }}>
        <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
      </div>
    );
  };

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = getColumnCount(width);
          const rowCount = Math.ceil(products.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={COLUMN_WIDTH}
              height={height}
              rowCount={rowCount}
              rowHeight={ROW_HEIGHT}
              width={width}
              itemData={{
                items: products,
                columnCount,
                onEdit,
                onDelete,
              }}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};
