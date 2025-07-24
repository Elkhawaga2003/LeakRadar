export interface Ichallenge {
  id: number;
  title: string;
  flag: string;
  categoryId: number;
  coverImg?: File;
  attachmetFile: File;
  challengeUrl?: string;
  isVasible: boolean;
  description: string;
  attachmetUrl?: string | null;
  imgUrl: string;
  difficulty: string;
  points: number;
}
