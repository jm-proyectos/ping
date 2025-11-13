import express from "express";
import ping from "node-http-ping";
import ping2 from "ping";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Servicios");
});

// Or use https
ping('https://google.com')
  .then(time => console.log(`Response time: ${time}ms`))
  .catch(() => console.log('Failed to ping google.com'))


app.get("/ping/:host", async (req, res) => {
  const host = req.params.host;  
  try {
    const result = await ping(host);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Ping failed", details: err.message });
  }
});

app.get("/ping2/:host", async (req, res) => {
  const host = req.params.host;
  try {
    const result = await ping2.promise.probe(host, { timeout: 3 });
    res.json({
      host,
      alive: result.alive,
      time: result.time || null,
    });
  } catch (err) {
    res.status(500).json({ error: "Ping failed", details: err.message });
  }
});


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});