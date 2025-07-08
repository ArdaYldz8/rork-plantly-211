export interface IdentifyResponse {
  species: {
    common_name_tr: string;
    scientific_name: string;
  };
  confidence: number;
}

export interface ErrorModalProps {
  visible: boolean;
  onDismiss: () => void;
  message?: string;
}