import os
import subprocess
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

import tensorflow as tf

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
import tensorflowjs as tfjs
from cnn_models import simple_cnn

print("\nTensorflow version:", tf.__version__)
print("Keras version:", tf.keras.__version__)
print("CUDA version:", tf.sysconfig.get_build_info().get('cuda_version', 'N/A'))
print("CuDNN version:", tf.sysconfig.get_build_info().get('cudnn_version', 'N/A'))

gpus = tf.config.list_physical_devices('GPU')
print("GPUs available:", gpus)

# Get system GPU info
print("\nnvidia-smi output:")
try:
    subprocess.run(["nvidia-smi"], check=True)
except Exception as e:
    print("Error running nvidia-smi:", e)



# Load the MNIST dataset https://keras.io/api/datasets/mnist/
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
assert x_train.shape == (60000, 28, 28)
assert x_test.shape == (10000, 28, 28)
assert y_train.shape == (60000,)
assert y_test.shape == (10000,)

# Normalize the data
x_train = x_train / 255.0
x_test = x_test / 255.0

# Reshape the data to include the channel dimension
x_train = x_train.reshape(-1, 28, 28, 1) # -1 for grayscale images, 28x28 for image size, 1 for channel
x_test = x_test.reshape(-1, 28, 28, 1)


# Build the model
model = simple_cnn(
    num_classes=10,
    conv_filters=16,
    conv_kernel_size=(3, 3),
    conv_activation='relu',
    pool_size=(2, 2),
    dense_units=64,
    dense_activation='relu',
    output_activation='softmax'
)

# Compile the model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(model.summary())

# Train the model
model.fit(
    x_train, y_train,
    epochs=1,
    batch_size=32,
    validation_data=(x_test, y_test)
)

# Save the model
try:
    
    model.save('mnist_cnn_model.keras')
    print("Model saved successfully.")

except Exception as e:
    print("Error saving model:", e)

# Convert the model to TensorFlow.js format
try:

    tfjs.converters.save_keras_model(model, 'mnist_cnn_model_tfjs')
    print("Model converted to TensorFlow.js format successfully.")

except Exception as e:
    print("Error converting model to TensorFlow.js format:", e)