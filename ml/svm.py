import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC, LinearSVC

# Load the dataset
diabetes = pd.read_csv('diabetes.csv')


X = diabetes.drop(['Outcome'], axis=1)
y = diabetes['Outcome']

# Split the dataset into features and target
X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=66)

# Initialize and train the SVM classifier
sv = SVC()
sv.fit(X_train.values, y_train.values)

# Print the accuracies
print('Accuracy of SVM classifier on training set: {:.2f}'.format(sv.score(X_train.values, y_train.values)))
print('Accuracy of SVM classifier on test set: {:.2f}'.format(sv.score(X_test.values, y_test.values)))

# Prediction for a new sample
new = [[1, 89, 66, 23, 94, 28.1, 0.167, 21]]
print("Prediction:", sv.predict(new))
