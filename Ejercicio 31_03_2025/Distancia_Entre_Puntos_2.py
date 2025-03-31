import numpy as np
import pandas as pd
from scipy.spatial import distance

# Definimos las coordenadas de los puntos
puntos = {
    "Punto A": (2, 3),
    "Punto B": (5, 4),
    "Punto C": (1, 1),
    "Punto D": (6, 7),
    "Punto E": (3, 5),
    "Punto F": (8, 2),
    "Punto G": (4, 6),
    "Punto H": (2, 1)
}

# Convertir las coordenadas a un dataframe para facilitar el cálculo
df_puntos = pd.DataFrame(puntos).T
df_puntos.columns = ["X", "Y"]
print("Coordenadas de los puntos: ")
print(df_puntos)

# Función para calcular las distancias entre todos los puntos
def calcular_distancias(puntos):
    distancias = pd.DataFrame(index=df_puntos.index, columns=df_puntos.index)
    
    # Calculo de distancias
    for i in df_puntos.index:
        for j in df_puntos.index:
            if i != j:  # No calcula la distancia del mismo punto
                # Distancia Euclidiana
                distancias.loc[i, j] = distance.euclidean(df_puntos.loc[i], df_puntos.loc[j])
                # Distancia Manhattan
                distancias.loc[i, j] = distance.cityblock(df_puntos.loc[i], df_puntos.loc[j])
                # Distancia Chebyshev
                distancias.loc[i, j] = distance.chebyshev(df_puntos.loc[i], df_puntos.loc[j])
    return distancias

# Calcular las distancias
distancias = calcular_distancias(puntos)

# Obtener el valor máximo de las distancias
valor_maximo = distancias.values.max()
(punto1, punto2) = distancias.stack().idxmax()

print("Tabla de Distancias:")
print(distancias)
print("Distancia Máxima:", valor_maximo)
print(f"Entre el punto {punto1} y el {punto2}")

# Otra manera de obtener el valor máximo
max_value = distancias.max().max()

# Obtener la columna que contiene el valor máximo
col_max = distancias.max().idxmax()

# Obtener el índice (fila) que contiene el valor máximo
id_max = distancias[col_max].idxmax()

print(f"Valor máximo: {max_value}")
print(f"Columna con valor máximo: {col_max}")
print(f"Índice con valor máximo: {id_max}")
