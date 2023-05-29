export type ListItemProps = {
  title: string;
  value: string;
  color?: "white" | "black";
  children?: React.ReactNode;
};

export type HeaderProps = {
  data: {
    name: string;
    id: string;
    gender: string;
    age: string; // Format: "YY/MM"
  };
  children?: React.ReactNode;
};

export type TabProps = {
  date: string;
  index: number;
  status: "active" | "new" | "progress" | "inactive";
  modality: string;
};
