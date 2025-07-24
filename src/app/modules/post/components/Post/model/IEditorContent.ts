import { IEditorBlock } from './IEditorBlock';

export interface IEditorContent {
  time: number;
  title: string;
  version?: string;
  blocks: IEditorBlock[];
}
