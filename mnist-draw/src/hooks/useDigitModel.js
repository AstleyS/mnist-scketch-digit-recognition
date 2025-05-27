import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from 'react'

/*
    * useDigitModel hook
    * This hook is responsible for loading the pre-trained digit recognition model.
    * It uses TensorFlow.js to load the model from the specified path.
    * 
*/
const useDigitModel = () => {

    const [model, setModel] = useState(null);

    useEffect(() => {
        // Function to load the pre-trained model
        // This function is called when the component mounts
        // It uses TensorFlow.js to load the model from the specified path
        const loadModel = async () => {
            try {
                console.log('Loading model...');
                // Load the pre-trained model from the public directory
                const loadedModel = await tf.loadLayersModel('../../mnist_cnn_model_tfjs/model.json');
                setModel(loadedModel);
                console.log('Model loaded successfully:', loadedModel);
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();
    }, []);

    const predictDigit = async (canvas) => {
        if (!model) {
            console.errror('Model is not loaded yet');
            return null;
        }

        console.log('Predicting digit...', model);

        // Resize the canvas to 28x28 pixels
        const tensor = tf.browser.fromPixels(canvas, 1) // 1 channel for grayscale
            .resizeNearestNeighbor([28, 28]) // Resize to 28x28
            .toFloat() // Convert to float32
            .div(tf.scalar(255.0)) // Normalize to [0, 1]
            .expandDims(0); // Add batch dimension

        
        const prediction = model.predict(tensor);
        const data = await prediction.data();

        // Return top-3 predictions
        const topPredictions = [...data].map((confidence, index) => ({
            digit: index,
            confidence: confidence
        })).sort((a, b) => b.confidence - a.confidence).slice(0, 3);

        return topPredictions;
    }

    // Return the model and the predictDigit function
    // The ismodelLoaded flag indicates whether the model has been loaded successfully
    // The predictDigit function can be used to make predictions on a given canvas
    return { isModelLoaded: !!model, predictDigit };


}

export default useDigitModel;