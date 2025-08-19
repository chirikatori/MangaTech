import easyocr
import cv2
import numpy as np


class EasyOCR:
    def __init__(self, languages="en"):
        self.reader = easyocr.Reader([languages])

    def read_text(self, image_path):
        image = cv2.imread(image_path)
        result = self.reader.readtext(image, detail=0, paragraph=True)
        text = ' '.join(result)
        return text

    def text_detection(self, image_path, res_imgpath):
        image = cv2.imread(image_path)
        results = self.reader.readtext(image, detail=1)

        for (bbox, text, prob) in results:

            top_left, top_right, bottom_right, bottom_left = bbox
            pts = [tuple(map(int, top_left)), tuple(map(int, top_right)),
                   tuple(map(int, bottom_right)), tuple(map(int, bottom_left))]
            cv2.polylines(image, [np.array(pts)], isClosed=True,
                          color=(0, 255, 0), thickness=2)

            cv2.putText(image, text, (int(top_left[0]), int(top_left[1]) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        cv2.imwrite(res_imgpath, image)
