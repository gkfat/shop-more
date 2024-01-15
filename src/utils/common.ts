/** 產生隨機 16 位字元 */
export const randomId = (): string => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
};
