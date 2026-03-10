export interface DocumentListOptions {
    filter: string;
}

export interface DocumentListItem {
    type: 'documentList';
    options: DocumentListOptions;
    title: string;
}

export const filterBy = (names: string[]): DocumentListItem[] =>
    names.map((n: string) => ({
        type: 'documentList',
        options: {filter: `_type == "${n}"`},
        title: n,
    }))
