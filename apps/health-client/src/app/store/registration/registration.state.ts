export interface RegistrationState {
  success: boolean;
  error: string | null;
}

export const initialRegistrationState: RegistrationState = {
  success: false,
  error: null,
};
