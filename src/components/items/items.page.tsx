import { useEffect, useState } from "react";
import ItemDetails from "./item-details/item-details";
import TableComponent from "../table/table.component";
import { useStore } from "../../store/store";
import { Grid } from "@mui/material";

const ItemsPage = () => {
  const items = useStore((state) => state.items);
  const getItems = useStore((state) => state.getItems);

  const [selectedItem, setSelectedItem] = useState<FormatedItem | null | undefined>();
  const [isSplitView, setIsSplitView] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const handleOpenSplitView = (item: FormatedItem) => {
    setSelectedItem(item);
    setIsSplitView(true);
  };

  const handleCloseSplitView = () => {
    setSelectedItem(null);
    setIsSplitView(false);
  };

  return (
    <div className="items-page">
      <div className={isSplitView ? "half-width" : "full-width"}>
        <TableComponent items={items} handleTableSplitView={handleOpenSplitView} />
      </div>

      <div className={isSplitView ? "show half-width" : "hide"}>
        <ItemDetails
          item={selectedItem}
          setIsSplitView={handleCloseSplitView}
        />
      </div>
    </div>
  );
};

export default ItemsPage;
