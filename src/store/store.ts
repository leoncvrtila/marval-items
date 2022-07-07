import create from "zustand";
import itemsData from "../data/items.json";
import form from "../data/form.json";

export const useStore = create<ItemState>((set) => ({
  items: [] as ItemOutput[],
  form: {} as Form,

  getItems: async () => {
    try {
      const itemsRes = itemsData.collection.items;

      set({ items: itemsRes as any });
    } catch (error) {
      console.log("error", error);
    }
  },

  getForm: async () => {
    try {
      const formRes = form.forms;

      set({ form: formRes[0] as any });
    } catch (error) {
      console.log("error", error);
    }
  },
}));
