const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");



const PAT = 'a837b5c1c5f54b52bccaf2f29569a3ff';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);
function getBoundingBoxes(imageUrl) {
    return new Promise((resolve, reject) => {
        let boundingBoxes = {};  // Define an array to store the bounding box values

        stub.PostModelOutputs(
            {
                user_app_id: {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                model_id: MODEL_ID,
                version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
                inputs: [
                    {
                        data: {
                            image: {
                                url: imageUrl,
                                // base64: imageBytes,
                                allow_duplicate_url: true
                            }
                        }
                    }
                ]
            },
            metadata,
            (err, response) => {
                if (err) {
                    return reject(new Error(err));
                }

                if (response.status.code !== 10000) {
                    return reject(new Error("Post model outputs failed, status: " + response.status.description));
                }

                const regions = response.outputs[0].data.regions[0].region_info.bounding_box;
                boundingBoxes = regions;
                resolve(boundingBoxes);
            }
        );
    });
}

// Use the function and handle the promise
getBoundingBoxes()
    .then(boundingBoxes => {
        console.log("Bounding Boxes:", boundingBoxes);
        // You can use the boundingBoxes array here
    })
    .catch(error => {
        console.error("Error:", error);
    });



module.exports = {getBoundingBoxes}