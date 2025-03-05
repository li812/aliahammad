from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np
import matplotlib.pyplot as plt

# Data for experience and salary
experience = np.array([2.4, 5.0, 1.5, 3.8, 8.7, 3.6, 1.2, 8.1, 2.5, 5, 1.6, 1.6, 2.4, 3.9, 5.4])
salary = np.array([2.1, 4.7, 1.7, 3.6, 8.7, 3.2, 1.0, 8.0, 2.4, 6, 1.1, 1.3, 2.4, 3.9, 4.8])

# Reshaping the experience array to be a 2D array
experience = experience.reshape(-1, 1)

# Create and fit the linear regression model
model = LinearRegression()
model.fit(experience, salary)

# Make predictions
salary_pred = model.predict(experience)

# Calculate Mean Squared Error
mse = mean_squared_error(salary, salary_pred)
print("MSE:", mse)

# Plotting
plt.scatter(experience, salary, color='red')
plt.plot(experience, salary_pred, color='green')
plt.xlabel("Experience")
plt.ylabel("Salary")
plt.title("Salary vs Experience")
plt.show()

# Print slope and intercept
print("Slope:", model.coef_)
print("Intercept:", model.intercept_)
