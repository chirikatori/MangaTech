import unittest
from src.ocr import EasyOCR


class TestEasyOCR(unittest.TestCase):
    def setUp(self):
        self.ocr_processor = EasyOCR()

    def test_read_text(self):
        image_path = "app/test_image.jpeg"  # Đổi thành đường dẫn ảnh test
        text = self.ocr_processor.read_text(image_path)
        self.assertIsInstance(text, str)
        self.assertGreater(len(text), 0, "Văn bản OCR không được rỗng")


if __name__ == "__main__":
    unittest.main()
