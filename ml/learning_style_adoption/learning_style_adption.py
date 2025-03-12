import pandas as pd
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from sklearn.metrics import silhouette_score

# Sample Data: User Behavior (Student_ID, Topic_ID, Clicks, Time_Spent, Score)
user_behavior_data = [
    (1, 101, 5, 120, 0.8), (1, 102, 3, 90, 0.6), (1, 103, 7, 150, 0.9),
    (2, 101, 2, 60, 0.5), (2, 102, 4, 100, 0.7), (2, 103, 6, 130, 0.8),
    (3, 101, 8, 180, 0.9), (3, 102, 5, 120, 0.8), (3, 103, 9, 200, 0.95),
    (4, 101, 1, 30, 0.4), (4, 102, 2, 50, 0.5), (4, 103, 3, 70, 0.6),
    (5, 101, 6, 140, 0.85), (5, 102, 7, 160, 0.9), (5, 103, 8, 180, 0.92)
]

# Convert data into a DataFrame
df = pd.DataFrame(user_behavior_data, columns=["student", "topic", "clicks", "time_spent", "score"])

# Feature Engineering
# Aggregate data per student and add more features
student_features = df.groupby("student").agg({
    "clicks": ["mean", "std"],  # Average and variability of clicks
    "time_spent": ["mean", "std"],  # Average and variability of time spent
    "score": ["mean", "std"]  # Average and variability of scores
}).reset_index()

# Flatten the multi-level column index
student_features.columns = ["student", "clicks_mean", "clicks_std", "time_mean", "time_std", "score_mean", "score_std"]

# Normalize features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(student_features[["clicks_mean", "clicks_std", "time_mean", "time_std", "score_mean", "score_std"]])

# Determine Optimal Number of Clusters (Elbow Method)
inertia = []
for k in range(2, 6):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_features)
    inertia.append(kmeans.inertia_)

# Plot the Elbow Curve
plt.plot(range(2, 6), inertia, marker="o")
plt.xlabel("Number of Clusters (k)")
plt.ylabel("Inertia")
plt.title("Elbow Method for Optimal k")
plt.show()

# Clustering with k-means (Using Optimal k)
optimal_k = 3  # Set based on the Elbow Curve
kmeans = KMeans(n_clusters=optimal_k, random_state=42)
student_features["learning_style"] = kmeans.fit_predict(scaled_features)

# Print clusters
print("Student Learning Styles:")
print(student_features[["student", "learning_style"]])

# Visualize Clusters (Using PCA for Dimensionality Reduction)
pca = PCA(n_components=2)
pca_features = pca.fit_transform(scaled_features)

# Plot clusters
plt.scatter(pca_features[:, 0], pca_features[:, 1], c=student_features["learning_style"], cmap="viridis")
plt.xlabel("PCA Component 1")
plt.ylabel("PCA Component 2")
plt.title("Clusters of Students by Learning Style")
plt.colorbar(label="Learning Style")
plt.show()

# Evaluate Clustering (Silhouette Score)
silhouette_avg = silhouette_score(scaled_features, student_features["learning_style"])
print(f"Silhouette Score: {silhouette_avg:.2f}")

# Personalize Recommendations Based on Learning Style
def personalize_recommendations(student_id, learning_style):
    """
    Personalizes topic recommendations based on the student's learning style.
    """
    if learning_style == 0:
        print(f"Student {student_id} is a Visual Learner. Recommending interactive visual content.")
    elif learning_style == 1:
        print(f"Student {student_id} is a Fast Learner. Recommending advanced topics.")
    elif learning_style == 2:
        print(f"Student {student_id} is a Slow Learner. Recommending foundational topics with extra practice.")

# Example: Personalize recommendations for each student
for _, row in student_features.iterrows():
    personalize_recommendations(row["student"], row["learning_style"])