import { ViewProps } from "react-native";
export type DatatableViewProps = {
    items: any[];
    itemAdapter: (item: any, idx: number, list: any) => SimpleDatatableViewItemProps;
} & ViewProps;
export declare function SimpleDatalistView(props: DatatableViewProps): import("react").JSX.Element;
export type SimpleDatatableViewItemProps = {
    title?: string;
    icon?: string | any;
    loading?: boolean;
    subtitle?: string | React.ReactNode;
    body?: string | React.ReactNode;
    action?: React.ReactNode;
    onPress?: () => void;
    flexRatio?: [number, number, number];
};
export declare function SimpleDatatlistViewItem(props: SimpleDatatableViewItemProps & ViewProps): import("react").JSX.Element;
