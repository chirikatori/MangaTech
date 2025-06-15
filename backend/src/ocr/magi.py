from transformers import AutoModel
import numpy as np
from PIL import Image
import torch


class Magi:
    def __init__(self):
        self.model = AutoModel.from_pretrained("ragavsachdeva/magi",
                                               trust_remote_code=True)

    def read_text(self, image_path):
        image = self._read_image_as_np_array(image_path)
        with torch.no_grad():
            results = self.model.predict_detections_and_associations([image])
            text_bboxes_for_all_images = [x["texts"] for x in results]
            ocr_results = self.model.predict_ocr([image],
                                                 text_bboxes_for_all_images)
        return results[0], ocr_results[0]

    # Text Detection
    def text_detection(self, image_path, res_imgpath):
        image = self._read_image_as_np_array(image_path)
        with torch.no_grad():
            results = self.model.predict_detections_and_associations([image])
            self.model.visualise_single_image_prediction(image, results[0],
                                                         filename=res_imgpath)

    # Text Recognition (Build later)
    def text_recognition(self):
        pass

    def _read_image_as_np_array(self, image_path):
        with open(image_path, "rb") as file:
            image = Image.open(file).convert("L").convert("RGB")
            image = np.array(image)
        return image
