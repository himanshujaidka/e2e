const BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

export const fetchFiles = async () => {
  const res = await fetch(`${BASE_URL}/ssh/list-files`);
  return res.json();
};

export const runScript = async () => {
  const res = await fetch(`${BASE_URL}/ssh/run-script`);
  return res.json();
};

// export const accessRemote = async () => {
//   const res = await fetch(`${BASE_URL}/remote/access`);
//   return res.json();
// };

export const connectToServer = async({app, env, user, server_index}) => {
  try{
    const response = await fetch(BASE_URL, {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app, env, user, server_index }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Connection failed");

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};