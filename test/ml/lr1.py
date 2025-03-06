from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np
import matplotlib.pyplot as plt

# Data
experience = np.array([2.4, 5.0, 1.5, 3.8, 8.7, 3.6, 1.2, 8.1, 2.5, 5, 1.6, 1.6, 2.4, 3.9, 5.4])
salary = np.array([2.1, 4.7, 1.7, 3.6, 8.7, 3.2, 1.0, 8.0, 2.4, 6, 1.1, 1.3, 2.4, 3.9, 4.8])

# Reshape experience array for sklearn
experience = experience.reshape(-1, 1)

# Model creation and training
model = LinearRegression()
model.fit(experience, salary)

# Predictions
salary_pred = model.predict(experience)

# Mean Squared Error
Mse = mean_squared_error(salary, salary_pred)

# Output results
print('Slope (Coefficient):', model.coef_)
print('Intercept:', model.intercept_)
print('Mean Squared Error (MSE):', Mse)

# Visualization
plt.scatter(experience, salary, color='red', label='Actual data')
plt.plot(experience, salary_pred, color='green', label='Regression line')
plt.xlabel("Experience (Years)")
plt.ylabel("Salary")
plt.title("Linear Regression: Experience vs Salary")
plt.legend()
plt.show()
