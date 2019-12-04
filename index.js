const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const app = express()
app.use(express.static('public'))

var upload = multer({ storage: multer.memoryStorage() })

// curl --request POST --form "file=@bird.jpg" --silent http://localhost:3000/upload --output bird-gray.png
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('req.file:', req.file)

    sharp(req.file.buffer)
        .grayscale()
        .toBuffer(function (err, buffer) {
            // add a header to display the image rather than download it
            res.header('Content-Type', 'image/jpeg')
            res.send(buffer)
        })
})

app.listen(3000, () => { console.log('http://localhost:3000/') })