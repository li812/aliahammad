from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np

x = np.array([[1.2, 2.5],
              [2.5, 1.8],
              [3.8, 3.2],
              [5.0, 4.5],
              [7.0, 5.0],
              [8.5, 6.5],
              [9.0, 8.0],
              [7.5, 9.5],
              [6.0, 9.0],
              [4.5, 8.0]])

k = 3

kmeans = KMeans(n_clusters=k, n_init=7)
kmeans.fit(x)

labels = kmeans.labels_
centers = kmeans.cluster_centers_

plt.scatter(x[:, 0], x[:, 1], c=labels, cmap='viridis')
plt.scatter(centers[:, 0], centers[:, 1], c='red', marker='x')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('K-means Clustering')
plt.show()
