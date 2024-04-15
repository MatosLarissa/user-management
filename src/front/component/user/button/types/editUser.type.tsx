export interface EditUserButtonProps {
  token: string;
  userId: string;
  onEditSuccess: () => void;
  onEditClick: () => void;
}