from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
import pandas as pd
import numpy as np

# 🎯 Mastery Threshold (If student exceeds this, the topic is considered mastered)
MASTERY_THRESHOLD = 0.9

# 🎯 Sample Student-Quiz Data (Student_ID, Skill_ID, Score, Time Taken in Seconds)
quiz_data = [
    (1, 101, 0.4, 30), (1, 102, 0.6, 225), (1, 103, 0.8, 40), (1, 104, 0.50, 30),
    (1, 105, 0.5, 5), (1, 106, 0.2, 60), (1, 107, 0.9, 20), (1, 108, 0.85, 30),
    (1, 109, 0.7, 45), (1, 110, 0.6, 38)
]

# Convert data into Surprise dataset format (ignoring time initially for CF model)
reader = Reader(rating_scale=(0, 1))  # Mastery ranges from 0 to 1
df = pd.DataFrame(quiz_data, columns=["student", "skill", "score", "time"])
dataset = Dataset.load_from_df(df[["student", "skill", "score"]], reader)

# 🔹 Split dataset into training and testing
trainset, testset = train_test_split(dataset, test_size=0.001)

# 🔹 Train CF model (SVD)
model = SVD()
model.fit(trainset)

# 🎯 Bayesian Knowledge Tracing (BKT) Parameters
p_init = 0.3  # Initial probability of mastery
p_learn = 0.1  # Probability of learning after each attempt
p_guess = 0.2  # Probability of guessing correctly
p_slip = 0.1   # Probability of slipping (incorrect answer despite mastery)

# 🎯 Initialize BKT Mastery Data
bkt_mastery_data = {skill: p_init for skill in df["skill"].unique()}

# 🎯 Function to Update BKT Mastery
def update_bkt_mastery(student_id, skill, score):
    """
    Updates the BKT mastery probability for a student and skill based on their performance.
    """
    if skill not in bkt_mastery_data:
        bkt_mastery_data[skill] = p_init

    p_mastery = bkt_mastery_data[skill]

    if score >= 0.8:  # Correct answer
        p_mastery = (p_mastery * (1 - p_slip)) / (p_mastery * (1 - p_slip) + (1 - p_mastery) * p_guess)
    else:  # Incorrect answer
        p_mastery = (p_mastery * p_slip) / (p_mastery * p_slip + (1 - p_mastery) * (1 - p_guess))

    # Update mastery with learning probability
    bkt_mastery_data[skill] = p_mastery + (1 - p_mastery) * p_learn

# 🎯 Normalize Time Taken (Relative to the Average Time Per Skill)
average_time_per_skill = df.groupby("skill")["time"].mean()
df["normalized_time"] = df["time"] / average_time_per_skill[df["skill"]].values

# 🎯 Function to Recommend Topics for the Next Quiz (Including Time Factor)
def recommend_topics_for_next_quiz(student_id, skills, top_n=3):
    """
    Analyzes student's quiz performance and recommends topics for the next quiz.
    Now includes time taken as a factor.
    """
    # Update BKT mastery based on the student's quiz performance
    for _, row in df[df["student"] == student_id].iterrows():
        update_bkt_mastery(student_id, row["skill"], row["score"])

    # Get mastery predictions for each skill
    predictions = {skill: model.predict(student_id, skill).est for skill in skills}

    # Update predictions with BKT data
    for skill in skills:
        if skill in bkt_mastery_data:
            predictions[skill] = bkt_mastery_data[skill]  # Use BKT mastery

    # Get student's time taken for each skill
    student_time = df[df["student"] == student_id].set_index("skill")["normalized_time"].to_dict()

    # Adjust mastery based on time taken (Struggles if too high)
    for skill in skills:
        if skill in student_time:
            time_factor = student_time[skill]
            if time_factor > 1.2:  # Took 20% longer than average
                predictions[skill] *= 0.9  # Reduce mastery slightly
            elif time_factor < 0.8:  # Answered faster than average
                predictions[skill] *= 1.05  # Slightly boost mastery

    # Filter out mastered skills
    weak_skills = {skill: mastery for skill, mastery in predictions.items() if mastery < MASTERY_THRESHOLD}

    # If all skills are mastered, stop recommending
    if not weak_skills:
        print(f"✅ Student {student_id} has mastered all topics. No further recommendations.")
        return None

    # Sort weak skills (lowest mastery first) and pick top N for the next quiz
    recommended_skills = sorted(weak_skills, key=weak_skills.get)[:top_n]

    print(f"📌 Recommended Topics for Next Quiz (Student {student_id}): {recommended_skills}")
    return recommended_skills

# 🔹 Run Next Quiz Recommendation
student_id = 1
skills = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]  # Available skills
recommend_topics_for_next_quiz(student_id, skills)