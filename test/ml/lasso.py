from numpy import mean, std, absolute
from pandas import read_csv
from sklearn.model_selection import cross_val_score, RepeatedKFold
from sklearn.linear_model import Lasso

# Load the dataset
url = 'diabetes.csv'
dataframe = read_csv(url, header=None)
data = dataframe.values

# Split the data into features (X) and target (y)
X, y = data[1:, :-1], data[1:, -1]

# Define the model
model = Lasso(alpha=1.0)

# Define model evaluation method
cv = RepeatedKFold(n_splits=10, n_repeats=3, random_state=1)

# Evaluate the model
scores = cross_val_score(model, X, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1)

# Force scores to be positive
scores = absolute(scores)

# Print the mean and standard deviation of MAE
print('Mean MAE: %.3f (%.3f)' % (mean(scores), std(scores)))

# Fit the model on the entire dataset
model.fit(X, y)

# Define new data (row of features to predict)
row = [1, 189, 60, 23, 846, 30.1, 0.398, 59]

# Make a prediction
yhat = model.predict([row])

# Summarize prediction
print("Predicted: %.0f" % (yhat[0]))