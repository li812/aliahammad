import pandas as pd
import numpy as np

diabetes = pd.read_csv('diabetes.csv')

X = diabetes.loc[:, diabetes.columns != 'Outcome']
y = diabetes['Outcome']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=66)

from sklearn.ensemble import RandomForestClassifier
sv = RandomForestClassifier(n_estimators=100, random_state=0)
sv.fit(X_train.values, y_train.values)
print('Accuracy of RF classifier on training set: {:.2f}'.format(sv.score(X_train.values, y_train.values)))
print('Accuracy of RF classifier on test set: {:.2f}'.format(sv.score(X_test.values, y_test.values)))

new = [[0, 118, 84, 23, 230, 45.1, 0.567, 31]]
print("Prediction: ", sv.predict(new))
