import { create } from "zustand";
import { UseFormReturn } from "react-hook-form";

type FormStore = {
  forms: { [key: string]: UseFormReturn<any> };
  registerForm: (name: string, formInstance: UseFormReturn<any>) => void;
  unregisterForm: (name: string) => void;
  getForm: (name: string) => UseFormReturn<any> | undefined;
  updateDefaultValues: (name: string, values: Record<string, any>) => void;
};

export const useFormStore = create<FormStore>((set, get) => ({
  forms: {},

  registerForm: (name, formInstance) =>
    set((state) => {
      if (!state.forms[name]) {
        return { forms: { ...state.forms, [name]: formInstance } };
      }
      return state;
    }),

  unregisterForm: (name) =>
    set((state) => {
      const updatedForms = { ...state.forms };
      delete updatedForms[name];
      return { forms: updatedForms };
    }),

  getForm: (name) => get().forms[name],

  updateDefaultValues: (name, values) => {
    const form = get().forms[name];
    if (form) {
      form.reset(values); // Reset the form with new default values
    }
  },
}));
