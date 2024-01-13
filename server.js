const PORT = 8000;
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
const MY_API_KEY = "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";
const openAiEndpoint = 'https://api.openai.com/v1/chat/completions';

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MY_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try{
       const response =  await fetch(openAiEndpoint, options);
       const data = await response.json();
       res.send(data);
    }catch (error){
        console.error(error);
    }
})


app.listen(PORT, () => console.log('Your server is running on port ' + PORT));