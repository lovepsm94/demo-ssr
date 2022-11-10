function handler(req, res) {
  if (req.method === "GET") {
    return getData(req, res);
  }
}

async function getData(req, res) {
  try {
    const params = req.query;
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ page: params.page, time: new Date().getTime() });
      }, 2000);
    });

    return res.json({ data });
  } catch (err) {
    return res.json({});
  }
}

export default handler;
