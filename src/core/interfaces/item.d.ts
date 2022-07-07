interface Item {
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

interface FormatedItem {
  id: number;
  number: string;
  summary: string;
  isPrivate: boolean;
  service: {
    id: number | null;
    name: string;
  };
  status: {
    id: number | null;
    name: string;
  };
  author: string;
  createdOn: string;
  updatedOn: string;
  type: {
    prefix: string;
    id: number;
    name: string;
  }
}
