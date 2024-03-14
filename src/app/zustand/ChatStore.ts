import { create } from "zustand";

interface Message {
  role: string;
  content: string;
}

interface ChatState {
  history: Message[];
}

interface ChatActions {
  addHistory: (prompt: string) => void;
  addResponse: (role: string, content: string) => void;
}

const formatMessage = (userInput: string): Message => ({
  role: "user",
  content: userInput,
});

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  history: [],

  addHistory: (prompt: string) =>
    set((state) => ({ history: [...state.history, formatMessage(prompt)] })),

  addResponse: (role: string, content: string) =>
    set((state) => ({
      history: [
        ...state.history,
        {
          role,
          content,
        },
      ],
    })),
}));
