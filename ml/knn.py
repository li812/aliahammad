import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

# Load the dataset
diabetes = pd.read_csv('diabetes.csv')


X = diabetes.drop(['Outcome'], axis=1)
y = diabetes['Outcome']

# Split the dataset into features and target
X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=66)

# Initialize and train the K-NN classifier
knn = KNeighborsClassifier(n_neighbors=9)
knn.fit(X_train, y_train)

# Print the accuracies
print(f'Accuracy of K-NN classifier on training set: {knn.score(X_train, y_train)}')
print(f'Accuracy of K-NN classifier on testing set: {knn.score(X_test, y_test)}')

# Prediction for a new sample
new = [[1, 89, 66, 23, 94, 28.1, 0.167, 21]]
print('Prediction:', knn.predict(new))
