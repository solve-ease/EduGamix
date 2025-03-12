import json
from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
import pandas as pd
import numpy as np

# Mastery Threshold
MASTERY_THRESHOLD = 0.9
BKT_FILE = "bkt_mastery.json"  # File to store BKT mastery data

# Bayesian Knowledge Tracing (BKT) Parameters
p_init = 0.3  # Initial probability of mastery
p_learn = 0.1  # Probability of learning after each attempt
p_guess = 0.2  # Probability of guessing correctly
p_slip = 0.1   # Probability of slipping (incorrect answer despite mastery)

# Load or Initialize BKT Mastery Data
def load_bkt_mastery():
    try:
        with open(BKT_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

bkt_mastery_data = load_bkt_mastery()

# Save BKT Mastery Data
def save_bkt_mastery():
    with open(BKT_FILE, "w") as file:
        json.dump(bkt_mastery_data, file, indent=4)

# Function to Update BKT Mastery
def update_bkt_mastery(student_id, skill, score):
    """Updates BKT mastery probability for a given student and skill."""
    student_key = str(student_id)
    if student_key not in bkt_mastery_data:
        bkt_mastery_data[student_key] = {}
    if str(skill) not in bkt_mastery_data[student_key]:
        bkt_mastery_data[student_key][str(skill)] = p_init

    p_mastery = bkt_mastery_data[student_key][str(skill)]

    if score >= 0.8:  # Correct answer
        p_mastery = (p_mastery * (1 - p_slip)) / (p_mastery * (1 - p_slip) + (1 - p_mastery) * p_guess)
    else:  # Incorrect answer
        p_mastery = (p_mastery * p_slip) / (p_mastery * p_slip + (1 - p_mastery) * (1 - p_guess))

    # Update mastery with learning probability
    bkt_mastery_data[student_key][str(skill)] = p_mastery + (1 - p_mastery) * p_learn
    save_bkt_mastery()

# Sample Student-Quiz Data
quiz_data = [
    (1, 101, 0.4, 30), (1, 102, 0.6, 225), (1, 103, 0.8, 40), (1, 104, 0.50, 30),
    (1, 105, 0.5, 5), (1, 106, 0.2, 60), (1, 107, 0.9, 20), (1, 108, 0.85, 30),
    (1, 109, 0.7, 45), (1, 110, 0.6, 38)
]

reader = Reader(rating_scale=(0, 1))
df = pd.DataFrame(quiz_data, columns=["student", "skill", "score", "time"])
dataset = Dataset.load_from_df(df[["student", "skill", "score"]], reader)
trainset, testset = train_test_split(dataset, test_size=0.001)
model = SVD()
model.fit(trainset)

# 🎯 Function to Recommend Topics for the Next Quiz
def recommend_topics_for_next_quiz(student_id, skills, top_n=3):
    """Recommends topics for the next quiz, considering BKT mastery and time taken."""
    student_key = str(student_id)
    
    # Update BKT mastery
    for _, row in df[df["student"] == student_id].iterrows():
        update_bkt_mastery(student_id, row["skill"], row["score"])
    
    # Get predictions from CF model
    predictions = {skill: model.predict(student_id, skill).est for skill in skills}
    
    # Update predictions with BKT mastery values
    if student_key in bkt_mastery_data:
        for skill in skills:
            if str(skill) in bkt_mastery_data[student_key]:
                predictions[skill] = bkt_mastery_data[student_key][str(skill)]

    # Normalize Time Taken
    average_time_per_skill = df.groupby("skill")["time"].mean()
    df["normalized_time"] = df["time"] / average_time_per_skill[df["skill"]].values
    student_time = df[df["student"] == student_id].set_index("skill")["normalized_time"].to_dict()

    # Adjust mastery based on time taken
    for skill in skills:
        if skill in student_time:
            time_factor = student_time[skill]
            if time_factor > 1.2:
                predictions[skill] *= 0.9
            elif time_factor < 0.8:
                predictions[skill] *= 1.05

    # Filter out mastered skills
    weak_skills = {skill: mastery for skill, mastery in predictions.items() if mastery < MASTERY_THRESHOLD}
    
    if not weak_skills:
        print(f"Student {student_id} has mastered all topics. No further recommendations.")
        return None
    
    # Recommend lowest mastery skills
    recommended_skills = sorted(weak_skills, key=weak_skills.get)[:top_n]
    print(f"Recommended Topics for Next Quiz (Student {student_id}): {recommended_skills}")
    return recommended_skills

# 🔹 Run Next Quiz Recommendation
student_id = 1
skills = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
recommend_topics_for_next_quiz(student_id, skills)
