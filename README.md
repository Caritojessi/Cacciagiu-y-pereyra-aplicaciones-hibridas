Agenda VIAJERA

Descripción del Proyecto:
    Agenda VIAJERA es una aplicación web diseñada para ayudar a los usuarios a planificar y disfrutar de sus viajes. 
    La función principal es agendar los viajes del usuario y poder llevar un control de las actividades y los gastos que tiene en cada viaje.
    Además, cuenta con una funcionalidad que permite a los usuarios explorar información detallada sobre diferentes ciudades, incluyendo actividades recomendadas para realizar en cada sitio.

Funcionalidades Implementadas:
    Separado el Backend (Node.js + Express / API REST) y el Frontend (React js + Tailwindcss)
    - Registro y autenticación de usuarios mediante JWT.
    - Gestión de perfiles de usuario, incluyendo la actualización de información personal.
    - Recomendaciones de ciudades y actividades. Traídos de una API REST.
    - Diseño responsivo utilizando Tailwind CSS. 


Tecnologías Utilizadas
    Frontend:
    - React.js: Utilizado para construir la interfaz de usuario interactiva y dinámica.
    - Tailwind CSS: Un framework CSS para estilizar la aplicación de manera eficiente.
    - react-slick: Utilizado para crear carruseles y deslizadores de contenido.
    - React Router: Implementado para manejar la navegación y las rutas dentro de la aplicación.
    - FontAwesome: Usado para integrar iconos visualmente atractivos.

    Backend:
    - Node.js: Plataforma de servidor utilizada para construir la API REST.
    - Express.js: Framework web para Node.js que facilita la creación de la API.
    - MongoDB: Base de datos NoSQL utilizada para almacenar la información de los usuarios y datos relacionados con los viajes.
    - Mongoose: Biblioteca de modelado de datos para MongoDB y Node.js.
    - JWT: Utilizado para la autenticación segura de usuarios.
    - Joi: Utilizado para la validación de esquemas de la contraseñas de los usuarios.
    - bcrypt: Utilizado para hashear y decodificar contraseñas guardadas en la base de datos.

Instalación
Requisitos previos:
    - Node.js
    - MongoDB

Pasos para instalar y correr el proyecto:

    Instalar dependencias para el Backend:
        cd backend
        npm install

    Iniciar el servidor Backend:
        npm start

    Instalar dependencias para el Frontend:
        cd ../frontend
        npm install

    Iniciar la aplicación Frontend:
        npm run dev

    Abrir la aplicación en el navegador:
        http://localhost:3000