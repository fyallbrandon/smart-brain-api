const axios = require('axios');

const returnClarifai = (imageUrl) => {
    const PAT = '0c29d288e4aa4ef69dd103c7f7254d6b';
    const USER_ID = 'branman37';    
    const APP_ID = 'test';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}

    const handleApiCall = (req, res) => {
        const imageUrl = req.body.input;
        const requestOptions = returnClarifai(imageUrl);

        axios.post("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", requestOptions)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('unable to work with API'))
        }

    const handleImage = (req, res, db) => {
        const { id } = req.body;
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
    }

module.exports = {
    handleImage,
    handleApiCall,
}