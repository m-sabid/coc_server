const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;
// Use the cors middleware
app.use(cors());

const COC_API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNkYmYzNTBkLWVhZGYtNGNiMS1hMTg2LTM1MzBjMGQxMjRiMCIsImlhdCI6MTcwMDI5NjI3NSwic3ViIjoiZGV2ZWxvcGVyLzk4OTc2ZDliLWNjZTMtNDMxOS1hYzA3LTJhYzMyMDQ3YmQ3NyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4yMTYuNTYuMTI1Il0sInR5cGUiOiJjbGllbnQifV19.jRwg6NCYXMASVpW7XOWKDEuu9hVl8P3uz1i66bxI4jfY6hDnsHx0KNHTv5FIvDLHc0DgeCtqhX4qA4CDw4qMAA";

app.use(express.json());

// #LJ82YGP9 Clan id

app.get("/", function (req, res) {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});

app.get("/api/clan/:tag", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.clashofclans.com/v1/clans/${encodeURIComponent(
        req.params.tag
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
    res.status(500).send("Internal Server Error", error);
    res.json(error);
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
