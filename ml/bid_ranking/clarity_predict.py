import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

class ClarityPredictor:
    def __init__(self, model_path, tokenizer_path, max_length=20):
        """
        Initialize the ClarityPredictor by loading the model and tokenizer.
        """
        self.model = load_model(model_path)  # Load the trained model
        with open(tokenizer_path, "rb") as f:
            self.tokenizer = pickle.load(f)  # Load the tokenizer
        self.max_length = max_length  # Maximum sequence length

    def predict_clarity_score(self, bid):
        """
        Predict the clarity score for a given freelancing bid paragraph.
        """
        # Tokenize and pad the input bid
        sequence = self.tokenizer.texts_to_sequences([bid])
        padded_sequence = pad_sequences(sequence, maxlen=self.max_length, padding="post", truncating="post")
        
        # Predict the clarity score
        score = self.model.predict(padded_sequence)[0][0]
        return float(score)  # Convert to float