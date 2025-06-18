const BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

export const fetchFiles = async () => {
  const res = await fetch(`${BASE_URL}/ssh/list-files`);
  return res.json();
};

export const accessRemote = async () => {
  const res = await fetch(`${BASE_URL}/remote/access`);
  return res.json();
};

export const connectToServer = async({app, env, user, server_index}) => {
  try{
    let url = ""
    let body = { app, user, server_index };
    if (app === "jump-server") {
      url = `${BASE_URL}/ssh/connect-jump`;
    } else {
      url = `${BASE_URL}/ssh/connect`;
      body.env = env;
    }

    const response = await fetch("http://127.0.0.1:8000/ssh/connect", {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app, env, user, server_index }),
    });
    const data = await response.json();
    console.log(data);
    console.log("Response Status: ", response.status);
    console.log("Response Body: ", data);
    if (!response.ok) throw new Error(data.detail || "Connection failed");

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const runScript = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/ssh/run-script`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to run script");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};


// export const connectToServer = async ({ app, env, user, server_index }) => {
//   try {
//     const response = await fetch(`${BASE_URL}/ssh/connect`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ app, env, user, server_index }),
//     });
 
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.detail || "Connection failed");
//     }
 
//     const data = await response.json();
//     console.log("Response Data:", data);
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error:", error.message);
//     return { success: false, error: error.message };
//   }
// };