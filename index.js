const express = require('express');//loading express module 
const app = express();

app.get('/', (req, res) => {
    res.send('Top Of The Morning!!!')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})


//PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`))
// app.post()
// app.put()
// app.delete()