// url: https://c8t3.c10.e2-5.dev/flags/thumbs/tn_ac-flag.gif
// url: https://c8t3.c10.e2-5.dev/flags/imgs/ac-flag.gif

export const API = {
  get: async (url: string): Promise<unknown> => {
    const response = await fetch(url);
    return response.json();
  }
};
