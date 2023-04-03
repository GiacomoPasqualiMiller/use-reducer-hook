export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "a" && password === "a") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
