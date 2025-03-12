import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# 🎯 Sample Data: Freelancing Bid Paragraphs and Clarity Scores
data = {
    "bid": [
        # Original 10 bids (scaled to 1-10)
        "I am a highly experienced web developer with 5+ years of experience in building scalable web applications.",
        "I can do the job quickly and efficiently. Hire me!",
        "As a professional graphic designer, I specialize in creating visually appealing designs for businesses.",
        "I will complete your project on time and within budget. Let's discuss further details.",
        "I have extensive knowledge in data science and machine learning, and I can deliver high-quality results.",
        "I am a new freelancer but eager to learn and contribute to your project.",
        "I offer affordable services and guarantee customer satisfaction.",
        "With a strong background in mobile app development, I can help you build your dream app.",
        "I am a full-stack developer with expertise in both frontend and backend technologies.",
        "I provide creative solutions to complex problems and ensure timely delivery.",
        
        # New 20 bids
        "I am a seasoned content writer with a knack for creating engaging and SEO-friendly articles.",
        "I can help you design a stunning website that reflects your brand identity.",
        "As a digital marketer, I specialize in driving traffic and increasing conversions.",
        "I have a proven track record of delivering projects on time and exceeding client expectations.",
        "I am a data analyst with expertise in Python, SQL, and data visualization tools.",
        "I am a beginner in freelancing but passionate about learning and delivering quality work.",
        "I offer competitive pricing and a commitment to delivering exceptional results.",
        "I am a UI/UX designer with a focus on creating user-friendly and aesthetically pleasing interfaces.",
        "I have a strong background in software development and can handle complex projects.",
        "I am a social media manager who can help you grow your online presence.",
        "I am a video editor with experience in creating professional and engaging video content.",
        "I am a virtual assistant who can handle administrative tasks and streamline your workflow.",
        "I am a copywriter who can craft compelling and persuasive content for your brand.",
        "I am a blockchain developer with expertise in smart contracts and decentralized applications.",
        "I am a cybersecurity expert who can help you secure your systems and data.",
        "I am a project manager with experience in leading cross-functional teams and delivering results.",
        "I am a translator fluent in multiple languages and can provide accurate and culturally relevant translations.",
        "I am a photographer who can capture stunning images for your brand or event.",
        "I am a business consultant who can help you develop strategies for growth and success.",
        "I am a customer support specialist who can provide excellent service and resolve issues promptly."
    ],
    "clarity_score": [
        # Original 10 scores (scaled to 1-10)
        9.0, 6.0, 8.0, 7.0, 8.4, 5.0, 7.6, 8.2, 8.6, 8.0,
        
        # New 20 scores
        9.5, 8.5, 7.8, 9.2, 8.7, 4.5, 7.0, 8.8, 9.1, 7.5,
        8.3, 6.5, 7.2, 9.3, 8.9, 6.8, 7.9, 8.1, 9.4, 7.3
    ]
}

# Convert data into a DataFrame
df = pd.DataFrame(data)

# 🎯 Preprocessing
# Tokenize the text data
tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts(df["bid"])
sequences = tokenizer.texts_to_sequences(df["bid"])

# Pad sequences to ensure uniform input size
max_length = 20
padded_sequences = pad_sequences(sequences, maxlen=max_length, padding="post", truncating="post")

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(padded_sequences, df["clarity_score"], test_size=0.2, random_state=42)

# 🎯 Model Architecture
embedding_dim = 64
model = Sequential([
    Embedding(input_dim=5000, output_dim=embedding_dim),  # Removed input_length
    LSTM(64, return_sequences=False),
    Dropout(0.2),
    Dense(32, activation="relu"),
    Dense(1)  # Regression output for clarity score
])

# Compile the model
model.compile(optimizer="adam", loss="mean_squared_error", metrics=["mae"])

# 🎯 Train the Model
history = model.fit(X_train, y_train, epochs=100, validation_data=(X_test, y_test), batch_size=8)

# 🎯 Evaluate the Model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error (MAE): {mae:.2f}")

# 🎯 Predict Clarity Score for a New Bid
def predict_clarity_score(bid):
    """
    Predicts the clarity score of a freelancing bid paragraph.
    """
    sequence = tokenizer.texts_to_sequences([bid])
    padded_sequence = pad_sequences(sequence, maxlen=max_length, padding="post", truncating="post")
    score = model.predict(padded_sequence)[0][0]
    return score

# Example: Predict clarity score for a new bid
new_bid = "I am a skilled software engineer with expertise in Python and machine learning."
predicted_score = predict_clarity_score(new_bid)
print(f"Predicted Clarity Score: {predicted_score:.2f}")

# 🎯 Export the Model
model.save("clarity_score_model.h5")  # Save the model to a file
print("Model saved as 'clarity_score_model.h5'")

import pickle

# Save the tokenizer
with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)
print("Tokenizer saved as 'tokenizer.pkl'")