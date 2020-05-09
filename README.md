# Título

Test, usando lerna para el manejo de proyectos en JavaScript, api con node, web con reactjs

## Pasos

1. en el archivo **initdb.sql** que esta en la raiz del proyecto copiar y pegar el script de la base de datos

2. dentro de la carpeta **/api** configurar el archivo **.env** con los campos para acceder a la base de datos

3. instalar lerna con el comando: **npm install --global lerna**
  
4. en la carpeta raiz del proyecto ejecutar **lerna bootstrap** esto ayudara a instalar las dependencias del api y de web simultaneamente

5. ejecutar **npm run dev:api** desde la raiz del proyecto para levantar el api
  
6. ejecutar **npm run dev:web** desde la raiz del proyecto para levantar el web

7. acceder al usuario con rol admin **username: christian** **password: asd**
   
8. acceder al usuario con rol user **username: juan** **password: asd**