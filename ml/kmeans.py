import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Set the random seed for reproducibility
np.random.seed(0)

# Generate random data points
X = np.random.rand(25, 2)

# Number of clusters
k = 3

# Initialize and fit the KMeans model
kmeans = KMeans(n_clusters=k, n_init=7, random_state=0)
kmeans.fit(X)

# Get cluster labels and centroids
labels = kmeans.labels_
centers = kmeans.cluster_centers_

# Plot the data points and cluster centers
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', label='Data Points')
plt.scatter(centers[:, 0], centers[:, 1], c='red', marker='x', label='Cluster Centers')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('K-means Clustering')
plt.legend()
plt.show()
