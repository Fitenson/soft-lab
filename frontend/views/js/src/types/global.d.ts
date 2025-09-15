export {};

declare global {
  interface Window {
    isEmpty(value?: string | null): boolean;
  }

  interface GlobalThis {
    isEmpty(value?: string | null): boolean;
  }
}
