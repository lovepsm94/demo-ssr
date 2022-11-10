function handler(req, res) {
  if (req.method === "GET") {
    return getKeywords(req, res);
  }
}

async function getKeywords(req, res) {
  try {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("data from ssr");
      }, 1000);
    });

    const data = await promise;

    return res.json({ data });
  } catch (err) {
    return res.json({});
  }
}

export default handler;
