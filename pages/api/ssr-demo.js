function handler(req, res) {
  if (req.method === "GET") {
    return getData(req, res);
  }
}

async function getData(req, res) {
  try {
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("data from ssr");
      }, 2000);
    });

    return res.json({ data: data, time: new Date().getTime() });
  } catch (err) {
    return res.json({});
  }
}

export default handler;
