import { defineChatSessionFunction } from "node-llama-cpp";

export default {
  getCurrentDateTime: defineChatSessionFunction({
    description:
      "Returns a string representation of a date. The format of the string depends on the locale.",
    async handler() {
      return new Date().toString();
    },
  }),
};
