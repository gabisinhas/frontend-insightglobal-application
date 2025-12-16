export interface CarListViewProps {
  cars: any[];
  loading: boolean;
  error: any;
  search: string;
  sort: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: any) => void;
}
