# Equilibra-AI: Monitoramento de Ambiente para Produtividade e Bem-Estar

## Integrantes

- **Enricco Rossi de Souza Carvalho Miranda** - RM551717  
- **Guilherme Silva dos Santos** - RM551168  
- **Sofia Amorim Coutinho** - RM552534

---

## 1. Identificação do Problema

No cenário atual, muitas pessoas trabalham longas horas em frente ao computador, seja em home office ou escritório, o que gera problemas como:

- Falta de pausas regulares
- Permanecer tempo demais sentado
- Exceder o horário de trabalho sem perceber
- Ambientes desconfortáveis (calor, pouca ventilação, pouca luz)
- Problemas de postura e fadiga por esforço repetitivo
- Queda de foco, estresse e risco de burnout

Esses fatores afetam diretamente a produtividade, saúde física, bem-estar e qualidade das entregas.

---

## 2. Solução Proposta

Desenvolvemos um dispositivo IoT capaz de monitorar o ambiente de trabalho e estimular hábitos saudáveis por meio de alertas e gamificação.

### Sensores utilizados

- **DHT22:** mede temperatura e umidade (conforto térmico)  
- **LDR (sensor de luz):** verifica se a iluminação está adequada

### Atuadores

- **LED Verde:** ambiente saudável + usuário em foco  
- **LED Amarelo:** muito tempo sem pausa (alerta leve)  
- **LED Vermelho:** hora de parar, alongar ou encerrar a jornada  
- **Buzzer:** alertas sonoros (pausa, foco, fim do expediente, ajuste de postura)

---

## 3. Demonstração

A demonstração foi feita no **Wokwi** com ESP32 e os seguintes componentes:

- Sensor **DHT22** (temperatura/umidade)
- Sensor **LDR** (luminosidade)
- LEDs RGB
- Buzzer
- Display **LCD I2C**
- Comunicação via **HTTP POST** com API backend usando `HTTPClient`
- Integração com **ngrok** para expor API local

O dispositivo executa ciclos a cada 10 segundos para leitura de sensores, atualização de status e envio dos dados para a API.

### Fluxo de Comunicação

```
Dispositivo IoT (ESP32) → API → App Mobile / Dashboard Web
```

```
Câmera (futura expansão) → API
```

### Arquitetura

┌──────────────────┐       HTTP            ┌──────────────────┐  
│   Dispositivo    │  ----------------->   │       API        │  
│      IoT         │                       │  (Processamento) │  
│ ESP32 + Sensores │  <-----------------   │                  │  
└──────────────────┘     respostas         └──────────────────┘  
          │                                        │  
          │                                        ▼  
          │                                ┌──────────────────┐  
          └──────────────────────────────► │ App Mobile / Web │  
                                           └──────────────────┘  

---

## 4. Impacto e Relevância da Solução

Essa solução promove:

- Melhor saúde física e mental
- Redução de estresse e burnout
- Incentivo a hábitos saudáveis e ciclos de foco
- Aumento da produtividade e bem-estar
- Integração com gamificação para engajamento

Também contribui com ambientes de trabalho mais eficientes, humanos e sustentáveis.

---

## 5. Como Executar o Projeto

1. **Clonar o repositório**
2. **Acessar o projeto no Wokwi:**  
   [Wokwi Simulation](https://wokwi.com/projects/447994207284459521)
3. **Configurar API Backend:**  
   - Subir uma API local na rota `/sensores`
   - Exemplo: `http://localhost:3000/sensores`
4. **Expor a API com ngrok:**  
   ```bash
   ngrok http 3000
   ```
5. **Atualizar o código ESP32:**  
   ```cpp
   const char* api_url = "https://xxxx.ngrok.io/sensores";
   ```
6. **Rodar a simulação:**  
   Com a API ativa e o ngrok em execução, o ESP32 enviará dados para a API.

---

## 6. Links Importantes

- 🎥 [Vídeo de Demonstração](https://youtu.be/Wo_iS5nqqG4)
- 🔗 [Projeto no Wokwi](https://wokwi.com/projects/447994207284459521)

---

## 7. Dependências

- `<WiFi.h>`
- `<DHT.h>`
- `<LiquidCrystal_I2C.h>`
- `<HTTPClient.h>`

---

## 8. Endpoints HTTP Utilizados

- **Método:** `POST`
- **Endpoint:** `/sensores`  
  (Exemplo: `https://xxxx.ngrok.io/sensores`)

### Corpo da Requisição (JSON)

```json
{
  "temperatura": 24.5,
  "umidade": 50.2,
  "luminosidade": 1234,
  "condicoesIdeais": true,
  "postura": false
}
```

- `temperatura`: leitura do sensor DHT22 (°C)
- `umidade`: leitura do sensor DHT22 (%)
- `luminosidade`: valor do LDR (ADC)
- `condicoesIdeais`: true se tudo estiver nas faixas corretas

