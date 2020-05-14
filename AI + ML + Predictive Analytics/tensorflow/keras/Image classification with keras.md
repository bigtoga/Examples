https://keras.io/api/applications/#usage-examples-for-image-classification-models

Common to use a multi-layered models where you use one model to classify into subgroups, then use another model / algorithm to further classify / become more accurate, and then maybe even 1-10 other models/algos to get best accuracy

## Step 1: Classify ImageNet classes with ResNet50
```python
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np

model = ResNet50(weights='imagenet')

img_path = 'elephant.jpg'
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

preds = model.predict(x)
# decode the results into a list of tuples (class, description, probability)
# (one such list for each sample in the batch)

print('Predicted:', decode_predictions(preds, top=3)[0])
```
```shell
# Predicted: [(u'n02504013', u'Indian_elephant', 0.82658225), (u'n01871265', u'tusker', 0.1122357), (u'n02504458', u'African_elephant', 0.061040461)]
```
