export interface IToDoListItem {
    id: number;
    text: string;
    description: string;
    status: EToDoListItemStatus;
}

export interface IToDoListItemCreate { 
    text: string;
    description: string;
}

export enum EToDoListItemStatus {
    InProgress = "InProgress",
    Completed = "Completed"
}

export const translatedToDoListItemStatus: { [status in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.InProgress]: $localize`:@@in_progress:InProgress`,
    [EToDoListItemStatus.Completed]: $localize`:@@completed:Completed`,
}