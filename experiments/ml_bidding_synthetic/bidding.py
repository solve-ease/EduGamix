import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import matplotlib.pyplot as plt
import seaborn as sns

class BidSuccessPredictionModel:
    """
    ML model to predict bid success probability using XGBoost.
    This model analyzes various factors of a bid to predict likelihood of acceptance.
    """
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_importance = None
        
    def generate_synthetic_data(self, n_samples=1000, seed=42):
        """
        Generate synthetic dataset of freelancer bids with features and outcomes
        for training the bid success prediction model.
        
        Parameters:
        - n_samples: Number of synthetic bid records to generate
        - seed: Random seed for reproducibility
        
        Returns:
        - DataFrame with synthetic bid data
        """
        np.random.seed(seed)
        
        # Define common job categories for our synthetic data
        job_categories = ['Web Development', 'Data Science', 'Machine Learning', 
                         'Mobile App Development', 'Content Writing', 'Graphic Design']
        
        # Define skill levels for freelancers
        experience_levels = ['Beginner', 'Intermediate', 'Expert']
        
        # Generate synthetic data
        data = {
            # Freelancer characteristics
            'user_experience_years': np.random.uniform(0, 10, n_samples),
            'user_rating': np.random.uniform(3, 5, n_samples),
            'user_completion_rate': np.random.uniform(0.7, 1.0, n_samples),
            'user_skill_level': np.random.choice(experience_levels, n_samples),
            
            # Job characteristics
            'job_category': np.random.choice(job_categories, n_samples),
            'job_budget_min': np.random.randint(50, 5000, n_samples),
            'job_required_experience': np.random.choice(experience_levels, n_samples),
            'job_duration_days': np.random.randint(1, 180, n_samples),
            'client_rating': np.random.uniform(3, 5, n_samples),
            
            # Bid characteristics
            'bid_amount': np.zeros(n_samples),  # Will be calculated based on budget
            'bid_amount_relative': np.random.uniform(0.7, 1.3, n_samples),  # Relative to average
            'proposal_length': np.random.randint(50, 1000, n_samples),
            'keyword_match_count': np.random.randint(0, 10, n_samples),
            'response_time_hours': np.random.exponential(24, n_samples),
            
            # Competition factors
            'number_of_bids': np.random.randint(1, 50, n_samples),
            'average_competitor_rating': np.random.uniform(3, 5, n_samples),
            
            # Skill match - 0 to 1 representing percentage match
            'skill_match': np.random.uniform(0.3, 1.0, n_samples),
            
            # Gamification elements
            'user_level': np.random.randint(1, 50, n_samples),
            'user_badges_count': np.random.randint(0, 20, n_samples),
            'user_quest_completion': np.random.randint(0, 100, n_samples),
        }
        
        # Create DataFrame
        df = pd.DataFrame(data)
        
        # Calculate bid amount based on job budget and relative positioning
        df['bid_amount'] = df['job_budget_min'] * df['bid_amount_relative']
        
        # Encode categorical variables
        df = pd.get_dummies(df, columns=['job_category', 'user_skill_level', 'job_required_experience'])
        
        # Create target variable - bid success
        # This creates a realistic success probability based on various factors
        success_probability = (
            0.8 * (df['user_rating'] - 3) / 2 +  # Higher rating increases chances
            0.6 * (df['user_completion_rate'] - 0.7) / 0.3 +  # Higher completion rate helps
            0.7 * (df['skill_match'] - 0.3) / 0.7 +  # Skill match is important
            -0.5 * (df['bid_amount_relative'] - 0.7) / 0.6 +  # Lower bids tend to win
            0.3 * np.minimum(df['proposal_length'] / 500, 1) +  # Better proposals help to a point
            0.3 * (df['keyword_match_count'] / 10) +  # Keywords matching helps
            -0.4 * (np.minimum(df['response_time_hours'], 72) / 72) +  # Faster responses are better
            -0.3 * (df['number_of_bids'] / 50) +  # More competition reduces chances
            0.2 * (df['user_experience_years'] / 10) +  # Experience helps
            0.1 * (df['user_level'] / 50) +  # Higher level gives slight advantage
            np.random.normal(0, 0.2, n_samples)  # Random noise for realism
        )
        
        # Normalize to 0-1 range
        success_probability = (success_probability - success_probability.min()) / (success_probability.max() - success_probability.min())
        
        # Convert to binary outcome
        df['bid_successful'] = (success_probability > np.random.uniform(0, 1, n_samples)).astype(int)
        
        # Store success probability for later use (useful for understanding model performance)
        df['true_success_probability'] = success_probability
        
        # Add timestamps for temporal features
        now = pd.Timestamp.now()
        df['job_posted_date'] = [now - pd.Timedelta(days=np.random.randint(1, 30)) for _ in range(n_samples)]
        df['bid_submitted_date'] = [posted + pd.Timedelta(hours=np.random.randint(1, 48)) 
                                   for posted in df['job_posted_date']]
        
        print(f"Generated {n_samples} synthetic bid records with {df['bid_successful'].mean()*100:.1f}% success rate")
        return df
    
    def preprocess_data(self, df):
        """
        Preprocess data for model training.
        
        Parameters:
        - df: DataFrame with bid data
        
        Returns:
        - X: Feature matrix
        - y: Target vector
        """
        # Drop non-feature columns
        feature_df = df.drop(['bid_successful', 'true_success_probability', 
                             'job_posted_date', 'bid_submitted_date'], axis=1, errors='ignore')
        
        # Create time-based features if timestamps are available
        if 'job_posted_date' in df.columns and 'bid_submitted_date' in df.columns:
            feature_df['response_time_hours'] = (df['bid_submitted_date'] - df['job_posted_date']).dt.total_seconds() / 3600
        
        # Define target
        y = df['bid_successful']
        
        # Make sure all data is numeric
        X = feature_df.select_dtypes(include=[np.number])
        
        # Scale numerical features
        X = self.scaler.fit_transform(X)
        
        return X, y
    
    def train(self, X, y):
        """
        Train the XGBoost model.
        
        Parameters:
        - X: Feature matrix
        - y: Target vector
        """
        # Set up XGBoost parameters
        params = {
            'max_depth': 6,
            'learning_rate': 0.1,
            'n_estimators': 100,
            'objective': 'binary:logistic',
            'eval_metric': 'logloss',
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'min_child_weight': 1,
            'gamma': 0,
            'random_state': 42
        }
        
        # Initialize and train model
        self.model = xgb.XGBClassifier(**params)
        self.model.fit(X, y)
        
        # Get feature importance
        self.feature_importance = self.model.feature_importances_
        
    def evaluate(self, X, y):
        """
        Evaluate model performance.
        
        Parameters:
        - X: Feature matrix
        - y: Target vector
        
        Returns:
        - Dictionary of performance metrics
        """
        # Make predictions
        y_pred = self.model.predict(X)
        y_prob = self.model.predict_proba(X)[:, 1]
        
        # Calculate metrics
        metrics = {
            'accuracy': accuracy_score(y, y_pred),
            'precision': precision_score(y, y_pred),
            'recall': recall_score(y, y_pred),
            'f1': f1_score(y, y_pred),
            'auc': roc_auc_score(y, y_prob)
        }
        
        return metrics
    
    def predict_success_probability(self, bid_features):
        """
        Predict success probability for a new bid.
        
        Parameters:
        - bid_features: Dictionary or DataFrame with bid features
        
        Returns:
        - Predicted success probability (0-100)
        """
        if isinstance(bid_features, dict):
            bid_features = pd.DataFrame([bid_features])
            
        # Make sure we only use numerical features that the model was trained on
        numeric_features = bid_features.select_dtypes(include=[np.number])
        
        # Scale features
        scaled_features = self.scaler.transform(numeric_features)
        
        # Get probability
        success_prob = self.model.predict_proba(scaled_features)[0, 1]
        
        # Return as percentage
        return round(success_prob * 100)
    
    def visualize_feature_importance(self, feature_names):
        """
        Create visualization of feature importance.
        
        Parameters:
        - feature_names: List of feature names
        """
        if self.feature_importance is None:
            print("Model hasn't been trained yet. No feature importance to display.")
            return
            
        # Create a DataFrame for visualization
        importance_df = pd.DataFrame({
            'Feature': feature_names,
            'Importance': self.feature_importance
        }).sort_values('Importance', ascending=False)
        
        # Plot
        plt.figure(figsize=(10, 8))
        sns.barplot(x='Importance', y='Feature', data=importance_df.head(20))
        plt.title('Top 20 Features by Importance')
        plt.tight_layout()
        plt.show()


class SyntheticJobGenerator:
    """
    Generate synthetic job listings for the virtual marketplace.
    """
    
    def __init__(self):
        self.skills_by_category = {
            'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue', 'Node.js', 'PHP', 'WordPress'],
            'Data Science': ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Tableau', 'Power BI'],
            'Machine Learning': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'NLP', 'Computer Vision'],
            'Mobile Development': ['Swift', 'Kotlin', 'Flutter', 'React Native', 'iOS', 'Android'],
            'Content Writing': ['SEO', 'Blog Posts', 'Technical Writing', 'Copywriting', 'Content Strategy'],
            'Design': ['Photoshop', 'Illustrator', 'UI/UX', 'Figma', 'Graphic Design', 'Logo Design']
        }
        
        self.job_title_templates = [
            "{category} Expert Needed for {project_type}",
            "Looking for {category} Specialist to Build {project_type}",
            "{level} {category} Developer for {project_type}",
            "Create a {project_type} using {skill} and {skill}",
            "{project_type} Development - {skill} Skills Required",
            "Help Build {project_type} for {industry} Company"
        ]
        
        self.project_types_by_category = {
            'Web Development': ['E-commerce Website', 'Landing Page', 'Web Application', 'Admin Dashboard', 'Portfolio Site'],
            'Data Science': ['Data Analysis Report', 'Dashboard', 'Predictive Model', 'Data Pipeline', 'A/B Test Analysis'],
            'Machine Learning': ['Recommendation System', 'Chatbot', 'Classification Model', 'Image Recognition System', 'Prediction Algorithm'],
            'Mobile Development': ['Mobile App', 'Progressive Web App', 'Cross-platform Application', 'Mobile Game', 'Utility App'],
            'Content Writing': ['Blog Series', 'Technical Documentation', 'Marketing Copy', 'Product Descriptions', 'White Paper'],
            'Design': ['Brand Identity', 'UI Kit', 'Website Redesign', 'App Interface', 'Marketing Materials']
        }
        
        self.industries = ['Healthcare', 'Finance', 'Education', 'E-commerce', 'Technology', 'Entertainment', 'Food', 'Travel', 'Real Estate']
        
        self.description_templates = [
            "We are looking for a skilled {category} professional to help us develop {project_type}. The ideal candidate will have expertise in {skill} and {skill}. This project requires {level} level skills and attention to detail.",
            
            "Our {industry} company needs a {level} {category} specialist to create {project_type}. You should be proficient with {skill} and have experience with {skill}. This is a {duration} project with potential for long-term collaboration.",
            
            "We need someone to build {project_type} for our {industry} business. Required skills include {skill}, {skill}, and {skill}. The ideal hero for this quest will have {level} experience and strong communication skills.",
            
            "Seeking a talented {category} expert to develop {project_type}. You must be comfortable with {skill} and have prior experience with similar projects. This quest offers {xp} XP points upon successful completion!"
        ]
        
        self.deliverable_templates_by_category = {
            'Web Development': [
                "Complete, functioning {project_type} with responsive design",
                "Source code with documentation",
                "Integration with our existing systems",
                "Browser compatibility testing",
                "Basic SEO implementation"
            ],
            'Data Science': [
                "Cleaned and processed dataset",
                "Analysis report with visualizations",
                "Interactive dashboard",
                "Documentation of methodology",
                "Presentation of insights"
            ],
            'Machine Learning': [
                "Trained model with at least {metric}% accuracy",
                "Source code with comments",
                "API for model deployment",
                "Technical documentation",
                "Performance evaluation report"
            ],
            'Mobile Development': [
                "Fully functional mobile application",
                "Source code with documentation",
                "App store submission ready package",
                "User guide",
                "Testing documentation"
            ],
            'Content Writing': [
                "{count} articles of {length} words each",
                "SEO-optimized content with keywords",
                "Editing and proofreading included",
                "Content in {format} format",
                "Royalty-free images selection"
            ],
            'Design': [
                "Design files in {format} format",
                "Source files that can be edited",
                "Design system documentation",
                "Multiple design variations",
                "Responsive designs for various screen sizes"
            ]
        }
        
    def generate_job_listing(self, difficulty='random'):
        """
        Generate a synthetic job listing.
        
        Parameters:
        - difficulty: 'Beginner', 'Intermediate', 'Expert', or 'random'
        
        Returns:
        - Dictionary with job listing details
        """
        # Select random category
        category = np.random.choice(list(self.skills_by_category.keys()))
        
        # Determine difficulty level
        if difficulty == 'random':
            difficulty = np.random.choice(['Beginner', 'Intermediate', 'Expert'], 
                                         p=[0.3, 0.5, 0.2])  # Distribution favoring intermediate
        
        # Select relevant skills for this category
        all_skills = self.skills_by_category[category]
        required_skills_count = 3 if difficulty == 'Beginner' else 5 if difficulty == 'Intermediate' else 7
        required_skills = np.random.choice(all_skills, 
                                          size=min(required_skills_count, len(all_skills)), 
                                          replace=False).tolist()
        
        # Select project type
        project_type = np.random.choice(self.project_types_by_category[category])
        
        # Select industry
        industry = np.random.choice(self.industries)
        
        # Generate title
        title_template = np.random.choice(self.job_title_templates)
        title = title_template.format(
            category=category,
            project_type=project_type,
            level=difficulty,
            skill=np.random.choice(required_skills),
            industry=industry
        )
        
        # Generate description
        description_template = np.random.choice(self.description_templates)
        description = description_template.format(
            category=category,
            project_type=project_type,
            skill=required_skills[0],
            skill2=required_skills[1] if len(required_skills) > 1 else required_skills[0],
            skill3=required_skills[2] if len(required_skills) > 2 else required_skills[0],
            level=difficulty,
            industry=industry,
            duration=f"{np.random.randint(1, 12)} month" if np.random.random() > 0.5 else f"{np.random.randint(1, 8)} week",
            xp=np.random.randint(50, 500)
        )
        
        # Generate deliverables
        deliverable_templates = self.deliverable_templates_by_category[category]
        deliverables = []
        for i in range(min(4, len(deliverable_templates))):
            deliverable = deliverable_templates[i].format(
                project_type=project_type,
                metric=np.random.randint(80, 99),
                count=np.random.randint(3, 15),
                length=np.random.choice([500, 1000, 1500, 2000]),
                format=np.random.choice(['PSD', 'AI', 'Figma', 'Sketch', 'PDF', 'Word', 'Markdown'])
            )
            deliverables.append(deliverable)
        
        # Set payment range based on difficulty
        if difficulty == 'Beginner':
            payment_min, payment_max = np.random.randint(50, 200), np.random.randint(200, 500)
        elif difficulty == 'Intermediate':
            payment_min, payment_max = np.random.randint(200, 500), np.random.randint(500, 1000)
        else:  # Expert
            payment_min, payment_max = np.random.randint(500, 1000), np.random.randint(1000, 3000)
        
        # Set XP points based on difficulty and payment
        xp_points = int((payment_min + payment_max) / 10 * (1 if difficulty == 'Beginner' else 1.5 if difficulty == 'Intermediate' else 2))
        
        # Set duration
        if np.random.random() > 0.5:
            duration = f"{np.random.randint(1, 12)} month{'s' if np.random.randint(1, 12) > 1 else ''}"
        else:
            duration = f"{np.random.randint(1, 8)} week{'s' if np.random.randint(1, 8) > 1 else ''}"
        
        # Generate full job listing
        job = {
            'id': np.random.randint(10000, 99999),
            'title': title,
            'category': category,
            'difficulty': difficulty,
            'description': description,
            'skills': required_skills,
            'deliverables': deliverables,
            'paymentRange': [payment_min, payment_max],
            'xpPoints': xp_points,
            'duration': duration,
            'location': 'Remote',
            'clientRating': round(np.random.uniform(3.0, 5.0), 1),
            'proposals': np.random.randint(0, 30),
            'postedTime': f"{np.random.randint(1, 30)} days ago" if np.random.random() > 0.5 else f"{np.random.randint(1, 24)} hours ago",
            'deadline': f"{np.random.randint(1, 30)} days from now" if np.random.random() > 0.7 else "Open",
            'keywords': required_skills + [category, project_type, industry],
            'averageBid': int((payment_min + payment_max) / 2)
        }
        
        return job
        
    def generate_multiple_jobs(self, count=10, difficulty_distribution=None):
        """
        Generate multiple job listings.
        
        Parameters:
        - count: Number of job listings to generate
        - difficulty_distribution: Dictionary with percentages for each difficulty level
                                  e.g. {'Beginner': 0.3, 'Intermediate': 0.5, 'Expert': 0.2}
        
        Returns:
        - List of job listing dictionaries
        """
        if difficulty_distribution is None:
            difficulty_distribution = {'Beginner': 0.3, 'Intermediate': 0.5, 'Expert': 0.2}
            
        jobs = []
        for _ in range(count):
            # Randomly select difficulty based on distribution
            difficulty = np.random.choice(
                list(difficulty_distribution.keys()),
                p=list(difficulty_distribution.values())
            )
            
            jobs.append(self.generate_job_listing(difficulty))
            
        return jobs


# Usage example
if __name__ == "__main__":
    # Create the bid success prediction model
    bid_model = BidSuccessPredictionModel()
    
    # Generate synthetic data
    df = bid_model.generate_synthetic_data(n_samples=5000)
    
    # Split data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        df.drop(['bid_successful', 'true_success_probability', 'job_posted_date', 'bid_submitted_date'], axis=1, errors='ignore').select_dtypes(include=[np.number]),
        df['bid_successful'],
        test_size=0.2,
        random_state=42
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    bid_model.train(X_train_scaled, y_train)
    
    # Evaluate model
    metrics = bid_model.evaluate(X_test_scaled, y_test)
    print("Model Performance Metrics:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.4f}")
    
    # Visualize feature importance
    bid_model.visualize_feature_importance(X_train.columns)
    
    # Generate job listings
    job_generator = SyntheticJobGenerator()
    jobs = job_generator.generate_multiple_jobs(count=20)
    
    # Print example job
    print("\nExample Job Listing:")
    example_job = jobs[0]
    for key, value in example_job.items():
        print(f"{key}: {value}")
    
    # Sample bid prediction
    sample_bid = {
        'user_experience_years': 5,
        'user_rating': 4.7,
        'user_completion_rate': 0.95,
        'bid_amount': example_job['paymentRange'][0] * 0.9,  # 10% below minimum
        'proposal_length': 600,
        'keyword_match_count': 7,
        'skill_match': 0.85,
        'number_of_bids': example_job['proposals'],
        'response_time_hours': 2
    }
    
    # This would be used after properly training with scaled features
    # success_probability = bid_model.predict_success_probability(sample_bid)
    # print(f"\nPredicted bid success probability: {success_probability}%")