const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;
// Use the cors middleware
app.use(cors());

const COC_API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU2OTlkZGYyLWZiYzAtNDk2Mi04NjM1LWM2YWJkMmJiYTFlNyIsImlhdCI6MTcwMDMwOTUwMCwic3ViIjoiZGV2ZWxvcGVyLzk4OTc2ZDliLWNjZTMtNDMxOS1hYzA3LTJhYzMyMDQ3YmQ3NyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4yMTYuNTYuMTI1IiwiNzYuNzYuMjEuNjEiLCI3Ni43Ni4yMS45OCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.JJrproAhDTaG3c9sSoKMhkNqz6kpRYm_Jn4am41v6lFkyGZyP9OMBmgOuCROTAN2A-mH7p-uAsrzoDufa5ATIg";

app.use(express.json());

// #LJ82YGP9 Clan id

app.get("/", function (req, res) {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});

app.get("/api/clan/:tag", async (req, res) => {
  const clanTag = "#LJ82YGP9";

  try {
    const response = await axios.get(
      `https://api.clashofclans.com/v1/clans/${encodeURIComponent(
        clanTag
      )}`,
      {
        headers: {
          Authorization: `Bearer ${COC_API_KEY}`,
        },
      }
    );

    res.json(response.data);

    console.log(response, "response");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
