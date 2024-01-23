
export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: "Generate useLocalStorage",
      id: 321123123,
      ct: "2023-12-12",
      messages: [
        {
          content: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "1682827639323",
          role: "user",
          id: 123,
        },
      ],
    },
  ],
  currentChat: 0,
  options: {
    account: {
      name: "CHAT——AI",
      avatar: "",
    },
    general: {
      language: "English",
      theme: "light",
      command: "COMMAND_ENTER",
      size: "normal",
    },
    openai: {
      baseUrl: "",
      organizationId: "",
      temperature: 1,
      model: "gpt-3.5-turbo",
      apiKey: import.meta.env.VITE_OPEN_AI_KEY,
      max_tokens: 2048,
      n: 1,
      stream: true,
    },
  },
  is: {
    typeing: false,
    config: false,
    fullScreen: true,
    sidebar: true,
    inputing: false,
    thinking: false,
    apps: true,
  },
  typeingMessage: {},
  version: "0.1.0",
  cotent: "",
};
