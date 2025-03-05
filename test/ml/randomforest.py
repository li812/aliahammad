import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
diabetes = pd.read_csv('diabetes.csv')

X = diabetes.drop(['Outcome'], axis=1)
y = diabetes['Outcome']

# Split the dataset into features and target
X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=66)

# Initialize and train the Random Forest Classifier
sv = RandomForestClassifier(n_estimators=100, random_state=0)
sv.fit(X_train.values, y_train.values)

# Print the accuracies
print('Accuracy of RF classifier on training set: {:.2f}'.format(sv.score(X_train.values, y_train.values)))
print('Accuracy of RF classifier on test set: {:.2f}'.format(sv.score(X_test.values, y_test.values)))

# Prediction for a new sample
new = [[0, 118, 84, 23, 230, 45.1, 0.567, 31]]
print("Prediction:", sv.predict(new))
