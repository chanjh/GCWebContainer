declare module '@pandola/bridge';
declare module '@pandola/bridge' {
  function register(name: string, fn: any);
  function launcher();
}

declare global {
  interface Window {
    launcher(config?: any);
    register(name: string, fn: any);
  }
}