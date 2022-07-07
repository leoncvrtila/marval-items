interface Link {
  name: string;
  displayName: string;
  href: string;
}

interface ItemInput {
  entity: {
    data: {
      id: number;
      type: {
        prefix: string;
        id: number;
        name: string;
      };
      number: string;
      summary: string;
      isPrivate: boolean;
      author: {
        id: number;
        name: string;
      };
      service: {
        id: number;
        name: string;
      };
      status: {
        id: number;
        name: string;
      };
      updatedOn: string;
      createdOn: string;
      nextReviewOn: string;
    };
    name: string;
  };
  links: Link[];
}

interface ItemOutput extends ItemInput {}

interface ItemState {
  items: Item[];
  form: Form;
  getItems: () => void;
  getForm: () => void;
}
