import joblib
import numpy as np
from clarity_predict import ClarityPredictor  # Assuming this is your package

# Paths to the pre-trained models
DL_MODEL_PATH = "clarity_score_model.h5"   # Path to deep learning model
TOKENIZER_PATH = "tokenizer.pkl"     # Path to tokenizer
LR_MODEL_PATH = "bid_ranking_model.pkl"  # Path to linear regression model

# Load the deep learning-based clarity predictor
clarity_model = ClarityPredictor(DL_MODEL_PATH, TOKENIZER_PATH)

# Load the regression model
regression_model = joblib.load(LR_MODEL_PATH)

# Function to predict bid rank
def predict_bid_rank(bid_text, experience, price, reputation):
    """
    Predicts the ranking of a freelancing bid based on multiple factors.
    
    :param bid_text: The text of the bid.
    :param experience: Freelancer's experience level (years).
    :param price: Bid price ($).
    :param reputation: Freelancer's reputation score (1-10).
    :return: Predicted bid rank.
    """
    # Get clarity score from deep learning model
    clarity_score = clarity_model.predict_clarity_score(bid_text)

    # Prepare input for regression model
    features = np.array([[clarity_score, experience, price, reputation]])

    # Predict bid rank
    bid_rank = regression_model.predict(features)[0]
    return bid_rank

# Example usage
if __name__ == "__main__":
    bid_text = "I have 5 years of experience in web development and can deliver a high-quality website."
    experience = 5
    price = 500
    reputation = 8

    predicted_rank = predict_bid_rank(bid_text, experience, price, reputation)
    print(f"Predicted Bid Rank: {predicted_rank:.2f}")
