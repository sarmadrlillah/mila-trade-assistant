export async function handler(event) {
  const symbol = event.queryStringParameters.symbol || "BTCUSDT";
  const type = event.queryStringParameters.type || "ticker";

  let url;
  switch (type) {
    case "ticker":
      url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
      break;
    case "depth":
      url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`;
      break;
    case "klines":
      url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=100`;
      break;
    default:
      return { statusCode: 400, body: "Invalid type" };
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
