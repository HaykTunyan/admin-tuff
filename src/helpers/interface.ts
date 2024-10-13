export interface IReferenceManyInput {
    id: string;
    category: string;
    file: string;
}

export interface IReferenceManyReturn {
    name: string | null;
    value: string | null;
    file: any;
}

export interface IReferenceManyInputBridge {
    id: string;
    name: string;
    topMainCategory: any;
}


export interface ITopCategory {
    id: string;
    name: string;
    sorting: string;
}


export interface ReferenceManyInputRecord<T> {
    data: T[];
    total: number;
}

export interface IManyInputViewModel {
    record: IReferenceManyInput[];
    getReference: (data: IReferenceManyInput[]) => void;
}

export interface IReferenceManyInputComponent<T, TR> {
    key: string;
    item: IReferenceManyInput;
    record: ReferenceManyInputRecord<T>
    getTopCategory: (data: TR) => void;
    removeTopCategory: (id: string) => void;
}

export interface IReferenceManyBridgeInputComponent<T, TR> {
    key: string;
    currentRecords: IReferenceManyInputBridge[];
    record: ReferenceManyInputRecord<T>
    getTopCategory: (data: TR) => void;
    removeTopCategory: (id: string) => void;
}
