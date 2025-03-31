import numpy as np
import pandas as pd
from scipy.spatial import distance

# Definimos las coordenadas de las tiendas
tiendas={
    "Tienda A" : (1,1),
    "Tienda B" : (1,5),
    "Tienda C" : (7,1),
    "Tienda D" : (3,3),
    "Tienda E" : (4,8)
}

# Convertir coordenadas a un datframe para facilitar el calculo
df_tiendas=pd.DataFrame(tiendas).T
df_tiendas.columns=["X", "Y"]
print("Coordenadas de las tiendas: ")
print(df_tiendas)

#Inicializamos un dataframe para almacenar las distancias
distancia_eu=pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)
distancia_mh=pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)
distancia_ch=pd.DataFrame(index=df_tiendas.index, columns=df_tiendas.index)

# Calculos de las distancias
for i in df_tiendas.index:
    for j in df_tiendas.index:
        # Distancias euclidianas
        distancia_eu.loc[i,j]=distance.euclidean(df_tiendas.loc[i], df_tiendas.loc[j])
        # Distancia Manhattan
        distancia_mh.loc[i,j]=distance.cityblock(df_tiendas.loc[i], df_tiendas.loc[j])
        # Distnacia Chebyshev
        distancia_ch.loc[i,j]=distance.chebyshev(df_tiendas.loc[i], df_tiendas.loc[j])
        
#Mostrar los resultados
print("\nDistancias euclidianas entre las tiendas")
print(distancia_eu)
print("\nDistancias manhattans entre las tiendas")
print(distancia_mh)
print("\nDistancias chebyshev entre las tiendas")
print(distancia_ch)