from sklearn.model_selection import train_test_split, RepeatedStratifiedKFold, cross_val_score
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn import datasets
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Load the Iris dataset
iris = datasets.load_iris()

# Convert dataset to pandas DataFrame
df = pd.DataFrame(data=np.c_[iris['data'], iris['target']], columns=iris['feature_names'] + ['target'])
df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)
df.columns = ['s_length', 's_width', 'p_length', 'p_width', 'target', 'species']

# Define X (features) and y (target)
X = df[['s_length', 's_width', 'p_length', 'p_width']]
y = df['species']

# Fit the LDA model
model = LinearDiscriminantAnalysis()
model.fit(X, y)

# Define method to evaluate model
cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=1)

# Evaluate model using cross-validation
scores = cross_val_score(model, X, y, scoring='accuracy', cv=cv, n_jobs=-1)
print(f"Mean Accuracy: {np.mean(scores):.2f}")

# Define new observation as a DataFrame with feature names
new = pd.DataFrame([[5, 3, 1, 0.4]], columns=['s_length', 's_width', 'p_length', 'p_width'])

# Predict which class the new observation belongs to
prediction = model.predict(new)
print(f"Predicted class: {prediction[0]}")

# Perform LDA transformation
data_plot = model.transform(X)  # Transform data using the fitted LDA model
print("Transformed Data Shape:", data_plot.shape)  # Check the shape
print("First few transformed data points:", data_plot[:5])  # Print first few rows

target_names = iris.target_names

# Debugging: Check unique values of y and their counts to ensure proper indexing
print("Unique species in y:", y.unique())
print("Counts of each species in y:\n", y.value_counts())

# Create LDA plot
plt.figure(figsize=(8, 6))
colors = ['red', 'green', 'blue']

# Loop through each target class and plot
for color, i, target_name in zip(colors, [0, 1, 2], target_names):
    print(f"Plotting {target_name} class with label {i}")
    # Debugging: Check the indices of the current class
    class_indices = (y == target_name)
    print(f"Class {target_name} has {sum(class_indices)} data points.")
    
    plt.scatter(data_plot[class_indices, 0], 
                data_plot[class_indices, 1], 
                alpha=0.8, color=color, label=target_name)

# Add legend and labels
plt.legend(loc='best', shadow=False, scatterpoints=1)
plt.title('LDA of Iris Dataset')
plt.xlabel('LDA Component 1')
plt.ylabel('LDA Component 2')

# Display LDA plot
plt.show()
