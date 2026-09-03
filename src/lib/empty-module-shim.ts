export function createRequire(): () => never {
  return () => {
    throw new Error("require() is not available in the browser");
  };
}

export default { createRequire };
