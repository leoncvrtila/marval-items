interface Form {
  name: string;
  displayName: string;
  fieldsets: [
    {
      displayName: string;
      fields: Field[];
    }
  ];
}

interface Field {
  name: string;
  displayName: string;
  type: string;
  ["x-options"]?: Option[];
}

interface Option {
  value: number;
  text: string;
}
