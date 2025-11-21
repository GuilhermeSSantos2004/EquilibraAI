    import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let ultimaLeitura = null;

// Recebe os dados do ESP32 (POST)
app.post("/sensores", (req, res) => {
  console.log("Dados recebidos do ESP32:", req.body);

  ultimaLeitura = {
    temperatura: req.body.temperatura,
    umidade: req.body.umidade,
    luminosidade: req.body.luminosidade,
    condicoesIdeais: req.body.condicoesIdeais,
    recebidoEm: new Date().toISOString(),
  };

  return res.status(201).json({ ok: true });
});

// Endpoint para o App
app.get("/sensores/ultima", (req, res) => {
  if (!ultimaLeitura) {
    return res.status(404).json({ message: "Nenhum dado recebido ainda" });
  }
  return res.json(ultimaLeitura);
});

let ultimaPostura = null;

app.post("/postura", (req, res) => {
  console.log("Postura recebida:", req.body);

  ultimaPostura = {
    posturaOk: req.body.posturaOk,
    motivo: req.body.motivo,
    enviadoEm: req.body.enviadoEm || new Date().toISOString(),
  };

  return res.status(201).json({ ok: true });
});


app.get("/postura/ultima", (req, res) => {
  if (!ultimaPostura) {
    return res.status(404).json({ message: "Nenhum dado de postura recebido" });
  }
  return res.json(ultimaPostura);
});



app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
