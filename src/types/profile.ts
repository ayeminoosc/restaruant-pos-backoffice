type OptionType = {
  id: string;
  label: string;
};

export type ProfileType = {
  colorOptions: string[];
  unitOptions: OptionType[];
  groupOptions: OptionType[];
  reasonOptions: OptionType[];
};

export type ProfileState = {
  profile: ProfileType;
  isFetching: boolean;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  error: string;
  searchTerm: string;
};

export type ProfileActions = {
  fetchInitialData: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  resetStatus: () => void;
};
