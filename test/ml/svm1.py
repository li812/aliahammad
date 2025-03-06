import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

diabetes = pd.read_csv('diabetes.csv')

X = diabetes.loc[:, diabetes.columns != 'Outcome']  
y = diabetes['Outcome']

X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=66)

sv = SVC()
sv.fit(X_train, y_train)

print('Accuracy of SVM classifier on training set: {:.2f}'.format(sv.score(X_train, y_train)))
print('Accuracy of SVM classifier on test set: {:.2f}'.format(sv.score(X_test, y_test)))

new = [[1, 89, 66, 23, 94, 28.1, 0.167, 21]]
print("Prediction: ", sv.predict(new))
