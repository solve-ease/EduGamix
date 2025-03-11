from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
import pandas as pd

# 🎯 Mastery Threshold (If student exceeds this, the topic is considered mastered)
MASTERY_THRESHOLD = 0.9

# 🎯 Sample Student-Quiz Data (Student_ID, Skill_ID, Score)
quiz_data = [
    (1, 101, 0.4), (1, 102, 0.6), (1, 103, 0.8), (1, 104, 0.3), (1, 105, 0.5),
    (1, 106, 0.2), (1, 107, 0.9), (1, 108, 0.85), (1, 109, 0.7), (1, 110, 0.6)
]

# Convert data into Surprise dataset format
reader = Reader(rating_scale=(0, 1))  # Mastery ranges from 0 to 1
dataset = Dataset.load_from_df(pd.DataFrame(quiz_data, columns=["student", "skill", "score"]), reader)

# 🔹 Split dataset into training and testing
trainset, testset = train_test_split(dataset, test_size=0.2)

# 🔹 Train CF model (SVD)
model = SVD()
model.fit(trainset)

# 🎯 Bayesian Knowledge Tracing (BKT) Mastery Data
bkt_mastery_data = {
    101: 0.92,  # Mastered
    102: 0.75,  # Still learning
    103: 0.60,  # Needs practice
    104: 0.30,  # Struggling
    105: 0.45,  # Struggling
    106: 0.25,  # Struggling
    107: 0.95,  # Mastered
    108: 0.85,  # Almost mastered
    109: 0.70,  # Improving
    110: 0.55   # Needs more practice
}

# 🎯 Function to Recommend Topics for the Next Quiz
def recommend_topics_for_next_quiz(student_id, skills, top_n=3):
    """
    Analyzes student's quiz performance and recommends topics for the next quiz.
    """
    # Get mastery predictions for each skill
    predictions = {skill: model.predict(student_id, skill).est for skill in skills}

    # Update predictions with BKT data if available
    for skill in skills:
        if skill in bkt_mastery_data:
            predictions[skill] = bkt_mastery_data[skill]  # Use BKT mastery

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
