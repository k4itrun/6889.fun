export interface Social {
    name: string;
    link: string;
}

interface Icon {
    default: string;
    active: string;
}

export interface Page {
    link: string;
    label: string;
    icon: Icon;
    active: boolean;
}