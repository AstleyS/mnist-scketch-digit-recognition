import tf from "@tensorflow/tfjs";

const model = await tf.loadLayersModel(
'https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json');
model.summary();