# Leal para ti
"Leal para ti" es un proyecto que permite visualizar las transacciones disponibles para usuarios registrados en la [plataforma de pruebas de Leal] (https://pruebatecnica.puntosleal.com). 

## Uso
### Versión online
La aplicación se encuentra desplegada en [heroku](https://leal-para-ti.herokuapp.com/).
### Instalar localmente
```
git clone https://github.com/falopez10/leal-para-ti.git
cd leal-para-ti 
npm install
npm start
```
### Funcionalidades
* Servicio de login.
* Consulta de las transacciones disponibles para la cuenta ingresada.
* Filtro según rango de fecha en que se crea la transacción y su criterio.
* Detalle sobre transacción seleccionada.
* Diseño "*responsive*", "*mobile-first*"

### Diseño de componentes
La aplicación se organiza jerárquicamente con componentes según los estándares de React. Cada componente se encuentra implementado dentro de la carpeta /src.

Los siguientes son los componentes implementados:

* **App**: Componente principal, que maneja el estado del usuario.
* **NavBar**: Se encarga de la barra de navegación y sus funcionalidades. Aquí se incluye servicio de login y de links asociados a leal.
* **Historial**: Componente con funcionalidades principales: Despliegue de transacciones y filtros. ESe muestra una vez el usuario halla ingresado a su cuenta.

## Tecnologías usadas
### Front-End

* [React](https://reactjs.org/): Framework para desarrollo sobre JS
* [react-bootstrap](https://react-bootstrap.github.io/): Framework sobre bootstrap v3 que permite un diseño *responsive* sobre la plataforma.

### Back-End
* Servicios proveídos por la [plataforma de pruebas de leal](https://pruebatecnica.puntosleal.com).

##Autor
[Fabio Andrés López Corredor](https://falopez10.github.io).