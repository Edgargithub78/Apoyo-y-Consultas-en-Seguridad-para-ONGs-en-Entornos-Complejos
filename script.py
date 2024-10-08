import pandas as pd

def cargar_datos(archivo):
    try:
        df = pd.read_excel(archivo)
        return df
    except Exception as e:
        print(f"Error al cargar el archivo: {e}")

def mostrar_datos(df):
    print(df.head())  # Muestra las primeras filas del DataFrame

if __name__ == "__main__":
    archivo = 'NOTICIAS 2024 COLOMBIA.xlsx'
    datos = cargar_datos(archivo)
    if datos is not None:
        mostrar_datos(datos)
