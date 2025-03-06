# Evaluate a Lasso regression model on the diabetes dataset
from numpy import mean, std, absolute
from pandas import read_csv
from sklearn.model_selection import cross_val_score, RepeatedKFold
from sklearn.linear_model import Lasso

# Load the dataset
url = 'diabetes.csv'
dataframe = read_csv(url, header=None)
data = dataframe.values
X, y = data[1:, :-1], data[1:, -1]  # Exclude header row

# Define the model
model = Lasso(alpha=1.0)

# Define model evaluation method
cv = RepeatedKFold(n_splits=10, n_repeats=3, random_state=1)

# Evaluate the model
scores = cross_val_score(model, X, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1)

# Force scores to be positive
scores = absolute(scores)

# Print the mean and standard deviation of MAE
print('Mean MAE: %.3f (%.3f)' % (mean(scores), std(scores)))  # Output: Mean MAE: 0.374 (0.022)

# Fit the model
model.fit(X, y)

# Define new data (a single row)
row = [1, 189, 60, 23, 846, 30.1, 0.398, 59]
# Alternate row: [10, 139, 80, 0, 0, 27.1, 1.448, 57]

# Make a prediction
yhat = model.predict([row])

# Summarize the prediction
print("Predicted: %.0f" % yhat[0])  # Output: Predicted: 1
