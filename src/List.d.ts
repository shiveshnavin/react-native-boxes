import { ViewProps } from "react-native";
export type DatatableViewProps = {
    items: any[];
    itemAdapter: (item: any) => SimpleDatatableViewItemProps;
} & ViewProps;
export declare function SimpleDatalistView(props: DatatableViewProps): import("react").JSX.Element;
export type SimpleDatatableViewItemProps = {
    title?: string;
    icon?: string | any;
    subtitle?: string | React.ReactNode;
    body?: string | React.ReactNode;
    action?: React.ReactNode;
    onPress?: () => void;
    flexRatio?: [number, number, number];
};
export declare function SimpleDatatlistViewItem(props: SimpleDatatableViewItemProps & ViewProps): import("react").JSX.Element;
