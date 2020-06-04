Not exactly PCA but a good visual representation 

Source: https://alphascientist.com/feature_selection.html

```python   
corr_matrix = df.corr()
correlations_array = np.asarray(corr_matrix)

linkage = hierarchy.linkage(distance.pdist(correlations_array), \
                            method=‘average’)

g = sns.clustermap(corr_matrix,row_linkage=linkage,col_linkage=linkage,\
                   row_cluster=True,col_cluster=True,figsize=(10,10),cmap=‘Greens’)
plt.setp(g.ax_heatmap.yaxis.get_majorticklabels(), rotation=0)
plt.show()

label_order = corr_matrix.iloc[:,g.dendrogram_row.reordered_ind].columns

``` 

Note how seaborn identifies multiple factors of related features:

![?](https://i.imgur.com/ZLFG2A3_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)