export async function postData({ url, data }: { url: string; data?: any }) {
  console.log("POST REQUEST", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("ERROR IN POST", { url, data, res });

    throw new Error(res.statusText);
  }

  return res.json();
}
