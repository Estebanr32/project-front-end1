# project-front-end1
# Proyecto Batalla Naval

Un juego de Batalla Naval interactivo desarrollado con HTML, CSS y JavaScript puro. Desafía a la computadora colocando tus barcos estratégicamente y hundiéndolos antes que ella hunda los tuyos.

![Juego de Batalla Naval](path/to/screenshot.png)

## 📋 Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- Interfaz de usuario intuitiva y responsive
- Colocación manual o automática de barcos
- Sistema de juego por turnos contra la computadora
- Diferentes tipos de barcos con distintos tamaños
- Información del clima basada en la ubicación seleccionada
- Sistema de puntuación y ranking
- Diseño adaptable a dispositivos móviles y de escritorio

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5 (para diseño responsive)
- API de clima (para mostrar el clima actual en la ubicación de batalla)
- API de banderas (para mostrar las banderas de países)

## 📁 Estructura del Proyecto

```
PROJECT-FRONT-END1/
├── controllers/             # Controladores de la aplicación
│   ├── App.js               # Controlador principal
│   ├── createMap.js         # Creación del mapa de juego
│   ├── logIn.js             # Manejo de inicio de sesión
│   ├── Play.js              # Lógica del juego
│   ├── settingsMachine.js   # Configuración de la IA
│   └── settingsUser.js      # Configuración del usuario
├── Helpers/
│   └── Utils.js             # Funciones útiles reutilizables
├── Model/
│   ├── containerShips.js    # Contenedor de barcos
│   ├── Ship.js              # Clase para los barcos
│   └── User.js              # Modelo de usuario
├── views/
│   ├── Styles/              # Estilos CSS
│   │   ├── images/          # Imágenes del juego
│   │   └── maps.css         # Estilos para el mapa
│   ├── login.html           # Pantalla de inicio de sesión
│   ├── plaing.html          # Pantalla de juego
│   ├── settings.html        # Pantalla de configuración
│   └── index.html           # Página principal
└── README.md                # Este archivo
```

## 🚀 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/batalla-naval.git
   cd batalla-naval
   ```

2. No se requieren dependencias adicionales para ejecutar el proyecto ya que usa CDN para Bootstrap.

3. Abre el archivo `index.html` en tu navegador:
   ```bash
   # En Linux/macOS
   open index.html
   
   # En Windows
   start index.html
   ```

## 🎮 Uso

1. Al iniciar el juego, rellena el formulario con:
   - Tu nickname
   - País (se mostrará tu bandera)
   - Ubicación para la batalla (se mostrará el clima)
   - Tamaño del tablero (filas y columnas)
   - Modo de colocación de barcos (automático o manual)

2. Si eliges el modo manual, se te presentará una pantalla para colocar tus barcos:
   - Selecciona el tipo de barco
   - Elige la orientación (horizontal o vertical)
   - Haz clic en el tablero para colocarlo

3. Durante el juego:
   - Haz clic en las celdas del mapa enemigo para disparar
   - Una celda roja indica un impacto
   - Una celda azul indica agua
   - Deben destruirse todos los barcos enemigos para ganar

4. Al finalizar el juego:
   - Se mostrará un resumen con estadísticas
   - Podrás ver el ranking o jugar de nuevo

## 🎯 Funcionalidades

### Sistema de colocación de barcos
- **Modo automático**: El sistema coloca aleatoriamente tus barcos
- **Modo manual**: Puedes colocar estratégicamente tus barcos en el tablero

### Tipos de barcos
- Portaaviones (6 casillas)
- Destructor (4 casillas)
- Crucero (3 casillas)
- Buque de guerra (3 casillas)
- Acorazado (2 casillas)
- Submarino (2 casillas)

### Sistema de juego
- Turnos alternados entre jugador y máquina
- Registro visual de impactos y fallos
- Indicador de barcos restantes

### Información adicional
- Datos del clima de la ubicación seleccionada
- Personalización con banderas de países

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ por [Jaider Leon Diaz, Esteban Ramirez Toro, Jhoan Sebastian Velez Montes]